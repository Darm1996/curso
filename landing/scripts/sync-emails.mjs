#!/usr/bin/env node
/**
 * Lee /emails y escribe src/data/emails.json.
 *
 * Misma razón que sync-temario.mjs: en Vercel el directorio raíz del proyecto
 * es /landing, así que el contenido se sincroniza acá y el JSON queda
 * versionado. El despliegue no depende de carpetas de afuera.
 *
 * Los correos son párrafos y negritas, nada más. El conversor cubre eso y
 * falla si encuentra cualquier otra cosa. Un encabezado o una lista que se
 * cuele sin darse cuenta saldría como texto crudo en la bandeja de alguien.
 *
 *   npm run sync-emails
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const ORIGEN = path.resolve(AQUI, '..', '..', 'emails');
const DESTINO = path.resolve(AQUI, '..', 'src', 'data', 'emails.json');

if (!fs.existsSync(ORIGEN)) {
  console.warn(`  /emails no está disponible. Se conserva ${path.basename(DESTINO)} tal como está.`);
  process.exit(0);
}

const escapar = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Convierte un párrafo a HTML. Solo reconoce **negrita**. */
function parrafoAHtml(parrafo, archivo) {
  const plano = parrafo.replace(/\s+/g, ' ').trim();

  if (/^(#{1,6}\s|[-*+]\s|\d+\.\s|>|\||```)/.test(plano)) {
    throw new Error(`${archivo}: el conversor solo maneja párrafos y negritas, y encontró "${plano.slice(0, 40)}"`);
  }
  if (/\[[^\]]*\]\([^)]*\)|!\[/.test(plano)) {
    throw new Error(`${archivo}: hay un enlace o una imagen en markdown y el conversor no los maneja`);
  }

  const asteriscos = (plano.match(/\*\*/g) ?? []).length;
  if (asteriscos % 2 !== 0) {
    throw new Error(`${archivo}: quedó una negrita sin cerrar`);
  }

  return escapar(plano).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

const correos = fs
  .readdirSync(ORIGEN)
  .filter((f) => /^dia-\d+.*\.md$/.test(f))
  .sort((a, b) => Number(a.match(/\d+/)[0]) - Number(b.match(/\d+/)[0]))
  .map((archivo) => {
    const crudo = fs.readFileSync(path.join(ORIGEN, archivo), 'utf8');
    const m = crudo.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!m) throw new Error(`${archivo} no tiene frontmatter`);

    const meta = {};
    for (const linea of m[1].split(/\r?\n/)) {
      const i = linea.indexOf(':');
      if (i > 0) meta[linea.slice(0, i).trim()] = linea.slice(i + 1).trim();
    }

    const quitarComillas = (v) => (v ?? '').replace(/^["']|["']$/g, '');
    const asunto = quitarComillas(meta.asunto);
    const preencabezado = quitarComillas(meta.preencabezado);

    if (!asunto) throw new Error(`${archivo} no tiene asunto`);
    if (asunto.length > 50) throw new Error(`${archivo}: el asunto pasa de 50 caracteres`);
    if (!preencabezado) throw new Error(`${archivo} no tiene preencabezado`);

    const parrafos = crudo
      .slice(m[0].length)
      .split(/\r?\n\s*\r?\n/)
      .map((p) => p.trim())
      .filter(Boolean);

    if (parrafos.length === 0) throw new Error(`${archivo} no tiene cuerpo`);

    return {
      dia: Number(meta.dia),
      leccion: meta.leccion === 'null' ? null : Number(meta.leccion),
      asunto,
      preencabezado,
      parrafos: parrafos.map((p) => parrafoAHtml(p, archivo)),
      // El texto plano no es un adorno: hay clientes de correo que lo muestran
      // y hay filtros de spam que castigan al correo que solo trae HTML.
      texto: parrafos.map((p) => p.replace(/\*\*/g, '').replace(/\s+/g, ' ').trim()).join('\n\n'),
    };
  });

const dias = correos.map((c) => c.dia);
const esperados = Array.from({ length: 19 }, (_, i) => i);
if (dias.length !== 19 || !esperados.every((d, i) => dias[i] === d)) {
  throw new Error(`Se esperaban los días 0 a 18 sin huecos y llegaron: ${dias.join(', ')}`);
}

fs.mkdirSync(path.dirname(DESTINO), { recursive: true });
fs.writeFileSync(DESTINO, JSON.stringify(correos, null, 2) + '\n', 'utf8');

const palabras = correos.reduce((t, c) => t + c.texto.split(/\s+/).length, 0);
console.log(`  emails.json actualizado: ${correos.length} correos, ${palabras} palabras en total`);
