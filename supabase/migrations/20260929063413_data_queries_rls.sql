-- Security definer so club_members/users policies can check membership
-- without recursing into club_members' own RLS.
create function public.is_club_member(p_club_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.club_members
    where club_id = p_club_id and user_id = (select auth.uid())
  );
$$;

grant execute on function public.is_club_member(uuid) to authenticated;

create policy "Members can view co-members"
on public.club_members
for select
to authenticated
using (public.is_club_member(club_id));

create policy "Users can view users in shared clubs"
on public.users
for select
to authenticated
using (
    exists (
        select 1 from public.club_members cm
        where cm.user_id = users.id
          and public.is_club_member(cm.club_id)
    )
);

-- Lets PostgREST embed users(...) from club_members.
alter table public.club_members
add constraint club_members_user_id_users_fkey
foreign key (user_id) references public.users(id) on delete cascade;

grant select on public.events to authenticated;
