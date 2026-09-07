create table public.club_members (
    club_id uuid not null references public.clubs(id) on delete cascade,
    user_id uuid not null references auth.users(id) on delete cascade,
    role text not null default 'member' check (role in ('member', 'admin')),
    created_at timestamptz not null default now(),

    primary key (club_id, user_id)
);