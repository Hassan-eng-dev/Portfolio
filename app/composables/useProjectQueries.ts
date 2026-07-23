import type { SupabaseClient } from '@supabase/supabase-js'
import type {
  Database,
  Project,
  ProjectImage,
  ProjectInsert,
  ProjectUpdate,
  ProjectWithImages,
} from '~~/shared/types/database.types'

type Client = SupabaseClient<Database>

export interface ProjectFilters {
  category?: string | null
  tag?: string | null
}

export async function fetchPublishedProjects(client: Client, filters: ProjectFilters = {}) {
  let query = client
    .from('projects')
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  if (filters.category) {
    query = query.eq('category', filters.category)
  }
  if (filters.tag) {
    query = query.contains('tags', [filters.tag])
  }

  const { data, error } = await query
  if (error) throw error
  return data as Project[]
}

export async function fetchFeaturedProjects(client: Client, limit = 6) {
  const { data, error } = await client
    .from('projects')
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data as Project[]
}

export async function fetchProjectBySlug(client: Client, slug: string) {
  const { data, error } = await client
    .from('projects')
    .select('*, project_images(*)')
    .eq('slug', slug)
    .eq('published', true)
    .order('sort_order', { referencedTable: 'project_images', ascending: true })
    .maybeSingle()

  if (error) throw error
  return data as ProjectWithImages | null
}

export async function fetchAllProjectsAdmin(client: Client) {
  const { data, error } = await client
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Project[]
}

export async function fetchProjectByIdAdmin(client: Client, id: string) {
  const { data, error } = await client
    .from('projects')
    .select('*, project_images(*)')
    .eq('id', id)
    .order('sort_order', { referencedTable: 'project_images', ascending: true })
    .maybeSingle()

  if (error) throw error
  return data as ProjectWithImages | null
}

export async function createProject(client: Client, project: ProjectInsert) {
  const { data, error } = await client.from('projects').insert(project).select().single()
  if (error) throw error
  return data as Project
}

export async function updateProject(client: Client, id: string, patch: ProjectUpdate) {
  const { data, error } = await client
    .from('projects')
    .update(patch)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data as Project
}

export async function deleteProject(client: Client, id: string) {
  const { error } = await client.from('projects').delete().eq('id', id)
  if (error) throw error
}

export async function togglePublished(client: Client, id: string, published: boolean) {
  return updateProject(client, id, { published })
}

export async function replaceProjectImages(
  client: Client,
  projectId: string,
  images: { image_url: string; alt_text: string | null; sort_order: number }[],
) {
  const { error: deleteError } = await client
    .from('project_images')
    .delete()
    .eq('project_id', projectId)
  if (deleteError) throw deleteError

  if (images.length === 0) return [] as ProjectImage[]

  const { data, error } = await client
    .from('project_images')
    .insert(images.map((image) => ({ ...image, project_id: projectId })))
    .select()
  if (error) throw error
  return data as ProjectImage[]
}

export async function reorderProjects(client: Client, orderedIds: string[]) {
  const results = await Promise.all(
    orderedIds.map((id, index) => client.from('projects').update({ sort_order: index }).eq('id', id)),
  )
  const failed = results.find((result) => result.error)
  if (failed?.error) throw failed.error
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}
