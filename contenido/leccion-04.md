---
numero: 4
titulo: Preparación de Auditorías
duracion_min: 17
entregable: sí
---

## Lo que vas a poder hacer al terminar

Vas a armar el paquete de preparación de una auditoría sin esperar a que el auditor te mande la lista. Claude te va a generar la relación de documentos por área y los papeles de trabajo base. También las respuestas anticipadas a las preguntas que sabes que van a venir. Si estás del otro lado, como auditor, vas a salir con el programa de trabajo y el memorando de planificación en borrador.

## Por qué esto importa en Venezuela

Lo primero es no mezclar dos cosas que acá se confunden todo el tiempo. La auditoría externa de estados financieros se ejecuta bajo las Normas Internacionales de Auditoría adoptadas por la Federación de Colegios de Contadores Públicos de Venezuela. Evalúa estados preparados bajo VEN-NIF, sea GE o PYME. Su producto es un dictamen. La auditoría interna es otra cosa. Trabaja con el marco COSO y las normas del Instituto de Auditores Internos. Evalúa control interno y procesos, y su producto son hallazgos y recomendaciones. Distinto objetivo, distinto marco, distinto informe. Un prompt que no le diga a Claude en cuál de las dos estás te va a devolver una mezcla inservible.

A eso se suma la figura del comisario mercantil, que existe en nuestro Código de Comercio. No tiene equivalente en la literatura internacional que el modelo conoce mejor. Si trabajas ese encargo, tienes que describirlo tú.

Y está el ajuste por inflación. En una auditoría acá, la reexpresión bajo NIC 29 y el BA VEN-NIF N° 2 es un área de riesgo en sí misma. [VERIFICAR: alcance y vigencia aplicable al ejercicio auditado] Hay tres puntos que el auditor va a mirar con lupa. Los índices usados, la clasificación entre partidas monetarias y no monetarias, y el cálculo del resultado monetario del ejercicio. Prepararlos antes te ahorra días de ida y vuelta.

## El caso

Agropecuaria Los Cedros, C.A. Empresa de Barinas, ciclo de engorde de ganado. Va a su primera auditoría externa porque un banco se la exigió para aprobar una línea de crédito. El contador tiene los estados listos pero nunca ha pasado por un encargo de auditoría.

La firma le manda una lista de requerimientos de cincuenta y tres puntos. El contador dedica tres semanas a responderla mal: manda archivos sueltos, sin referencia cruzada, y los auditores devuelven veintiocho observaciones. El encargo se atrasa dos meses. El crédito también.

## Paso a paso

1. **Define el tipo de encargo en la primera línea del prompt.** Externa bajo NIA, interna bajo COSO, o revisión del comisario. Sin esto el resto se pierde.

2. **Entrega la balanza de comprobación y el detalle de las cuentas de mayor peso.** El paquete de preparación se arma por saldo, no por corazonada.

3. **Pide la relación de documentos de respaldo por área.** Efectivo, cuentas por cobrar, inventario, activo fijo, pasivos, patrimonio, ingresos, gastos, nómina y tributos. Con el documento concreto, no con la categoría.

4. **Pide las preguntas que va a hacer el auditor y prepara la respuesta antes.** Este paso es el que cambia la experiencia del encargo. Llegar con la respuesta lista cambia la conversación completa.

5. **Arma el índice de papeles de trabajo con referencia cruzada.** Que cada documento tenga un código y que ese código esté en la balanza.

6. **Prepara el legajo del ajuste por inflación aparte.** Índices utilizados, clasificación de partidas, cálculo del resultado monetario y la conciliación con los estados históricos.

## Prompt maestro

```
Actúa como auditor senior con experiencia en encargos en Venezuela.

TIPO DE ENCARGO (respétalo en todo el análisis)
[AUDITORÍA EXTERNA DE ESTADOS FINANCIEROS BAJO NIA ADOPTADAS POR LA FCCPV, SOBRE ESTADOS PREPARADOS BAJO VEN-NIF (GE O PYME)] O [AUDITORÍA INTERNA BAJO MARCO COSO Y NORMAS DEL IIA] O [REVISIÓN DEL COMISARIO SEGÚN EL CÓDIGO DE COMERCIO]

Si el encargo es externo, tu producto se orienta a evidencia suficiente y adecuada para sustentar un dictamen. Si es interno, se orienta a evaluar diseño y efectividad de controles y a generar hallazgos. No mezcles los dos enfoques.

DATOS DE LA EMPRESA
Nombre: [NOMBRE]. Sector: [SECTOR]. Ejercicio auditado: [PERIODO].
Marco contable aplicado: [VEN-NIF GE / VEN-NIF PYME].
¿Aplicó ajuste por inflación en el ejercicio? [SÍ / NO]

BALANZA DE COMPROBACIÓN
[PEGA LA BALANZA O EL RESUMEN POR CUENTA CON SALDOS DEL EJERCICIO Y DEL ANTERIOR]

QUÉ NECESITO
1. Relación de documentación de respaldo por área, ordenada de mayor a menor saldo. Para cada área: el documento concreto que debo tener, no la categoría genérica.
2. Las preguntas que probablemente me va a hacer el auditor en cada área, con la evidencia que responde cada una.
3. Índice de papeles de trabajo con código de referencia por área, listo para cruzar contra la balanza.
4. Las áreas de mayor riesgo de este encargo según los saldos y el sector, con la razón de cada una en una oración.
5. Un legajo aparte para el ajuste por inflación: qué documentar sobre índices utilizados, clasificación de partidas monetarias y no monetarias, cálculo del resultado monetario del ejercicio y conciliación con las cifras históricas.

REGLAS
- No cites números de NIA específicas ni de boletines VEN-NIF de memoria. Donde haga falta una referencia, escribe [VERIFICAR].
- Si un saldo que te di es ambiguo, pregúntame en vez de suponer su naturaleza.
- Español de Venezuela, formato de tabla por área, frases cortas.
```

## Prompts de seguimiento

```
De las áreas de riesgo que identificaste, arma el cronograma de preparación para las próximas tres semanas, con responsable y entregable por semana.
```

```
Redacta las cartas de confirmación de saldos para bancos, clientes principales y proveedores principales, en formato de plantilla con variables entre corchetes.
```

```
Dame la lista de las observaciones más comunes que recibe una empresa en su primera auditoría, y cómo prevenir cada una antes de que el auditor llegue.
```

## Ejercicio de 15 minutos

Toma la balanza de comprobación del último cierre anual que tengas. Corre el prompt maestro declarando el tipo de encargo. Revisa la relación de documentos del área de mayor saldo.

Terminaste bien si conseguiste al menos tres documentos que la empresa hoy no tiene archivados y que el auditor va a pedir. Esos tres son tu trabajo de la semana.

## Verificación profesional

El alcance del encargo lo defines tú, no el modelo. Verifica que la relación de documentos corresponda al marco que aplicaste de verdad. Que ninguna referencia normativa haya pasado sin confirmar. Y que el legajo del ajuste por inflación refleje el método que usaste. Si eres el auditor, recuerda que el programa de trabajo que salga de acá es un borrador de planificación. La evaluación de riesgo y la determinación de materialidad son juicio profesional tuyo y quedan documentadas con tu firma.

## Error común

Pedir "prepárame para la auditoría" sin decir de cuál se trata. El modelo devuelve un documento híbrido, con vocabulario de control interno mezclado con requerimientos de evidencia para un dictamen. Lo llevas a la reunión de arranque y el auditor externo te pide cosas que no están. Tú le entregas evaluaciones de proceso que no le sirven. Dos semanas perdidas por una línea de contexto.

## Resumen en 3 líneas

Externa bajo NIA y VEN-NIF, interna bajo COSO e IIA. Declara cuál desde la primera línea.
El paquete de preparación se ordena por saldo, de mayor a menor, no por costumbre.
Prepara el legajo del ajuste por inflación aparte, porque ahí es donde se va el tiempo del encargo.
