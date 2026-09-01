create table public.transactions (
    id uuid primary key not null default gen_random_uuid(),
    club_id uuid not null references public.clubs(id),
    amount numeric(12, 2) not null,
    type text not null check (type in ('expense', 'income')),
    description text null,
    category text not null,
    paid_by uuid not null references auth.users(id),
    created_by uuid not null references auth.users(id),
    transaction_date timestamptz not null default now(),
    created_at timestamptz not null default now()
);

alter table public.transactions enable row level security;

create policy "Owners and admins can view transactions for their club"
on public.transactions
for select
to authenticated
using (
    created_by = auth.uid()
    or exists (
        select 1
        from public.club_members cm
        where cm.club_id = transactions.club_id
        and cm.user_id = auth.uid()
        and cm.role = 'admin'
    )
);

create policy "Owners and admins can create transactions for their club"
on public.transactions
for insert
to authenticated
with check (
    created_by = auth.uid()
    or exists (
        select 1
        from public.club_members cm
        where cm.club_id = transactions.club_id
        and cm.user_id = auth.uid()
        and cm.role = 'admin'
    )
);

create policy "Owners and admins can update transactions for their club"
on public.transactions
for update
to authenticated
using (
    created_by = auth.uid()
    or exists (
        select 1
        from public.club_members cm
        where cm.club_id = transactions.club_id
        and cm.user_id = auth.uid()
        and cm.role = 'admin'
    )
)
with check (
    created_by = auth.uid()
    or exists (
        select 1
        from public.club_members cm
        where cm.club_id = transactions.club_id
        and cm.user_id = auth.uid()
        and cm.role = 'admin'
    )
);

create policy "Owners and admins can delete transactions for their club"
on public.transactions
for delete
to authenticated
using (
    created_by = auth.uid()
    or exists (
        select 1
        from public.club_members cm
        where cm.club_id = transactions.club_id
        and cm.user_id = auth.uid()
        and cm.role = 'admin'
    )
);