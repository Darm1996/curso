# Landing del Certificado Contave

Sitio de venta y captura de correos. Next.js 16 con App Router, Tailwind y
Supabase. Desplegable en Vercel.

## Uso

```bash
npm install
cp .env.example .env.local     # y llena las dos variables
npm run dev                    # http://localhost:3000
npm run build && npm start
```

## Secciones

Hero · bloque de dolor · temario de las 17 lecciones · para quién es y para quién
no · sobre el autor · preguntas frecuentes · captura de correo · aviso normativo.

## El temario no se escribe dos veces

`src/data/temario.json` se genera desde el frontmatter de `/contenido` con
`npm run sync-temario`, que corre solo antes de cada `npm run build`. Si cambias
el título o la duración de una lección, la landing se actualiza sola.

El JSON queda versionado a propósito: en Vercel el directorio raíz del proyecto
es `/landing` y `/contenido` no viaja con el despliegue. Si el script no
encuentra `/contenido`, avisa y conserva el JSON existente en vez de fallar.

## Captura de correos

El formulario no habla con Supabase desde el navegador. Envía a `/api/leads`, que
corre en el servidor, valida y escribe.

**Por qué así.** La clave de Supabase nunca llega al navegador, por eso las
variables de entorno no llevan el prefijo `NEXT_PUBLIC_`. Y aunque llegara a
filtrarse, las políticas RLS de la tabla solo permiten `INSERT`: nadie puede leer
la lista de correos con esa clave. La lista se consulta desde el panel de
Supabase o con la clave de servicio, que no está en este proyecto.

El endpoint además:

- valida nombre y correo, con límites de longitud
- trae un campo trampa (`empresa`) que solo llenan los bots
- trata el correo repetido como éxito, sin revelar que ya estaba registrado
- responde 503 con un mensaje claro si faltan las variables de entorno, en vez
  de reventar

### Preparar la base de datos

Corre `supabase/migrations/0001_leads.sql` en el editor SQL del proyecto. Crea la
tabla `leads` con las columnas `id`, `email`, `nombre`, `origen` y `created_at`,
el índice único por correo y las políticas RLS.

### Cuidado al modificar el insert

El insert del endpoint NO lleva `.select()` ni `returning`, y tiene que seguir
así. Con RLS activo, devolver la fila insertada exige además una política de
SELECT, y `anon` no la tiene a propósito. Si alguien agrega un `.select()` para
recuperar el id, el insert empieza a fallar con "new row violates row-level
security policy" aunque la política de INSERT esté correcta.

Comprobado contra la base real: `anon` inserta, pero no lee, no actualiza y no
borra.

### Variables de entorno

| Variable | Dónde sale |
|---|---|
| `SUPABASE_URL` | Project Settings, API, Project URL |
| `SUPABASE_ANON_KEY` | Project Settings, API, anon public |
| `NEXT_PUBLIC_SITIO_URL` | Opcional, la URL pública del sitio |

En Vercel se cargan en Settings, Environment Variables. No hay llaves reales en
el repositorio.

### De dónde vino cada suscriptor

El formulario lee `?origen=` o `?utm_source=` de la URL y lo guarda en la columna
`origen`. Un enlace en la bio de Instagram sería
`https://tudominio.com/?origen=instagram-bio`.

## Despliegue en Vercel

1. Importa el repositorio.
2. Root Directory: `landing`.
3. Carga las variables de entorno.
4. Desplegar.

## Marca

Los colores y la tipografía son los mismos del PDF y de los carruseles: navy
`#0B1120`, verde `#00E68A`, dorado `#F6B101`, gris `#94A3B8` y Space Grotesk.
Están en `tailwind.config.ts`.
