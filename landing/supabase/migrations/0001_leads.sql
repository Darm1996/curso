-- Tabla de captura de correos de la landing del Certificado Contave.

create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  email       text not null,
  nombre      text not null,
  origen      text not null default 'landing',
  created_at  timestamptz not null default now()
);

-- Un correo se registra una sola vez. El endpoint trata el conflicto como éxito.
create unique index if not exists leads_email_unico on public.leads (lower(email));

create index if not exists leads_created_at_idx on public.leads (created_at desc);

alter table public.leads enable row level security;

-- El formulario solo puede insertar. Nadie con la clave anónima puede leer,
-- actualizar ni borrar la lista de correos.
drop policy if exists "leads: insertar desde el formulario" on public.leads;
create policy "leads: insertar desde el formulario"
  on public.leads
  for insert
  to anon
  with check (true);

-- La lista se consulta desde el panel de Supabase o con la clave de servicio,
-- que nunca sale del entorno del administrador.
