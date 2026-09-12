---
numero: 5
titulo: Detección de Anomalías
duracion_min: 15
entregable: sí
---

## Lo que vas a poder hacer al terminar

Vas a pasar un mayor analítico o una relación de pagos por una revisión sistemática y salir con una lista corta de partidas que ameritan explicación. No una lista de doscientas alertas que nadie va a revisar. Diez o quince, priorizadas, cada una con la razón por la que saltó y la pregunta que hay que hacer.

## Por qué esto importa en Venezuela

La contabilidad de una PYME acá acumula ruido por razones estructurales. Se registra en dos monedas, se reexpresa, se pagan cosas en efectivo que después se documentan tarde, y el personal administrativo cambia seguido. En ese ambiente, una anomalía real se esconde detrás de cincuenta anomalías aparentes. La detección manual falla por cansancio: a la partida número ochenta ya nadie está leyendo con atención.

Hay un patrón local que conviene tener presente. La diferencia cambiaria mal registrada genera montos raros que parecen fraude y no lo son. Al revés también pasa: una salida de efectivo irregular se disfraza fácil entre ajustes de tasa. Si no le explicas al modelo cómo maneja la empresa la multimoneda, va a marcar como sospechoso todo el mayor de diferencias en cambio y vas a perder el día.

El tercer punto es de fondo. Esta lección detecta anomalías, es decir, partidas que se salen del patrón. Una anomalía es una pregunta, no un hallazgo. El registro raro casi siempre tiene explicación. Tu trabajo es conseguir la explicación, no asumir la peor.

## El caso

Comercializadora Andina, C.A. Empresa de Mérida, venta de insumos agrícolas. Doce mil asientos en el ejercicio. El dueño sospecha que se le está yendo dinero por gastos, pero no sabe por dónde.

Al pasar el mayor de gastos por una revisión sistemática saltan cosas concretas: cuatro pagos al mismo proveedor con montos casi idénticos en un lapso de seis días, una serie de desembolsos de USD 990 cuando el nivel de aprobación del supervisor llega hasta USD 1.000, y ocho asientos registrados en fechas posteriores al cierre del mes pero con fecha de operación anterior. Ninguna de las tres cosas prueba nada. Las tres ameritan una pregunta.

## Paso a paso

1. **Exporta los datos con las columnas correctas.** Fecha de operación, fecha de registro, cuenta, descripción, monto, moneda, tercero, usuario que registró y documento de respaldo. La columna de usuario es la que más rinde y la que más gente olvida exportar.

2. **Explícale a Claude cómo funciona la empresa.** Niveles de aprobación, proveedores habituales, estacionalidad, política de multimoneda. Sin este contexto marca ruido.

3. **Pide categorías de anomalía, no una lista plana.** Duplicados probables, montos justo por debajo de umbrales de autorización, registros fuera de horario o fuera de periodo, terceros nuevos con montos altos, secuencias de documento rotas.

4. **Pide priorización por monto y por rareza combinados.** Una partida rara de Bs. 300 no compite con una de USD 4.000.

5. **Pide la pregunta de seguimiento de cada alerta.** Redactada para mandársela al responsable sin que suene a acusación.

## Prompt maestro

```
Actúa como auditor forense revisando registros contables de una empresa venezolana.

CONTEXTO OPERATIVO DE LA EMPRESA
Nombre: [NOMBRE]. Sector: [SECTOR]. Periodo revisado: [PERIODO].
Niveles de aprobación de desembolsos: [DESCRIBE LOS MONTOS Y QUIÉN AUTORIZA CADA TRAMO]
Manejo de multimoneda: [EXPLICA CÓMO SE REGISTRAN OPERACIONES EN DIVISAS, QUÉ TASA SE USA Y CÓMO SE CONTABILIZA LA DIFERENCIA CAMBIARIA]
Proveedores habituales y operaciones normales del giro: [DESCRIBE]
Estacionalidad conocida: [DESCRIBE O INDICA QUE NO HAY]

DATOS
[PEGA EL MAYOR ANALÍTICO O LA RELACIÓN DE PAGOS, CON COLUMNAS: FECHA DE OPERACIÓN, FECHA DE REGISTRO, CUENTA, DESCRIPCIÓN, MONTO, MONEDA, TERCERO, USUARIO, DOCUMENTO]

QUÉ NECESITO
1. Agrupa los hallazgos en categorías: posibles duplicados, montos apenas por debajo de un umbral de aprobación, diferencia relevante entre fecha de operación y fecha de registro, terceros nuevos o poco frecuentes con montos altos, secuencias de documento con saltos, concentración inusual en un usuario, descripciones vagas o repetidas.
2. Devuélveme como máximo 15 partidas priorizadas. Ordénalas combinando monto y qué tan atípico es el patrón.
3. Para cada una: qué observaste, por qué llama la atención y qué explicación legítima podría tener.
4. Redacta para cada una la pregunta que le voy a hacer al responsable. Tono neutro, de revisión de rutina, sin insinuar mala fe.
5. Al final, dime qué columnas o datos adicionales me harían falta para revisar mejor.

REGLAS
- No clasifiques nada como fraude. Estas son partidas que ameritan explicación, nada más.
- Si un patrón se explica por el manejo de multimoneda que te describí, no lo reportes.
- Si te falta un dato para evaluar una partida, dímelo en vez de suponerlo.
- Español de Venezuela, tabla, frases cortas.
```

## Prompts de seguimiento

```
De las 15 partidas, dime cuáles tres revisaría yo primero si solo tengo una hora, y qué documento específico pediría para cada una.
```

```
Diseña el control que habría evitado el patrón más frecuente que encontraste. Que sea implementable en una empresa de 30 personas sin comprar software.
```

```
Arma el papel de trabajo para documentar esta revisión: qué se revisó, alcance, criterios usados, partidas seleccionadas y conclusión.
```

## Ejercicio de 15 minutos

Exporta el mayor de una cuenta de gastos de un mes, con la columna de usuario incluida. Escribe el contexto operativo de la empresa en cinco líneas. Corre el prompt.

Terminaste bien si de las quince partidas hay al menos dos que no habrías visto leyendo el mayor de corrido. Si todas las alertas resultaron ser ruido de multimoneda, vuelve y describe mejor la política cambiaria de la empresa.

## Verificación profesional

Cada alerta se revisa contra el documento de respaldo antes de escalarla. Ninguna sale de tu escritorio como conclusión. Si una partida involucra a una persona identificable, el manejo es reservado y sigue el conducto que corresponda dentro de la empresa. Una acusación mal fundada hace más daño que el desvío que creías estar persiguiendo, y el responsable de esa acusación serías tú.

## Error común

Mandar la lista cruda de alertas al dueño de la empresa. El dueño lee quince nombres, tres son de su cuñado, y para el mediodía hay un problema laboral que tú provocaste. La lista de anomalías es un insumo interno de trabajo. Lo que sale del escritorio son los hallazgos ya verificados, con documento de respaldo revisado.

## Resumen en 3 líneas

Sin contexto operativo, el modelo marca ruido y te hace perder el día.
Quince partidas priorizadas se revisan. Doscientas alertas no las revisa nadie.
Una anomalía es una pregunta pendiente. Se verifica antes de que salga de tu escritorio.
