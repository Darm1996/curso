---
numero: 1
titulo: Análisis de Estados Financieros
duracion_min: 16
entregable: sí
---

## Lo que vas a poder hacer al terminar

Vas a tomar el balance general y el estado de resultados de un cliente, entregárselos a Claude y salir con un análisis de ratios comentado, con la tendencia entre dos periodos y con los tres o cuatro puntos que ameritan una conversación seria con el dueño. Lo que hoy te toma media mañana armando fórmulas en una hoja que arrastras año tras año, lo vas a resolver en un cuarto de hora. Y sales con el texto ya redactado en un lenguaje que el cliente entiende sin que se lo traduzcas.

## Por qué esto importa en Venezuela

Un ratio es una división. La trampa está en lo que divides. Acá los estados financieros arrastran un problema que ningún manual internacional te resuelve: las cifras de dos periodos distintos no son comparables si no están reexpresadas. El BA VEN-NIF N° 2 obliga a aplicar NIC 29 mientras la economía se considere hiperinflacionaria [VERIFICAR: vigencia y alcance del BA VEN-NIF N° 2 aplicable al ejercicio que estés analizando]. Si comparas las ventas de un año contra las del anterior en bolívares nominales, no estás midiendo crecimiento. Estás midiendo cuánto perdió la moneda.

A eso se le suma la multimoneda. Muchas PYME facturan en bolívares a tasa BCV del día, cobran una parte en divisas y compran el inventario en dólares. El margen bruto termina dependiendo de la fecha del cobro tanto como de la política de precios. Un análisis que ignore eso va a concluir cosas falsas sobre la eficiencia del negocio y te va a hacer quedar mal en la reunión.

La tercera capa es práctica. La PYME venezolana rara vez tiene estados auditados, y la contabilidad suele ir corriendo detrás del SENIAT. Tu trabajo como analista empieza antes del ratio. Empieza preguntando si los saldos están completos, si el inventario se contó de verdad y si las cuentas por cobrar incluyen partidas que ya nadie va a cobrar. Claude te ayuda a hacer esas preguntas de forma sistemática. No te ayuda a saltárselas.

## El caso

Distribuidora Almeida, C.A. Empresa familiar de Maracay. Vende alimentos secos a bodegas y abastos del estado Aragua. Cierra el 31 de diciembre. Las cifras ya vienen reexpresadas y el equipo las lleva también en dólares para poder comparar.

| Partida | 2024 | 2023 |
|---|---|---|
| Ventas | USD 1.840.000 | USD 1.610.000 |
| Costo de ventas | USD 1.490.000 | USD 1.240.000 |
| Inventario | USD 395.000 | USD 240.000 |
| Cuentas por cobrar | USD 310.000 | USD 180.000 |
| Efectivo | USD 42.000 | USD 95.000 |
| Cuentas por pagar | USD 265.000 | USD 210.000 |
| Préstamo bancario corto plazo | USD 180.000 | USD 60.000 |

El dueño llega a la reunión contento. Vendió 14% más que el año pasado. Lo que no vio es que el margen bruto bajó de 23% a 19%, que el inventario creció 65% y que el efectivo se redujo a menos de la mitad. Vendió más y tiene menos plata. Esa es la historia que tienes que contarle.

## Paso a paso

1. **Ordena los datos antes de subirlos.** Pasa el balance y el estado de resultados a una tabla limpia, con una columna por periodo y las partidas con el mismo nombre en ambos años. Si las cuentas cambiaron de nombre entre periodos, unifícalas tú. Claude no adivina que "Efectos por cobrar" y "Cuentas por cobrar comerciales" son lo mismo.

2. **Declara la base de medición en el propio prompt.** Dile si las cifras están reexpresadas, si están en bolívares nominales o si están convertidas a dólares y a qué tasa. Este es el paso que casi todo el mundo se salta. De acá depende que el análisis sirva o no.

3. **Pide los ratios con la fórmula visible.** Que no te dé solo el número. Que te muestre numerador y denominador. Así verificas en segundos si tomó la partida correcta.

4. **Pide la lectura de tendencia, no la foto.** Un ratio aislado no dice nada. Lo que dice algo es que la rotación de inventario pasó de 5,2 a 3,8 veces mientras las ventas subían.

5. **Pide las preguntas para el cliente.** El entregable útil no es la tabla de ratios. Son las cinco preguntas que le vas a hacer al dueño el lunes.

6. **Verifica a mano los dos o tres números que vas a citar en la reunión.** Los que van en el correo o en la diapositiva. Esos los recalculas tú.

## Prompt maestro

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

## Prompts de seguimiento

```
Del análisis anterior, arma el borrador del correo que le voy a enviar al dueño. Máximo 200 palabras, sin tecnicismos, y que cierre pidiendo una reunión de 30 minutos.
```

```
Toma el deterioro de la rotación de inventario y estima cuánto efectivo está inmovilizado de más contra el nivel del año anterior. Muéstrame el cálculo paso a paso.
```

```
Arma una tabla de los mismos ratios pero proyectando el escenario en que la empresa cobra la mitad de la cartera vencida. Indica qué supuestos estás usando.
```

## Ejercicio de 15 minutos

Toma los estados financieros de un cliente real que tengas a mano, de dos periodos. Anonimiza el nombre. Corre el prompt maestro tal cual, cambiando solo las variables entre corchetes. Cronometra.

Terminaste bien si a los quince minutos tienes: la tabla de ratios con fórmulas visibles, un párrafo de tendencia por bloque y las cinco preguntas para el cliente. Si el resultado te salió genérico, casi siempre es porque no declaraste la base de medición.

## Verificación profesional

Antes de mandar cualquier cosa, revisa a mano: que cada ratio use las partidas que tú habrías usado, que el periodo de cada cifra sea el correcto y que ninguna afirmación normativa haya entrado sin que tú la confirmes en fuente oficial. Si el modelo calculó ratios sobre cifras en bolívares nominales de periodos distintos, el análisis de tendencia se descarta completo. Ese resultado no se corrige con una nota al pie. Se rehace.

## Error común

Subir las cifras sin decir en qué base están. El modelo asume que son comparables, calcula un crecimiento en ventas de 300% y escribe un párrafo entusiasta sobre la expansión del negocio. Tú lo llevas a la reunión y el dueño, que sí sabe lo que vendió, se da cuenta de que el número no tiene sentido. Perdiste la credibilidad del informe completo por una línea de contexto que faltaba.

## Resumen en 3 líneas

Declara siempre la base de medición antes de pedir ratios, o el análisis de tendencia no vale.
Pide fórmulas visibles para poder verificar en segundos.
El entregable que te pagan no es la tabla de ratios, son las preguntas que le haces al dueño.
