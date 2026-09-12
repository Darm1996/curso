import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Cliente de Supabase para uso exclusivo en el servidor.
 *
 * Se usa la clave anónima a propósito. Las políticas RLS de la tabla `leads`
 * solo permiten INSERT, nunca SELECT, así que un filtrado de esta clave no
 * expone la lista de correos capturados. Ver supabase/migrations.
 */
export function clienteSupabase(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const clave = process.env.SUPABASE_ANON_KEY;

  if (!url || !clave) return null;

  return createClient(url, clave, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
