-- Enable UUID generation
create extension if not exists "pgcrypto";

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text not null default '',
  category text not null,
  tags text[] not null default '{}',
  cover_image_url text,
  published boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.projects is 'Portfolio case studies / works.';
comment on column public.projects.category is 'e.g. branding, illustration, print, digital, packaging';

create index if not exists projects_published_idx on public.projects (published);
create index if not exists projects_category_idx on public.projects (category);
create index if not exists projects_sort_order_idx on public.projects (sort_order);

-- Keep updated_at current on every row update.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at
  before update on public.projects
  for each row
  execute function public.set_updated_at();
