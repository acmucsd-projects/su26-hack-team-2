create table public.clubs (
    id uuid primary key not null default gen_random_uuid(),
    name text not null,
    description text null,
    created_by uuid not null references auth.users(id) on delete cascade,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- RLS Security
alter table public.clubs enable row level security;

create policy "Authenticated users can create clubs"
on public.clubs
for insert
to authenticated
with check (created_by = auth.uid());

create policy "Owners can delete clubs"
on public.clubs
for delete
to authenticated
using (created_by = auth.uid());