
create table public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  first_name text not null,
  last_name text not null,
  created_at timestamptz not null default now()
);

-- RLS Security
alter table public.users enable row level security;

-- Grant table-level access to the Data API roles.
grant select on public.users to authenticated;
grant update (first_name, last_name) on public.users to authenticated;

create policy "users can view their own row"
on public.users for select
to authenticated
using ((select auth.uid()) = id);

create policy "users can update their own row"
on public.users for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

-- Auto-create a public.users row whenever a new auth.users row is created.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.users (id, first_name, last_name)
  values (
    new.id,
    new.raw_user_meta_data ->> 'first_name',
    new.raw_user_meta_data ->> 'last_name'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
