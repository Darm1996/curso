#!/usr/bin/env node
'use strict';

/**
 * Certificado Contave — Claude para Contadores
 * Generador de los carruseles de Instagram.
 *
 * Por cada lección produce 7 láminas PNG de 1080x1350 en
 * salida/leccion-NN/lamina-N.png
 *
 *   npm install && npm run build
 *   node build.js --leccion 3      genera solo una lección
 */

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const RAIZ = path.resolve(__dirname, '..');
const CONTENIDO = path.join(RAIZ, 'contenido');
const FUENTES = path.join(RAIZ, 'pdf', 'fonts');
const SALIDA = path.join(__dirname, 'salida');
const ESTILOS = require('./estilos.js');
const TEXTOS = require('./textos.json');

const ANCHO = 1080;
const ALTO = 1350;
const LAMINAS_POR_CARRUSEL = 7;
const MAX_PALABRAS = 45;

// ------------------------------------------------------------------ utilidades

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

function escapar(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function dosDigitos(n) { return String(n).padStart(2, '0'); }

/** Cuenta las palabras visibles de una lámina, incluyendo badge, tag y pie. */
function contarPalabras(html) {
  const texto = html
    .replace(/<head[\s\S]*?<\/head>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return texto ? texto.split(' ').length : 0;
}

function leerMetaLecciones() {
  return fs.readdirSync(CONTENIDO)
    .filter((f) => /^leccion-\d+\.md$/.test(f))
    .sort()
    .map((f) => {
      const crudo = fs.readFileSync(path.join(CONTENIDO, f), 'utf8');
      const m = crudo.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      const meta = {};
      if (m) {
        for (const linea of m[1].split(/\r?\n/)) {
          const i = linea.indexOf(':');
          if (i > 0) meta[linea.slice(0, i).trim()] = linea.slice(i + 1).trim();
        }
      }
      return meta;
    });
}

// -------------------------------------------------------------------- láminas

function marco(centro, { numero, indice, pie }) {
  return `<!doctype html><html lang="es-VE"><head><meta charset="utf-8">
<style>${CSS_FUENTES}\n${ESTILOS}</style></head><body>
<div class="lamina">
  <div class="tope">
    <div class="badge">Certificado Claude</div>
    <div class="leccion-tag">Lección ${dosDigitos(numero)}</div>
  </div>
  <div class="centro">${centro}</div>
  <div class="fondo">
    <div class="arroba">${escapar(pie || '@contave')}</div>
    <div class="contador">${indice}/${LAMINAS_POR_CARRUSEL}</div>
  </div>
</div>
</body></html>`;
}

function laminas(meta, t) {
  const numero = Number(meta.numero);
  const base = { numero };

  const filas = t.cifras
    .map(([k, v]) => `<div class="fila"><span class="k">${escapar(k)}</span><span class="v">${escapar(v)}</span></div>`)
    .join('\n');

  return [
    // 1 · Portada
    marco(`
      <div class="numero">${dosDigitos(numero)}</div>
      <div class="titulo">${escapar(meta.titulo)}</div>
      <div><span class="pill">${escapar(meta.duracion_min)} minutos</span></div>`,
    { ...base, indice: 1 }),

    // 2 · El problema
    marco(`
      <div class="kicker oro">El problema</div>
      <div class="texto">${escapar(t.problema)}</div>`,
    { ...base, indice: 2 }),

    // 3 · El concepto clave
    marco(`
      <div class="kicker">El concepto</div>
      <div class="texto">${escapar(t.concepto)}</div>`,
    { ...base, indice: 3 }),

    // 4 · El prompt
    marco(`
      <div class="kicker">El prompt</div>
      <div class="prompt">${escapar(t.prompt)}</div>`,
    { ...base, indice: 4 }),

    // 5 · El caso venezolano
    marco(`
      <div class="kicker oro">El caso</div>
      <div class="empresa">${escapar(t.caso)}</div>
      ${filas}
      <div class="remate">${escapar(t.remate)}</div>`,
    { ...base, indice: 5 }),

    // 6 · El error común
    marco(`
      <div class="kicker oro">El error común</div>
      <div class="texto chico">${escapar(t.error)}</div>`,
    { ...base, indice: 6 }),

    // 7 · Cierre
    marco(`
      <div class="cierre-frase">${escapar(t.cierre)}</div>
      <div class="cierre-regla"></div>
      <div class="cierre-dato">Lección ${dosDigitos(numero)} de 17 del Certificado Contave.<br>17 lecciones, 15 minutos al día.</div>
      <div class="cierre-arroba">Sigue @contave</div>`,
    { ...base, indice: 7, pie: 'Contave · Venezuela' }),
  ];
}

// --------------------------------------------------------------------- build

async function main() {
  console.log('Certificado Contave — generando los carruseles\n');

  const soloArg = process.argv.indexOf('--leccion');
  const solo = soloArg > -1 ? Number(process.argv[soloArg + 1]) : null;

  const metas = leerMetaLecciones();
  if (metas.length !== 17) throw new Error(`Se esperaban 17 lecciones y hay ${metas.length}`);

  const navegador = await chromium.launch(
    process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
  );
  const pagina = await navegador.newPage({
    viewport: { width: ANCHO, height: ALTO },
    deviceScaleFactor: 1,
  });

  let generadas = 0;
  let maxPalabras = 0;
  const excedidas = [];
  const desbordes = [];

  for (const meta of metas) {
    const numero = Number(meta.numero);
    if (solo && numero !== solo) continue;

    const t = TEXTOS[String(numero)];
    if (!t) throw new Error(`Falta el texto de la lección ${numero} en textos.json`);

    const dir = path.join(SALIDA, `leccion-${dosDigitos(numero)}`);
    fs.mkdirSync(dir, { recursive: true });

    const hojas = laminas(meta, t);
    for (let i = 0; i < hojas.length; i += 1) {
      const html = hojas[i];

      const palabras = contarPalabras(html);
      maxPalabras = Math.max(maxPalabras, palabras);
      if (palabras > MAX_PALABRAS) excedidas.push(`lección ${numero}, lámina ${i + 1}: ${palabras} palabras`);

      await pagina.setContent(html, { waitUntil: 'load' });
      await pagina.evaluate(() => document.fonts.ready);

      // El contenido no puede salirse de la lámina ni quedar cortado dentro
      // del área central, que es la que respeta el margen de seguridad.
      const desborde = await pagina.evaluate(() => {
        const l = document.querySelector('.lamina');
        const c = document.querySelector('.centro');
        return { lamina: l.scrollHeight, centro: c.scrollHeight, centroVisible: c.clientHeight };
      });
      if (desborde.lamina > 1350) {
        desbordes.push(`lección ${numero}, lámina ${i + 1}: la lámina mide ${desborde.lamina}px`);
      } else if (desborde.centro > desborde.centroVisible) {
        desbordes.push(`lección ${numero}, lámina ${i + 1}: el texto no cabe en el área central`);
      }

      await pagina.screenshot({
        path: path.join(dir, `lamina-${i + 1}.png`),
        clip: { x: 0, y: 0, width: ANCHO, height: ALTO },
      });
      generadas += 1;
    }
    process.stdout.write(`  Lección ${dosDigitos(numero)}  ${meta.titulo}\n`);
  }

  await navegador.close();

  // Verificación
  const archivos = [];
  for (const d of fs.readdirSync(SALIDA).sort()) {
    for (const f of fs.readdirSync(path.join(SALIDA, d))) archivos.push(path.join(d, f));
  }

  console.log(`\n  PNG generados: ${generadas}`);
  console.log(`  Archivos en salida/: ${archivos.length}`);
  console.log(`  Máximo de palabras en una lámina: ${maxPalabras} (tope ${MAX_PALABRAS})`);

  if (excedidas.length) {
    console.error('\n  Láminas que pasan el tope de palabras:');
    excedidas.forEach((e) => console.error(`    ${e}`));
  }
  if (desbordes.length) {
    console.error('\n  Láminas con contenido desbordado:');
    desbordes.forEach((e) => console.error(`    ${e}`));
  }
  if (excedidas.length || desbordes.length) throw new Error('Hay láminas fuera de norma');

  if (!solo && generadas !== 17 * LAMINAS_POR_CARRUSEL) {
    throw new Error(`Se esperaban ${17 * LAMINAS_POR_CARRUSEL} láminas y se generaron ${generadas}`);
  }
  console.log('\n  Listo.');
}

main().catch((e) => { console.error('\nERROR:', e.stack || e.message); process.exit(1); });
