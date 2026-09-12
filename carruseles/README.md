# Carruseles de Instagram

Genera 7 láminas PNG de 1080x1350 por cada lección, en
`salida/leccion-NN/lamina-N.png`. En total, 119 archivos.

## Uso

```bash
cd carruseles
npm install
npm run build

node build.js --leccion 3     # solo una lección, para iterar rápido
```

## Estructura del carrusel

| Lámina | Contenido |
|---|---|
| 1 | Portada: badge de serie, número de lección, título y duración |
| 2 | El problema: por qué el contador pierde tiempo hoy |
| 3 | El concepto clave |
| 4 | El prompt, en grande y legible |
| 5 | El caso venezolano con cifras |
| 6 | El error común |
| 7 | Cierre con llamada a la acción a @contave |

## El texto vive aparte

`textos.json` tiene el copy de las láminas 2 a 7 de cada lección. El título y la
duración de la lámina 1 salen del frontmatter de `/contenido`, así que no se
duplican.

El copy de los carruseles se escribe aparte a propósito. Una lección de 1.200
palabras no se recorta a 45 palabras por lámina sin perder el sentido: hay que
reescribirla para el formato. Para cambiar un carrusel, edita `textos.json` y
vuelve a correr el build.

Cada lección tiene estos campos:

```json
{
  "problema": "texto de la lámina 2",
  "concepto": "texto de la lámina 3",
  "prompt":   "texto de la lámina 4, admite \n para saltos de línea",
  "caso":     "nombre de la empresa del ejemplo",
  "cifras":   [["etiqueta", "valor"], ["...", "..."]],
  "remate":   "cierre de la lámina 5",
  "error":    "texto de la lámina 6",
  "cierre":   "frase de la lámina 7"
}
```

## Verificaciones del build

El build falla, no advierte, si algo se sale de norma:

- Máximo 45 palabras por lámina, contando badge, etiqueta de lección y pie.
- Ningún contenido puede desbordar la lámina ni el área central, que es la que
  respeta el margen de seguridad de 80px.
- Tienen que salir 119 archivos.

## Diseño

Fondo navy `#0B1120` con cuadrícula, verde `#00E68A` para acentos y kickers,
dorado `#F6B101` para números y destacados. Tipografía Space Grotesk, tomada de
`../pdf/fonts`. Margen de seguridad de 80px en los cuatro lados.

Sin emojis. La identidad es tipográfica y los emojis le restan.
