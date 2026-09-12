---
numero: 15
titulo: Detección de Patrones de Fraude
duracion_min: 13
entregable: sí
---

## Lo que vas a poder hacer al terminar

Vas a aplicar pruebas de patrón sobre un conjunto grande de transacciones, incluida la ley de Benford. Vas a saber leer el resultado sin sacar conclusiones que los datos no sostienen.

## Por qué esto importa en Venezuela

La ley de Benford es más simple de lo que suena. En conjuntos grandes de cifras que ocurren de forma natural, el primer dígito no se reparte parejo. El 1 aparece como primer dígito cerca del 30% de las veces. El 2, alrededor del 18%. Y así hacia abajo, hasta el 9, que aparece menos del 5%. Suena raro y se cumple en cosas muy distintas: montos de facturas, poblaciones de ciudades, cuentas de servicios.

La utilidad para nosotros es esta. Cuando una persona inventa cifras, tiende a repartir los dígitos de forma pareja o a repetir los que le suenan naturales. Esa mano se nota contra la distribución esperada. No prueba nada por sí sola. Levanta la pregunta.

Acá hay dos advertencias locales que importan. La primera: la prueba no aplica a cualquier conjunto. Necesita muchos datos, que abarquen varios órdenes de magnitud y que no tengan topes ni mínimos impuestos. Un conjunto de pagos donde casi todo cae entre 900 y 1.100 no sirve. La segunda: acá la reexpresión por inflación y la conversión a tasa pueden alterar la distribución de los primeros dígitos sin que haya nada irregular. Si vas a correr la prueba, córrela sobre los montos originales de la operación, no sobre los convertidos.

Y la regla que manda sobre todo lo demás: una alerta no es una acusación. Es un lugar donde mirar.

## El caso

Inversiones Guayana, C.A. Empresa de Puerto Ordaz, servicios de mantenimiento industrial. Cuatro mil pagos a proveedores en el ejercicio.

Al correr la prueba sobre los montos, la distribución del primer dígito se ve razonable. La excepción es el 4, que aparece muy por encima de lo esperado. Al revisar, aparecen ciento sesenta pagos entre 4.000 y 4.900 a un grupo de proveedores pequeños. Podría ser el rango natural de ese tipo de servicio. Podría ser otra cosa. Lo único que la prueba dice es dónde mirar primero. Las ciento sesenta partidas se revisan contra documento de respaldo, y ahí sí hay respuesta.

## Paso a paso

1. **Evalúa si el conjunto sirve para la prueba antes de correrla.** Cantidad de datos, rango de magnitudes, ausencia de topes. Si no cumple, la prueba de Benford no aplica y punto.

2. **Usa los montos originales de la operación.** Sin reexpresar y sin convertir. Si mezclas monedas, corre la prueba por moneda separada.

3. **Combina Benford con otras pruebas de patrón.** Montos redondos, montos repetidos, montos justo por debajo de umbrales de autorización, concentración por proveedor o por usuario.

4. **Pide la comparación contra la distribución esperada, con la desviación cuantificada.** No una impresión general.

5. **Convierte cada desviación en una muestra de partidas a revisar.** La prueba estadística no es el entregable. El entregable es la lista de documentos que vas a pedir.

6. **Documenta el alcance y el método.** Esto es papel de trabajo.

## Prompt maestro

```
Actúa como auditor forense aplicando pruebas de patrón sobre transacciones de una empresa venezolana.

DATOS DEL CONJUNTO
Empresa: [NOMBRE]. Tipo de transacciones: [PAGOS A PROVEEDORES / VENTAS / REEMBOLSOS / OTROS]
Periodo: [PERIODO]. Cantidad de registros: [NÚMERO]
Moneda de los montos: [BOLÍVARES / DIVISAS / MEZCLA]
¿Los montos están reexpresados o convertidos? [SÍ / NO. SI ES SÍ, EXPLÍCALO]
Niveles de autorización vigentes: [MONTOS Y QUIÉN AUTORIZA CADA TRAMO]
Rango habitual de montos en esta operación: [DESDE - HASTA]

DATOS
[PEGA LAS TRANSACCIONES: FECHA, TERCERO, CONCEPTO, MONTO, MONEDA, USUARIO QUE REGISTRÓ, DOCUMENTO]

QUÉ NECESITO
1. Primero, dime si este conjunto es apto para la ley de Benford. Evalúa cantidad de registros, amplitud de los órdenes de magnitud y si hay topes o mínimos impuestos. Si no es apto, dilo con claridad y no corras la prueba.
2. Si es apto: distribución observada del primer dígito contra la distribución esperada, con la desviación de cada dígito expresada en puntos porcentuales y en cantidad de registros.
3. Pruebas adicionales de patrón: montos terminados en cero, montos exactamente repetidos, montos entre el 90% y el 100% de un umbral de autorización, concentración por tercero y por usuario, transacciones fuera del rango habitual que te indiqué.
4. Para cada desviación relevante, una muestra de hasta 10 partidas concretas a revisar, con la razón de la selección.
5. Para cada muestra, qué documento de respaldo debo pedir y qué pregunta debo hacer.
6. El papel de trabajo que documente esta revisión: alcance, método, criterios y limitaciones.

REGLAS QUE MANDAN
- Ninguna salida tuya puede calificar una partida ni a una persona como fraudulenta. Son partidas que ameritan revisión documental.
- Si el conjunto no cumple las condiciones de la prueba, dilo y no la fuerces.
- Si los montos vienen convertidos o reexpresados, advierte que eso afecta la validez del análisis de dígitos.
- Si te falta un dato, dímelo en vez de suponerlo.
- Español de Venezuela, tabla, frases cortas.
```

## Prompts de seguimiento

```
De las muestras seleccionadas, arma el plan de revisión documental para una semana: qué reviso cada día y cuánto tiempo estimo por partida.
```

```
Diseña los controles preventivos que habrían dificultado el patrón más marcado que encontraste, para una empresa de este tamaño y sin comprar software.
```

```
Redacta el informe interno de esta revisión, dirigido a la gerencia general, con un lenguaje que describa hallazgos sin atribuir responsabilidades individuales.
```

## Ejercicio de 15 minutos

Toma un conjunto de al menos quinientos pagos con montos variados. Verifica que los montos estén sin convertir. Corre el prompt.

Terminaste bien si el modelo evaluó primero la aptitud del conjunto y después corrió la prueba. Si corrió Benford sobre cuatrocientos registros concentrados en un rango estrecho, el resultado no significa nada y conviene que lo sepas.

## Verificación profesional

Toda partida seleccionada se revisa contra su documento de respaldo. La revisión la haces tú. Si aparece algo que amerite escalamiento, se maneja por el conducto que corresponda dentro de la organización. Con reserva y con la asesoría legal que el caso requiera. Ningún nombre sale en un informe sin evidencia documental verificada. Un señalamiento infundado expone a la empresa y te expone a ti.

## Error común

Presentar la desviación estadística como si fuera el hallazgo. "La distribución del primer dígito se aparta de Benford" no es un hallazgo. Es una razón para revisar ciento sesenta documentos. Quien confunde una cosa con la otra termina acusando a alguien con una gráfica, y una gráfica no es evidencia de nada.

## Resumen en 3 líneas

Benford requiere muchos datos, varios órdenes de magnitud y ausencia de topes. Si no, no aplica.
Corre la prueba sobre montos originales, nunca sobre cifras convertidas o reexpresadas.
Una alerta es un lugar donde mirar. La evidencia es el documento de respaldo.
