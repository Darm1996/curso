---
numero: 14
titulo: Claude en Excel y Outlook vía conector
duracion_min: 14
entregable: no
---

## Lo que vas a poder hacer al terminar

Vas a dejar de copiar y pegar entre la hoja de cálculo, el correo y el chat. Claude puede trabajar dentro de tus herramientas mediante integraciones, y eso cambia el ritmo del día. También vas a saber qué información de tus clientes puede pasar por ahí y cuál no.

## Por qué esto importa en Venezuela

El flujo real de un contador acá es un ir y venir entre el sistema contable, Excel y el correo. Se exporta, se limpia, se analiza, se redacta el correo, se adjunta. Cada salto es una oportunidad de pegar la columna equivocada o de mandarle a un cliente el archivo de otro.

Trabajar dentro de la herramienta elimina buena parte de esos saltos. El modelo lee el rango que tienes abierto y escribe la fórmula en la celda. En el correo, lee el hilo y redacta la respuesta con el contexto ya cargado.

Ahora, el punto importante y por eso esta lección no tiene entregable. Acá se manejan datos de terceros: RIF, saldos, nóminas con nombres y cédulas, cifras de empresas privadas. El secreto profesional del contador público aplica igual cuando la herramienta es nueva. Antes de conectar el correo o un repositorio de archivos de clientes, toca hacerse una pregunta. Qué información sale de tu control y bajo qué condiciones. Esa decisión es tuya y conviene tomarla con la política de tratamiento de datos delante, no después.

## El caso

Escritorio contable de dos socios en Valencia. Atienden treinta clientes. Cada socio maneja su correo, sus carpetas y sus hojas de cálculo.

Una tarde, uno de ellos responde un correo sobre un análisis de márgenes y adjunta el archivo equivocado. El cliente recibe el estado de resultados de otra empresa del mismo sector. La conversación que vino después fue incómoda y cara. El problema no fue de herramienta. Fue de flujo: demasiados saltos manuales entre ventanas.

## Paso a paso

1. **Verifica qué integraciones están disponibles en tu plan y en tu versión de Office.** Las extensiones para Excel, PowerPoint y Word están disponibles en los planes de pago. La de Outlook está en beta, también en planes de pago. Esto cambia seguido, así que confírmalo en la documentación oficial antes de instalar nada. [VERIFICAR]

2. **Empieza por un archivo sin datos de clientes.** Una plantilla propia, cifras inventadas. Aprende el comportamiento de la herramienta antes de ponerle información real.

3. **Define tu regla de datos antes de conectar el correo.** Qué se puede procesar, qué se anonimiza y qué no sale de tu computadora. Escríbela.

4. **Aprende a acotar el rango.** Trabajar sobre la selección, no sobre el libro completo. Menos contexto irrelevante, mejores respuestas y menos exposición.

5. **Usa el correo para redactar, no para decidir.** El borrador lo hace la herramienta. El envío lo haces tú, después de leerlo completo.

6. **Anonimiza cuando puedas.** Reemplazar el nombre del cliente por "Empresa A" cuesta cinco segundos y casi nunca cambia la calidad del análisis.

## Prompt maestro

```
Trabajo como contador público en Venezuela y manejo información de clientes bajo secreto profesional. Quiero incorporar el trabajo asistido dentro de Excel y del correo a mi rutina diaria, sin exponer datos que no debo exponer.

MI SITUACIÓN
Versión de Office que uso: [VERSIÓN]
Cliente de correo: [OUTLOOK ESCRITORIO / OUTLOOK WEB / OTRO]
Tipo de cuenta que tengo: [PERSONAL / EMPRESARIAL]
Número de clientes que atiendo: [NÚMERO]
Tipo de información que manejo: [BALANCES, NÓMINAS CON NOMBRES Y CÉDULAS, DECLARACIONES, ETC.]

TAREAS QUE HOY ME CUESTAN SALTOS ENTRE VENTANAS
[DESCRIBE 5 TAREAS CONCRETAS DE TU DÍA, CON LOS PASOS MANUALES QUE HACES EN CADA UNA]

QUÉ NECESITO
1. De esas cinco tareas, dime cuáles se benefician de trabajar dentro de la herramienta y cuáles conviene seguir haciendo aparte, con la razón de cada una.
2. Para las que sí, escríbeme el flujo paso a paso: qué hago yo, qué le pido a la herramienta y en qué punto reviso antes de continuar.
3. Diseña mi regla de tratamiento de datos: qué información puedo procesar tal cual, cuál debo anonimizar antes y cuál no debe salir de mi equipo. Ordénala por nivel de sensibilidad.
4. Dame una técnica concreta de anonimización rápida para hojas de cálculo, que yo pueda aplicar en menos de un minuto por archivo.
5. Escríbeme una lista de verificación previa al envío de cualquier correo redactado con asistencia, de máximo cinco puntos.

REGLAS
- No afirmes qué funciones están disponibles hoy en cada plan ni qué requisitos técnicos aplican. Donde haga falta ese dato, escribe [VERIFICAR: consultar la documentación oficial].
- No propongas nada que implique subir a un servicio externo la base de datos completa de mis clientes.
- Español de Venezuela, frases cortas, formato de lista.
```

## Prompts de seguimiento

```
Convierte la regla de tratamiento de datos en un documento de una página para que la firmen los dos socios y el personal del escritorio.
```

```
Dame diez instrucciones cortas y útiles para usar dentro de una hoja de cálculo, del tipo que resuelven algo en una sola línea.
```

```
Escribe las plantillas de los cinco correos que más repito en el mes, con variables entre corchetes, para no redactarlos desde cero cada vez.
```

## Ejercicio de 15 minutos

Escribe las cinco tareas de tu día que más saltos entre ventanas te cuestan. Corre el prompt maestro. Lee la regla de tratamiento de datos que te devolvió y ajústala a tu criterio.

Terminaste bien si tienes escrita, en un documento, tu regla de qué información se procesa y cuál no. Esta lección no tiene entregable para el cliente. El entregable es esa regla.

## Verificación profesional

La disponibilidad y los requisitos de cada integración se confirman en la documentación oficial antes de instalarla, no en un tutorial de terceros. Toda fórmula generada dentro de la hoja se valida contra un caso conocido antes de usarla en producción. Todo correo se lee completo antes de enviarlo, con especial atención al destinatario y al archivo adjunto. Y el secreto profesional sigue siendo tuyo. Ninguna herramienta lo asume por ti.

## Error común

Conectar el correo completo el primer día, con treinta clientes adentro, para probar. Se gana velocidad y se pierde el control sobre qué información quedó procesada. La secuencia correcta es al revés: primero la regla escrita, después el archivo de prueba sin datos reales, y solo entonces el trabajo del día.

## Resumen en 3 líneas

Trabajar dentro de la hoja y del correo elimina los saltos donde se cometen los errores.
Antes de conectar nada, escribe tu regla de qué información se procesa y cuál no.
Verifica disponibilidad y requisitos en la documentación oficial, porque eso cambia seguido.
