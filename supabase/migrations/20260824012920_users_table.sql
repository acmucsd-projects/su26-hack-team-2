
create table public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  first_name  text,
  last_name text,
  created_at timestamptz not null default now()
);

-- RLS Security
alter table public.users enable row level security;

-- Grant table-level access to the Data API roles
grant select, insert, update on public.users to authenticated;

create policy "users can view their own row"
on public.users for select
to authenticated
using ((select auth.uid()) = id);

create policy "users can insert their own row"
on public.users for insert
to authenticated
with check ((select auth.uid()) = id);

create policy "users can update their own row"
on public.users for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);
