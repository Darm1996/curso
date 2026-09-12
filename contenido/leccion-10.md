---
numero: 10
titulo: Redacción de Informes para Clientes
duracion_min: 12
entregable: sí
---

## Lo que vas a poder hacer al terminar

Vas a convertir un análisis técnico en un informe que el cliente lee completo y entiende sin llamarte. El trabajo contable ya lo hiciste. Lo que falta es que se note. Esta lección es sobre eso.

## Por qué esto importa en Venezuela

El contador venezolano entrega mucho más valor del que cobra, y una razón es la forma del entregable. Un archivo de Excel con doce hojas y un mensaje de WhatsApp que dice "ahí te mandé el análisis". Eso no se percibe como un servicio profesional. Se percibe como un favor. Y a los favores no se les suben los honorarios.

Hay una diferencia de lenguaje que pesa. El dueño de una PYME no está pensando en ratios ni en reexpresión. Está pensando en si le alcanza, si el negocio está mejor que el año pasado y si el SENIAT le va a caer encima. Si tu informe abre con la metodología, lo cierra en la primera página. Si abre con las tres cosas que tiene que decidir, lo lee completo.

Está también la protección profesional. Un informe con alcance, limitaciones y fuentes declaradas te cubre. Un mensaje suelto no te cubre nada. El cliente va a tomar decisiones con base en tu trabajo. Cuando algo salga distinto, la diferencia entre un problema y una conversación es que exista el documento.

## El caso

Repuestos del Llano, C.A. Cliente de San Fernando de Apure. El contador le entregó un análisis financiero completo, bien hecho, en una hoja de cálculo de ocho pestañas.

El dueño la abrió, vio la primera pestaña, no entendió, y la cerró. Dos semanas después tomó una decisión de inversión que el análisis desaconsejaba. Cuando salió mal preguntó por qué nadie le había advertido. La advertencia estaba en la pestaña seis, fila cuarenta y dos.

## Paso a paso

1. **Define quién lee y qué decide.** No es lo mismo un informe para el dueño que para un banco o para un socio de afuera. La misma información, en orden distinto.

2. **Entrega el análisis técnico completo como insumo.** Todo, sin filtrar. El modelo no puede priorizar lo que no ve.

3. **Pide la estructura de pirámide invertida.** Conclusión primero, soporte después, detalle al final en anexo.

4. **Fija el límite de extensión.** Dos páginas de cuerpo. Lo que no cabe va a anexo. Sin límite no hay jerarquía.

5. **Pide la sección de alcance y limitaciones.** Qué revisaste, qué no, sobre qué información y con qué fecha de corte.

6. **Léelo en voz alta antes de mandarlo.** Si una frase no la dirías en la reunión, se reescribe.

## Prompt maestro

```
Actúa como socio de una firma contable venezolana redactando el informe final para un cliente.

QUIÉN LO VA A LEER
Destinatario: [DUEÑO DE LA EMPRESA / JUNTA DIRECTIVA / BANCO / SOCIO EN EL EXTERIOR]
Nivel de conocimiento contable del lector: [ALTO / MEDIO / NINGUNO]
Decisión concreta que este lector tiene que tomar: [DESCRÍBELA]
Relación con el cliente: [NUEVO / DE VARIOS AÑOS]

TRABAJO REALIZADO
Tipo de encargo: [ANÁLISIS FINANCIERO / REVISIÓN FISCAL / CIERRE / DIAGNÓSTICO]
Periodo cubierto: [PERIODO]. Fecha de corte de la información: [FECHA]
Información sobre la que trabajé: [BALANZA, ESTADOS FINANCIEROS, DECLARACIONES, ETC.]
Qué NO estuvo dentro del alcance: [DESCRIBE]

ANÁLISIS TÉCNICO COMPLETO
[PEGA AQUÍ TODO TU ANÁLISIS, SIN FILTRAR, CON NÚMEROS Y CONCLUSIONES]

QUÉ NECESITO
Un informe con esta estructura:
1. Resumen ejecutivo. Máximo media página. Las tres conclusiones principales y las decisiones que sugieren. Va primero, antes que cualquier metodología.
2. Situación actual. Qué muestra la información, en lenguaje del negocio, no en lenguaje contable. Si usas un término técnico, explícalo en la misma oración.
3. Hallazgos. Máximo cinco, ordenados por impacto económico. Cada uno con el número que lo respalda y su consecuencia práctica.
4. Recomendaciones. Concretas, con responsable y plazo sugerido. Nada de "se recomienda evaluar".
5. Alcance y limitaciones. Sobre qué información trabajé, con qué fecha de corte, qué no revisé y qué debe verificarse en fuente oficial.
6. Anexos. Todo el detalle técnico y las tablas.

REGLAS DE ESCRITURA
- Cuerpo del informe: máximo dos páginas. Lo que no quepa, va a anexo.
- Español de Venezuela, tuteo con el cliente si la relación es cercana, usted si es formal. Yo te digo cuál arriba.
- Frases cortas. Nada de rayas largas como aparte. Nada de frases de relleno ni de cierres grandilocuentes.
- No suavices un hallazgo negativo. Dilo con respeto y con claridad.
- Si el análisis que te di no sostiene una recomendación, no la escribas.
```

## Prompts de seguimiento

```
Redacta el correo de dos párrafos con el que voy a enviar este informe, que diga qué es, qué necesito del cliente y para cuándo.
```

```
Adapta el mismo informe para el banco que está evaluando la línea de crédito. Cambia lo que haga falta en el orden y el énfasis, sin alterar ningún hallazgo.
```

```
Dame las cinco preguntas incómodas que este cliente me va a hacer al leer el informe, y la respuesta corta para cada una.
```

## Ejercicio de 15 minutos

Toma el último análisis que entregaste como archivo suelto. Corre el prompt maestro definiendo el destinatario y la decisión que tiene que tomar.

Terminaste bien si el resumen ejecutivo se entiende leyéndolo solo, sin abrir el anexo. Prueba a leérselo a alguien que no sea contador. Si te pide una aclaratoria, todavía falta.

## Verificación profesional

Cada cifra del informe se contrasta contra el papel de trabajo. Verifica que ninguna recomendación vaya más allá de lo que el análisis sostiene, porque el modelo tiende a completar el argumento con seguridad prestada. Revisa que la sección de alcance y limitaciones diga la verdad sobre lo que revisaste. Y confirma que ninguna afirmación normativa haya entrado sin verificación. El informe lleva tu firma.

## Error común

Dejar la conclusión para el final, como en un trabajo académico. El cliente lee la primera página, no encuentra nada que le sirva, y lo archiva. El hallazgo que le habría ahorrado plata estaba en la página cuatro. La conclusión va de primera, siempre.

## Resumen en 3 líneas

Conclusión primero, soporte después, detalle en anexo. Sin excepción.
Dos páginas de cuerpo obliga a jerarquizar. Sin límite no hay informe, hay volcado.
La sección de alcance y limitaciones es lo que te protege cuando la decisión sale mal.
