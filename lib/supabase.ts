import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// These should be defined in .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create the Supabase client with anonymous key
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

// For server-side admin operations (using service key)
export const createAdminClient = () => {
  // This should only be used server-side
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!serviceKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not defined');
  }
  
  return createClient<Database>(supabaseUrl, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};