# Studio Portfolio

A Nuxt 4 (Nuxt 3-compatible) portfolio site for a graphic designer, with a public
gallery and a private admin dashboard for managing projects. Backed by Supabase
(Postgres + Auth + Storage).

## Stack

- Nuxt 4, Vue 3, TypeScript (strict)
- Tailwind CSS + SCSS (`app/assets/scss/main.scss`) for custom styles/animations
- `@nuxtjs/supabase` — SSR-aware, typed Supabase client + auth
- Pinia — client UI state (upload queue/progress)
- VueUse — composables (`useEventListener`, etc.)

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a new project.
2. In **Project Settings → API**, copy the **Project URL** and the **anon /
   publishable key**.

## 2. Configure environment variables

Copy the example file and fill in your project's values:

```bash
cp .env.example .env
```

```
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_KEY=your-anon-or-publishable-key
```

## 3. Run the database migrations

The schema lives in `supabase/migrations/*.sql`:

- `20260101000001_create_projects.sql` — `projects` table
- `20260101000002_create_project_images.sql` — `project_images` table
- `20260101000003_rls_policies.sql` — Row-Level Security policies
- `20260101000004_storage_bucket.sql` — `portfolio-uploads` storage bucket + policies

**Option A — Supabase CLI (recommended):**

```bash
npx supabase login
npx supabase link --project-ref your-project-ref
npx supabase db push
```

**Option B — SQL editor:** open the Supabase dashboard → **SQL Editor**, and run
each file in `supabase/migrations/` in order (they're already ordered by
filename).

## 4. Verify the storage bucket

Migration `20260101000004` creates the `portfolio-uploads` bucket and its
policies automatically. In **Storage** in the dashboard, confirm a public
bucket named `portfolio-uploads` exists.

## 5. Create your admin user

There's no public sign-up flow (single-admin app). Create yourself a user in
**Authentication → Users → Add user** in the Supabase dashboard (email +
password), then sign in at `/admin/login` with those credentials.

## 6. Generating types from your live schema (optional)

`shared/types/database.types.ts` is hand-written to match the migrations
above. If you evolve the schema, you can regenerate it with the Supabase CLI:

```bash
npx supabase gen types typescript --project-id your-project-ref > shared/types/database.types.ts
```

## Install & run

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` for the public site and
`http://localhost:3000/admin/login` for the dashboard.

## Project structure

```
app/
  assets/scss/        # global SCSS, CSS custom properties, animations
  components/          # ProjectCard, ProjectGallery, CategoryFilter, ImageUploader
  components/admin/    # AdminSidebar, AdminLayout, ProjectForm
  composables/         # Supabase query + storage-upload helpers
  layouts/             # default (public), admin
  middleware/           # auth.global.ts — protects /admin/*
  pages/                # public + admin routes
  stores/               # Pinia store for upload progress
shared/types/           # hand-written Supabase Database types
supabase/migrations/    # SQL migrations
```

## Notes

- The public anon key can only read `published = true` projects (enforced by
  RLS), so it's safe to expose in the client.
- `/admin/*` (except `/admin/login`) is protected by
  `app/middleware/auth.global.ts`, which redirects unauthenticated visitors to
  the login page.
- The contact form (`/contact`) is a placeholder — no email sending is wired
  up yet.
