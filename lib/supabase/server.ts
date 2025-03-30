'use server';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { Database } from '@/lib/types/supabase';

// Function to create a Supabase client for server components
export function createServerComponentClient() {
  const cookieStore = cookies();
  return createClientComponentClient<Database>({ cookies: () => cookieStore });
}

// Function to create a Supabase client with service role for admin operations
export function createServiceClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Supabase URL or Service Key is missing');
  }
  
  return createClient<Database>(supabaseUrl, supabaseServiceKey);
}