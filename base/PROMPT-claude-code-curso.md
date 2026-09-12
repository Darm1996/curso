# Prompt completo para desarrollar el curso en Claude Code

Este archivo tiene todo lo que necesitas para que Claude Code construya el curso completo: contenido, PDF, carruseles, landing y secuencia de correos.

---

## Antes de empezar (5 minutos)

```bash
mkdir curso-claude-contadores && cd curso-claude-contadores
mkdir -p base
# copia aquí el archivo del curso que ya tienes:
# cp ~/Downloads/certificado-claude-para-contadores.md base/
claude
```

Ese archivo base importa: es el esqueleto del que Claude Code va a expandir. Sin él, se inventa el temario.

---

# PASO 1 — Crear el CLAUDE.md del proyecto

Pega esto primero, tal cual:

```
Crea un archivo CLAUDE.md en la raíz con el contexto permanente de este proyecto. Contenido:

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
```

Cuando termine, verifica que el archivo se creó y sigue al paso 2.

---

# PASO 2 — Prompt maestro (el grande)

Este es el prompt principal. Pégalo completo.

```
Lee CLAUDE.md y base/certificado-claude-para-contadores.md antes de escribir nada.

Tu trabajo es desarrollar el curso completo "Certificado Contave — Claude para Contadores" a partir de ese esqueleto. El archivo base tiene 17 lecciones resumidas. Tú las conviertes en un curso terminado y vendible.

## TEMARIO (fijo, no lo cambies)
1. Análisis de Estados Financieros (16 min)
2. Automatización del Cierre de Mes (15 min)
3. Investigación Fiscal y Memorandos (14 min)
4. Preparación de Auditorías (17 min)
5. Detección de Anomalías (15 min)
6. Creación de Informes Automatizados en Excel (15 min)
7. Previsión del Flujo de Caja (16 min)
8. Automatización de Flujos de Cuentas por Pagar (14 min)
9. Análisis de Desviaciones (15 min)
10. Redacción de Informes para Clientes (12 min)
11. Cumplimiento Normativo (14 min)
12. Automatización de Conciliaciones (13 min)
13. Procesamiento de Nóminas (15 min)
14. Claude en Excel y Outlook vía conector (14 min)
15. Detección de Patrones de Fraude (13 min)
16. Comunicación con Clientes (11 min)
17. Modelado Financiero (17 min)

## FASE 1 — Contenido (hazla primero y detente al terminar)

Genera /contenido/leccion-01.md hasta /contenido/leccion-17.md. Cada archivo debe tener esta estructura exacta:

    ---
    numero: N
    titulo: ...
    duracion_min: N
    entregable: sí/no
    ---

    ## Lo que vas a poder hacer al terminar
    Un párrafo, en segunda persona, concreto.

    ## Por qué esto importa en Venezuela
    2 o 3 párrafos conectando la técnica con la realidad local: normativa, multimoneda, inflación, práctica de PYME. Aquí es donde el curso se diferencia de cualquier curso gringo traducido.

    ## El caso
    Un caso realista de una empresa venezolana con nombre ficticio, cifras concretas y un problema específico. Se usa de hilo conductor en toda la lección.

    ## Paso a paso
    4 a 6 pasos numerados. Cada paso explica qué haces, por qué, y qué esperar de salida.

    ## Prompt maestro
    Bloque de código, listo para copiar, con variables entre [CORCHETES]. Mínimo 120 palabras. Debe incluir instrucciones de verificación ("si falta un dato, dímelo en vez de suponerlo").

    ## Prompts de seguimiento
    3 prompts cortos para profundizar después del principal.

    ## Ejercicio de 15 minutos
    Instrucción cronometrada, con criterio de "terminaste bien si...".

    ## Verificación profesional
    Qué debe revisar el contador a mano antes de firmar o entregar. Esta sección es obligatoria en las 17 lecciones.

    ## Error común
    Uno solo, el más frecuente, explicado con su consecuencia real.

    ## Resumen en 3 líneas

Extensión objetivo: 900 a 1.300 palabras por lección.

Requisitos técnicos por lección específica:
- L1: incluir advertencia sobre ratios calculados sobre cifras no reexpresadas por inflación.
- L3: el flujo correcto es pegar la norma, no pedirle la norma al modelo. Dilo explícito.
- L4: distinguir auditoría externa (NIA adoptadas por la FCCPV, VEN-NIF) de interna (COSO, IIA).
- L8: retenciones de IVA (agente de retención) e ISLR (Decreto 1808) con el concepto de sustraendo explicado. Los porcentajes van como [VERIFICAR].
- L11: matriz de obligaciones nacionales, municipales y parafiscales. Fechas como [VERIFICAR].
- L13: sistema dual del Art. 142 LOTTT, garantía trimestral contra retroactivo, se paga el mayor. Salario integral con alícuotas. Distinción salarial vs. no salarial.
- L15: Ley de Benford explicada en lenguaje simple, y la advertencia de que una alerta no es una acusación.
- L17: modelar en USD o en unidades físicas, nunca en bolívares nominales a varios años.

Al terminar la fase 1, muéstrame la lista de archivos creados con su conteo de palabras y ESPERA mi aprobación antes de seguir.

## FASE 2 — PDF del curso

Genera /pdf/build.js que tome las 17 lecciones y produzca curso-contave.pdf con:
- Portada con la identidad de marca (navy, cuadrícula, verde, dorado, Space Grotesk)
- Página de créditos y aviso legal (el contenido es formativo, no sustituye asesoría profesional; el lector es responsable de verificar la normativa vigente)
- Índice con números de página
- Módulo 0 con las 4 reglas de oro
- Las 17 lecciones, cada una arrancando en página impar
- Evaluación final de 8 entregables
- Anexo con la biblioteca de prompts
- Certificado en la última página, con espacio para nombre y fecha
- Pies de página con numeración y la marca

Usa HTML + CSS + Playwright. Los prompts van en bloques con fondo diferenciado y deben poder copiarse del PDF sin que se rompan los saltos de línea. Verifica que el PDF se generó y dime el número de páginas.

## FASE 3 — Carruseles para Instagram

Genera /carruseles/build.js que produzca, por cada lección, un carrusel de 7 láminas en PNG a 1080x1350:
1. Portada: badge de serie "CERTIFICADO CLAUDE" arriba a la izquierda, número de lección, título, duración
2. El problema (por qué el contador pierde tiempo hoy)
3. El concepto clave
4. El prompt, legible, en fuente grande
5. El ejemplo venezolano con cifras
6. El error común
7. Cierre con llamada a la acción a @contave

Reglas: máximo 45 palabras por lámina. Texto grande, legible en teléfono. Navy de fondo, verde para acentos, dorado para números y destacados. Nada de texto pegado al borde: margen de seguridad de 80px.

Salida en /carruseles/salida/leccion-NN/lamina-N.png

## FASE 4 — Landing de venta

Genera /landing como proyecto Next.js con Tailwind, desplegable en Vercel:
- Hero: nombre del curso, promesa, "17 lecciones, 15 minutos al día"
- Bloque de dolor: qué se tarda hoy un contador en cada una de esas tareas
- Temario completo de las 17 lecciones, con duración
- Bloque "para quién es / para quién no es"
- Sobre el autor
- Preguntas frecuentes (incluye: ¿necesito pagar Claude?, ¿esto reemplaza al contador?, ¿sirve si no sé nada de IA?)
- Formulario de captura de correo que escriba en Supabase, tabla `leads` con columnas id, email, nombre, origen, created_at
- Aviso de que la normativa citada debe verificarse en fuente oficial

Identidad de marca idéntica al resto. Deja las variables de entorno en .env.example, sin llaves reales en el repo.

## FASE 5 — Secuencia de correos

Genera /emails/dia-01.md hasta /emails/dia-17.md. Cada correo: asunto (máximo 50 caracteres), cuerpo de 150 a 200 palabras que entregue la lección del día y cierre con el ejercicio. Nada de relleno motivacional. Además /emails/dia-00-bienvenida.md y /emails/dia-18-certificado.md.

## FASE 6 — Biblioteca de prompts

Genera /prompts/biblioteca.md con los 17 prompts maestros y los 51 de seguimiento, organizados por tarea, con índice al inicio. Este archivo se regala como gancho de captura, así que debe funcionar solo, sin el curso.

## CÓMO TRABAJAR
- Ejecuta una fase a la vez y detente al final de cada una para que yo revise.
- Antes de escribir cada lección, dime en una línea el ángulo que vas a tomar.
- Si un dato normativo venezolano no lo tienes con certeza, no lo inventes: escribe [VERIFICAR: qué hay que confirmar].
- Después de escribir las 17 lecciones, haz una pasada de revisión buscando repeticiones entre lecciones, frases que suenen a IA y ejemplos que no sean venezolanos. Reescribe lo que encuentres.
- Haz commit al terminar cada fase.

Empieza por la FASE 1. Confirma que leíste CLAUDE.md y el archivo base, y arranca.
```

---

# PASO 3 — Prompts de control (úsalos durante el proceso)

**Si el contenido sale genérico:**
```
La lección [N] está escrita como un manual internacional traducido. Reescríbela: el caso tiene que ser una empresa venezolana concreta con cifras, el problema tiene que ser uno que un contador de acá reconozca en la primera línea, y la solución tiene que usar el vocabulario de nuestro marco normativo. Menos teoría, más "esto es lo que haces el lunes".
```

**Si suena a IA:**
```
Pasa las 17 lecciones por una revisión de estilo. Elimina: rayas largas usadas como aparte, la construcción "no es X sino Y", tripletes de adjetivos, frases de relleno, y cualquier cierre grandilocuente. Corta las oraciones de más de 25 palabras. No cambies el contenido técnico, solo la prosa.
```

**Para revisar calidad técnica:**
```
Actúa como un contador público venezolano con 15 años de experiencia revisando este curso antes de comprarlo. Lee las 17 lecciones y dime: qué está mal técnicamente, qué afirmación normativa es riesgosa, qué lección no aporta nada nuevo, y qué le falta al curso para justificar su precio. Sé duro.
```

**Para cerrar:**
```
Haz una auditoría final del proyecto: verifica que existan los 17 archivos de contenido, que el PDF se genere sin errores, que los 119 PNG de carruseles estén creados con las dimensiones correctas, que la landing compile, y que los 19 correos existan. Dame un reporte de lo que falta y una lista de [VERIFICAR] pendientes que yo tengo que confirmar en fuente oficial.
```

---

## Nota sobre el alcance

Las fases 1 y 6 son el curso en sí. Si quieres validar antes de invertir tiempo en lo demás, corre solo la fase 1, lee tres lecciones al azar, y decide. El PDF, los carruseles y la landing son empaque: se construyen rápido una vez el contenido está bien.

La fase 4 toca Supabase y Vercel, que ya usas. Ten a mano la URL del proyecto y la clave anónima cuando llegues ahí.
