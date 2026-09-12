---
numero: 17
titulo: Modelado Financiero
duracion_min: 17
entregable: sí
---

## Lo que vas a poder hacer al terminar

Vas a construir un modelo financiero proyectado de varios años que se sostenga en la realidad venezolana, con supuestos explícitos, escenarios y análisis de sensibilidad. Y vas a saber en qué unidad de medida modelar, la decisión que define si el modelo sirve.

## Por qué esto importa en Venezuela

Empiezo por la regla que manda sobre todo lo demás: **no modeles a varios años en bolívares nominales.** Nunca. Un modelo a cinco años en bolívares nominales produce cifras enormes que no significan nada. Esconde el resultado real detrás del efecto de la inflación. Y no se puede comparar contra nada. Un proyecto malo se ve rentable, porque los ingresos futuros nominales aplastan la inversión inicial.

Las dos alternativas válidas son modelar en divisas, normalmente dólares, o modelar en unidades físicas y aplicar precios al final. La primera es la más común y funciona bien cuando la operación tiene referencia en divisas. La segunda es más robusta para negocios con producción física: toneladas, unidades, horas hombre. Proyectas la operación en unidades y después le aplicas la estructura de precios. Así el modelo habla del negocio y no de la moneda.

Lo segundo es la tasa de descuento. Traer a valor presente flujos en divisas con una tasa pensada para otro contexto da resultados sin sentido. La prima de riesgo país tiene que estar explícita y discutida, no escondida en un número redondo. [VERIFICAR: fuente y fecha de la prima de riesgo que utilices]

Lo tercero es el capital de trabajo. En una economía con inflación alta, el capital de trabajo se come el efectivo. Mucho más rápido de lo que la mayoría de los modelos anticipan. Reponer el inventario cuesta más de lo que costó el que vendiste. Un modelo que no lo proyecta con cuidado proyecta una caja que no existe.

## El caso

Grupo Aurora, C.A. Evalúa montar una planta de empaque en Aragua. Inversión inicial estimada en USD 480.000. Capacidad proyectada de 1.200 toneladas al año a plena marcha, con arranque escalonado en dieciocho meses.

El primer modelo que le presentaron estaba en bolívares, a cinco años, con crecimiento de ingresos del 60% anual. La tasa interna de retorno salía en tres dígitos. Un socio preguntó cuánto de ese 60% era crecimiento y cuánto inflación. Nadie supo responder. El modelo se rehízo en dólares y en toneladas. El proyecto seguía siendo viable, con números discutibles.

## Paso a paso

1. **Decide la unidad de medida antes que nada.** Dólares o unidades físicas. Escríbelo en la primera hoja del modelo.

2. **Separa supuestos de cálculos.** Toda variable vive en una hoja de supuestos. Ninguna cifra fija escrita dentro de una fórmula.

3. **Modela la operación antes que el financiamiento.** Primero el negocio, después cómo se paga. Mezclarlos oculta si el negocio funciona por sí solo.

4. **Proyecta el capital de trabajo con detalle.** Días de inventario, días de cobro y días de pago, aplicados al volumen de cada periodo.

5. **Corre escenarios y sensibilidad.** Base, optimista y pesimista. Y una tabla que muestre qué pasa con el resultado cuando se mueve cada variable clave por separado.

6. **Identifica el punto de quiebre.** Qué tiene que pasar para que el proyecto deje de ser viable. Ese número es el que se discute en la junta.

## Prompt maestro

```
Actúa como analista financiero construyendo un modelo de proyección para un proyecto en Venezuela.

UNIDAD DE MEDIDA DEL MODELO (regla que manda)
Modela en: [DÓLARES] o [UNIDADES FÍSICAS, ESPECIFICANDO CUÁL: TONELADAS, UNIDADES, HORAS]
No proyectes en bolívares nominales a varios años bajo ninguna circunstancia. Si la información que te doy viene en bolívares, pídeme la tasa y el criterio de conversión antes de seguir.

EL PROYECTO
Descripción: [QUÉ ES EL NEGOCIO O EL PROYECTO]
Inversión inicial y su composición: [MONTO Y EN QUÉ SE GASTA]
Horizonte de proyección: [NÚMERO DE AÑOS]
Capacidad operativa: [CAPACIDAD MÁXIMA Y CURVA DE ARRANQUE]

SUPUESTOS OPERATIVOS
Volumen proyectado por periodo: [DETALLE]
Precio unitario y política de precios: [DETALLE]
Costos variables por unidad: [DETALLE]
Costos fijos por periodo: [DETALLE]
Días de inventario, de cobro y de pago: [DETALLE]
Inversión de reposición necesaria: [DETALLE]

SUPUESTOS FINANCIEROS
Estructura de financiamiento: [CAPITAL PROPIO Y DEUDA, CON CONDICIONES]
Tasa de descuento que quiero usar y su justificación: [TASA Y DE DÓNDE SALE]
Carga tributaria estimada: [DESCRIBE. SI NO TIENES LA ALÍCUOTA, ESCRIBE VERIFICAR]

QUÉ NECESITO
1. Hoja de supuestos separada, con cada variable identificada y su fuente.
2. Proyección operativa por periodo: ingresos, costos, margen bruto, gastos, resultado operativo.
3. Proyección de capital de trabajo, con el efecto de los días de inventario, cobro y pago sobre el flujo de caja de cada periodo.
4. Flujo de caja libre del proyecto, antes de financiamiento. Después, el flujo del accionista con el financiamiento incorporado.
5. Indicadores: valor presente neto, tasa interna de retorno, periodo de recuperación y punto de equilibrio operativo.
6. Tres escenarios: base, optimista y pesimista, con el supuesto que cambia en cada uno explícito.
7. Tabla de sensibilidad del valor presente neto frente a: precio, volumen, costo variable y tasa de descuento, moviendo una variable a la vez.
8. Punto de quiebre: qué combinación de valores hace que el proyecto deje de ser viable.

REGLAS
- Toda variable va en la hoja de supuestos. Ninguna cifra escrita dentro de una fórmula.
- No inventes alícuotas tributarias, tasas de referencia ni primas de riesgo país. Escribe [VERIFICAR] y sigue.
- Si un supuesto que te di es inconsistente con otro, adviértemelo antes de calcular.
- Distingue siempre crecimiento real de crecimiento nominal.
- Español de Venezuela, tabla por bloque, frases cortas.
```

## Prompts de seguimiento

```
Revisa mis supuestos uno por uno y dime cuáles son optimistas para el sector y el contexto que te describí, con la razón de cada uno.
```

```
Arma el resumen de una página para presentarle este modelo a un inversionista: la tesis, los tres números clave y los dos riesgos principales.
```

```
Reconstruye el escenario pesimista suponiendo que el arranque de la operación se atrasa seis meses y que el capital de trabajo requerido es 30% mayor al proyectado.
```

## Ejercicio de 15 minutos

Toma un proyecto real que estés evaluando. Define la unidad de medida y escribe los supuestos operativos. Corre el prompt maestro.

Terminaste bien si tienes identificado el punto de quiebre del proyecto. Si el modelo te da una tasa interna de retorno de tres dígitos, revisa la unidad de medida antes de celebrar.

## Verificación profesional

Cada supuesto se contrasta con una fuente o con la experiencia del sector, y esa fuente queda escrita en la hoja de supuestos. La tasa de descuento se justifica por escrito, con la prima de riesgo declarada. Verifica que el modelo cuadre internamente: que el flujo de caja reconcilie con el resultado y con los cambios de balance de cada periodo. Un modelo es una herramienta para discutir supuestos. La decisión de invertir es de quien pone la plata, con tu opinión profesional encima.

## Error común

Proyectar en bolívares nominales a cinco años. El modelo devuelve cifras enormes y una rentabilidad espectacular que es puro efecto de inflación. Alguien toma una decisión de inversión con ese número. Dos años después el proyecto no genera la caja prometida y nadie entiende por qué. El error estaba en la unidad de medida desde la primera celda.

## Resumen en 3 líneas

En dólares o en unidades físicas. Nunca en bolívares nominales a varios años.
El capital de trabajo se come la caja más rápido de lo que casi todo modelo anticipa.
El número que se discute en la junta no es la TIR. Es el punto de quiebre.
