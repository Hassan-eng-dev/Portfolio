-- Public bucket for portfolio images. Public read, authenticated-only write/delete.
insert into storage.buckets (id, name, public)
values ('portfolio-uploads', 'portfolio-uploads', true)
on conflict (id) do nothing;

create policy "public read portfolio-uploads"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'portfolio-uploads');

create policy "authenticated upload portfolio-uploads"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'portfolio-uploads');

create policy "authenticated update portfolio-uploads"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'portfolio-uploads')
  with check (bucket_id = 'portfolio-uploads');

create policy "authenticated delete portfolio-uploads"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'portfolio-uploads');
