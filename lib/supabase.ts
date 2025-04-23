import { createClient } from '@supabase/supabase-js';

// These environment variables need to be set in your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a single supabase client for interacting with your database
// Only create the client if we're in a browser or if the URL is provided
let supabase: ReturnType<typeof createClient> | null = null;

// Initialize Supabase client
if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else if (typeof window !== 'undefined') {
  console.warn('Supabase credentials not found. Please check your environment variables.');
}

// Export a function that safely returns the Supabase client or throws a clear error
export function getSupabaseClient() {
  if (!supabase) {
    throw new Error(
      'Supabase client not initialized. Please check your environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY'
    );
  }
  return supabase;
}

// For backward compatibility
export { supabase };
