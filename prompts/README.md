# Biblioteca de prompts

`biblioteca.md` reúne los 17 prompts maestros y los 51 de seguimiento del curso,
organizados por tarea. Es el gancho de captura de la landing, así que funciona
sola: quien la reciba sin haber hecho el curso tiene que poder usarla.

## Generar

```bash
node build.mjs
```

## Por qué se genera y no se escribe

Los prompts se extraen de `/contenido`. Si copiara los 68 a mano, a la tercera
corrección de una lección la biblioteca estaría desincronizada del curso y
nadie se daría cuenta.

Lo que sí está escrito a mano es `guia.json`: a qué grupo pertenece cada
lección, cuándo se usa su prompt, qué hay que tener a mano antes de correrlo y
la etiqueta de cada prompt de seguimiento. Eso es lo que convierte una lista de
68 bloques en algo utilizable sin el curso.

## Los siete grupos

Análisis y diagnóstico financiero · Cierre, reportes y conciliaciones · Fiscal y
cumplimiento · Nómina y prestaciones · Auditoría, control interno y revisión
forense · Comunicación con clientes · Tu forma de trabajar.

Una lección pertenece a un grupo y solo a uno. El build lo comprueba.

## Verificaciones del build

Falla, no advierte, si:

- no salen 17 prompts maestros y 51 de seguimiento
- el documento no termina con 68 bloques de código
- alguna lección queda sin grupo o aparece en dos
- una lección no tiene contexto en `guia.json`
- el número de etiquetas de seguimiento no cuadra con los prompts extraídos
- la prosa del documento usa raya larga o alguna frase de la lista prohibida del
  `CLAUDE.md`

## Estructura del documento

Portada con la promesa · cómo se usan · las cuatro reglas de oro · índice por
grupo · los 7 grupos con sus prompts · aviso legal · cierre con la marca.

El aviso legal repite el del curso a propósito. Este archivo circula solo, por
correo y por redes, sin el PDF al lado.
