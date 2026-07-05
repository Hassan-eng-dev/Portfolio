import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '~~/shared/types/database.types'

const BUCKET = 'portfolio-uploads'

export function uniqueFileName(file: File) {
  const ext = file.name.includes('.') ? file.name.split('.').pop() : 'jpg'
  const random = Math.random().toString(36).slice(2, 10)
  return `${Date.now()}-${random}.${ext}`
}

export async function uploadProjectImage(
  client: SupabaseClient<Database>,
  file: File,
  onProgress?: (percent: number) => void,
) {
  const path = `projects/${uniqueFileName(file)}`

  const { error } = await client.storage.from(BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  })
  if (error) throw error

  // supabase-js v2 storage upload has no native progress callback; report
  // completion so callers driving a progress bar can settle to 100%.
  onProgress?.(100)

  const { data } = client.storage.from(BUCKET).getPublicUrl(path)
  return { url: data.publicUrl, path }
}

export async function deleteProjectImageFile(client: SupabaseClient<Database>, path: string) {
  const { error } = await client.storage.from(BUCKET).remove([path])
  if (error) throw error
}
