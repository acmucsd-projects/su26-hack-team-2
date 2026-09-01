create table public.event_attendees (
    event_id uuid not null references public.events(id) on delete cascade,
    user_id uuid not null references auth.users(id) on delete cascade,
    status text not null check (status in ('going', 'maybe', 'not_going')),
    created_at timestamptz not null default now(),

    primary key (event_id, user_id)
);

alter table public.event_attendees enable row level security;

create policy "Users can view their own event attendance"
on public.event_attendees
for select
to authenticated
using (user_id = auth.uid());

create policy "Users can create their own event attendance"
on public.event_attendees
for insert
to authenticated
with check (user_id = auth.uid());

create policy "Users can update their own event attendance"
on public.event_attendees
for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

create policy "Users can delete their own event attendance"
on public.event_attendees
for delete
to authenticated
using (user_id = auth.uid());