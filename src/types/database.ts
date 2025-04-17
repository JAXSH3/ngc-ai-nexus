
export interface Profile {
  id: string
  first_name: string
  last_name: string
  email: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface Resource {
  id: string
  title: string
  description?: string
  url?: string
  category?: string
  tags?: string[]
  author_id: string
  created_at: string
  updated_at: string
}

export interface Post {
  id: string
  title: string
  content: string
  author_id: string
  created_at: string
  updated_at: string
}
