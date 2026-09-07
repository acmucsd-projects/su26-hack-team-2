create policy "Users can view clubs they belong to"
on public.clubs
for select
to authenticated
using (
    exists (
        select 1
        from public.club_members
        where club_members.club_id = clubs.id
          and club_members.user_id = auth.uid()
    )
);

create policy "Owners and admins can update clubs"
on public.clubs
for update
to authenticated
using (
    created_by = auth.uid()
    or exists (
        select 1
        from public.club_members
        where club_members.club_id = clubs.id
          and club_members.user_id = auth.uid()
          and club_members.role = 'admin'
    )
)
with check (
    created_by = auth.uid()
    or exists (
        select 1
        from public.club_members
        where club_members.club_id = clubs.id
          and club_members.user_id = auth.uid()
          and club_members.role = 'admin'
    )
);