import { NextResponse } from 'next/server';
import { clienteServicio } from '@/lib/supabaseServicio';
import { correoDelDia, enviar } from '@/lib/correo';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/**
 * Límites de una corrida.
 *
 * El plan Hobby de Vercel solo permite un cron diario, y la función tiene un
 * tiempo máximo. De ahí salen estos números: se manda a dos por segundo, que
 * es lo que admite Resend, hasta agotar el presupuesto de tiempo. Lo que
 * sobre lo agarra la corrida siguiente, porque la consulta ordena por fecha
 * y lo más viejo sale primero.
 *
 * El techo práctico es de unos cien correos por corrida. A diecinueve correos
 * por persona eso sostiene alrededor de seis inscripciones diarias en régimen.
 * Cuando el ritmo suba hay dos salidas, las dos documentadas en CORREOS.md:
 * el plan Pro de Vercel, o pg_cron en Supabase llamando a esta misma ruta.
 */
const LOTE = 250;
const PAUSA_MS = 500;
const PRESUPUESTO_MS = 50_000;

type Pendiente = {
  id: string;
  dia: number;
  intentos: number;
  leads: { email: string; nombre: string } | null;
};

/**
 * Manda los correos que ya vencieron.
 *
 * Vercel llama esta ruta según el calendario de vercel.json. Se protege con
 * CRON_SECRET: sin ese encabezado cualquiera podría dispararla y adelantarle
 * la secuencia a toda la lista.
 */
export async function GET(peticion: Request) {
  const secreto = process.env.CRON_SECRET;
  if (!secreto) {
    console.error('Falta CRON_SECRET en el entorno.');
    return NextResponse.json({ error: 'No configurado.' }, { status: 503 });
  }
  if (peticion.headers.get('authorization') !== `Bearer ${secreto}`) {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });
  }

  const supabase = clienteServicio();
  if (!supabase) {
    console.error('Faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en el entorno.');
    return NextResponse.json({ error: 'No configurado.' }, { status: 503 });
  }

  const { data, error } = await supabase
    .from('envios')
    .select('id, dia, intentos, leads ( email, nombre )')
    .is('enviado_en', null)
    .lt('intentos', 3)
    .lte('programado_para', new Date().toISOString())
    .order('programado_para', { ascending: true })
    .limit(LOTE);

  if (error) {
    console.error('No se pudo leer la cola de envíos:', error.message);
    return NextResponse.json({ error: 'Falló la consulta.' }, { status: 500 });
  }

  const pendientes = (data ?? []) as unknown as Pendiente[];
  const arranque = Date.now();
  let enviados = 0;
  let fallados = 0;
  let revisados = 0;

  for (const fila of pendientes) {
    // Cortar a tiempo es parte del diseño, no una falla. Una función que se
    // pasa del límite muere a mitad de un envío y deja la fila sin marcar.
    if (Date.now() - arranque > PRESUPUESTO_MS) break;
    revisados++;
    const correo = correoDelDia(fila.dia);

    // Una fila sin destinatario o sin correo del día no se reintenta: el
    // problema no se arregla solo. Se agota para que no trabe la cola y quede
    // el motivo escrito.
    if (!fila.leads || !correo) {
      await supabase
        .from('envios')
        .update({ intentos: 3, ultimo_error: !correo ? `No existe el correo del día ${fila.dia}` : 'El suscriptor ya no existe' })
        .eq('id', fila.id);
      fallados++;
      continue;
    }

    const resultado = await enviar(correo, fila.leads.email, fila.leads.nombre);

    if (resultado.ok) {
      await supabase
        .from('envios')
        .update({ enviado_en: new Date().toISOString(), intentos: fila.intentos + 1, ultimo_error: null })
        .eq('id', fila.id);
      enviados++;
    } else {
      await supabase
        .from('envios')
        .update({ intentos: fila.intentos + 1, ultimo_error: resultado.error })
        .eq('id', fila.id);
      console.error(`Falló el día ${fila.dia} de ${fila.id}: ${resultado.error}`);
      fallados++;
    }

    await new Promise((listo) => setTimeout(listo, PAUSA_MS));
  }

  return NextResponse.json({
    ok: true,
    revisados,
    enviados,
    fallados,
    pendientes: pendientes.length - revisados,
  });
}
