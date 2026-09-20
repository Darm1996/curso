import { NextResponse } from 'next/server';
import { clienteServicio } from '@/lib/supabaseServicio';
import { correoDelDia, enviar } from '@/lib/correo';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/** Cuántos correos manda una corrida. Resend limita por segundo; el lote
 *  se manda en serie con una pausa corta y este tope evita pasarse del
 *  tiempo máximo de la función. Lo que sobre lo agarra la corrida siguiente. */
const LOTE = 40;
const PAUSA_MS = 600;

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
  let enviados = 0;
  let fallados = 0;

  for (const fila of pendientes) {
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

  return NextResponse.json({ ok: true, revisados: pendientes.length, enviados, fallados });
}
