/**
 * Envío de correos por Resend.
 *
 * Se habla con la API por fetch, sin SDK. Es una sola petición POST y agregar
 * una dependencia para eso solo suma superficie que mantener.
 */

import correos from '@/data/emails.json';

export type Correo = {
  dia: number;
  leccion: number | null;
  asunto: string;
  preencabezado: string;
  parrafos: string[];
  texto: string;
};

export const SECUENCIA = correos as Correo[];

export function correoDelDia(dia: number): Correo | undefined {
  return SECUENCIA.find((c) => c.dia === dia);
}

/**
 * El remitente sale del entorno para poder pasar de la dirección de prueba de
 * Resend a un dominio propio sin tocar código ni volver a desplegar.
 */
function remitente(): string {
  return process.env.CORREO_REMITENTE || 'Certificado Contave <onboarding@resend.dev>';
}

const NAVY = '#0B1120';
const VERDE = '#00E68A';
const GRIS = '#94A3B8';

/**
 * Plantilla del correo.
 *
 * Tablas y estilos en línea, no flexbox ni hojas aparte. Outlook y varios
 * clientes de escritorio siguen sin entender el CSS moderno, y un correo que
 * se ve roto en la bandeja no se lee.
 */
export function armarHtml(correo: Correo, nombre: string): string {
  const cuerpo = correo.parrafos
    .map((p) => `<p style="margin:0 0 18px;font-size:16px;line-height:1.65;color:#1F2937;">${p}</p>`)
    .join('\n');

  const etiqueta = correo.leccion === null
    ? 'Certificado Contave'
    : `Lección ${correo.leccion} de 17`;

  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${correo.asunto}</title>
</head>
<body style="margin:0;padding:0;background:#F1F5F9;">
<!-- El preencabezado es el texto que la bandeja muestra junto al asunto.
     Va oculto en el cuerpo y los espacios lo empujan para que no se le pegue
     el primer párrafo detrás. -->
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${correo.preencabezado}${'&#847;&zwnj;&nbsp;'.repeat(60)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F1F5F9;">
<tr><td align="center" style="padding:24px 12px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#FFFFFF;border-radius:12px;overflow:hidden;">
  <tr><td style="background:${NAVY};padding:22px 28px;">
    <p style="margin:0;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:${VERDE};">${etiqueta}</p>
  </td></tr>
  <tr><td style="padding:28px;">
    <p style="margin:0 0 18px;font-size:16px;line-height:1.65;color:#1F2937;">Hola ${nombre},</p>
    ${cuerpo}
  </td></tr>
  <tr><td style="padding:0 28px 28px;">
    <hr style="border:0;border-top:1px solid #E2E8F0;margin:0 0 16px;">
    <p style="margin:0;font-size:13px;line-height:1.6;color:${GRIS};">
      Recibes esto porque te inscribiste en el Certificado Contave.
      Las cifras normativas se verifican en fuente oficial antes de usarlas.
    </p>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

export function armarTexto(correo: Correo, nombre: string): string {
  return `Hola ${nombre},\n\n${correo.texto}\n\n---\nRecibes esto porque te inscribiste en el Certificado Contave.`;
}

export type Resultado = { ok: true; id: string } | { ok: false; error: string };

export async function enviar(
  correo: Correo,
  destinatario: string,
  nombre: string,
): Promise<Resultado> {
  const clave = process.env.RESEND_API_KEY;
  if (!clave) return { ok: false, error: 'Falta RESEND_API_KEY en el entorno.' };

  let respuesta: Response;
  try {
    respuesta = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${clave}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: remitente(),
        to: [destinatario],
        subject: correo.asunto,
        html: armarHtml(correo, nombre),
        text: armarTexto(correo, nombre),
      }),
    });
  } catch (e) {
    return { ok: false, error: `No se pudo alcanzar Resend: ${(e as Error).message}` };
  }

  const datos = (await respuesta.json().catch(() => null)) as
    | { id?: string; message?: string; name?: string }
    | null;

  if (!respuesta.ok) {
    return { ok: false, error: datos?.message ?? `Resend respondió ${respuesta.status}` };
  }
  if (!datos?.id) {
    return { ok: false, error: 'Resend respondió sin identificador de envío.' };
  }

  return { ok: true, id: datos.id };
}
