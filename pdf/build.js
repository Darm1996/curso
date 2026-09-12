#!/usr/bin/env node
'use strict';

/**
 * Certificado Contave — Claude para Contadores
 * Generador del PDF del curso.
 *
 * Toma las lecciones de /contenido y arma curso-contave.pdf con portada,
 * créditos, índice con números de página, Módulo 0, las 17 lecciones (cada
 * una arrancando en página impar), evaluación final, anexo de prompts y
 * certificado en la última página.
 *
 *   npm install && npm run build
 */

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const { PDFDocument, rgb } = require('pdf-lib');
const fontkit = require('@pdf-lib/fontkit');
const { marked } = require('marked');

const RAIZ = path.resolve(__dirname, '..');
const CONTENIDO = path.join(RAIZ, 'contenido');
const FUENTES = path.join(__dirname, 'fonts');
const SALIDA = path.join(__dirname, 'curso-contave.pdf');

const A4 = { ancho: 595.28, alto: 841.89 };
const MARGEN_PT = 51.02;                      // 18mm, igual que el CSS
const MARGENES = { top: '18mm', right: '18mm', bottom: '24mm', left: '18mm' };
const SIN_MARGEN = { top: '0', right: '0', bottom: '0', left: '0' };

const COLOR = {
  navy: rgb(0x0b / 255, 0x11 / 255, 0x20 / 255),
  verde: rgb(0x00, 0xe6 / 255, 0x8a / 255),
  gris: rgb(0x94 / 255, 0xa3 / 255, 0xb8 / 255),
  linea: rgb(0xd8 / 255, 0xde / 255, 0xe9 / 255),
};

marked.setOptions({ gfm: true, breaks: false, mangle: false, headerIds: false });

/**
 * Convierte markdown a HTML y resalta las marcas [VERIFICAR], que señalan los
 * datos normativos que el lector debe confirmar en fuente oficial. No toca el
 * interior de los bloques de prompt: ahí el texto tiene que quedar tal cual
 * para poder copiarse.
 */
function md(texto) {
  return marked.parse(texto)
    .split(/(<pre[\s\S]*?<\/pre>)/g)
    .map((seg) => (seg.startsWith('<pre')
      ? seg
      : seg.replace(/\[VERIFICAR([^\]]*)\]/g, '<span class="verificar">[VERIFICAR$1]</span>')))
    .join('');
}

// ---------------------------------------------------------------- utilidades

function fuenteCss(archivo, peso) {
  const b64 = fs.readFileSync(path.join(FUENTES, archivo)).toString('base64');
  return `@font-face{font-family:"Space Grotesk";font-style:normal;font-weight:${peso};` +
    `src:url(data:font/ttf;base64,${b64}) format("truetype");}`;
}

const CSS_FUENTES = [
  fuenteCss('SpaceGrotesk-Regular.ttf', 400),
  fuenteCss('SpaceGrotesk-Medium.ttf', 500),
  fuenteCss('SpaceGrotesk-Bold.ttf', 700),
].join('\n');

const CSS_BASE = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf8');

function documento(cuerpo) {
  return `<!doctype html><html lang="es-VE"><head><meta charset="utf-8">
<style>${CSS_FUENTES}\n${CSS_BASE}</style></head><body>${cuerpo}</body></html>`;
}

function leerMd(archivo) {
  const crudo = fs.readFileSync(archivo, 'utf8');
  const m = crudo.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  const meta = {};
  let cuerpo = crudo;
  if (m) {
    cuerpo = crudo.slice(m[0].length);
    for (const linea of m[1].split(/\r?\n/)) {
      const i = linea.indexOf(':');
      if (i > 0) meta[linea.slice(0, i).trim()] = linea.slice(i + 1).trim();
    }
  }
  return { meta, cuerpo: cuerpo.trim() };
}

function dosDigitos(n) { return String(n).padStart(2, '0'); }

function escapar(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** Devuelve el contenido de cada bloque ``` ``` del markdown, en orden. */
function bloquesDeCodigo(md) {
  return [...md.matchAll(/```[a-z]*\r?\n([\s\S]*?)```/g)].map((m) => m[1].replace(/\s+$/, ''));
}

// ------------------------------------------------------------------ secciones

function htmlPortada() {
  return documento(`
<div class="portada">
  <div>
    <div class="badge">Certificado Claude</div>
  </div>
  <div>
    <h1>Claude para<br><span class="acento">Contadores</span></h1>
    <p class="bajada">El curso de inteligencia artificial aplicada a la práctica contable venezolana. Hecho con SENIAT, bolívares, divisas e inflación adentro.</p>
    <div class="datos">
      <div class="dato"><div class="k">Lecciones</div><div class="v">17</div></div>
      <div class="dato"><div class="k">Por día</div><div class="v">15 min</div></div>
      <div class="dato"><div class="k">Entregables</div><div class="v">8</div></div>
    </div>
  </div>
  <div class="pie">
    <strong>Daniele Rivalta</strong> · Contador Público<br>
    Contave · Contabilidad y finanzas con IA · @contave
  </div>
</div>`);
}

function htmlSimple(kicker, titulo, cuerpo) {
  return documento(`
<div class="seccion-cabecera">
  <div class="kicker">${escapar(kicker)}</div>
  <h1>${escapar(titulo)}</h1>
</div>
${md(cuerpo)}`);
}

function htmlModulo0(meta, cuerpo) {
  return documento(`
<div class="seccion-cabecera">
  <div class="kicker">Módulo 0</div>
  <h1>${escapar(meta.titulo)}</h1>
  <div class="meta"><span class="pill">${escapar(meta.duracion_min)} min</span> Léelo antes de la lección 1</div>
</div>
${md(cuerpo)}`);
}

function htmlLeccion(meta, cuerpo) {
  const entregable = (meta.entregable || '').toLowerCase().startsWith('s');
  return documento(`
<div class="seccion-cabecera">
  <div class="kicker">Lección ${dosDigitos(meta.numero)}</div>
  <h1>${escapar(meta.titulo)}</h1>
  <div class="meta">
    <span class="pill">${escapar(meta.duracion_min)} min</span>
    ${entregable ? '<span class="pill">Con entregable</span>' : '<span class="pill">Sin entregable</span>'}
  </div>
</div>
${md(cuerpo)}`);
}

function htmlIndice(entradas) {
  const filas = entradas.map((e) => {
    if (e.grupo) return `<div class="toc-grupo">${escapar(e.grupo)}</div>`;
    const dur = e.duracion ? `<span class="dur">${escapar(e.duracion)} min</span>` : '';
    return `<div class="toc-item">
      <span class="n">${e.num ? escapar(e.num) : ''}</span>
      <span class="t">${escapar(e.titulo)}${dur}</span>
      <span class="dots"></span>
      <span class="p">${e.pagina}</span>
    </div>`;
  }).join('\n');
  return documento(`
<div class="seccion-cabecera">
  <div class="kicker">Contenido</div>
  <h1>Índice</h1>
</div>
${filas}`);
}

function htmlAnexo(lecciones) {
  const indice = lecciones.map((l) =>
    `<div class="toc-item"><span class="n">${dosDigitos(l.meta.numero)}</span>` +
    `<span class="t">${escapar(l.meta.titulo)}</span></div>`).join('\n');

  const cuerpo = lecciones.map((l) => {
    const bloques = bloquesDeCodigo(l.cuerpo);
    const maestro = bloques[0] || '';
    const seguimiento = bloques.slice(1, 4);
    return `
<h2>${dosDigitos(l.meta.numero)} · ${escapar(l.meta.titulo)}</h2>
<h3>Prompt maestro</h3>
<pre><code>${escapar(maestro)}</code></pre>
<h3>Prompts de seguimiento</h3>
${seguimiento.map((s) => `<pre><code>${escapar(s)}</code></pre>`).join('\n')}`;
  }).join('\n');

  return documento(`
<div class="seccion-cabecera">
  <div class="kicker">Anexo</div>
  <h1>Biblioteca de prompts</h1>
</div>
<p>Los ${lecciones.length} prompts maestros y los ${lecciones.length * 3} prompts de seguimiento del curso, juntos. Las variables entre [CORCHETES] las reemplazas tú. Todos incluyen instrucciones de verificación: si le falta un dato al modelo, tiene que decírtelo en vez de suponerlo.</p>
<div class="aviso"><strong>Recuerda la regla 1.</strong> Ningún prompt de esta biblioteca sustituye la consulta de la norma en fuente oficial. Donde el prompt pide que pegues la normativa vigente, la traes tú.</div>
<h2 class="nada-arriba">Índice del anexo</h2>
${indice}
${cuerpo}`);
}

function htmlCertificado() {
  return documento(`
<div class="certificado">
  <div class="marco">
    <div>
      <div class="sub">Certificado Contave</div>
      <div class="titulo" style="margin-top:6mm">Claude para<br>Contadores</div>
    </div>
    <div class="bloque-nombre">
      <div class="regla"></div>
      <div class="otorga">Se deja constancia de que</div>
      <div class="linea-nombre"></div>
      <div class="etiqueta">Nombre y apellido</div>
      <div class="cuerpo">
        completó las 17 lecciones del programa y entregó los 8 trabajos de la evaluación final,
        aplicados sobre información real y verificados bajo su responsabilidad profesional.
      </div>
    </div>
    <div class="firmas">
      <div class="firma"><div class="l"></div><div class="etiqueta">Fecha</div></div>
      <div class="firma"><div class="l"></div><div class="etiqueta">Daniele Rivalta · Contave</div></div>
    </div>
  </div>
</div>`);
}

// -------------------------------------------------------------- construcción

const PREVIA = process.argv.includes('--preview');
const PREVIA_DE = new Set(['portada', 'indice', 'modulo0', 'leccion-1', 'anexo', 'certificado']);

async function renderizar(pagina, html, margin, id) {
  await pagina.setContent(html, { waitUntil: 'load' });
  await pagina.evaluate(() => document.fonts.ready);

  // El PDF se genera primero: la vista previa inyecta estilos en la página y
  // no debe alterar el documento que se está construyendo.
  const buf = await pagina.pdf({ format: 'A4', printBackground: true, margin, preferCSSPageSize: false });

  if (PREVIA && id && PREVIA_DE.has(id)) {
    const dir = path.join(__dirname, 'preview');
    fs.mkdirSync(dir, { recursive: true });
    await pagina.setViewportSize({ width: 794, height: 1123 });   // A4 a 96 dpi
    if (margin !== SIN_MARGEN) {
      await pagina.addStyleTag({ content: 'body{padding:18mm 18mm 24mm;}' });
    }
    await pagina.screenshot({ path: path.join(dir, `${id}.png`), clip: { x: 0, y: 0, width: 794, height: 1123 } });
  }
  return buf;
}

async function contarPaginas(buf) {
  const doc = await PDFDocument.load(buf);
  return doc.getPageCount();
}

/**
 * Calcula dónde cae cada sección. Devuelve el plan de páginas (para el
 * ensamblaje), las entradas del índice y el total.
 */
function calcularPlan(secciones, paginasIndice) {
  const plan = [];
  const entradas = [];
  let cursor = 1;

  for (const sec of secciones) {
    if (sec.paginaImpar && cursor % 2 === 0) {
      plan.push({ tipo: 'blanco' });
      cursor += 1;
    }
    const paginas = sec.id === 'indice' ? paginasIndice : sec.paginas;
    sec.inicio = cursor;
    plan.push({ tipo: 'seccion', sec, paginas });
    cursor += paginas;
  }

  for (const sec of secciones) {
    if (sec.enIndice) {
      if (sec.grupo) entradas.push({ grupo: sec.grupo });
      entradas.push({
        num: sec.numIndice || '',
        titulo: sec.tituloIndice,
        duracion: sec.duracion || '',
        pagina: sec.inicio,
      });
    }
  }

  return { plan, entradas, total: cursor - 1 };
}

async function main() {
  console.log('Certificado Contave — generando el PDF del curso\n');

  // 1. Contenido
  const archivos = fs.readdirSync(CONTENIDO)
    .filter((f) => /^leccion-\d+\.md$/.test(f))
    .sort();
  if (archivos.length !== 17) {
    throw new Error(`Se esperaban 17 lecciones en /contenido y se encontraron ${archivos.length}`);
  }
  const lecciones = archivos.map((f) => leerMd(path.join(CONTENIDO, f)));
  const modulo0 = leerMd(path.join(CONTENIDO, 'modulo-00-reglas-de-oro.md'));
  const creditos = leerMd(path.join(CONTENIDO, 'creditos-y-aviso-legal.md'));
  const evaluacion = leerMd(path.join(CONTENIDO, 'evaluacion-final.md'));
  console.log(`  Lecciones leídas: ${lecciones.length}`);

  // 2. Definición de secciones
  const secciones = [
    { id: 'portada', html: htmlPortada(), margin: SIN_MARGEN, numerar: false },
    { id: 'creditos', html: htmlSimple('Publicación', 'Créditos y aviso legal', creditos.cuerpo), margin: MARGENES, numerar: true, enIndice: true, tituloIndice: 'Créditos y aviso legal' },
    { id: 'indice', html: null, margin: MARGENES, numerar: true, paginaImpar: true },
    { id: 'modulo0', html: htmlModulo0(modulo0.meta, modulo0.cuerpo), margin: MARGENES, numerar: true, paginaImpar: true, enIndice: true, grupo: 'Antes de empezar', numIndice: '00', tituloIndice: modulo0.meta.titulo, duracion: modulo0.meta.duracion_min },
  ];

  lecciones.forEach((l, i) => {
    secciones.push({
      id: `leccion-${l.meta.numero}`,
      html: htmlLeccion(l.meta, l.cuerpo),
      margin: MARGENES,
      numerar: true,
      paginaImpar: true,
      enIndice: true,
      grupo: i === 0 ? 'Las 17 lecciones' : undefined,
      numIndice: dosDigitos(l.meta.numero),
      tituloIndice: l.meta.titulo,
      duracion: l.meta.duracion_min,
    });
  });

  secciones.push(
    { id: 'evaluacion', html: htmlSimple('Cierre', 'Evaluación final', evaluacion.cuerpo), margin: MARGENES, numerar: true, paginaImpar: true, enIndice: true, grupo: 'Cierre', tituloIndice: 'Evaluación final · 8 entregables' },
    { id: 'anexo', html: htmlAnexo(lecciones), margin: MARGENES, numerar: true, paginaImpar: true, enIndice: true, tituloIndice: 'Anexo · Biblioteca de prompts' },
    { id: 'certificado', html: htmlCertificado(), margin: SIN_MARGEN, numerar: false, paginaImpar: true, enIndice: true, tituloIndice: 'Certificado' },
  );

  // 3. Render de todo menos el índice
  // CHROMIUM_PATH permite apuntar a un Chromium ya instalado, útil cuando la
  // versión de Playwright no coincide con los navegadores descargados.
  const navegador = await chromium.launch(
    process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
  );
  const pagina = await navegador.newPage();
  console.log('  Renderizando secciones...');
  for (const sec of secciones) {
    if (sec.id === 'indice') continue;
    sec.buf = await renderizar(pagina, sec.html, sec.margin, sec.id);
    sec.paginas = await contarPaginas(sec.buf);
  }

  // 4. El índice cambia los números de página de todo lo que viene después,
  //    así que se itera hasta que su extensión se estabiliza.
  const seccionIndice = secciones.find((s) => s.id === 'indice');
  let paginasIndice = 1;
  let calculo;
  for (let intento = 1; intento <= 6; intento += 1) {
    calculo = calcularPlan(secciones, paginasIndice);
    seccionIndice.buf = await renderizar(pagina, htmlIndice(calculo.entradas), MARGENES, 'indice');
    const reales = await contarPaginas(seccionIndice.buf);
    if (reales === paginasIndice) break;
    paginasIndice = reales;
    if (intento === 6) throw new Error('El índice no estabilizó su número de páginas');
  }
  seccionIndice.paginas = paginasIndice;
  calculo = calcularPlan(secciones, paginasIndice);
  console.log(`  Índice: ${paginasIndice} página(s)`);

  await navegador.close();

  // 5. Ensamblaje
  const final = await PDFDocument.create();
  final.registerFontkit(fontkit);
  final.setTitle('Certificado Contave — Claude para Contadores');
  final.setAuthor('Daniele Rivalta');
  final.setSubject('Curso de inteligencia artificial aplicada a la práctica contable venezolana');
  final.setProducer('Contave');
  final.setCreator('Contave');

  const numerar = [];   // por página final: true si lleva pie de página
  for (const paso of calculo.plan) {
    if (paso.tipo === 'blanco') {
      final.addPage([A4.ancho, A4.alto]);
      numerar.push(false);
      continue;
    }
    const origen = await PDFDocument.load(paso.sec.buf);
    const copiadas = await final.copyPages(origen, origen.getPageIndices());
    for (const p of copiadas) {
      final.addPage(p);
      numerar.push(Boolean(paso.sec.numerar));
    }
  }

  // 6. Pies de página: numeración y marca
  // subset: true incrusta solo los glifos que se usan. Además de reducir el
  // peso, evita que fontkit recorra glifos defectuosos del archivo de origen.
  const opcFuente = { subset: true };
  const fuentePie = await final.embedFont(fs.readFileSync(path.join(FUENTES, 'SpaceGrotesk-Regular.ttf')), opcFuente);
  const fuentePieBold = await final.embedFont(fs.readFileSync(path.join(FUENTES, 'SpaceGrotesk-Bold.ttf')), opcFuente);
  const marca = 'Certificado Contave · Claude para Contadores';
  final.getPages().forEach((p, i) => {
    if (!numerar[i]) return;
    const n = String(i + 1);
    const derecha = A4.ancho - MARGEN_PT;
    p.drawLine({
      start: { x: MARGEN_PT, y: 54 }, end: { x: derecha, y: 54 },
      thickness: 0.5, color: COLOR.linea,
    });
    p.drawText(marca, { x: MARGEN_PT, y: 41, size: 7.5, font: fuentePie, color: COLOR.gris });
    const ancho = fuentePieBold.widthOfTextAtSize(n, 9);
    p.drawText(n, { x: derecha - ancho, y: 40, size: 9, font: fuentePieBold, color: COLOR.navy });
  });

  const bytes = await final.save();
  fs.writeFileSync(SALIDA, bytes);

  // 7. Verificación
  const verif = await PDFDocument.load(fs.readFileSync(SALIDA));
  const paginas = verif.getPageCount();
  const kb = Math.round(fs.statSync(SALIDA).size / 1024);

  console.log('\n  Mapa de páginas');
  for (const sec of secciones) {
    console.log(`    p.${String(sec.inicio).padStart(3)}  ${sec.id}${sec.paginaImpar && sec.inicio % 2 === 0 ? '  <-- NO ES IMPAR' : ''}`);
  }
  const fallasImpar = secciones.filter((s) => s.paginaImpar && s.inicio % 2 === 0);
  const blancos = calculo.plan.filter((p) => p.tipo === 'blanco').length;

  console.log('\n  PDF generado:', SALIDA);
  console.log(`  Páginas: ${paginas}`);
  console.log(`  Tamaño: ${kb} KB`);
  console.log(`  Páginas en blanco insertadas para arrancar en impar: ${blancos}`);
  console.log(`  Secciones que debían arrancar en impar y no lo hacen: ${fallasImpar.length}`);
  if (fallasImpar.length) throw new Error('Hay secciones que no arrancan en página impar');
  if (paginas !== calculo.total) throw new Error(`Descuadre: el plan decía ${calculo.total} páginas y el PDF tiene ${paginas}`);
  console.log('\n  Listo.');
}

main().catch((e) => { console.error('\nERROR:', e.stack || e.message); process.exit(1); });
