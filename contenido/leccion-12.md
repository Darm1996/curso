---
numero: 12
titulo: Automatización de Conciliaciones
duracion_min: 13
entregable: sí
---

## Lo que vas a poder hacer al terminar

Vas a conciliar un banco contra la contabilidad y salir con las partidas conciliatorias ya clasificadas. Se acabó la diferencia global que hay que perseguir a mano. Sirve igual para conciliar cuentas por cobrar contra el estado del cliente, o el inventario del sistema contra el conteo físico.

## Por qué esto importa en Venezuela

La conciliación bancaria acá tiene una complicación que no aparece en los manuales: la misma operación se registra a tasas distintas. La contabilidad registra el ingreso a la tasa del día de la operación. El banco acredita a la tasa del día de la liquidación. La diferencia no es un error, y sin embargo aparece como partida conciliatoria todos los meses.

El segundo tema es el IGTF. Los débitos por ese impuesto aparecen en el estado de cuenta con descripciones poco claras y con montos pequeños, y son muchos. Si no los tratas como una categoría propia, contaminan la conciliación con decenas de partidas menores que esconden la que sí importa.

Lo tercero es el formato. Los estados de cuenta de la banca nacional se descargan en formatos que cambian entre bancos y, a veces, entre meses del mismo banco. Ese trabajo de normalizar es mecánico y se automatiza bien.

## El caso

Farmacia Nuevo Siglo, C.A. Tres sucursales en Caracas, cuatro cuentas bancarias, dos en bolívares y dos en divisas. La contadora dedica dos días de cada mes a conciliar.

De las ciento ochenta partidas conciliatorias que aparecen, ciento veinte son débitos de IGTF y comisiones bancarias que ella ya sabe que están bien. Otras cuarenta son diferencias de tasa entre la fecha de operación y la de liquidación. Las veinte que de verdad requieren atención están mezcladas entre las otras ciento sesenta. Su trabajo real es de veinte partidas, y le cuesta dos días encontrarlas.

## Paso a paso

1. **Normaliza los dos lados antes de comparar.** Misma estructura de columnas: fecha, referencia, descripción, monto, moneda. Este paso también se lo puedes pedir al modelo.

2. **Define las reglas de coincidencia.** Por referencia exacta primero, por monto y fecha aproximada después, y por monto con tolerancia al final.

3. **Declara las categorías conocidas.** IGTF, comisiones, intereses, diferencias de tasa. Las que ya sabes que van a aparecer y no son problema.

4. **Pide la clasificación de las partidas que no cruzan.** En banco y no en libros, en libros y no en banco, cruzadas con diferencia de monto.

5. **Pide el asiento de ajuste propuesto para cada categoría.**

6. **Pide la conciliación formal armada**, con saldo según banco, partidas y saldo según libros.

## Prompt maestro

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

## Prompts de seguimiento

```
De las partidas que quedaron sin resolver, redacta el correo al banco solicitando el detalle de cada una, con la referencia y la fecha.
```

```
Analiza las partidas en libros y no en banco de los últimos tres meses y dime si hay un patrón que indique una falla de proceso en vez de un caso aislado.
```

```
Diseña la plantilla mensual de esta conciliación para que el mes que viene solo tenga que pegar los dos archivos y correr el mismo prompt.
```

## Ejercicio de 15 minutos

Toma el estado de cuenta y el mayor de tu cuenta con más movimientos del último mes. Declara las categorías conocidas. Corre el prompt.

Terminaste bien si la lista de partidas que requieren investigación real quedó en menos de la cuarta parte del total de diferencias. Si quedó larga, faltó declarar categorías conocidas.

## Verificación profesional

El saldo del estado de cuenta se confirma contra el documento original del banco, no contra lo que alguien transcribió. Cada asiento de ajuste propuesto se revisa antes de registrarlo, con cuenta contable y periodo correctos. Y cualquier partida antigua sin resolver se investiga en serio, porque una diferencia que lleva meses arrastrándose suele tapar algo. Una conciliación que cuadra porque se forzó un ajuste no es una conciliación.

## Error común

No declarar las categorías conocidas. El modelo devuelve ciento ochenta partidas conciliatorias con el mismo nivel de importancia, entre ellas ciento veinte débitos de IGTF perfectamente normales. Tú vuelves a filtrar a mano. Automatizaste la parte fácil y te quedaste con el trabajo de siempre.

## Resumen en 3 líneas

Declara las categorías conocidas o el resultado va a ser tan largo como el problema original.
La diferencia de tasa entre fecha de operación y de liquidación es partida esperada, no error.
Una conciliación que cuadra a punta de ajustes forzados no está conciliada.
