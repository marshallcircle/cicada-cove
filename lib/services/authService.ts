/**
 * Authentication service
 * Handles user authentication, registration, and profile management
 */

import supabase, { getCurrentUser, getSession } from '@/lib/supabase/client';
import { Profile } from '@/lib/types/supabase';

/**
 * Login user with email and password
 */
export async function loginWithEmail(email: string, password: string) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to login');
  }

  return response.json();
}

/**
 * Register a new user
 */
export async function registerUser(
  email: string, 
  password: string, 
  firstName?: string, 
  lastName?: string
) {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      email, 
      password,
      firstName,
      lastName
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to register');
  }

  return response.json();
}

/**
 * Logout the current user
 */
export async function logout() {
  const response = await fetch('/api/auth/logout', {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to logout');
  }

  return response.json();
}

/**
 * Send password reset email
 */
export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`,
  });

  if (error) {
    throw new Error(error.message);
  }

  return { success: true };
}

/**
 * Update user password
 */
export async function updatePassword(password: string) {
  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return { success: true };
}

/**
 * Get the current user's profile
 */
export async function getUserProfile(): Promise<Profile | null> {
  const user = await getCurrentUser();
  
  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error || !data) {
    console.error('Error fetching user profile:', error);
    return null;
  }

  return data;
}

/**
 * Update the current user's profile
 */
export async function updateUserProfile(updates: Partial<Profile>) {
  const user = await getCurrentUser();
  
  if (!user) {
    throw new Error('Not authenticated');
  }

  const { data, error } = await supabase
    .from('profiles')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id)
    .select('*')
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return !!session;
}

/**
 * Get authentication state for client components
 * Used for UI purposes to determine logged in state
 */
export function useAuthState() {
  // We could implement React hooks here if needed
  // For now, just return the async functions
  return {
    isAuthenticated,
    getCurrentUser,
    getUserProfile,
  };
}

export default {
  loginWithEmail,
  registerUser,
  logout,
  resetPassword,
  updatePassword,
  getUserProfile,
  updateUserProfile,
  isAuthenticated,
  useAuthState,
};