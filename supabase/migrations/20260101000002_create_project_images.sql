create table if not exists public.project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  image_url text not null,
  alt_text text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

comment on table public.project_images is 'Additional gallery images belonging to a project.';

create index if not exists project_images_project_id_idx on public.project_images (project_id);
create index if not exists project_images_sort_order_idx on public.project_images (project_id, sort_order);
