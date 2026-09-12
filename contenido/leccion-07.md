---
numero: 7
titulo: Previsión del Flujo de Caja
duracion_min: 16
entregable: sí
---

## Lo que vas a poder hacer al terminar

Vas a construir una previsión de caja semanal a trece semanas, con escenarios, y la vas a poder actualizar cada lunes en diez minutos. Es la herramienta que responde la única pregunta que de verdad quita el sueño en una PYME venezolana: hasta cuándo alcanza la plata.

## Por qué esto importa en Venezuela

La utilidad contable y la caja acá se divorcian temprano. Una empresa puede reportar ganancia y no tener con qué pagar la nómina de la quincena. Entre la inflación, el crédito a clientes y el inventario que hay que reponer más caro de lo que se vendió, el resultado del estado de resultados dice poco sobre la liquidez de la próxima semana.

Lo segundo es la moneda. Una previsión seria acá se lleva por moneda separada. Entradas en divisas, entradas en bolívares, salidas en cada una, y solo después se consolida. Proyectar todo en bolívares nominales a tres meses no sirve, porque el bolívar de la semana trece no es el mismo de la semana uno. Proyectar todo en dólares tampoco alcanza si tienes obligaciones en bolívares que crecen con la tasa.

Lo tercero es la cobranza real. La condición de venta dice treinta días. El cliente paga a cincuenta y cinco. Si la previsión usa los treinta días del contrato en vez de los cincuenta y cinco del comportamiento, te va a mentir todas las semanas. El dato que manda es el histórico de cobranza, no la política comercial.

## El caso

Textiles del Centro, C.A. Confección en Maracay, sesenta empleados. Vende a tiendas con crédito a treinta días. La cobranza real promedio ronda los cincuenta y dos días.

El gerente lleva la caja en una hoja mensual. Cada tres o cuatro meses aparece una semana en que no alcanza para la nómina y hay que salir a buscar un adelanto de un cliente o una línea del banco, a las carreras y en malas condiciones. Con una previsión semanal, esa semana se ve con cinco o seis semanas de anticipación y la conversación con el banco se tiene con calma.

## Paso a paso

1. **Arranca por el saldo de apertura real, separado por moneda y por cuenta.** Bancos en bolívares, bancos en divisas, caja chica. Sin saldo de apertura correcto no hay previsión.

2. **Carga la cartera por cobrar con fecha de factura y condición, no solo el saldo.** La previsión necesita saber cuándo vence cada cosa.

3. **Entrega el histórico de cobranza de los últimos seis meses.** De ahí sale el patrón real de días de cobro, que es el corazón del modelo.

4. **Lista las salidas comprometidas por semana.** Nómina y sus aportes, proveedores con fecha, obligaciones tributarias, servicios, alquiler, deuda financiera.

5. **Pide tres escenarios.** Base con el comportamiento histórico, conservador con cobranza más lenta, y tensión con una caída de ventas. Sin escenarios la previsión es una ilusión de precisión.

6. **Pide la alerta temprana.** En qué semana el saldo baja del mínimo operativo, y cuánto falta.

## Prompt maestro

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

## Prompts de seguimiento

```
Del escenario conservador, arma la lista de gestión de cobranza priorizada: a qué cliente llamar primero y con qué argumento, según monto y días de atraso.
```

```
Convierte la previsión en una plantilla de Excel que yo pueda actualizar cada lunes cambiando solo el saldo de apertura y la cartera. Dime qué celdas toco y cuáles no.
```

```
Simula qué pasa con las 13 semanas si negocio 30 días adicionales de plazo con mis dos proveedores más grandes. Muéstrame el antes y el después del saldo mínimo.
```

## Ejercicio de 15 minutos

Toma los saldos bancarios de hoy, la cartera por cobrar y los compromisos del próximo mes. Corre el prompt maestro con lo que tengas, aunque el histórico de cobranza sea aproximado.

Terminaste bien si conseguiste la semana en que el saldo baja del mínimo en el escenario conservador. Ese número, solo ese, ya justifica el ejercicio.

## Verificación profesional

Los saldos de apertura se confirman contra el estado de cuenta bancario, no contra la contabilidad. Las fechas de obligaciones tributarias las verificas en el calendario oficial. Y la previsión se contrasta contra la realidad cada semana: anotas lo que proyectaste y lo que pasó. A las cuatro semanas sabes si tu patrón de cobranza es el que creías. Una previsión que nunca se compara con el resultado real no mejora nunca.

## Error común

Usar la condición de venta en vez del comportamiento real de cobranza. La hoja queda linda, el saldo nunca baja del mínimo, y en la semana seis no alcanza para la nómina. El modelo proyectó lo que el contrato dice que debería pasar. La caja responde a lo que los clientes de verdad hacen.

## Resumen en 3 líneas

Proyecta por moneda separada y consolida al final, nunca al revés.
El patrón real de cobranza manda sobre la condición de venta que dice el contrato.
Sin tres escenarios, una previsión de caja es una ilusión de precisión.
