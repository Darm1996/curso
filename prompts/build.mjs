#!/usr/bin/env node
/**
 * Genera prompts/biblioteca.md.
 *
 * Los prompts se extraen de /contenido, así que no se copian a mano y no se
 * desincronizan del curso. El contexto de cada uno (a qué grupo pertenece,
 * cuándo se usa, qué hay que tener a mano) vive en guia.json.
 *
 *   node build.mjs
 *
 * Falla si no salen 17 prompts maestros y 51 de seguimiento, si alguna lección
 * queda sin grupo o si una etiqueta no cuadra con los prompts extraídos.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const CONTENIDO = path.resolve(AQUI, '..', 'contenido');
const SALIDA = path.join(AQUI, 'biblioteca.md');

const guia = JSON.parse(fs.readFileSync(path.join(AQUI, 'guia.json'), 'utf8'));

const dosDigitos = (n) => String(n).padStart(2, '0');
const fallas = [];

// ------------------------------------------------------------ extracción

const lecciones = new Map();

for (const archivo of fs.readdirSync(CONTENIDO).filter((f) => /^leccion-\d+\.md$/.test(f))) {
  const crudo = fs.readFileSync(path.join(CONTENIDO, archivo), 'utf8');
  const m = crudo.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!m) { fallas.push(`${archivo} no tiene frontmatter`); continue; }

  const meta = {};
  for (const linea of m[1].split(/\r?\n/)) {
    const i = linea.indexOf(':');
    if (i > 0) meta[linea.slice(0, i).trim()] = linea.slice(i + 1).trim();
  }

  const bloques = [...crudo.matchAll(/```[a-z]*\r?\n([\s\S]*?)```/g)].map((b) => b[1].replace(/\s+$/, ''));

  if (bloques.length < 4) {
    fallas.push(`${archivo}: se esperaban 4 bloques de prompt y hay ${bloques.length}`);
    continue;
  }

  lecciones.set(Number(meta.numero), {
    numero: Number(meta.numero),
    titulo: meta.titulo,
    maestro: bloques[0],
    seguimiento: bloques.slice(1, 4),
  });
}

if (lecciones.size !== 17) fallas.push(`Se esperaban 17 lecciones y se leyeron ${lecciones.size}`);

// ------------------------------------------------------------ comprobaciones

for (const grupo of guia.grupos) {
  for (const n of grupo.lecciones) {
    if (!lecciones.has(n)) fallas.push(`El grupo "${grupo.titulo}" apunta a la lección ${n}, que no existe`);
    if (!guia.lecciones[String(n)]) fallas.push(`La lección ${n} no tiene contexto en guia.json`);
  }
}

const asignadas = guia.grupos.flatMap((g) => g.lecciones);
for (const n of lecciones.keys()) {
  if (!asignadas.includes(n)) fallas.push(`La lección ${n} no está asignada a ningún grupo`);
}
if (new Set(asignadas).size !== asignadas.length) fallas.push('Hay lecciones asignadas a más de un grupo');

for (const [n, leccion] of lecciones) {
  const etiquetas = guia.lecciones[String(n)]?.seguimiento ?? [];
  if (etiquetas.length !== leccion.seguimiento.length) {
    fallas.push(`Lección ${n}: ${leccion.seguimiento.length} prompts de seguimiento y ${etiquetas.length} etiquetas`);
  }
}

if (fallas.length) {
  console.error('No se generó la biblioteca:');
  fallas.forEach((f) => console.error(`  ${f}`));
  process.exit(1);
}

// ------------------------------------------------------------ documento

const partes = [];
const P = (...t) => partes.push(...t);

P(
  '# Biblioteca de prompts para contadores venezolanos',
  '',
  '**17 prompts maestros y 51 de seguimiento**, organizados por tarea. Salen del',
  'Certificado Contave, el curso de Claude para contadores de @contave, y funcionan',
  'solos: cada uno dice cuándo usarlo y qué necesitas tener a mano antes de correrlo.',
  '',
  '---',
  '',
  '## Cómo se usan',
  '',
  'Copia el prompt completo y pégalo en Claude. Reemplaza lo que está entre',
  '[CORCHETES] por tus datos. No borres las secciones de reglas del final: son las',
  'que hacen que el modelo te avise cuando le falta algo en vez de inventarlo.',
  '',
  'Todos los prompts traen instrucciones de verificación. Si al modelo le falta un',
  'dato, tiene que decírtelo, no suponerlo.',
  '',
  '## Cuatro reglas antes de empezar',
  '',
  '**1. La norma la traes tú.** Un modelo de lenguaje no es fuente normativa. No',
  'tiene garantizado el texto vigente de una providencia del SENIAT, ni el valor',
  'actual de la Unidad Tributaria, ni la ordenanza de tu municipio. La buscas en la',
  'fuente oficial y la pegas dentro del prompt. Donde veas [VERIFICAR], es un punto',
  'donde tienes que ir a la fuente.',
  '',
  '**2. Declara el contexto antes de pedir el resultado.** En qué moneda están las',
  'cifras, si están reexpresadas por inflación, cuál es la condición del',
  'contribuyente y en qué municipio opera la empresa. Esa línea decide si el',
  'resultado sirve.',
  '',
  '**3. Verifica antes de firmar.** Tú firmas. La responsabilidad profesional no se',
  'transfiere a ninguna herramienta.',
  '',
  '**4. Prueba contra un caso que ya cerraste.** Antes de usar un prompt en trabajo',
  'nuevo, córrelo sobre uno que ya terminaste. Si reproduce lo que hiciste, sirve.',
  '',
  '---',
  '',
  '## Índice',
  '',
);

for (const grupo of guia.grupos) {
  P(`**${grupo.titulo}**`, '');
  for (const n of grupo.lecciones) {
    P(`- ${dosDigitos(n)} · ${lecciones.get(n).titulo}`);
  }
  P('');
}

P('---', '');

for (const grupo of guia.grupos) {
  P(`# ${grupo.titulo}`, '', grupo.intro, '');

  for (const n of grupo.lecciones) {
    const leccion = lecciones.get(n);
    const contexto = guia.lecciones[String(n)];

    P(
      `## ${dosDigitos(n)} · ${leccion.titulo}`,
      '',
      `**Cuándo.** ${contexto.cuando}`,
      '',
      `**Ten a mano.** ${contexto.aMano}`,
      '',
      '### Prompt maestro',
      '',
      '```',
      leccion.maestro,
      '```',
      '',
      '### Prompts de seguimiento',
      '',
    );

    leccion.seguimiento.forEach((prompt, i) => {
      P(`**${contexto.seguimiento[i]}**`, '', '```', prompt, '```', '');
    });
  }

  P('---', '');
}

P(
  '# Aviso',
  '',
  'Este material es formativo. No constituye asesoría contable, fiscal, laboral ni',
  'legal, y no sustituye el juicio profesional del contador público.',
  '',
  'Toda referencia normativa debe verificarse en la fuente oficial vigente: Gaceta',
  'Oficial, portal del SENIAT, la ordenanza de cada municipio, los portales de los',
  'entes parafiscales y los pronunciamientos de la Federación de Colegios de',
  'Contadores Públicos de Venezuela. Los porcentajes de retención, el valor de la',
  'Unidad Tributaria, las fechas de vencimiento y los días mínimos legales cambian.',
  '',
  'Las herramientas de inteligencia artificial pueden producir información',
  'incorrecta con apariencia de certeza. La responsabilidad profesional de todo',
  'informe, cálculo o declaración corresponde a quien lo suscribe.',
  '',
  '---',
  '',
  'Estos prompts son el anexo del **Certificado Contave, Claude para Contadores**:',
  '17 lecciones de 15 minutos que enseñan a usarlos con el caso, el paso a paso y la',
  'verificación profesional de cada uno.',
  '',
  '**Contave** · Contabilidad y finanzas con IA, enfocado en Venezuela · **@contave**',
  '',
);

fs.writeFileSync(SALIDA, `${partes.join('\n')}`);

// ------------------------------------------------------------ resumen

const maestros = lecciones.size;
const seguimiento = [...lecciones.values()].reduce((a, l) => a + l.seguimiento.length, 0);
const texto = fs.readFileSync(SALIDA, 'utf8');
const bloques = (texto.match(/^```$/gm) ?? []).length / 2;

// La prosa propia del documento sigue las mismas reglas de escritura del curso.
// Los prompts se excluyen: ahí el texto es instrucción, no prosa.
const prosa = texto.replace(/```[\s\S]*?```/g, ' ');
const PROHIBIDAS = [/vale la pena destacar/i, /en el mundo actual/i, /sum[ée]rgete/i,
  /desbloquea/i, /revoluciona/i, /cabe destacar/i, /es importante (destacar|mencionar)/i,
  /no es .{1,40}?,? sino/i];
const estilo = [];
if (prosa.includes('—')) estilo.push('la prosa usa raya larga');
for (const p of PROHIBIDAS) if (p.test(prosa)) estilo.push(`frase prohibida: ${p}`);

console.log('biblioteca.md generada');
console.log(`  Grupos: ${guia.grupos.length}`);
console.log(`  Prompts maestros: ${maestros}`);
console.log(`  Prompts de seguimiento: ${seguimiento}`);
console.log(`  Bloques de código en el documento: ${bloques}`);
console.log(`  Palabras: ${texto.split(/\s+/).filter(Boolean).length}`);

if (maestros !== 17) throw new Error(`Se esperaban 17 prompts maestros y hay ${maestros}`);
if (seguimiento !== 51) throw new Error(`Se esperaban 51 prompts de seguimiento y hay ${seguimiento}`);
if (bloques !== 68) throw new Error(`Se esperaban 68 bloques y hay ${bloques}`);
if (estilo.length) {
  estilo.forEach((e) => console.error(`  ${e}`));
  throw new Error('La prosa del documento no cumple las reglas de escritura');
}
console.log('\n  Listo.');
