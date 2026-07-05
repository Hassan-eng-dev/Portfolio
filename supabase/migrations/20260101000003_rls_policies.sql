alter table public.projects enable row level security;
alter table public.project_images enable row level security;

-- Public (anon) can read published projects only.
create policy "public read published projects"
  on public.projects
  for select
  to anon
  using (published = true);

-- Authenticated (the admin) can read every project, published or not.
create policy "authenticated read all projects"
  on public.projects
  for select
  to authenticated
  using (true);

create policy "authenticated insert projects"
  on public.projects
  for insert
  to authenticated
  with check (true);

create policy "authenticated update projects"
  on public.projects
  for update
  to authenticated
  using (true)
  with check (true);

create policy "authenticated delete projects"
  on public.projects
  for delete
  to authenticated
  using (true);

-- project_images inherit visibility from their parent project.
create policy "public read images of published projects"
  on public.project_images
  for select
  to anon
  using (
    exists (
      select 1 from public.projects p
      where p.id = project_images.project_id
        and p.published = true
    )
  );

create policy "authenticated read all project images"
  on public.project_images
  for select
  to authenticated
  using (true);

create policy "authenticated insert project images"
  on public.project_images
  for insert
  to authenticated
  with check (true);

create policy "authenticated update project images"
  on public.project_images
  for update
  to authenticated
  using (true)
  with check (true);

create policy "authenticated delete project images"
  on public.project_images
  for delete
  to authenticated
  using (true);
