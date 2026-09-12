# Biblioteca de prompts para contadores venezolanos

**17 prompts maestros y 51 de seguimiento**, organizados por tarea. Salen del
Certificado Contave, el curso de Claude para contadores de @contave, y funcionan
solos: cada uno dice cuándo usarlo y qué necesitas tener a mano antes de correrlo.

---

## Cómo se usan

Copia el prompt completo y pégalo en Claude. Reemplaza lo que está entre
[CORCHETES] por tus datos. No borres las secciones de reglas del final: son las
que hacen que el modelo te avise cuando le falta algo en vez de inventarlo.

Todos los prompts traen instrucciones de verificación. Si al modelo le falta un
dato, tiene que decírtelo, no suponerlo.

## Cuatro reglas antes de empezar

**1. La norma la traes tú.** Un modelo de lenguaje no es fuente normativa. No
tiene garantizado el texto vigente de una providencia del SENIAT, ni el valor
actual de la Unidad Tributaria, ni la ordenanza de tu municipio. La buscas en la
fuente oficial y la pegas dentro del prompt. Donde veas [VERIFICAR], es un punto
donde tienes que ir a la fuente.

**2. Declara el contexto antes de pedir el resultado.** En qué moneda están las
cifras, si están reexpresadas por inflación, cuál es la condición del
contribuyente y en qué municipio opera la empresa. Esa línea decide si el
resultado sirve.

**3. Verifica antes de firmar.** Tú firmas. La responsabilidad profesional no se
transfiere a ninguna herramienta.

**4. Prueba contra un caso que ya cerraste.** Antes de usar un prompt en trabajo
nuevo, córrelo sobre uno que ya terminaste. Si reproduce lo que hiciste, sirve.

---

## Índice

**Análisis y diagnóstico financiero**

- 01 · Análisis de Estados Financieros
- 07 · Previsión del Flujo de Caja
- 09 · Análisis de Desviaciones
- 17 · Modelado Financiero

**Cierre, reportes y conciliaciones**

- 02 · Automatización del Cierre de Mes
- 06 · Creación de Informes Automatizados en Excel
- 12 · Automatización de Conciliaciones

**Fiscal y cumplimiento**

- 03 · Investigación Fiscal y Memorandos
- 08 · Automatización de Flujos de Cuentas por Pagar
- 11 · Cumplimiento Normativo

**Nómina y prestaciones**

- 13 · Procesamiento de Nóminas

**Auditoría, control interno y revisión forense**

- 04 · Preparación de Auditorías
- 05 · Detección de Anomalías
- 15 · Detección de Patrones de Fraude

**Comunicación con clientes**

- 10 · Redacción de Informes para Clientes
- 16 · Comunicación con Clientes

**Tu forma de trabajar**

- 14 · Claude en Excel y Outlook vía conector

---

# Análisis y diagnóstico financiero

Para leer los números de una empresa y proyectar los que vienen. El punto crítico de todos estos prompts es la base de medición: si no declaras en qué moneda están las cifras y si están reexpresadas, el resultado no sirve.

## 01 · Análisis de Estados Financieros

**Cuándo.** Cuando tienes que analizar los estados financieros de un cliente y llegar a la reunión con algo más que una tabla de ratios.

**Ten a mano.** Balance general y estado de resultados de dos periodos, y saber en qué base están las cifras.

### Prompt maestro

```
Actúa como analista financiero senior revisando los estados financieros de una PYME venezolana.

DATOS DE LA EMPRESA
Nombre: [NOMBRE DE LA EMPRESA]
Sector: [SECTOR]
Periodos comparados: [AÑO ACTUAL] contra [AÑO ANTERIOR]

BASE DE MEDICIÓN (importante, no la ignores)
Las cifras están expresadas en: [BOLÍVARES NOMINALES / BOLÍVARES REEXPRESADOS SEGÚN NIC 29 / DÓLARES A TASA BCV DE CIERRE]
Tasa de conversión utilizada: [TASA Y FECHA, SI APLICA]

ESTADOS FINANCIEROS
[PEGA AQUÍ EL BALANCE GENERAL Y EL ESTADO DE RESULTADOS DE AMBOS PERIODOS]

QUÉ NECESITO
1. Calcula ratios de liquidez, rentabilidad, apalancamiento y eficiencia. Para cada uno muestra la fórmula con el numerador y el denominador que usaste, el resultado de cada periodo y la variación.
2. Explica la tendencia de cada bloque en máximo tres oraciones. Quiero la causa probable, no la descripción del número.
3. Señala las señales de alerta contable: crecimiento de inventario o de cuentas por cobrar muy por encima del crecimiento en ventas, caída de margen, aumento de deuda de corto plazo.
4. Redacta cinco preguntas concretas para hacerle al dueño de la empresa.

REGLAS
- Si las cifras están en bolívares nominales, adviértemelo de entrada y dime qué conclusiones NO se pueden sostener sobre esa base.
- Si te falta una partida para calcular un ratio, dímelo en vez de suponerla. No estimes saldos.
- No cites normativa venezolana de memoria. Si hace falta una referencia normativa, escribe [VERIFICAR] y sigue.
- Escribe en español de Venezuela, tono profesional, frases cortas.
```

### Prompts de seguimiento

**Correo de resultados para el dueño**

```
Del análisis anterior, arma el borrador del correo que le voy a enviar al dueño. Máximo 200 palabras, sin tecnicismos, y que cierre pidiendo una reunión de 30 minutos.
```

**Efectivo inmovilizado por el inventario**

```
Toma el deterioro de la rotación de inventario y estima cuánto efectivo está inmovilizado de más contra el nivel del año anterior. Muéstrame el cálculo paso a paso.
```

**Escenario si se cobra la cartera vencida**

```
Arma una tabla de los mismos ratios pero proyectando el escenario en que la empresa cobra la mitad de la cartera vencida. Indica qué supuestos estás usando.
```

## 07 · Previsión del Flujo de Caja

**Cuándo.** Cuando necesitas saber hasta cuándo alcanza la plata, no cuánta utilidad hubo.

**Ten a mano.** Saldos bancarios de hoy, cartera por cobrar con fechas y el histórico real de días de cobro.

### Prompt maestro

```
Actúa como gerente de tesorería de una PYME venezolana, construyendo una previsión de caja semanal a 13 semanas.

SALDOS DE APERTURA (a la fecha de inicio de la previsión)
Bancos en bolívares: [MONTO]. Bancos en divisas: [MONTO]. Caja: [MONTO].
Fecha de inicio: [FECHA]. Saldo mínimo operativo que no quiero perforar: [MONTO Y MONEDA]

CUENTAS POR COBRAR
[PEGA LA CARTERA: CLIENTE, NÚMERO DE FACTURA, FECHA DE EMISIÓN, MONTO, MONEDA, CONDICIÓN DE PAGO]

COMPORTAMIENTO REAL DE COBRANZA
Días promedio de cobro de los últimos 6 meses: [NÚMERO]
Porcentaje de la cartera que históricamente se cobra dentro del plazo: [PORCENTAJE]
Clientes que pagan sistemáticamente tarde: [LISTA]

SALIDAS COMPROMETIDAS
Nómina y aportes: [MONTO, MONEDA Y SEMANAS EN QUE SE PAGA]
Proveedores con fecha cierta: [DETALLE]
Obligaciones tributarias del periodo: [DETALLE. SI NO TIENES LA FECHA EXACTA, ESCRIBE VERIFICAR]
Gastos fijos: [ALQUILER, SERVICIOS, SEGUROS, OTROS]
Deuda financiera: [CUOTAS Y FECHAS]

QUÉ NECESITO
1. Previsión semana por semana, durante 13 semanas, con las entradas y salidas separadas por moneda y una consolidación al final de cada semana.
2. Tres escenarios: base con el comportamiento histórico de cobranza, conservador con 15 días adicionales de retraso, y tensión con una caída de 25% en las ventas nuevas.
3. Identifica en qué semana de cada escenario el saldo cae por debajo del mínimo operativo, y por cuánto.
4. Para la primera semana crítica de cada escenario, dame tres acciones concretas y realistas para cubrir el faltante, ordenadas de menor a mayor costo para la empresa.
5. Las tres variables a las que el modelo es más sensible, es decir, dónde un cambio pequeño mueve mucho el resultado.

REGLAS
- No conviertas monedas entre sí salvo que yo te dé la tasa. Si necesitas una tasa, pídemela.
- No inventes fechas de vencimiento de obligaciones tributarias. Escribe [VERIFICAR].
- Si un dato que te di es insuficiente para proyectar una línea, dímelo en vez de estimarlo.
- Español de Venezuela, tabla semanal, frases cortas.
```

### Prompts de seguimiento

**Gestión de cobranza priorizada**

```
Del escenario conservador, arma la lista de gestión de cobranza priorizada: a qué cliente llamar primero y con qué argumento, según monto y días de atraso.
```

**Plantilla para actualizar cada lunes**

```
Convierte la previsión en una plantilla de Excel que yo pueda actualizar cada lunes cambiando solo el saldo de apertura y la cartera. Dime qué celdas toco y cuáles no.
```

**Simular más plazo con proveedores**

```
Simula qué pasa con las 13 semanas si negocio 30 días adicionales de plazo con mis dos proveedores más grandes. Muéstrame el antes y el después del saldo mínimo.
```

## 09 · Análisis de Desviaciones

**Cuándo.** Cuando hay que explicar en un comité por qué el resultado se apartó del presupuesto.

**Ten a mano.** Presupuesto y real con el mismo nivel de detalle, y los datos de inflación y tasa del periodo.

### Prompt maestro

```
Actúa como controller financiero de una empresa venezolana preparando el análisis de desviaciones del periodo.

BASE DE COMPARACIÓN
Periodo analizado: [PERIODO]
Comparo contra: [PRESUPUESTO ORIGINAL / PRESUPUESTO REEXPRESADO / PRESUPUESTO EN DIVISAS]
Moneda del análisis: [BOLÍVARES REEXPRESADOS / DÓLARES]
Si usas conversión, la tasa es: [TASA Y CRITERIO: CIERRE, PROMEDIO DEL PERIODO, ETC.]
Umbral de materialidad: explica solo desviaciones mayores a [MONTO] o a [PORCENTAJE]

DATOS PRESUPUESTADOS
[PEGA EL PRESUPUESTO CON EL MISMO NIVEL DE DETALLE QUE EL REAL: LÍNEA, VOLUMEN, PRECIO UNITARIO, MONTO]

DATOS REALES
[PEGA EL REAL CON LAS MISMAS COLUMNAS]

CONTEXTO DEL PERIODO
Variación del índice de precios en el periodo: [DATO O VERIFICAR]
Variación de la tasa de cambio en el periodo: [DATO O VERIFICAR]
Hechos relevantes que conozco: [PARADAS DE PLANTA, CAMBIOS DE PRECIO, PÉRDIDA DE UN CLIENTE, ETC.]

QUÉ NECESITO
1. Desviación total por línea, en monto y en porcentaje.
2. Descomposición de cada desviación material en sus efectos: volumen, precio real, mezcla de productos, inflación y tipo de cambio. Muestra el cálculo de cada efecto.
3. Clasifica cada desviación como controlable por la gestión o atribuible al entorno, y justifica la clasificación en una oración.
4. Narrativa por área responsable: producción, compras, comercial y administración. Un párrafo por área, máximo cinco oraciones.
5. Acción correctiva propuesta para las tres desviaciones más relevantes, con responsable sugerido y plazo.

REGLAS
- No inventes datos de inflación ni de tipo de cambio. Si no te los di, escribe [VERIFICAR] y deja el efecto indicado sin cuantificar.
- Si el presupuesto y el real no tienen el mismo nivel de detalle, dímelo y no fuerces la comparación.
- Distingue siempre entre crecimiento nominal y crecimiento real. No presentes uno como el otro.
- Español de Venezuela, tabla para los números, frases cortas.
```

### Prompts de seguimiento

**Lámina de resumen para el comité**

```
Arma la lámina de resumen para el comité: máximo cinco líneas de texto y una tabla con las tres desviaciones más grandes ya descompuestas.
```

**Volumen necesario para compensar el precio**

```
Toma la desviación de precio y estima cuánto habría que subir el volumen para compensarla sin tocar el precio. Muestra el cálculo y di si es realista según la capacidad instalada que te describí.
```

**Supuestos del presupuesto que ya no se sostienen**

```
Revisa mi presupuesto original y dime qué supuestos ya no se sostienen, para reproyectar el semestre que viene.
```

## 17 · Modelado Financiero

**Cuándo.** Cuando hay que evaluar si un proyecto o una inversión tiene sentido financiero.

**Ten a mano.** Inversión inicial, supuestos operativos por periodo y la estructura de financiamiento.

### Prompt maestro

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

### Prompts de seguimiento

**Revisión crítica de mis supuestos**

```
Revisa mis supuestos uno por uno y dime cuáles son optimistas para el sector y el contexto que te describí, con la razón de cada uno.
```

**Resumen de una página para un inversionista**

```
Arma el resumen de una página para presentarle este modelo a un inversionista: la tesis, los tres números clave y los dos riesgos principales.
```

**Escenario pesimista con atraso en el arranque**

```
Reconstruye el escenario pesimista suponiendo que el arranque de la operación se atrasa seis meses y que el capital de trabajo requerido es 30% mayor al proyectado.
```

---

# Cierre, reportes y conciliaciones

El trabajo repetitivo del mes. Acá lo que se gana es tiempo puro: ordenar el proceso, limpiar lo que el sistema exporta mal y separar el ruido de lo que de verdad hay que investigar.

## 02 · Automatización del Cierre de Mes

**Cuándo.** Cuando el cierre mensual se te va de las manos y no sabes exactamente dónde se pierden los días.

**Ten a mano.** Tu proceso de cierre actual descrito en bruto, con demoras y responsables reales.

### Prompt maestro

```
Actúa como contralor de una empresa venezolana diseñando el proceso de cierre mensual.

CONTEXTO
Empresa: [NOMBRE]. Sector: [SECTOR]. Personal de contabilidad: [NÚMERO DE PERSONAS].
Sistema contable: [SISTEMA]. Fecha objetivo de entrega de estados: [DÍA DEL MES].

MI PROCESO ACTUAL, TAL COMO OCURRE HOY
[DESCRIBE LOS PASOS EN EL ORDEN EN QUE PASAN, CON RESPONSABLE Y DEMORA TÍPICA]

QUÉ NECESITO
1. Convierte esto en una lista de control secuenciada, agrupada por bloques: cortes y recepción de información, registros y asientos, conciliaciones, ajustes de cierre, revisión y emisión.
2. Para cada paso indica: responsable, insumo que necesita, paso del que depende y tiempo estimado.
3. Marca los pasos que están en la ruta crítica, es decir, los que retrasan todo lo demás si se atrasan.
4. Identifica los pasos que se pueden hacer en paralelo y hoy se están haciendo en serie.
5. Propón un orden para los ajustes de cierre que involucran moneda extranjera y reexpresión por inflación, y explica por qué ese orden y no otro.
6. Redacta la plantilla de los asientos recurrentes que detectes, con la fórmula del monto y la fuente del dato de cada uno.

REGLAS
- Si un paso que menciono es ambiguo, pregúntame antes de asumir qué hace.
- No inventes plazos legales ni fechas de vencimiento fiscal. Si hace falta una fecha, escribe [VERIFICAR].
- No propongas herramientas que requieran comprar software. Trabajo con lo que tengo.
- Español de Venezuela, frases cortas, formato de tabla donde ayude.
```

### Prompts de seguimiento

**Los tres cambios que más días ganan**

```
De la lista anterior, dime cuáles tres pasos me darían más días de ganancia si los resuelvo primero, y qué tendría que cambiar en la empresa para lograrlo.
```

**Correo al responsable que atrasa el cierre**

```
Redacta el correo que le voy a mandar al jefe de almacén explicando qué necesito de él, para cuándo, y qué pasa con el cierre si no llega a tiempo. Tono firme pero de colega.
```

**Formato de la hoja de pendientes**

```
Arma el formato de la hoja de pendientes de cierre: columnas, qué se registra en cada una y un ejemplo lleno.
```

## 06 · Creación de Informes Automatizados en Excel

**Cuándo.** Cuando armas el mismo reporte todos los meses y se te va media jornada en limpiar el archivo.

**Ten a mano.** El archivo tal como sale del sistema, sin limpiar, y la descripción del reporte que necesitas.

### Prompt maestro

```
Actúa como analista financiero experto en Excel, trabajando para una empresa venezolana.

OBJETIVO
Quiero automatizar un reporte que hoy armo a mano todos los meses.

CÓMO SALE EL ARCHIVO DEL SISTEMA CONTABLE
Sistema: [NOMBRE DEL SISTEMA]. Formato de exportación: [XLSX / CSV / TXT].
Problemas conocidos del archivo: [ENCABEZADOS REPETIDOS, MONTOS COMO TEXTO, NOMBRES INCONSISTENTES, FILAS EN BLANCO, ETC.]

MUESTRA REAL DEL ARCHIVO (primeras filas, sin limpiar)
[PEGA AQUÍ ENTRE 20 Y 40 FILAS TAL COMO SALEN, CON LA BASURA INCLUIDA]

REPORTE QUE NECESITO
Filas: [QUÉ VA EN CADA FILA]
Columnas: [QUÉ VA EN CADA COLUMNA, INCLUYENDO COMPARATIVOS]
Moneda: [BOLÍVARES / DÓLARES / AMBAS]. Si son ambas, la conversión se hace con la tasa de la hoja de supuestos.
Totales y subtotales requeridos: [DESCRIBE]

QUÉ NECESITO QUE ME ENTREGUES
1. La estructura de hojas del libro: hoja de datos crudos, hoja de supuestos, hoja de trabajo, hoja de reporte final.
2. Las fórmulas concretas, listas para pegar, indicando en qué celda va cada una. Usa referencias claras y explica en una línea qué hace cada fórmula.
3. La limpieza del archivo crudo resuelta con fórmulas o con Power Query, según lo que sea más simple para este caso. Explícame los pasos.
4. Celdas de validación que comparen los totales del reporte contra los totales del archivo fuente, y que muestren una alerta visible si no cuadran.
5. Instrucciones de uso en cinco pasos, para que otra persona pueda correr el reporte sin preguntarme nada.

REGLAS
- Todo parámetro va en la hoja de supuestos. Ninguna tasa ni fecha escrita dentro de una fórmula.
- Si mi descripción del reporte es ambigua en algún punto, pregúntame antes de decidir por mí.
- No uses funciones que dependan de una versión específica de Excel sin advertírmelo.
- Español de Venezuela, frases cortas.
```

### Prompts de seguimiento

**Script para automatizar la limpieza**

```
Convierte la limpieza del archivo crudo en un script de Office Scripts o en una macro VBA, según lo que corra mejor en mi versión, y explícame cómo instalarlo.
```

**Bloque de análisis automático en el reporte**

```
Agrega al reporte un bloque de análisis automático: tres líneas de texto que se generen con fórmulas y comenten las variaciones más grandes del mes.
```

**Qué se rompe si cambia el archivo fuente**

```
Revisa la estructura que me propusiste y dime qué se rompe si el mes que viene el sistema agrega una columna nueva o cambia el orden de las existentes.
```

## 12 · Automatización de Conciliaciones

**Cuándo.** Cuando conciliar el banco te toma días y la mayoría de las partidas resultan ser ruido conocido.

**Ten a mano.** Estado de cuenta y mayor de la cuenta, y la política de registro de operaciones en divisas.

### Prompt maestro

```
Actúa como analista contable conciliando una cuenta bancaria de una empresa venezolana.

DATOS DE LA CUENTA
Banco: [BANCO]. Moneda de la cuenta: [BOLÍVARES / DIVISAS]. Periodo: [MES Y AÑO]
Saldo según estado de cuenta al cierre: [MONTO]
Saldo según libros al cierre: [MONTO]

CÓMO REGISTRA LA EMPRESA LAS OPERACIONES EN MONEDA EXTRANJERA
[EXPLICA QUÉ TASA SE USA AL REGISTRAR, CUÁNDO SE REGISTRA Y CÓMO SE TRATA LA DIFERENCIA ENTRE LA FECHA DE OPERACIÓN Y LA DE LIQUIDACIÓN]

CATEGORÍAS CONOCIDAS QUE NO SON ERRORES
[IGTF, COMISIONES, MANTENIMIENTO DE CUENTA, INTERESES, DIFERENCIA DE TASA. AGREGA LAS QUE APLIQUEN]

MOVIMIENTOS SEGÚN EL BANCO
[PEGA EL ESTADO DE CUENTA: FECHA, REFERENCIA, DESCRIPCIÓN, DÉBITO, CRÉDITO]

MOVIMIENTOS SEGÚN LIBROS
[PEGA EL MAYOR DE LA CUENTA: FECHA, REFERENCIA, DESCRIPCIÓN, DÉBITO, CRÉDITO]

QUÉ NECESITO
1. Normaliza ambos lados a la misma estructura antes de comparar y dime qué tuviste que ajustar.
2. Cruza los movimientos aplicando en este orden: referencia exacta, luego monto igual con fecha dentro de 5 días, luego monto con tolerancia de [PORCENTAJE].
3. Clasifica todo lo que no cruzó en: está en banco y no en libros, está en libros y no en banco, cruzó pero con diferencia de monto.
4. Separa aparte las partidas que caen en las categorías conocidas que te declaré. Agrúpalas y dame el total de cada categoría, sin listarlas una por una.
5. Lista solo las partidas que requieren investigación real, con el dato que haría falta para resolver cada una.
6. Propón el asiento de ajuste para cada categoría que lo amerite.
7. Arma la conciliación formal: saldo según banco, más y menos partidas conciliatorias, saldo según libros.

REGLAS
- No asumas que una partida es error si encaja en una categoría conocida que te declaré.
- Si dos partidas podrían cruzar de más de una forma, muéstrame ambas opciones en vez de escoger tú.
- Si te falta un dato para clasificar una partida, dímelo en vez de suponerlo.
- Español de Venezuela, tabla, frases cortas.
```

### Prompts de seguimiento

**Correo al banco por partidas sin resolver**

```
De las partidas que quedaron sin resolver, redacta el correo al banco solicitando el detalle de cada una, con la referencia y la fecha.
```

**Fallas de proceso en los últimos tres meses**

```
Analiza las partidas en libros y no en banco de los últimos tres meses y dime si hay un patrón que indique una falla de proceso en vez de un caso aislado.
```

**Plantilla mensual de la conciliación**

```
Diseña la plantilla mensual de esta conciliación para que el mes que viene solo tenga que pegar los dos archivos y correr el mismo prompt.
```

---

# Fiscal y cumplimiento

Acá la regla 1 manda sobre todo lo demás. Ningún prompt de este grupo funciona si esperas que el modelo aporte el dato normativo. La norma, los porcentajes y las fechas los traes tú desde la fuente oficial.

## 03 · Investigación Fiscal y Memorandos

**Cuándo.** Cuando un cliente te hace una consulta fiscal y quieres responder con un memorando que se pueda cobrar.

**Ten a mano.** Los hechos con fechas y montos, y el texto de la norma copiado de la fuente oficial.

### Prompt maestro

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

### Prompts de seguimiento

**Resumen del memorando para el cliente**

```
Resume el memorando anterior en un mensaje de máximo 120 palabras para enviarle al cliente por escrito, sin perder la precisión de la conclusión.
```

**Documentación de respaldo a conservar**

```
Basándote solo en el texto normativo que te di, arma la lista de la documentación de respaldo que el cliente debe conservar para sostener este tratamiento ante una fiscalización.
```

**Argumentos que usaría un fiscal**

```
Enumera los argumentos que un fiscal podría usar para objetar la conclusión de este memorando, y qué respuesta tendríamos para cada uno.
```

## 08 · Automatización de Flujos de Cuentas por Pagar

**Cuándo.** Cuando procesas el lote de facturas de la quincena y tienes que calcular retenciones.

**Ten a mano.** Ficha de cada proveedor, detalle de las facturas y la tabla de porcentajes vigentes verificada por ti.

### Prompt maestro

```
Actúa como analista de cuentas por pagar de una empresa venezolana designada agente de retención.

DATOS DE MI EMPRESA
Nombre: [NOMBRE]. RIF: [RIF]. ¿Contribuyente especial? [SÍ / NO]. ¿Agente de retención de IVA? [SÍ / NO]
Periodo de pago: [QUINCENA O MES]

TABLA DE PORCENTAJES VIGENTES (la verifiqué yo en fuente oficial, úsala tal cual)
Retención de IVA: [PEGA LOS PORCENTAJES Y LOS SUPUESTOS DE APLICACIÓN]
Retención de ISLR por concepto: [PEGA LA TABLA DEL DECRETO 1808 CON CONCEPTO, TIPO DE BENEFICIARIO Y PORCENTAJE]
Fórmula del sustraendo y Unidad Tributaria vigente: [PEGA LA FÓRMULA Y EL VALOR]

FICHA DE PROVEEDORES
[PARA CADA UNO: NOMBRE, RIF, PERSONA NATURAL O JURÍDICA, RESIDENTE O NO, CONTRIBUYENTE ESPECIAL O NO, CONCEPTO HABITUAL DE LA OPERACIÓN]

FACTURAS A PROCESAR
[PARA CADA UNA: PROVEEDOR, NÚMERO DE FACTURA, NÚMERO DE CONTROL, FECHA, BASE IMPONIBLE, IVA, MONTO EXENTO, TOTAL, CONCEPTO]

QUÉ NECESITO
1. Por cada factura: retención de IVA calculada sobre el impuesto, con el porcentaje aplicado visible.
2. Por cada factura: retención de ISLR según concepto y tipo de beneficiario. Cuando el beneficiario sea persona natural residente, muestra la operación completa: monto del pago, porcentaje, resultado bruto, sustraendo restado y retención final. Si el resultado es negativo, indica que no procede retención.
3. Monto neto a pagar por factura y total por proveedor.
4. Marca las facturas con datos formales incompletos, faltas de número de control, RIF mal formado, IVA no discriminado o fecha fuera del periodo.
5. Resumen consolidado por tipo de retención, para la declaración del periodo.
6. Borrador del comprobante de retención por proveedor, con los campos que debe contener.

REGLAS
- Usa únicamente los porcentajes y la fórmula que te pegué. No apliques porcentajes de tu conocimiento previo.
- Si la ficha de un proveedor no alcanza para determinar el porcentaje, dímelo en vez de suponerlo.
- Muestra cada cálculo. No me des solo el resultado.
- Español de Venezuela, tabla, frases cortas.
```

### Prompts de seguimiento

**Lista de pago priorizada de la quincena**

```
Arma la lista de pago priorizada de esta quincena según vencimiento, monto y criticidad del proveedor para la operación.
```

**Correo al proveedor por factura incompleta**

```
Revisa las facturas marcadas con datos incompletos y redáctame el correo que le voy a enviar a cada proveedor pidiendo la corrección.
```

**Ficha de alta de proveedor**

```
Diseña la plantilla de la ficha de proveedor que debería llenarse al darlo de alta, con todos los campos necesarios para calcular retenciones sin volver a preguntar nada.
```

## 11 · Cumplimiento Normativo

**Cuándo.** Cuando tomas un cliente nuevo o sospechas que hay obligaciones que nadie está atendiendo.

**Ten a mano.** Datos del cliente, su condición ante el SENIAT y todas sus ubicaciones físicas con su municipio.

### Prompt maestro

```
Actúa como especialista en cumplimiento tributario venezolano, construyendo la matriz de obligaciones de una empresa.

DATOS DE LA EMPRESA
Nombre: [NOMBRE]. RIF: [RIF]. Actividad económica principal: [ACTIVIDAD]
Actividades secundarias: [ACTIVIDADES]
Condición ante el SENIAT: [CONTRIBUYENTE ESPECIAL / ORDINARIO]
¿Agente de retención de IVA? [SÍ / NO]
Número de trabajadores: [NÚMERO]
Ubicaciones físicas y municipio de cada una: [LISTA COMPLETA, INCLUYENDO DEPÓSITOS Y SUCURSALES]
Ejercicio fiscal: [FECHA DE CIERRE]
Otras particularidades: [IMPORTA, EXPORTA, MANEJA DIVISAS, TIENE CONTRATOS CON EL ESTADO, ETC.]

QUÉ NECESITO
Una matriz de obligaciones en tres bloques separados:

BLOQUE 1. Obligaciones nacionales ante el SENIAT.
BLOQUE 2. Obligaciones municipales, con una sección por cada municipio donde la empresa tiene actividad.
BLOQUE 3. Obligaciones parafiscales y de seguridad social.

Para cada obligación, estas columnas:
- Obligación
- Ente ante el que se cumple
- Periodicidad
- Fecha o plazo de vencimiento
- Base de cálculo o alícuota
- Documento o evidencia que prueba el cumplimiento
- Dónde se archiva esa evidencia
- Responsable interno sugerido

REGLAS QUE MANDAN
- NO inventes fechas de vencimiento, alícuotas, montos ni números de providencia. En esas columnas escribe [VERIFICAR: qué hay que confirmar y en qué fuente]. Esto aplica especialmente a lo municipal, que cambia por ordenanza de cada alcaldía.
- Sí describe con precisión en qué consiste cada obligación y por qué aplica a esta empresa.
- Si una obligación aplica solo bajo cierta condición, indícala de forma expresa.
- Incluye los deberes formales, no solo las declaraciones: libros, registros, exhibición de documentos, declaraciones informativas.
- Al final, dame la lista de las obligaciones que más se olvidan en empresas con este perfil.
- Español de Venezuela, formato de tabla, frases cortas.
```

### Prompts de seguimiento

**Calendario anual con alertas previas**

```
Convierte la matriz en un calendario anual mes por mes, con responsable y con una alerta cinco días hábiles antes de cada vencimiento.
```

**Lista de verificación antes de una fiscalización**

```
Arma la lista de verificación de deberes formales que yo revisaría antes de una fiscalización, ordenada por probabilidad de ser requerida.
```

**Qué cambia al ser contribuyente especial**

```
De la matriz, señala qué obligaciones cambian si la empresa pasa a ser designada contribuyente especial, y qué habría que preparar con anticipación.
```

---

# Nómina y prestaciones

El área donde un error se convierte en demanda laboral. Muestra siempre las fórmulas y verifica el histórico salarial contra los recibos de pago antes de pagar nada.

## 13 · Procesamiento de Nóminas

**Cuándo.** Cuando termina una relación laboral y hay que calcular la liquidación completa.

**Ten a mano.** Fechas de ingreso y egreso, histórico salarial por trimestre, política de utilidades y bono vacacional.

### Prompt maestro

```
Actúa como especialista en nómina venezolana calculando una liquidación bajo la LOTTT.

DATOS DEL TRABAJADOR
Nombre: [NOMBRE]. Fecha de ingreso: [FECHA]. Fecha de egreso: [FECHA]
Motivo de terminación: [RENUNCIA / DESPIDO JUSTIFICADO / DESPIDO INJUSTIFICADO / MUTUO ACUERDO]
Salario normal mensual al egreso: [MONTO Y MONEDA]
Histórico de salario normal por trimestre desde el ingreso: [PEGA EL HISTÓRICO]

POLÍTICA DE LA EMPRESA
Días de utilidades al año: [DÍAS]
Días de bono vacacional al año: [DÍAS, INDICANDO SI ES FIJO O PROGRESIVO]
Conceptos que se pagan además del sueldo: [LISTA CADA UNO: BONOS, COMISIONES, BENEFICIO DE ALIMENTACIÓN, PRIMAS, ETC.]

PAGOS Y DEPÓSITOS YA REALIZADOS
Garantía de prestaciones depositada trimestralmente: [DETALLE POR TRIMESTRE]
Vacaciones y bono vacacional ya disfrutados y pagados: [DETALLE]
Anticipos de prestaciones otorgados: [DETALLE]

QUÉ NECESITO
1. Clasifica cada concepto que te listé como salarial o no salarial, y explica en una línea por qué. Si el carácter de alguno es discutible, márcalo con [VERIFICAR].
2. Construye el salario integral mostrando cada componente: salario normal, alícuota de utilidades y alícuota de bono vacacional, con la fórmula de cada alícuota.
3. Calcula la garantía de prestaciones sociales trimestre por trimestre, con el salario integral de cada trimestre, e incluye los días adicionales por antigüedad. Dame el acumulado.
4. Calcula, por separado, el retroactivo: días por año de servicio o fracción, sobre el último salario integral.
5. Compara los dos resultados, indica cuál es mayor y explica de forma expresa que ese es el que corresponde pagar.
6. Calcula vacaciones y bono vacacional vencidos y fraccionados, y utilidades fraccionadas.
7. Si la terminación fue por despido injustificado, calcula la indemnización adicional que corresponda.
8. Arma el finiquito final: total de asignaciones, deducciones, anticipos descontados y neto a pagar.
9. Redacta el desglose para entregarle al trabajador: concepto, base de cálculo, fórmula y monto.

REGLAS
- Muestra todas las fórmulas. No me des solo los totales.
- No inventes días mínimos legales, tasas de interés sobre prestaciones ni el carácter salarial de un concepto si no estás seguro. Escribe [VERIFICAR] y sigue.
- Si falta un dato del histórico salarial, dímelo en vez de estimarlo.
- Español de Venezuela, tabla por bloque, frases cortas.
```

### Prompts de seguimiento

**Aportes parafiscales del último año**

```
Calcula los aportes parafiscales que la empresa debió hacer por este trabajador durante el último año, separando la cuota patronal de la del trabajador. Marca las alícuotas como [VERIFICAR].
```

**Simulación de despido injustificado**

```
Simula el mismo cálculo si la terminación hubiese sido por despido injustificado, y dime cuánto más costaría.
```

**Carta de finiquito y recibo de pago**

```
Redacta la carta de finiquito y el recibo de pago, con los espacios para firma y cédula del trabajador.
```

---

# Auditoría, control interno y revisión forense

Para encargos de auditoría y para revisiones de partidas. Ninguna salida de este grupo califica a nadie ni a nada como fraude: lo que producen son partidas que ameritan revisión documental.

## 04 · Preparación de Auditorías

**Cuándo.** Cuando viene una auditoría, del lado del auditado o del lado del auditor.

**Ten a mano.** Balanza de comprobación del ejercicio y del anterior, y claridad sobre el tipo de encargo.

### Prompt maestro

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

### Prompts de seguimiento

**Cronograma de preparación a tres semanas**

```
De las áreas de riesgo que identificaste, arma el cronograma de preparación para las próximas tres semanas, con responsable y entregable por semana.
```

**Cartas de confirmación de saldos**

```
Redacta las cartas de confirmación de saldos para bancos, clientes principales y proveedores principales, en formato de plantilla con variables entre corchetes.
```

**Observaciones típicas de una primera auditoría**

```
Dame la lista de las observaciones más comunes que recibe una empresa en su primera auditoría, y cómo prevenir cada una antes de que el auditor llegue.
```

## 05 · Detección de Anomalías

**Cuándo.** Cuando sospechas que algo se está yendo por gastos y no sabes por dónde empezar a mirar.

**Ten a mano.** Mayor analítico con la columna de usuario, y los niveles de aprobación de la empresa.

### Prompt maestro

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

### Prompts de seguimiento

**Las tres partidas a revisar primero**

```
De las 15 partidas, dime cuáles tres revisaría yo primero si solo tengo una hora, y qué documento específico pediría para cada una.
```

**Control que habría evitado el patrón**

```
Diseña el control que habría evitado el patrón más frecuente que encontraste. Que sea implementable en una empresa de 30 personas sin comprar software.
```

**Papel de trabajo de la revisión**

```
Arma el papel de trabajo para documentar esta revisión: qué se revisó, alcance, criterios usados, partidas seleccionadas y conclusión.
```

## 15 · Detección de Patrones de Fraude

**Cuándo.** Cuando hay que revisar un conjunto grande de transacciones buscando patrones anómalos.

**Ten a mano.** Las transacciones con montos originales, sin convertir ni reexpresar, y los niveles de autorización.

### Prompt maestro

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

### Prompts de seguimiento

**Plan de revisión documental de una semana**

```
De las muestras seleccionadas, arma el plan de revisión documental para una semana: qué reviso cada día y cuánto tiempo estimo por partida.
```

**Controles preventivos sin comprar software**

```
Diseña los controles preventivos que habrían dificultado el patrón más marcado que encontraste, para una empresa de este tamaño y sin comprar software.
```

**Informe interno sin atribuir responsabilidades**

```
Redacta el informe interno de esta revisión, dirigido a la gerencia general, con un lenguaje que describa hallazgos sin atribuir responsabilidades individuales.
```

---

# Comunicación con clientes

El trabajo ya lo hiciste. Estos prompts son para que se note y para que las conversaciones difíciles dejen de posponerse.

## 10 · Redacción de Informes para Clientes

**Cuándo.** Cuando terminaste un trabajo y tienes que entregarlo de forma que el cliente lo lea completo.

**Ten a mano.** Tu análisis técnico completo y claridad sobre qué decisión tiene que tomar quien lo lee.

### Prompt maestro

```
Actúa como socio de una firma contable venezolana redactando el informe final para un cliente.

QUIÉN LO VA A LEER
Destinatario: [DUEÑO DE LA EMPRESA / JUNTA DIRECTIVA / BANCO / SOCIO EN EL EXTERIOR]
Nivel de conocimiento contable del lector: [ALTO / MEDIO / NINGUNO]
Decisión concreta que este lector tiene que tomar: [DESCRÍBELA]
Relación con el cliente: [NUEVO / DE VARIOS AÑOS]

TRABAJO REALIZADO
Tipo de encargo: [ANÁLISIS FINANCIERO / REVISIÓN FISCAL / CIERRE / DIAGNÓSTICO]
Periodo cubierto: [PERIODO]. Fecha de corte de la información: [FECHA]
Información sobre la que trabajé: [BALANZA, ESTADOS FINANCIEROS, DECLARACIONES, ETC.]
Qué NO estuvo dentro del alcance: [DESCRIBE]

ANÁLISIS TÉCNICO COMPLETO
[PEGA AQUÍ TODO TU ANÁLISIS, SIN FILTRAR, CON NÚMEROS Y CONCLUSIONES]

QUÉ NECESITO
Un informe con esta estructura:
1. Resumen ejecutivo. Máximo media página. Las tres conclusiones principales y las decisiones que sugieren. Va primero, antes que cualquier metodología.
2. Situación actual. Qué muestra la información, en lenguaje del negocio, no en lenguaje contable. Si usas un término técnico, explícalo en la misma oración.
3. Hallazgos. Máximo cinco, ordenados por impacto económico. Cada uno con el número que lo respalda y su consecuencia práctica.
4. Recomendaciones. Concretas, con responsable y plazo sugerido. Nada de "se recomienda evaluar".
5. Alcance y limitaciones. Sobre qué información trabajé, con qué fecha de corte, qué no revisé y qué debe verificarse en fuente oficial.
6. Anexos. Todo el detalle técnico y las tablas.

REGLAS DE ESCRITURA
- Cuerpo del informe: máximo dos páginas. Lo que no quepa, va a anexo.
- Español de Venezuela, tuteo con el cliente si la relación es cercana, usted si es formal. Yo te digo cuál arriba.
- Frases cortas. Nada de rayas largas como aparte. Nada de frases de relleno ni de cierres grandilocuentes.
- No suavices un hallazgo negativo. Dilo con respeto y con claridad.
- Si el análisis que te di no sostiene una recomendación, no la escribas.
```

### Prompts de seguimiento

**Correo de envío del informe**

```
Redacta el correo de dos párrafos con el que voy a enviar este informe, que diga qué es, qué necesito del cliente y para cuándo.
```

**Versión del informe para el banco**

```
Adapta el mismo informe para el banco que está evaluando la línea de crédito. Cambia lo que haga falta en el orden y el énfasis, sin alterar ningún hallazgo.
```

**Preguntas incómodas que va a hacer el cliente**

```
Dame las cinco preguntas incómodas que este cliente me va a hacer al leer el informe, y la respuesta corta para cada una.
```

## 16 · Comunicación con Clientes

**Cuándo.** Cuando tienes que cobrar, pedir recaudos por quinta vez, subir honorarios o dar una mala noticia.

**Ten a mano.** Los datos concretos: monto, periodos, fechas, y el historial de la relación con ese cliente.

### Prompt maestro

```
Actúa como socio de un escritorio contable venezolano redactando comunicaciones con clientes.

CONTEXTO DE LA RELACIÓN
Cliente: [NOMBRE]. Años de relación: [NÚMERO]
Importancia del cliente para el escritorio: [ALTA / MEDIA / BAJA]
Trato habitual: [TUTEO / USTED]. Canal: [CORREO / WHATSAPP]
Historial reciente: [PAGA PUNTUAL, SE ATRASA SIEMPRE, PRIMERA VEZ QUE PASA, ETC.]

SITUACIÓN A COMUNICAR
[ESCOGE UNA Y DESCRÍBELA CON DATOS CONCRETOS]
- Cobranza de honorarios atrasados: periodos adeudados, monto, moneda, fecha del último pago
- Solicitud de recaudos pendientes: qué falta, desde cuándo, qué se atrasa por eso
- Ajuste de honorarios: tarifa actual, tarifa nueva, desde cuándo, qué la justifica
- Mala noticia: reparo, multa, error detectado, obligación incumplida. Qué pasó y qué toca hacer
- Cierre de la relación profesional: motivo y plazo de transición

QUÉ NECESITO
1. Tres versiones del mensaje: cordial, firme y final. Que la diferencia esté en la firmeza, no en el contenido: los datos y la fecha son los mismos en las tres.
2. Cada versión debe incluir: el dato concreto (monto, periodo, documento), una fecha específica, la consecuencia de que no ocurra nada, y una sola acción de cierre.
3. Extensión: máximo 150 palabras por versión. Para WhatsApp, máximo 60.
4. Dime en qué caso usar cada versión.
5. Anticipa las dos respuestas más probables del cliente y escríbeme la contrarréplica de cada una.

REGLAS DE ESCRITURA
- Español de Venezuela. Respeta el trato que te indiqué.
- Nada de disculpas por cobrar lo que se trabajó. Cobrar es parte del servicio.
- Sin rodeos ni frases de relleno. Sin cierres grandilocuentes.
- Si es mala noticia, va primero el hecho y después el plan. Nunca al revés.
- No prometas plazos ni resultados que yo no te haya dicho que puedo cumplir.
```

### Prompts de seguimiento

**Plantillas reutilizables con variables**

```
Convierte las tres versiones en plantillas con variables entre corchetes, listas para reutilizar con cualquier cliente.
```

**Secuencia de cobranza por días de atraso**

```
Arma la secuencia de cobranza completa: qué mensaje mando a los 15, 30, 45 y 60 días de atraso, y en qué punto suspendo el servicio.
```

**Correo anual de ajuste de honorarios**

```
Redacta el correo anual de ajuste de honorarios para enviarles a todos mis clientes, con el argumento del ajuste y sin pedir disculpas.
```

---

# Tu forma de trabajar

Antes de meter información de clientes en cualquier herramienta.

## 14 · Claude en Excel y Outlook vía conector

**Cuándo.** Antes de conectar tu correo o subir archivos de clientes a cualquier herramienta.

**Ten a mano.** Las cinco tareas de tu día que más saltos entre ventanas te cuestan.

### Prompt maestro

```
Trabajo como contador público en Venezuela y manejo información de clientes bajo secreto profesional. Quiero incorporar el trabajo asistido dentro de Excel y del correo a mi rutina diaria, sin exponer datos que no debo exponer.

MI SITUACIÓN
Versión de Office que uso: [VERSIÓN]
Cliente de correo: [OUTLOOK ESCRITORIO / OUTLOOK WEB / OTRO]
Tipo de cuenta que tengo: [PERSONAL / EMPRESARIAL]
Número de clientes que atiendo: [NÚMERO]
Tipo de información que manejo: [BALANCES, NÓMINAS CON NOMBRES Y CÉDULAS, DECLARACIONES, ETC.]

TAREAS QUE HOY ME CUESTAN SALTOS ENTRE VENTANAS
[DESCRIBE 5 TAREAS CONCRETAS DE TU DÍA, CON LOS PASOS MANUALES QUE HACES EN CADA UNA]

QUÉ NECESITO
1. De esas cinco tareas, dime cuáles se benefician de trabajar dentro de la herramienta y cuáles conviene seguir haciendo aparte, con la razón de cada una.
2. Para las que sí, escríbeme el flujo paso a paso: qué hago yo, qué le pido a la herramienta y en qué punto reviso antes de continuar.
3. Diseña mi regla de tratamiento de datos: qué información puedo procesar tal cual, cuál debo anonimizar antes y cuál no debe salir de mi equipo. Ordénala por nivel de sensibilidad.
4. Dame una técnica concreta de anonimización rápida para hojas de cálculo, que yo pueda aplicar en menos de un minuto por archivo.
5. Escríbeme una lista de verificación previa al envío de cualquier correo redactado con asistencia, de máximo cinco puntos.

REGLAS
- No afirmes qué funciones están disponibles hoy en cada plan ni qué requisitos técnicos aplican. Donde haga falta ese dato, escribe [VERIFICAR: consultar la documentación oficial].
- No propongas nada que implique subir a un servicio externo la base de datos completa de mis clientes.
- Español de Venezuela, frases cortas, formato de lista.
```

### Prompts de seguimiento

**Regla de datos para firmar en el escritorio**

```
Convierte la regla de tratamiento de datos en un documento de una página para que la firmen los dos socios y el personal del escritorio.
```

**Diez instrucciones útiles dentro de la hoja**

```
Dame diez instrucciones cortas y útiles para usar dentro de una hoja de cálculo, del tipo que resuelven algo en una sola línea.
```

**Plantillas de los correos que más repites**

```
Escribe las plantillas de los cinco correos que más repito en el mes, con variables entre corchetes, para no redactarlos desde cero cada vez.
```

---

# Aviso

Este material es formativo. No constituye asesoría contable, fiscal, laboral ni
legal, y no sustituye el juicio profesional del contador público.

Toda referencia normativa debe verificarse en la fuente oficial vigente: Gaceta
Oficial, portal del SENIAT, la ordenanza de cada municipio, los portales de los
entes parafiscales y los pronunciamientos de la Federación de Colegios de
Contadores Públicos de Venezuela. Los porcentajes de retención, el valor de la
Unidad Tributaria, las fechas de vencimiento y los días mínimos legales cambian.

Las herramientas de inteligencia artificial pueden producir información
incorrecta con apariencia de certeza. La responsabilidad profesional de todo
informe, cálculo o declaración corresponde a quien lo suscribe.

---

Estos prompts son el anexo del **Certificado Contave, Claude para Contadores**:
17 lecciones de 15 minutos que enseñan a usarlos con el caso, el paso a paso y la
verificación profesional de cada uno.

**Contave** · Contabilidad y finanzas con IA, enfocado en Venezuela · **@contave**
