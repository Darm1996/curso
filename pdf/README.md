# PDF del curso

Genera `curso-contave.pdf` a partir de los archivos de `/contenido`.

## Uso

```bash
cd pdf
npm install
npm run build
```

Para generar además vistas previas en PNG de las páginas clave (portada, índice,
Módulo 0, lección 1, anexo y certificado) en `pdf/preview/`:

```bash
node build.js --preview
```

## Qué produce

Documento A4 con portada de marca, créditos y aviso legal, índice con números de
página calculados, Módulo 0, las 17 lecciones (cada una arrancando en página
impar), evaluación final, anexo con la biblioteca de prompts y el certificado en
la última página. Pies de página con numeración y marca en todas las páginas de
contenido.

## Cómo funciona

Cada sección se renderiza por separado a PDF con Playwright. El script cuenta las
páginas de cada una, inserta páginas en blanco donde hace falta para que las
secciones arranquen en impar, calcula el índice de forma iterativa (su extensión
afecta la numeración del resto) y lo une todo con `pdf-lib`. Los pies de página
se estampan al final, sobre el documento ya unido, para que la numeración sea
continua.

El script falla si una sección que debe arrancar en página impar no lo hace, o si
el total de páginas no coincide con el plan calculado.

## Notas

- `CHROMIUM_PATH` permite apuntar a un Chromium ya instalado cuando la versión de
  Playwright no coincide con los navegadores descargados:
  `CHROMIUM_PATH=/ruta/al/chromium npm run build`
- Los bloques de prompt usan `white-space: pre-wrap`, así que se copian del PDF
  conservando los saltos de línea.
- La tipografía va incrustada en el PDF. No hace falta tenerla instalada.

## Tipografía

`fonts/` contiene Space Grotesk, publicada bajo SIL Open Font License 1.1
(https://openfontlicense.org). Diseñada por Florian Karsten.
