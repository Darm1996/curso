#!/usr/bin/env node
/**
 * Lee el frontmatter de /contenido y escribe src/data/temario.json.
 *
 * La landing no lee /contenido en tiempo de build porque en Vercel el
 * directorio raíz del proyecto es /landing. El temario se sincroniza acá y el
 * JSON queda versionado, así el despliegue es autónomo.
 *
 *   npm run sync-temario
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const CONTENIDO = path.resolve(AQUI, '..', '..', 'contenido');
const DESTINO = path.resolve(AQUI, '..', 'src', 'data', 'temario.json');

if (!fs.existsSync(CONTENIDO)) {
  console.warn(`  /contenido no está disponible. Se conserva ${path.basename(DESTINO)} tal como está.`);
  process.exit(0);
}

const lecciones = fs
  .readdirSync(CONTENIDO)
  .filter((f) => /^leccion-\d+\.md$/.test(f))
  .sort((a, b) => Number(a.match(/\d+/)[0]) - Number(b.match(/\d+/)[0]))
  .map((f) => {
    const crudo = fs.readFileSync(path.join(CONTENIDO, f), 'utf8');
    const m = crudo.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!m) throw new Error(`${f} no tiene frontmatter`);

    const meta = {};
    for (const linea of m[1].split(/\r?\n/)) {
      const i = linea.indexOf(':');
      if (i > 0) meta[linea.slice(0, i).trim()] = linea.slice(i + 1).trim();
    }

    // El resumen de cada lección sale de su primera línea útil.
    const resumen = crudo
      .slice(m[0].length)
      .split('## Lo que vas a poder hacer al terminar')[1]
      ?.trim()
      .split(/\r?\n\r?\n/)[0]
      ?.replace(/\s+/g, ' ')
      .trim() ?? '';

    return {
      numero: Number(meta.numero),
      titulo: meta.titulo,
      duracion: Number(meta.duracion_min),
      entregable: /^s/i.test(meta.entregable ?? ''),
      resumen,
    };
  });

if (lecciones.length !== 17) throw new Error(`Se esperaban 17 lecciones y hay ${lecciones.length}`);

fs.mkdirSync(path.dirname(DESTINO), { recursive: true });
fs.writeFileSync(DESTINO, `${JSON.stringify(lecciones, null, 2)}\n`);

const minutos = lecciones.reduce((a, l) => a + l.duracion, 0);
console.log(`  temario.json actualizado: ${lecciones.length} lecciones, ${minutos} minutos en total`);
