---
numero: 6
titulo: Creación de Informes Automatizados en Excel
duracion_min: 15
entregable: sí
---

## Lo que vas a poder hacer al terminar

Vas a dejar de armar a mano el reporte que repites todos los meses. Claude te va a escribir las fórmulas, la estructura de la hoja y, si quieres, el script que hace el trabajo pesado. Tú pegas los datos nuevos y el reporte se actualiza. La primera vez te toma quince minutos. Las siguientes veinte veces te toma dos.

## Por qué esto importa en Venezuela

El reporte mensual de una PYME acá casi siempre carga una capa extra: la conversión. El mismo estado de resultados se pide en bolívares para el SENIAT y en dólares para el dueño o para el socio de afuera. Esa doble presentación se hace a mano, con tasas pegadas en celdas sueltas, y es donde se cuelan los errores que después nadie consigue.

Hay otro punto. En muchas empresas el reporte vive en la cabeza de una persona y en un archivo con ochenta columnas ocultas. Cuando esa persona sale de vacaciones, el reporte no sale. Dejar la lógica escrita, con fórmulas explicadas y una hoja de supuestos visible, es control interno básico.

Y está el tema del sistema contable. Muchos sistemas locales exportan en formatos incómodos, con encabezados repetidos cada cierto número de filas y montos como texto. Limpiar eso es un trabajo mecánico que se automatiza bien y que hoy te está costando horas.

## El caso

Clínica Santa Elena, C.A. Centro médico de Barquisimeto. El administrador arma cada mes un reporte de ingresos por especialidad, en bolívares y en dólares. Lleva comparativo contra el mes anterior y contra el mismo mes del año pasado.

Le toma seis horas. El sistema exporta un archivo con el encabezado repetido cada cincuenta filas. Los montos vienen como texto, con punto de miles y coma decimal. Y el nombre de la especialidad aparece escrito de tres maneras distintas, según quién lo cargó. Cuatro de las seis horas se van en limpiar. Las otras dos en fórmulas que rehace desde cero cada vez.

## Paso a paso

1. **Muéstrale el archivo tal como sale del sistema.** Pega las primeras treinta filas, con la basura incluida. Si le muestras el archivo ya limpio, te va a resolver el problema que no tienes.

2. **Describe el reporte que quieres, campo por campo.** Qué filas, qué columnas, qué totales, qué comparativos. Dibújalo con palabras.

3. **Pide la hoja de supuestos separada.** Tasas, periodos, criterios de agrupación. Todo parámetro va en una sola hoja, nunca escrito dentro de una fórmula.

4. **Pide las fórmulas con explicación.** Una línea por fórmula diciendo qué hace. Esa línea es la documentación que te va a salvar en ocho meses.

5. **Pide las validaciones de cuadre.** Celdas de control que comparen el total del reporte contra el total del archivo fuente. Si no cuadra, que se vea de inmediato.

6. **Prueba con datos de un mes que ya cerraste.** El resultado tiene que darte lo mismo que diste antes. Si no da, el reporte está mal, no el cierre anterior.

## Prompt maestro

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

## Prompts de seguimiento

```
Convierte la limpieza del archivo crudo en un script de Office Scripts o en una macro VBA, según lo que corra mejor en mi versión, y explícame cómo instalarlo.
```

```
Agrega al reporte un bloque de análisis automático: tres líneas de texto que se generen con fórmulas y comenten las variaciones más grandes del mes.
```

```
Revisa la estructura que me propusiste y dime qué se rompe si el mes que viene el sistema agrega una columna nueva o cambia el orden de las existentes.
```

## Ejercicio de 15 minutos

Toma el reporte que más repites. Exporta el archivo crudo del sistema y pega las primeras treinta filas en el prompt. Describe el reporte que necesitas.

Terminaste bien si la limpieza del archivo crudo quedó resuelta sin intervención manual. Esa es la parte que te come las horas. El resto del reporte es lo fácil.

## Verificación profesional

Corre el reporte automatizado contra un mes ya cerrado y compara cifra por cifra contra lo que entregaste en su momento. Revisa que las celdas de cuadre estén funcionando de verdad, forzando un descuadre a propósito para ver si la alerta salta. Y verifica la tasa de conversión de la hoja de supuestos contra la fuente oficial antes de cada emisión. Una fórmula correcta con una tasa vieja produce un reporte equivocado que se ve perfecto.

## Error común

Pegarle el archivo ya limpio. Uno lo hace por cortesía, para que el modelo entienda mejor. El resultado es que te automatiza el veinte por ciento del trabajo y te deja el ochenta que de verdad duele. Muéstrale la basura. La limpieza es el trabajo.

## Resumen en 3 líneas

Pega el archivo crudo con la basura incluida, porque limpiar es donde se te van las horas.
Toda tasa y todo parámetro viven en la hoja de supuestos, nunca dentro de una fórmula.
El reporte no se estrena hasta que reproduce un mes ya cerrado cifra por cifra.
