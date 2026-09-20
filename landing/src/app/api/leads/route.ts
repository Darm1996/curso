import { NextResponse } from 'next/server';
import { clienteSupabase } from '@/lib/supabase';
import { validarLead } from '@/lib/validacion';
import { SECUENCIA } from '@/lib/correo';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(peticion: Request) {
  let cuerpo: unknown;
  try {
    cuerpo = await peticion.json();
  } catch {
    return NextResponse.json({ error: 'Solicitud mal formada.' }, { status: 400 });
  }

  const entrada = cuerpo as Record<string, unknown>;

  // Campo trampa: lo llenan los bots, una persona no lo ve.
  if (typeof entrada.empresa === 'string' && entrada.empresa.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  const validado = validarLead(entrada);
  if (!validado.ok) {
    return NextResponse.json({ error: validado.error }, { status: 400 });
  }

  const supabase = clienteSupabase();
  if (!supabase) {
    console.error('Faltan SUPABASE_URL o SUPABASE_ANON_KEY en el entorno.');
    return NextResponse.json(
      { error: 'La captura de correos no está configurada todavía.' },
      { status: 503 },
    );
  }

  // Sin .select(): devolver la fila exigiría una política de SELECT para anon,
  // que no existe a propósito. Agregarlo rompe el insert.
  const { error } = await supabase.from('leads').insert(validado.datos);

  if (error) {
    // 23505 es violación de unicidad: el correo ya estaba registrado.
    if (error.code === '23505') {
      return NextResponse.json({ ok: true, repetido: true });
    }
    console.error('Error al guardar el lead:', error.message);
    return NextResponse.json({ error: 'No pudimos guardar tu correo. Intenta de nuevo.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

/**
 * Chequeo de salud. Sirve para confirmar, sin escribir nada y sin exponer
 * valores, que las variables llegaron al entorno de ejecución y que Supabase
 * responde desde la función. La consulta devuelve cero filas siempre: anon no
 * tiene política de SELECT. Lo que se está midiendo es que el viaje ocurra.
 */
export async function GET() {
  const supabase = clienteSupabase();
  if (!supabase) {
    return NextResponse.json({ ok: false, configurado: false, alcanzable: false }, { status: 503 });
  }

  const { error } = await supabase.from('leads').select('id').limit(1);

  return NextResponse.json({
    ok: !error,
    configurado: true,
    alcanzable: !error,
    detalle: error ? error.message : null,
    correo: {
      // Solo presencia, nunca el valor.
      clave: Boolean(process.env.RESEND_API_KEY),
      remitente: process.env.CORREO_REMITENTE || 'onboarding@resend.dev (prueba)',
      secuencia: SECUENCIA.length,
    },
    cron: Boolean(process.env.CRON_SECRET),
  });
}
