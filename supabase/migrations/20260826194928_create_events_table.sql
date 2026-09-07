create table public.events (
    id uuid primary key not null default gen_random_uuid(),
    club_id uuid not null references public.clubs(id) on delete cascade,
    title text not null,
    description text null,
    start_time timestamptz not null default now(),
    end_time timestamptz not null check (end_time > start_time),
    location text null,
    created_by uuid not null references auth.users(id),
    created_at timestamptz not null default now()
);

alter table public.events enable row level security;

create policy "Club members can view events"
on public.events
for select
to authenticated
using (
    exists (
        select 1
        from public.club_members cm
        where cm.club_id = events.club_id
        and cm.user_id = auth.uid()
    )
);

create policy "Owners and admins can create events"
on public.events
for insert
to authenticated
with check (
    created_by = auth.uid()
    or exists (
        select 1
        from public.club_members cm
        where cm.club_id = events.club_id
            and cm.user_id = auth.uid()
            and cm.role = 'admin'
    )
);

create policy "Owners and admins can update events"
on public.events
for update
to authenticated
using (
    created_by = auth.uid()
    or exists (
        select 1
        from public.club_members cm
        where cm.club_id = events.club_id
          and cm.user_id = auth.uid()
          and cm.role = 'admin'
    )
)
with check (
    created_by = auth.uid()
    or exists (
        select 1
        from public.club_members cm
        where cm.club_id = events.club_id
          and cm.user_id = auth.uid()
          and cm.role = 'admin'
    )
);

create policy "Owners and admins can delete events"
on public.events
for delete
to authenticated
using (
    created_by = auth.uid()
    or exists (
        select 1
        from public.club_members cm
        where cm.club_id = events.club_id
            and cm.user_id = auth.uid()
            and cm.role = 'admin'
    )
);