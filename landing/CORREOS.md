# Secuencia de correos

Los 19 correos de `/emails` salen solos. Esto explica cómo.

## Cómo funciona

```
Formulario  ->  /api/leads  ->  insert en leads (clave anónima)
                                  |            |
                                  |            v
                                  |    disparador en Postgres
                                  |    programa los días 1 a 18
                                  |    en la tabla envios
                                  v                 |
                       día 0 por Resend             v
                       en el acto        cron diario 12:00 UTC
                                         /api/cron/secuencia -> Resend
```

El día 0 sale en el momento del registro, desde el endpoint. Los días 1 a 18
salen a las 8 de la mañana de Caracas del día que les toca, sin importar a qué
hora se registró la persona.

## Por qué el día 0 va aparte

El plan Hobby de Vercel solo permite **un cron al día**. Está verificado: con
una expresión horaria el despliegue se rechaza con `cron_jobs_limits_reached`.

Si la bienvenida dependiera del cron, alguien que se registra a las nueve de la
mañana esperaría hasta el día siguiente. El formulario promete minutos. Por eso
ese correo sale directo desde el endpoint.

El precio de esa decisión: si Resend falla en ese instante, la persona pierde
la bienvenida. No pierde el curso, porque los días 1 al 18 ya quedaron
programados. El fallo queda en el log.

## El techo de envíos

Una corrida manda a dos por segundo durante cincuenta segundos: unos cien
correos. A diecinueve correos por persona, eso sostiene alrededor de **seis
inscripciones diarias** en régimen permanente. Si entran más, la cola crece y
no drena.

Dos salidas cuando llegue ese momento:

| Salida | Costo | Qué cambia |
|---|---|---|
| Plan Pro de Vercel | Mensual | El cron puede correr cada pocos minutos. Solo se edita `vercel.json`. |
| `pg_cron` en Supabase | Sin costo adicional | Postgres llama a esta misma ruta cada pocos minutos con `pg_net`. No cambia código. |

La segunda no la he probado en esta cuenta. Antes de contarla como hecha hay
que confirmar que las extensiones `pg_cron` y `pg_net` están disponibles en el
plan que tenga el proyecto.

## Por qué un disparador y no el endpoint

El endpoint solo tiene la clave anónima, que por diseño únicamente puede
insertar en `leads`. Para que escribiera en `envios` habría que abrirle esa
tabla a `anon`, y entonces cualquiera podría meterle filas. El disparador corre
con los permisos del dueño de la tabla y resuelve el problema sin abrir nada.

## Las dos claves de Supabase

| Clave | Dónde vive | Qué puede hacer |
|---|---|---|
| Anónima | `/api/leads` | Insertar en `leads`. Nada más. |
| De servicio | `/api/cron/secuencia` | Todo. Ignora RLS. |

La clave de servicio nunca debe usarse en una ruta que reciba entrada del
público. Si se filtra, la lista completa de correos queda expuesta.

## Variables de entorno

| Variable | Para qué | De dónde sale |
|---|---|---|
| `SUPABASE_URL` | Ya cargada | Panel de Supabase |
| `SUPABASE_ANON_KEY` | Ya cargada | Panel de Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | El trabajo periódico | Supabase, Project Settings, API |
| `RESEND_API_KEY` | Enviar | La carga sola el Marketplace de Vercel |
| `CRON_SECRET` | Proteger la ruta del cron | Se genera y se carga en Vercel |
| `CORREO_REMITENTE` | Remitente | Opcional. Sin ella se usa la dirección de prueba de Resend |

## Sobre el remitente

Mientras no haya dominio propio autenticado, el remitente es la dirección de
prueba de Resend, que solo llega al correo de la cuenta. Sirve para ver la
tubería funcionando, no para captar gente.

Con un dominio propio: se agregan SPF, DKIM y DMARC donde esté el DNS, se
verifica en Resend y se cambia `CORREO_REMITENTE`. No hace falta tocar código.

## Reintentos

Cada fila se intenta hasta tres veces y guarda el último error. Una fila sin
destinatario, o de un día que no existe, se agota de una vez: ese problema no
se arregla solo y no tiene sentido que trabe la cola.

## Revisar cómo va

```sql
-- Qué está pendiente
select dia, count(*) from envios where enviado_en is null group by dia order by dia;

-- Qué está fallando
select dia, ultimo_error, count(*) from envios
where enviado_en is null and intentos >= 3
group by dia, ultimo_error;
```

## Probar una corrida a mano

```bash
curl -H "Authorization: Bearer $CRON_SECRET" \
  https://contave-curso.vercel.app/api/cron/secuencia
```

## Chequeo de salud

```bash
curl https://contave-curso.vercel.app/api/leads
```

Dice si las variables llegaron y si Supabase responde. No devuelve ningún
valor, solo si está o no está.
