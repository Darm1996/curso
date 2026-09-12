---
numero: 8
titulo: Automatización de Flujos de Cuentas por Pagar
duracion_min: 14
entregable: sí
---

## Lo que vas a poder hacer al terminar

Vas a procesar un lote de facturas de proveedores. Sales con el cálculo de retenciones, el monto neto a pagar y el borrador de los comprobantes. Claude arma la mecánica y te marca lo que no cuadra. Tú validas los porcentajes contra la norma vigente y firmas.

## Por qué esto importa en Venezuela

Pagarle a un proveedor acá no es emitir un cheque. Es un proceso con dos retenciones que se calculan sobre bases distintas y se declaran en momentos distintos.

La retención de IVA aplica si la empresa fue designada agente de retención. Se calcula sobre el impuesto de la factura, no sobre el total. La Providencia SNAT/2025/000054, vigente desde agosto de 2025, fija la retención general en 75% del impuesto causado. Sube a 100% en cuatro supuestos. Proveedor no inscrito en el RIF. Datos que no coinciden con la factura. Impuesto no discriminado. Factura que no cumple los requisitos formales. [CONFIRMAR VIGENCIA]

Antes de aplicar el porcentaje se consulta el RIF del proveedor en el portal del SENIAT. Esa consulta es la que te dice si va 75% o 100%. Es el paso que más se salta. Una factura con un requisito formal incompleto cambia el porcentaje aplicable. Ese detalle se revisa factura por factura.

La retención de ISLR se rige por el Decreto 1808 y funciona distinto. Depende del concepto del pago: honorarios profesionales, comisiones, arrendamientos, fletes, servicios. Y del tipo de beneficiario, persona natural o jurídica, residente o no. El artículo 9 del decreto trae veintiún numerales, uno por concepto. Los honorarios profesionales, por ejemplo, retienen 3% a persona natural residente y 5% a persona jurídica domiciliada. [CONFIRMAR VIGENCIA]

Acá entra el sustraendo, que es donde más gente se equivoca. Cuando el beneficiario es persona natural residente, la retención no es una multiplicación simple. Se aplica el porcentaje sobre el pago y después se **resta** un monto fijo llamado sustraendo. Ese sustraendo existe para reconocer el tramo de ingreso que no está sujeto a retención. La fórmula es 83,3334 por el valor de la Unidad Tributaria por el porcentaje de retención. El factor 83,3334 sale de dividir 1.000 unidades tributarias entre doce meses. Con la UT en Bs. 43,00, una retención del 3% da un sustraendo de Bs. 107,50. [CONFIRMAR VIGENCIA] Si el resultado de la resta da negativo, no hay retención. Muchos sistemas mal configurados olvidan el sustraendo y retienen de más. El proveedor reclama, con razón.

## El caso

Constructora Vargas, C.A. Empresa de Puerto La Cruz, contribuyente especial y agente de retención. Procesa entre ochenta y cien facturas de proveedores al mes.

El analista de cuentas por pagar dedica día y medio de cada quincena a calcular retenciones a mano en una hoja. Tiene tres proveedores personas naturales que prestan servicios profesionales, y ahí es donde se le presentan las diferencias. El mes pasado retuvo de más a dos de ellos por no aplicar el sustraendo. Hubo que emitir notas y rehacer comprobantes.

## Paso a paso

1. **Carga la ficha de cada proveedor antes que las facturas.** RIF, tipo de persona, si es contribuyente especial, condición de residencia y el concepto de la operación. Sin esto no hay cálculo correcto.

2. **Entrega el detalle de cada factura, no el total.** Base imponible, IVA discriminado, monto exento si lo hay, número de control y fecha.

3. **Pega los porcentajes vigentes que tú verificaste.** Este paso es igual al de la lección 3. Tú traes la tabla de la fuente oficial. El modelo la aplica.

4. **Pide el cálculo mostrando la operación completa.** Base, porcentaje, resultado bruto, sustraendo cuando aplique, retención final.

5. **Pide la validación formal de la factura.** Que marque las que tienen datos incompletos antes de que las pagues.

6. **Pide el resumen para la declaración y el borrador de los comprobantes.**

## Prompt maestro

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

## Prompts de seguimiento

```
Arma la lista de pago priorizada de esta quincena según vencimiento, monto y criticidad del proveedor para la operación.
```

```
Revisa las facturas marcadas con datos incompletos y redáctame el correo que le voy a enviar a cada proveedor pidiendo la corrección.
```

```
Diseña la plantilla de la ficha de proveedor que debería llenarse al darlo de alta, con todos los campos necesarios para calcular retenciones sin volver a preguntar nada.
```

## Ejercicio de 15 minutos

Toma diez facturas de la última quincena, incluyendo al menos una de un proveedor persona natural. Verifica los porcentajes en fuente oficial y pégalos en el prompt. Corre el cálculo.

Terminaste bien si el resultado coincide con lo que retuviste de verdad. Si hay diferencia en la factura de la persona natural, revisa el sustraendo. Casi siempre es ahí.

## Verificación profesional

Los porcentajes se verifican en fuente oficial cada periodo, porque cambian. El sustraendo se recalcula cuando cambia la Unidad Tributaria. Antes de enterar, cuadras el total retenido contra la suma de los comprobantes emitidos. Y revisas que ningún comprobante salga con el RIF mal escrito, porque corregirlo después implica anular y reemitir. Enterar de menos genera responsabilidad solidaria para la empresa. Ese riesgo lo asumes tú, no la herramienta.

## Error común

Dejar que el modelo aporte los porcentajes de retención. Te devuelve una tabla completa, ordenada, con aspecto de verdad. Aplicas un porcentaje que cambió hace dos años y retienes mal ochenta facturas. La corrección implica notas, comprobantes anulados, un proveedor molesto y una exposición frente al SENIAT que no tenías por qué asumir.

## Resumen en 3 líneas

Los porcentajes los traes tú de fuente oficial. El modelo solo los aplica.
Persona natural residente lleva sustraendo: se aplica el porcentaje y después se resta.
Valida los requisitos formales de la factura antes de pagar, no después.
