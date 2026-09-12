# Secuencia de correos

Diecinueve correos: bienvenida, uno por cada lección y el cierre con el
certificado.

| Archivo | Cuándo sale |
|---|---|
| `dia-00-bienvenida.md` | Al suscribirse, antes de empezar |
| `dia-01.md` a `dia-17.md` | Un correo diario, una lección cada uno |
| `dia-18-certificado.md` | Al día siguiente de la última lección |

## Formato

Cada archivo lleva frontmatter y cuerpo en markdown:

```yaml
---
dia: 1              # número de día, coincide con el nombre del archivo
leccion: 1          # lección que entrega, o null en bienvenida y cierre
asunto: "..."       # máximo 50 caracteres
preencabezado: "..." # el texto que se ve junto al asunto en la bandeja
---
```

El cuerpo va entre 150 y 200 palabras y cierra con el ejercicio de quince
minutos. El correo entrega la lección, no la resume ni la promociona: quien solo
lea el correo y haga el ejercicio ya se llevó algo utilizable.

## Verificación

```bash
node verificar.mjs
```

Falla, no advierte, si algo se sale de norma:

- los 19 correos, con los días 0 a 18 sin huecos ni repetidos
- asunto de 50 caracteres o menos
- cuerpo entre 150 y 200 palabras
- ninguna oración de más de 25 palabras
- ninguna raya larga ni frase de la lista prohibida del `CLAUDE.md`
- cada correo de lección cierra con el ejercicio

## Envío

Los archivos son markdown plano, sin plantilla HTML. Se pegan en la herramienta
de correo que uses. El `preencabezado` va en el campo de preheader, que la
mayoría de las plataformas tiene aparte del asunto.

El día 18 lleva el certificado adjunto, que sale de `pdf/curso-contave.pdf`, en
su última página.
