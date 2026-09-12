---
numero: 3
titulo: Investigación Fiscal y Memorandos
duracion_min: 14
entregable: sí
---

## Lo que vas a poder hacer al terminar

Vas a resolver una consulta fiscal de un cliente en un cuarto de hora, con un memorando escrito, estructurado y defendible. El cambio de método es lo importante: le vas a pegar la norma a Claude en vez de pedírsela. Con ese solo cambio pasas de un asistente que a veces inventa artículos a uno que razona sobre el texto que tú controlas.

## Por qué esto importa en Venezuela

Esta es la lección donde más gente se quema, así que va directo. **Un modelo de lenguaje no es una fuente normativa.** No lo es en ningún país, y menos acá. La normativa tributaria venezolana cambia por Gaceta Oficial, por providencias del SENIAT y por decretos. A veces ni se publican con el detalle que uno necesita. Ningún modelo tiene garantizado el texto vigente de una providencia de retenciones. Si le preguntas "¿cuál es el porcentaje de retención de ISLR para honorarios profesionales?", te puede dar un número que suena correcto. Ese número te puede costar un reparo.

El flujo correcto es al revés. Tú buscas la norma en la fuente oficial, la copias, y se la pegas al modelo dentro del prompt. Claude no aporta el dato. Aporta el razonamiento sobre el dato. Te estructura el análisis, te encuentra la contradicción entre dos artículos y te redacta el memorando. Y te obliga a ordenar el argumento. Eso es mucho, y es exactamente lo que hace falta.

La tercera razón es de oficio. El memorando fiscal bien escrito es lo que separa al contador que responde por WhatsApp del que cobra honorarios por una opinión. Un documento con los hechos, la base normativa citada textualmente, el análisis y la conclusión es otra cosa. Es un entregable que se factura y que te protege a ti.

## El caso

Inversiones Karú, C.A. Cadena de tres tiendas de repuestos en Valencia. El cliente llama con una duda concreta: un cliente le pagó una factura de Bs. 48.000 así, mitad por transferencia en bolívares desde un banco nacional y mitad en efectivo en divisas. Quiere saber cómo queda el IGTF, quién lo cobra y cómo se factura.

La duda es legítima y tiene aristas. El tratamiento depende del medio de pago y de la condición del pagador. [VERIFICAR: texto vigente de la Ley del IGTF y de la providencia del SENIAT que regula su facturación y declaración] La respuesta improvisada por chat es un riesgo. La respuesta con memorando es un servicio.

## Paso a paso

1. **Escribe los hechos primero, sin opinión.** Fecha, monto, medios de pago, condición del pagador y del receptor. Si los hechos están mal descritos, el mejor análisis del mundo no sirve.

2. **Ve a la fuente oficial y copia el texto.** Gaceta Oficial, portal del SENIAT, la providencia completa. Copia los artículos pertinentes tal cual, sin resumir.

3. **Pega la norma dentro del prompt.** Este es el paso que cambia todo. El modelo trabaja sobre ese texto y solo sobre ese texto.

4. **Pide el análisis con estructura de memorando.** Hechos, base normativa citada, análisis, conclusión, recomendación operativa.

5. **Pídele que marque lo que no se puede concluir.** Un buen memorando dice dónde termina la certeza. Si el caso requiere consulta formal al SENIAT, que lo diga.

6. **Revisa cada cita contra el texto original.** Una por una. Este paso no se delega.

## Prompt maestro

```
Actúa como asesor tributario venezolano redactando un memorando técnico para un cliente.

REGLA QUE MANDA SOBRE TODAS LAS DEMÁS
Analiza ÚNICAMENTE con base en el texto normativo que te pego más abajo. No uses conocimiento tuyo sobre la normativa venezolana. Si el texto que te doy no alcanza para resolver el punto, dilo de forma expresa y señala qué norma adicional haría falta consultar. No completes con lo que creas recordar.

HECHOS
[DESCRIBE LOS HECHOS: FECHAS, MONTOS, MEDIOS DE PAGO, CONDICIÓN DE LAS PARTES, DOCUMENTOS EMITIDOS]

PREGUNTA DEL CLIENTE
[LA PREGUNTA CONCRETA, EN UNA O DOS ORACIONES]

TEXTO NORMATIVO APLICABLE
[PEGA AQUÍ EL TEXTO COMPLETO DE LOS ARTÍCULOS, PROVIDENCIAS O DECRETOS PERTINENTES, TAL COMO APARECEN EN LA FUENTE OFICIAL. INDICA LA GACETA OFICIAL Y LA FECHA DE CADA UNO]

QUÉ NECESITO
Un memorando con esta estructura:
1. Antecedentes y hechos relevantes.
2. Base normativa. Cita textualmente el fragmento aplicable e identifica el artículo.
3. Análisis. Aplica la norma a los hechos, paso por paso. Si hay más de una lectura posible, expón ambas y di cuál es más sólida y por qué.
4. Conclusión. Respuesta directa a la pregunta del cliente.
5. Recomendación operativa. Qué tiene que hacer el cliente en la práctica: cómo factura, qué registra, qué declara.
6. Limitaciones. Qué queda fuera del alcance y qué ameritaría consulta formal ante la administración tributaria.

REGLAS DE ESCRITURA
- Español de Venezuela, registro formal pero legible. Frases cortas.
- No cites ningún artículo que no esté en el texto que te pegué.
- Si detectas contradicción entre dos normas que te di, señálala de forma expresa.
```

## Prompts de seguimiento

```
Resume el memorando anterior en un mensaje de máximo 120 palabras para enviarle al cliente por escrito, sin perder la precisión de la conclusión.
```

```
Basándote solo en el texto normativo que te di, arma la lista de la documentación de respaldo que el cliente debe conservar para sostener este tratamiento ante una fiscalización.
```

```
Enumera los argumentos que un fiscal podría usar para objetar la conclusión de este memorando, y qué respuesta tendríamos para cada uno.
```

## Ejercicio de 15 minutos

Toma una consulta real que te hayan hecho esta semana. Busca la norma en fuente oficial y cópiala. Corre el prompt maestro con la norma pegada.

Después, por curiosidad, hazle la misma pregunta sin pegarle la norma. Compara las dos respuestas. Terminaste bien si ves la diferencia con tus propios ojos. Esa comparación vale más que cualquier advertencia que yo te escriba acá.

## Verificación profesional

Cada cita del memorando se contrasta con el texto oficial, artículo por artículo. Verifica también que la conclusión responda la pregunta que hizo el cliente y no una parecida. Y antes de firmar, léelo como si fueras el fiscal: si el argumento se cae con una pregunta obvia, todavía no está listo. El memorando lo firmas tú, con tu número de colegiado. La responsabilidad profesional no se comparte con una herramienta.

## Error común

Pedirle la norma al modelo. Suena inofensivo porque la respuesta viene redactada con seguridad, con número de artículo y todo. Ese es justamente el problema: la confianza del texto no tiene relación con su exactitud. Un porcentaje de retención equivocado no se detecta leyendo la respuesta. Se detecta cuando llega el reparo, con multa e intereses encima.

## Resumen en 3 líneas

La norma la traes tú desde la fuente oficial y se la pegas al modelo dentro del prompt.
Claude aporta estructura y razonamiento sobre el texto, nunca el dato normativo.
El memorando con hechos, base citada, análisis y límites es un entregable que se cobra.
