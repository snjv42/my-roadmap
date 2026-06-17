create table public.roadmap_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  checked jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.roadmap_progress enable row level security;

create policy "Users read own progress"
  on public.roadmap_progress
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users insert own progress"
  on public.roadmap_progress
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users update own progress"
  on public.roadmap_progress
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
