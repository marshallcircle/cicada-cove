import { createClient } from '@supabase/supabase-js';
import { Database } from '@/lib/types/supabase';

// Initialize Supabase client with environment variables
// These values are safely exposed to the browser
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// Create a singleton instance of the Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Helper method to check if we're on the server
export const isServer = () => typeof window === 'undefined';

/**
 * Gets a Supabase client for the authenticated user (server-side only)
 * This function requires cookies to be provided
 */
export const getServiceClient = async (cookieStore?: any) => {
  const { createServerClient } = await import('@supabase/ssr');
  if (!cookieStore && isServer()) {
    throw new Error('Cookie store is required for server-side auth');
  }
  
  return createServerClient<Database>(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get: (name) => {
          return cookieStore.get(name)?.value;
        },
        set: (name, value, options) => {
          cookieStore.set({ name, value, ...options });
        },
        remove: (name, options) => {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  );
};

/**
 * Get user session data
 * @returns User session or null
 */
export const getSession = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
};

/**
 * Get current user
 * @returns User object or null
 */
export const getCurrentUser = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

export default supabase;