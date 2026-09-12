# Proyecto: Certificado Contave — Claude para Contadores

## Qué es
Un curso de 17 lecciones (15 min/día) que enseña a contadores venezolanos a usar Claude en su trabajo diario. Se vende y se distribuye desde la marca Contave (@contave), página de contabilidad y finanzas con IA enfocada 100% en Venezuela.

## Autor
Daniele Rivalta — Contador Público, +10 años en fiscal y finanzas, Tax Manager. El curso habla con su voz: directa, técnica, sin humo.

## Audiencia
Contadores, asistentes contables y administradores de PYME en Venezuela. Nivel técnico contable alto, nivel de IA bajo o nulo. Trabajan con SENIAT, IVA, ISLR, IGTF, retenciones, VEN-NIF, LOTTT, ajuste por inflación, multimoneda Bs/USD y tasa BCV.

## Identidad de marca
- Fondo navy oscuro #0B1120 con cuadrícula sutil
- Acento verde #00E68A
- Acento dorado #F6B101
- Texto blanco #FFFFFF y gris claro #94A3B8
- Tipografía: Space Grotesk (títulos y cuerpo)
- Badge de serie arriba a la izquierda en piezas de redes
- Formato Instagram: carrusel 1080x1350 (4:5), exportado en PNG o JPG

## Reglas de contenido — NO NEGOCIABLES
1. Todo ejemplo es venezolano. Nada de "IRS", "401k", "GAAP americano" salvo comparación explícita.
2. No inventar fechas de vencimiento, valores de la Unidad Tributaria, porcentajes de retención ni números de providencia. Si hace falta un dato normativo vigente, se deja como [VERIFICAR: descripción] para que el autor lo confirme en la fuente oficial.
3. Cada lección debe ser accionable hoy. Si el lector no puede hacer algo en 15 minutos, la lección está mal escrita.
4. Los prompts van completos y listos para copiar, con variables entre [CORCHETES].

## Reglas de escritura — NO NEGOCIABLES
- Español de Venezuela, tuteo, tono profesional y directo.
- Prohibido: rayas largas (—) como aparte, la construcción "no es X, sino Y", frases de relleno tipo "vale la pena destacar", "en el mundo actual", "sumérgete", "desbloquea", "revoluciona".
- Prohibido el triplete decorativo (listas de tres adjetivos por ritmo).
- Frases cortas. Si una oración pasa de 25 palabras, se parte.
- Nada de emojis en el contenido del curso. Sí en carruseles, con moderación.
- Que no suene a IA. Se lee en voz alta: si no lo dirías en una reunión con un cliente, se reescribe.

## Estructura de carpetas
/base          archivo fuente del temario
/contenido     las 17 lecciones expandidas en markdown
/pdf           scripts y salida del PDF del curso
/carruseles    scripts y salida de las piezas 1080x1350
/landing       sitio web de venta y captura
/emails        secuencia de 17 correos
/prompts       biblioteca de prompts extraída

## Stack
- Contenido: Markdown
- PDF: HTML + CSS + Playwright (nada de LaTeX)
- Carruseles: HTML + CSS renderizado a PNG con Playwright
- Landing: Next.js + Tailwind, desplegable en Vercel, captura de correos en Supabase
