-- Cola de envíos de la secuencia de 19 correos del Certificado Contave.
--
-- Una fila por cada correo que le toca a cada suscriptor. El trabajo periódico
-- lee las que ya vencieron y no se han enviado, las manda y las marca.

create table if not exists public.envios (
  id               uuid primary key default gen_random_uuid(),
  lead_id          uuid not null references public.leads (id) on delete cascade,
  dia              smallint not null check (dia between 0 and 18),
  programado_para  timestamptz not null,
  enviado_en       timestamptz,
  intentos         smallint not null default 0,
  ultimo_error     text,
  created_at       timestamptz not null default now(),

  -- Un correo por día por persona. Si el trabajo se ejecuta dos veces, la
  -- segunda no puede duplicar nada.
  unique (lead_id, dia)
);

-- El índice que usa el trabajo periódico en cada corrida. Parcial: las filas
-- ya enviadas son la mayoría con el tiempo y no hace falta indexarlas.
create index if not exists envios_pendientes_idx
  on public.envios (programado_para)
  where enviado_en is null;

alter table public.envios enable row level security;

-- Sin políticas, a propósito. La clave anónima no puede leer, insertar,
-- actualizar ni borrar nada de esta tabla. Solo la clave de servicio, que
-- ignora RLS, y que únicamente vive en el entorno del trabajo periódico.

-- Al registrarse una persona se programa su secuencia completa.
--
-- Se hace en un disparador y no en el endpoint porque el endpoint solo tiene
-- la clave anónima, que no puede escribir acá. El disparador corre con los
-- permisos del dueño de la tabla, así que no hay que abrirle nada a nadie.
create or replace function public.programar_secuencia()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  dia_local date := (new.created_at at time zone 'America/Caracas')::date;
begin
  -- Del día 1 al 18. El día 0 no se programa acá: lo manda el endpoint en el
  -- acto, apenas la persona se registra, porque el trabajo periódico corre una
  -- vez al día y nadie espera veinticuatro horas por un correo de bienvenida.
  --
  -- Cada correo sale a las 8 de la mañana de Caracas del día que le toca, sin
  -- importar a qué hora se registró la persona.
  insert into public.envios (lead_id, dia, programado_para)
  select new.id, d, ((dia_local + d) + time '08:00') at time zone 'America/Caracas'
  from generate_series(1, 18) as d
  on conflict (lead_id, dia) do nothing;

  return new;
end;
$$;

drop trigger if exists leads_programar_secuencia on public.leads;
create trigger leads_programar_secuencia
  after insert on public.leads
  for each row
  execute function public.programar_secuencia();
