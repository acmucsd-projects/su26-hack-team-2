-- EXAMPLE / REFERENCE MIGRATION not meant to run as-is.
-- This shows the base pattern: create table -> enable RLS -> add policies.
-- Copy this pattern into a NEW migration file for each real schema change
-- Remember to make migration files by running commands, DO NOT create manually (see /README.md Developer Guide)
-- (e.g. 20260806xxxxxx_add_orgs_table.sql) — don't edit this file after it's shared.

/*
-- 1. create the table
create table notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) not null,
  content text not null,
  created_at timestamptz default now()
);

-- 2. turn RLS on for this table
alter table notes enable row level security;

-- 3. define who can do what
create policy "users can view their own notes"
on notes for select
using (auth.uid() = user_id);

create policy "users can insert their own notes"
on notes for insert
with check (auth.uid() = user_id);

create policy "users can update their own notes"
on notes for update
using (auth.uid() = user_id);

create policy "users can delete their own notes"
on notes for delete
using (auth.uid() = user_id);
*/