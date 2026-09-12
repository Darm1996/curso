/** Validaciones compartidas por el formulario y el endpoint. */

export const LIMITES = { nombre: 80, email: 160, origen: 60 } as const;

const CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type Entrada = { nombre?: unknown; email?: unknown; origen?: unknown };
export type Resultado =
  | { ok: true; datos: { nombre: string; email: string; origen: string } }
  | { ok: false; error: string };

export function validarLead(entrada: Entrada): Resultado {
  const nombre = typeof entrada.nombre === 'string' ? entrada.nombre.trim() : '';
  const email = typeof entrada.email === 'string' ? entrada.email.trim().toLowerCase() : '';
  const origen = typeof entrada.origen === 'string' && entrada.origen.trim()
    ? entrada.origen.trim().slice(0, LIMITES.origen)
    : 'landing';

  if (!nombre) return { ok: false, error: 'Escribe tu nombre.' };
  if (nombre.length > LIMITES.nombre) return { ok: false, error: 'El nombre es demasiado largo.' };
  if (!email) return { ok: false, error: 'Escribe tu correo.' };
  if (email.length > LIMITES.email) return { ok: false, error: 'El correo es demasiado largo.' };
  if (!CORREO.test(email)) return { ok: false, error: 'Ese correo no parece válido.' };

  return { ok: true, datos: { nombre, email, origen } };
}
