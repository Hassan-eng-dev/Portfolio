// Hand-written to mirror the schema in supabase/migrations/*.sql.
// If you later run `supabase gen types typescript`, that generated file
// can replace this one directly (same `Database` shape is expected
// by the typed client in app/plugins or via @nuxtjs/supabase).

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          title: string
          slug: string
          description: string
          category: string
          tags: string[]
          cover_image_url: string | null
          published: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description?: string
          category: string
          tags?: string[]
          cover_image_url?: string | null
          published?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string
          category?: string
          tags?: string[]
          cover_image_url?: string | null
          published?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      project_images: {
        Row: {
          id: string
          project_id: string
          image_url: string
          alt_text: string | null
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          image_url: string
          alt_text?: string | null
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          image_url?: string
          alt_text?: string | null
          sort_order?: number
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'project_images_project_id_fkey'
            columns: ['project_id']
            isOneToOne: false
            referencedRelation: 'projects'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}

export type Project = Database['public']['Tables']['projects']['Row']
export type ProjectInsert = Database['public']['Tables']['projects']['Insert']
export type ProjectUpdate = Database['public']['Tables']['projects']['Update']

export type ProjectImage = Database['public']['Tables']['project_images']['Row']
export type ProjectImageInsert = Database['public']['Tables']['project_images']['Insert']
export type ProjectImageUpdate = Database['public']['Tables']['project_images']['Update']

export type ProjectWithImages = Project & { project_images: ProjectImage[] }

export const PROJECT_CATEGORIES = [
  'branding',
  'illustration',
  'print',
  'digital',
  'packaging',
] as const

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number]
