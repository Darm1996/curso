---
numero: 2
titulo: Automatización del Cierre de Mes
duracion_min: 15
entregable: sí
---

## Lo que vas a poder hacer al terminar

Vas a convertir tu cierre mensual en una lista de control que se ejecuta igual todos los meses, sin depender de la memoria de quien lo hizo la vez pasada. Claude te va a redactar los asientos recurrentes, te va a armar el borrador de la narrativa de variaciones y te va a decir qué falta antes de que el gerente te lo pregunte. El cierre no se hace solo. Lo que desaparece es el tiempo que hoy gastas reconstruyendo qué se hizo y qué quedó pendiente.

## Por qué esto importa en Venezuela

El cierre acá tiene pasos que no aparecen en ningún manual de otra parte. La reexpresión por inflación, la valoración de partidas en moneda extranjera a tasa BCV de cierre, la diferencia cambiaria del mes y la conciliación entre lo que declaraste al SENIAT y lo que registró la contabilidad. Cada uno de esos pasos tiene un orden. Si reexpresas antes de ajustar la diferencia cambiaria, el número te sale mal y lo vas a descubrir tres meses después.

El segundo problema es la rotación de personal. En la PYME venezolana el asistente contable que armaba el cierre se fue, y con él se fue el conocimiento de por qué la cuenta 6.2.01 se distribuye 60/40 entre dos centros de costo. Una lista de control escrita, con el porqué de cada paso, es lo que evita que el cierre se degrade cada vez que cambia alguien.

Lo tercero es el calendario. El cierre contable compite con las obligaciones fiscales del mes. Si el cierre se te va al día doce, ya estás corriendo con la declaración. Ganar tres días de cierre es ganar tres días de tranquilidad fiscal.

## El caso

Metalúrgica El Tigre, C.A. Taller de estructuras metálicas en Anzoátegui. Cuarenta empleados. El cierre de cada mes le toma nueve días hábiles al departamento de contabilidad. De esos nueve días, cuatro se van en perseguir información: las facturas de compra que el almacén no entregó, la relación de anticipos del área comercial y el corte de producción en proceso.

El gerente general pide los estados el día cinco. Nunca los recibe antes del día doce. Cuando llegan, lo primero que pregunta es por qué el costo de materia prima subió. Nadie tiene la respuesta lista, y se van otros dos días en armarla.

## Paso a paso

1. **Escribe el cierre que haces hoy, aunque esté desordenado.** Lista los pasos tal como ocurren, con el responsable y el insumo que necesita cada uno. No lo mejores todavía. Claude no puede ordenar un proceso que no le describiste.

2. **Pídele que lo convierta en una lista de control secuenciada.** Con dependencias explícitas: qué paso no puede empezar hasta que otro termine. Acá es donde saltan los cuellos de botella que llevas años sufriendo sin verlos.

3. **Saca los asientos recurrentes a una plantilla.** Depreciación, amortización de seguros, provisión de utilidades, diferencia cambiaria. Que el modelo te escriba el asiento tipo con la fórmula del monto y la fuente del dato.

4. **Automatiza la narrativa de variaciones.** Le entregas el comparativo mes contra mes y te devuelve el borrador de las explicaciones. Tú corriges y firmas.

5. **Cierra con la lista de pendientes.** Qué quedó sin conciliar, qué está estimado y qué hay que ajustar el mes que viene. Este documento vale oro en la próxima auditoría.

## Prompt maestro

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

## Prompts de seguimiento

```
De la lista anterior, dime cuáles tres pasos me darían más días de ganancia si los resuelvo primero, y qué tendría que cambiar en la empresa para lograrlo.
```

```
Redacta el correo que le voy a mandar al jefe de almacén explicando qué necesito de él, para cuándo, y qué pasa con el cierre si no llega a tiempo. Tono firme pero de colega.
```

```
Arma el formato de la hoja de pendientes de cierre: columnas, qué se registra en cada una y un ejemplo lleno.
```

## Ejercicio de 15 minutos

Escribe tu cierre actual en bruto, sin editar, como te salga. Diez minutos máximo. Córrelo por el prompt maestro. Lee la ruta crítica que te devolvió.

Terminaste bien si identificaste al menos un paso que hoy haces en serie y podrías hacer en paralelo. Casi siempre aparece uno. Si no apareció ninguno, es señal de que describiste el proceso ideal en vez del real.

## Verificación profesional

El orden de los ajustes de cierre lo validas tú. En particular la secuencia entre la valoración de partidas en moneda extranjera y la reexpresión por inflación. Un modelo puede proponer un orden razonable y estar equivocado para tu caso. Revisa también que ningún asiento recurrente propuesto cambie un criterio contable que ya venías aplicando. La consistencia entre periodos pesa más que la elegancia del asiento.

## Error común

Pedirle a Claude que diseñe el cierre ideal en vez de que ordene el tuyo. Te devuelve un proceso de libro, impecable, que supone un ERP integrado y un área de costos que no tienes. Nadie lo sigue, y a los dos meses estás cerrando igual que antes. La lista de control sirve cuando parte de lo que haces hoy.

## Resumen en 3 líneas

Describe tu cierre real, con demoras y todo, antes de pedir que lo ordenen.
La ruta crítica es donde están tus días perdidos, no en los pasos que más te cuestan.
La hoja de pendientes de cierre es el documento que te salva en la auditoría del año que viene.
