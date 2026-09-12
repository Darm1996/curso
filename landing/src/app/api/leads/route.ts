import { NextResponse } from 'next/server';
import { clienteSupabase } from '@/lib/supabase';
import { validarLead } from '@/lib/validacion';

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
