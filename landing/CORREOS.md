# Secuencia de correos

Los 19 correos de `/emails` salen solos. Esto explica cómo.

## Cómo funciona

```
Formulario  ->  /api/leads  ->  insert en leads (clave anónima)
                                       |
                                       v
                        disparador en Postgres programa
                        las 19 filas en la tabla envios
                                       |
                                       v
            cron cada hora  ->  /api/cron/secuencia  ->  Resend
```

El día 0 se programa para el momento del registro, así que sale en la corrida
siguiente. Los días 1 a 18 salen a las 8 de la mañana de Caracas del día que
les toca, sin importar a qué hora se registró la persona.

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
