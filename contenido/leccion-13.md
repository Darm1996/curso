---
numero: 13
titulo: Procesamiento de Nóminas
duracion_min: 15
entregable: sí
---

## Lo que vas a poder hacer al terminar

Vas a calcular una liquidación de prestaciones sociales completa, con el sistema dual del artículo 142 de la LOTTT. Vas a poder explicarle al trabajador de dónde sale cada cifra. Vas a construir el salario integral con sus alícuotas y vas a separar lo salarial de lo que no lo es.

## Por qué esto importa en Venezuela

La nómina venezolana es el área donde un error se convierte en demanda laboral. El punto donde más se falla es el artículo 142 de la LOTTT. El sistema es dual y mucha gente calcula solo una de las dos vías. [VERIFICAR: texto vigente de los artículos 142 y 122 de la LOTTT antes de aplicar cualquier cálculo]

Por un lado corre la garantía de prestaciones sociales. Se deposita trimestralmente, a razón de quince días de salario por trimestre, calculados con el último salario del trimestre. A eso se suman dos días adicionales por año a partir del segundo, acumulativos hasta treinta. Por el otro corre el cálculo retroactivo. Son treinta días de salario por año de servicio o fracción superior a seis meses, calculados con el último salario integral del trabajador. Al terminar la relación laboral se comparan ambos resultados y se paga el que sea mayor. Quien calcula solo la garantía acumulada casi siempre paga de menos, porque en un contexto inflacionario el retroactivo al último salario suele ganar por mucho.

El salario integral es la otra trampa. No es el sueldo. Es el salario normal más la alícuota de utilidades más la alícuota de bono vacacional. Si construyes mal el salario integral, todo lo que venga después queda mal: prestaciones, vacaciones y la indemnización del artículo 92 si hubo despido injustificado.

Y está la distinción entre conceptos salariales y no salariales. El beneficio de alimentación tiene un tratamiento propio [VERIFICAR: carácter salarial o no salarial del beneficio de alimentación según la normativa vigente]. Ponerlo del lado equivocado infla o desinfla la base de todo el cálculo.

## El caso

Panadería La Espiga, C.A. Caracas. Un trabajador con seis años y ocho meses de servicio renuncia. Salario normal mensual al momento del retiro: el equivalente a USD 180. La empresa paga utilidades de treinta días y bono vacacional de quince días al año [VERIFICAR: días mínimos legales aplicables].

La administradora calcula la liquidación sumando lo depositado en el fideicomiso. El trabajador consulta, alguien le calcula el retroactivo sobre el último salario integral, y la diferencia es grande. La empresa paga la diferencia más el costo de la discusión. El cálculo correcto desde el principio habría costado quince minutos.

## Paso a paso

1. **Arma primero el salario integral, con sus componentes visibles.** Salario normal, alícuota de utilidades, alícuota de bono vacacional. Con la fórmula de cada alícuota a la vista.

2. **Clasifica cada concepto de la nómina como salarial o no salarial.** Antes de calcular nada. Esta clasificación determina todo lo demás.

3. **Calcula las dos vías del artículo 142 por separado.** Garantía trimestral acumulada por un lado, retroactivo por el otro. Nunca una sola.

4. **Compara y toma el mayor.** Que el cálculo muestre ambos resultados, para que quede documentado por qué se pagó el que se pagó.

5. **Agrega los demás conceptos.** Vacaciones y bono vacacional vencidos y fraccionados, utilidades fraccionadas, intereses sobre prestaciones, y la indemnización del artículo 92 si el retiro fue por despido injustificado.

6. **Pide el desglose explicado para el trabajador.** Concepto, base, fórmula y monto.

## Prompt maestro

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

## Prompts de seguimiento

```
Calcula los aportes parafiscales que la empresa debió hacer por este trabajador durante el último año, separando la cuota patronal de la del trabajador. Marca las alícuotas como [VERIFICAR].
```

```
Simula el mismo cálculo si la terminación hubiese sido por despido injustificado, y dime cuánto más costaría.
```

```
Redacta la carta de finiquito y el recibo de pago, con los espacios para firma y cédula del trabajador.
```

## Ejercicio de 15 minutos

Toma la liquidación de un trabajador que ya calculaste. Corre el prompt maestro con el histórico salarial completo. Compara las dos vías del artículo 142.

Terminaste bien si puedes decir cuál de las dos ganó y por qué. Si en tu cálculo original solo habías considerado la garantía acumulada, acabas de encontrar una diferencia. Vale la pena revisarla en todas las liquidaciones del año.

## Verificación profesional

Tres cosas se verifican en el texto vigente de la LOTTT y su reglamento. Los días mínimos legales, las tasas de interés sobre prestaciones y el carácter salarial de cada concepto. El histórico salarial se contrasta contra los recibos de pago, uno por uno. Un salario mal cargado en un trimestre arrastra el error hasta el final. Y toda liquidación se revisa a mano antes de pagarse. Una diferencia acá no es un ajuste contable. Es una demanda laboral con intereses.

## Error común

Pagar solo la garantía de prestaciones acumulada en el fideicomiso, sin calcular el retroactivo. Es el error más frecuente y el más caro. Con inflación de por medio, el retroactivo calculado al último salario integral casi siempre resulta mayor. La empresa cree que cumplió, el trabajador consulta, y la diferencia se paga igual, más el costo del conflicto.

## Resumen en 3 líneas

El artículo 142 es dual: se calculan las dos vías y se paga la mayor, siempre.
Salario integral es salario normal más alícuota de utilidades más alícuota de bono vacacional.
Clasificar salarial contra no salarial va antes de cualquier cálculo, porque define todas las bases.
