import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

// Create a singleton client. 
// Note: During build time, if the env vars are missing, it will use placeholders.
// This prevents the "supabaseUrl is required" error during the static worker's execution.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
