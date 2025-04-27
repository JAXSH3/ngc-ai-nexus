
import { createClient } from '@supabase/supabase-js'

// Get the Supabase URL and key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Create a dummy client if environment variables are not set
let supabase: ReturnType<typeof createClient>

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase environment variables are not set. Authentication and database features will not work.')
  
  // Create a mock client that does nothing but doesn't crash the application
  supabase = {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signInWithPassword: async () => ({ data: { user: null }, error: new Error('Supabase not configured') }),
      signUp: async () => ({ data: { user: null }, error: new Error('Supabase not configured') }),
      signOut: async () => ({ error: null }),
      signInWithOAuth: async () => ({ data: { provider: null }, error: new Error('Supabase not configured') }),
    },
    from: () => ({
      insert: async () => ({ error: new Error('Supabase not configured') }),
      select: async () => ({ error: new Error('Supabase not configured') }),
      update: async () => ({ error: new Error('Supabase not configured') }),
      delete: async () => ({ error: new Error('Supabase not configured') }),
    }),
  } as unknown as ReturnType<typeof createClient>
} else {
  // Create the actual Supabase client
  supabase = createClient(supabaseUrl, supabaseAnonKey)
}

export { supabase }
