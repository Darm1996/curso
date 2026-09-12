#!/usr/bin/env node
/**
 * Verifica la secuencia de correos contra las reglas del proyecto.
 *
 *   node verificar.mjs
 *
 * Falla si algo se sale de norma. No advierte, falla.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const AQUI = path.dirname(fileURLToPath(import.meta.url));

const MAX_ASUNTO = 50;
const PALABRAS = { min: 150, max: 200 };
const MAX_PALABRAS_ORACION = 25;

const PROHIBIDAS = [
  /vale la pena destacar/i,
  /en el mundo actual/i,
  /sum[ée]rgete/i,
  /desbloquea/i,
  /revoluciona/i,
  /cabe destacar/i,
  /es importante (destacar|mencionar)/i,
  /no es .{1,40}?,? sino/i,
];

const fallas = [];
const aviso = (f, m) => fallas.push(`${f}: ${m}`);

const archivos = fs.readdirSync(AQUI).filter((f) => /^dia-\d+.*\.md$/.test(f)).sort();

if (archivos.length !== 19) fallas.push(`Se esperaban 19 correos y hay ${archivos.length}`);

const diasVistos = new Set();

for (const archivo of archivos) {
  const crudo = fs.readFileSync(path.join(AQUI, archivo), 'utf8');
  const m = crudo.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!m) { aviso(archivo, 'no tiene frontmatter'); continue; }

  const meta = {};
  for (const linea of m[1].split(/\r?\n/)) {
    const i = linea.indexOf(':');
    if (i > 0) meta[linea.slice(0, i).trim()] = linea.slice(i + 1).trim().replace(/^"|"$/g, '');
  }

  const cuerpo = crudo.slice(m[0].length).trim();

  // Día declarado y coherente con el nombre del archivo
  const diaArchivo = Number(archivo.match(/^dia-(\d+)/)[1]);
  if (Number(meta.dia) !== diaArchivo) aviso(archivo, `el frontmatter dice dia ${meta.dia}`);
  if (diasVistos.has(diaArchivo)) aviso(archivo, 'día repetido');
  diasVistos.add(diaArchivo);

  // Asunto
  if (!meta.asunto) aviso(archivo, 'sin asunto');
  else if (meta.asunto.length > MAX_ASUNTO) {
    aviso(archivo, `asunto de ${meta.asunto.length} caracteres, tope ${MAX_ASUNTO}`);
  }

  // Extensión del cuerpo
  const palabras = cuerpo.replace(/[*_[\]]/g, '').split(/\s+/).filter(Boolean).length;
  if (palabras < PALABRAS.min || palabras > PALABRAS.max) {
    aviso(archivo, `${palabras} palabras, fuera del rango ${PALABRAS.min} a ${PALABRAS.max}`);
  }

  // Reglas de escritura
  if (cuerpo.includes('—')) aviso(archivo, 'usa raya larga');
  for (const patron of PROHIBIDAS) {
    if (patron.test(cuerpo)) aviso(archivo, `frase prohibida: ${patron}`);
  }

  // El énfasis se quita antes de partir en oraciones: si no, "**Frase.** Otra"
  // no se separa y el conteo sale inflado.
  for (const parrafo of cuerpo.replace(/[*_]/g, '').split(/\r?\n/)) {
    for (const oracion of parrafo.split(/(?<=[.?])\s+/)) {
      const limpia = oracion.trim();
      const n = limpia.split(/\s+/).filter(Boolean).length;
      if (n > MAX_PALABRAS_ORACION) aviso(archivo, `oración de ${n} palabras: "${limpia.slice(0, 60)}..."`);
    }
  }

  // Cada correo de lección cierra con el ejercicio
  if (meta.leccion && meta.leccion !== 'null') {
    const ultimo = cuerpo.split(/\r?\n\r?\n/).slice(-1)[0];
    if (!/quince minutos/i.test(ultimo)) aviso(archivo, 'no cierra con el ejercicio');
  }
}

for (let d = 0; d <= 18; d += 1) {
  if (!diasVistos.has(d)) fallas.push(`Falta el correo del día ${d}`);
}

console.log(`Correos revisados: ${archivos.length}`);
console.log('\nAsuntos:');
for (const archivo of archivos) {
  const crudo = fs.readFileSync(path.join(AQUI, archivo), 'utf8');
  const asunto = crudo.match(/^asunto:\s*"?(.*?)"?\s*$/m)?.[1] ?? '';
  const cuerpo = crudo.split(/^---\r?\n[\s\S]*?\r?\n---\r?\n/)[1]?.trim() ?? '';
  const palabras = cuerpo.replace(/[*_[\]]/g, '').split(/\s+/).filter(Boolean).length;
  console.log(`  ${String(asunto.length).padStart(2)} car · ${String(palabras).padStart(3)} pal · ${asunto}`);
}

if (fallas.length) {
  console.error(`\n${fallas.length} problema(s):`);
  fallas.forEach((f) => console.error(`  ${f}`));
  process.exit(1);
}
console.log('\nTodo en norma.');
