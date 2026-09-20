import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Cliente con clave de servicio, solo para el trabajo periódico.
 *
 * Esta clave ignora RLS: lee la lista de correos y escribe en `envios`. No
 * puede usarse en ninguna ruta que reciba entrada del público. La captura de
 * correos sigue usando la clave anónima, que solo puede insertar en `leads`.
 *
 * Si esta clave se filtra, la lista completa queda expuesta. Por eso vive
 * únicamente acá y acá se queda.
 */
export function clienteServicio(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const clave = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !clave) return null;

  return createClient(url, clave, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
