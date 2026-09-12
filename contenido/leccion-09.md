---
numero: 9
titulo: Análisis de Desviaciones
duracion_min: 15
entregable: sí
---

## Lo que vas a poder hacer al terminar

Vas a explicar por qué el resultado real se apartó del presupuesto. Vas a separar la parte que es culpa de la gestión de la que es culpa del entorno. Vas a salir con el desglose por efecto y con la narrativa lista para el comité.

## Por qué esto importa en Venezuela

El análisis de desviaciones de manual supone una moneda estable. Acá no la hay, y por eso el análisis clásico de precio contra volumen se queda corto. Una desviación favorable en ventas puede ser puro efecto de inflación, sin un solo cliente nuevo. Una desviación desfavorable en costos puede ser solo la tasa moviéndose, con la operación funcionando igual de bien que siempre.

Si presentas la desviación sin descomponerla, el comité concluye lo que no es. Se felicita a comercial por un crecimiento que fue el índice de precios, o se regaña a compras por un sobrecosto que fue la tasa. Las dos cosas hacen daño.

Por eso acá el desglose útil tiene cuatro efectos, no dos: volumen, precio real, inflación y tipo de cambio. Separarlos es más trabajo, y es justo el trabajo que se puede sistematizar. Una vez que defines el método, el modelo lo aplica igual todos los meses.

El tercer punto es el presupuesto mismo. Muchas PYME presupuestan en bolívares a principio de año y a mitad de ejercicio el presupuesto ya no significa nada. Si ese es tu caso, la comparación se hace contra un presupuesto reexpresado o contra uno expresado en divisas. La alternativa es comparar contra un número que dejó de existir.

## El caso

Alimentos La Sabana, C.A. Planta de procesamiento en Guárico. Presupuestó ventas por USD 2.400.000 para el semestre y cerró en USD 2.160.000. Desviación desfavorable de USD 240.000, un 10%.

Visto así, parece un problema de comercial. Al descomponer aparece otra cosa. El volumen en toneladas estuvo 3% por encima del presupuesto. El precio promedio real por tonelada cayó 12% porque hubo que competir con importación. Y hubo un efecto de mezcla: se vendió más del producto de menor margen. Comercial vendió más producto del que se comprometió. El problema está en el precio y en la mezcla, y eso se discute con otra gente y con otras decisiones.

## Paso a paso

1. **Define contra qué comparas y en qué moneda.** Presupuesto original, presupuesto reexpresado o presupuesto en divisas. Decídelo antes de calcular.

2. **Entrega el presupuesto y el real con el mismo nivel de detalle.** Si el presupuesto está por línea de producto y el real por cliente, no hay comparación posible.

3. **Pide el desglose por efecto, no la diferencia total.** Volumen, precio, mezcla, inflación y tipo de cambio, según apliquen a tu caso.

4. **Pide el umbral de materialidad.** Que solo explique las desviaciones que pasan de un porcentaje o de un monto que tú definas. Lo demás es ruido.

5. **Pide la narrativa por área responsable.** Producción, compras, comercial, administración. Cada una con su párrafo.

6. **Pide la acción correctiva propuesta y quién la ejecuta.**

## Prompt maestro

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

## Prompts de seguimiento

```
Arma la lámina de resumen para el comité: máximo cinco líneas de texto y una tabla con las tres desviaciones más grandes ya descompuestas.
```

```
Toma la desviación de precio y estima cuánto habría que subir el volumen para compensarla sin tocar el precio. Muestra el cálculo y di si es realista según la capacidad instalada que te describí.
```

```
Revisa mi presupuesto original y dime qué supuestos ya no se sostienen, para reproyectar el semestre que viene.
```

## Ejercicio de 15 minutos

Toma el presupuesto y el real de tu última línea de negocio con desviación grande. Define la base de comparación y el umbral. Corre el prompt.

Terminaste bien si puedes decir, en una oración, qué parte de la desviación es gestión y qué parte es entorno. Si no puedes, es porque falta el dato de inflación o de tasa del periodo.

## Verificación profesional

Verifica que el presupuesto y el real cubran exactamente el mismo alcance, sin unidades o meses de más o de menos. Confirma el índice de inflación y la tasa de cambio en fuente oficial antes de publicar cualquier efecto cuantificado. Y revisa la clasificación entre controlable y entorno con criterio propio, porque de esa clasificación dependen evaluaciones de desempeño de personas. Esa decisión es del contralor, no de la herramienta.

## Error común

Presentar la desviación total sin descomponer. El comité pregunta por qué, alguien improvisa una explicación, y esa explicación improvisada se convierte en la versión oficial. Tres meses después se toma una decisión basada en ella. El desglose por efecto toma quince minutos y evita eso.

## Resumen en 3 líneas

En Venezuela el desglose son cuatro efectos: volumen, precio, inflación y tipo de cambio.
Comparar contra un presupuesto nominal de hace ocho meses es comparar contra nada.
Separar gestión de entorno es el trabajo, porque de ahí salen evaluaciones de personas.
