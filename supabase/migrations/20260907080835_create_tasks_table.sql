create table public.tasks (
    id uuid primary key not null default gen_random_uuid(),
    club_id uuid not null references public.clubs(id) on delete cascade,
    title text not null,
    description text null,
    assigned_to uuid null references auth.users(id) on delete set null,
    status text not null default 'todo' check (status in ('todo', 'in_progress', 'done')),
    due_date date null,
    created_by uuid not null references auth.users(id),
    created_at timestamptz not null default now()
);

alter table public.tasks enable row level security;

create policy "Club members can view tasks"
on public.tasks
for select
to authenticated
using (
    exists (
        select 1 from public.club_members cm
        where cm.club_id = tasks.club_id and cm.user_id = auth.uid()
    )
);

create policy "Club members can update tasks"
on public.tasks
for update
to authenticated
using (
    exists (
        select 1 from public.club_members cm
        where cm.club_id = tasks.club_id and cm.user_id = auth.uid()
    )
)
with check (
    exists (
        select 1 from public.club_members cm
        where cm.club_id = tasks.club_id and cm.user_id = auth.uid()
    )
);

create policy "Admins can create tasks"
on public.tasks
for insert
to authenticated
with check (
    created_by = auth.uid()
    and exists (
        select 1 from public.club_members cm
        where cm.club_id = tasks.club_id
          and cm.user_id = auth.uid()
          and cm.role = 'admin'
    )
);

create policy "Admins can delete tasks"
on public.tasks
for delete
to authenticated
using (
    exists (
        select 1 from public.club_members cm
        where cm.club_id = tasks.club_id
          and cm.user_id = auth.uid()
          and cm.role = 'admin'
    )
);