import supabase from '@/lib/supabase/client';
import { ApiError } from '@/lib/utils/apiHelpers';
import { Profile } from '@/lib/types/supabase';

export interface AuthError {
  message: string;
  status?: number;
}

const authService = {
  /**
   * Login with email and password
   */
  async loginWithEmail(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return {
          user: null,
          error: {
            message: error.message,
            status: error.status,
          },
        };
      }

      return { user: data.user, error: null };
    } catch (error) {
      console.error('Login error:', error);
      return {
        user: null,
        error: {
          message: error instanceof Error ? error.message : 'An unknown error occurred',
          status: 500,
        },
      };
    }
  },

  /**
   * Register a new user
   */
  async registerUser(
    email: string,
    password: string,
    firstName?: string,
    lastName?: string
  ) {
    try {
      // Create user account
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        return {
          user: null,
          error: {
            message: error.message,
            status: error.status,
          },
        };
      }

      if (data.user) {
        // Create user profile if first/last name provided
        if (firstName || lastName) {
          const { error: profileError } = await supabase.from('profiles').upsert({
            id: data.user.id,
            email: email.toLowerCase(),
            first_name: firstName || '',
            last_name: lastName || '',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });

          if (profileError) {
            console.error('Error creating profile:', profileError);
          }
        }
      }

      return { user: data.user, error: null };
    } catch (error) {
      console.error('Registration error:', error);
      return {
        user: null,
        error: {
          message: error instanceof Error ? error.message : 'An unknown error occurred',
          status: 500,
        },
      };
    }
  },

  /**
   * Log out the current user
   */
  async logout() {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw new ApiError(error.message, error.status);
      }
      
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      throw error instanceof ApiError 
        ? error 
        : new ApiError(
            error instanceof Error ? error.message : 'An unknown error occurred',
            500
          );
    }
  },

  /**
   * Send password reset email
   */
  async resetPassword(email: string) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`,
      });

      if (error) {
        throw new ApiError(error.message, error.status);
      }

      return { success: true };
    } catch (error) {
      console.error('Password reset error:', error);
      throw error instanceof ApiError 
        ? error 
        : new ApiError(
            error instanceof Error ? error.message : 'An unknown error occurred',
            500
          );
    }
  },

  /**
   * Update password for authenticated user
   */
  async updatePassword(password: string) {
    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        throw new ApiError(error.message, error.status);
      }

      return { success: true };
    } catch (error) {
      console.error('Update password error:', error);
      throw error instanceof ApiError 
        ? error 
        : new ApiError(
            error instanceof Error ? error.message : 'An unknown error occurred',
            500
          );
    }
  },

  /**
   * Get current session
   */
  async getSession() {
    try {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        throw new ApiError(error.message, error.status);
      }

      return data.session;
    } catch (error) {
      console.error('Get session error:', error);
      throw error instanceof ApiError 
        ? error 
        : new ApiError(
            error instanceof Error ? error.message : 'An unknown error occurred',
            500
          );
    }
  },

  /**
   * Get current user
   */
  async getCurrentUser() {
    try {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        throw new ApiError(error.message, error.status);
      }

      return data.user;
    } catch (error) {
      console.error('Get user error:', error);
      throw error instanceof ApiError 
        ? error 
        : new ApiError(
            error instanceof Error ? error.message : 'An unknown error occurred',
            500
          );
    }
  },

  /**
   * Get user profile
   */
  async getUserProfile() {
    try {
      const { data: user } = await supabase.auth.getUser();
      
      if (!user.user) {
        throw new ApiError('User not authenticated', 401);
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.user.id)
        .single();

      if (error) {
        throw new ApiError(error.message, error.status || 500);
      }

      return data;
    } catch (error) {
      console.error('Get profile error:', error);
      throw error instanceof ApiError 
        ? error 
        : new ApiError(
            error instanceof Error ? error.message : 'An unknown error occurred',
            500
          );
    }
  },

  /**
   * Update user profile
   */
  async updateUserProfile(updates: Partial<Profile>) {
    try {
      const { data: user } = await supabase.auth.getUser();
      
      if (!user.user) {
        throw new ApiError('User not authenticated', 401);
      }
      
      // Remove any fields that shouldn't be updated directly
      const { id, email, created_at, ...updateData } = updates;
      
      const { data, error } = await supabase
        .from('profiles')
        .update({
          ...updateData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.user.id)
        .select()
        .single();

      if (error) {
        throw new ApiError(error.message, error.status || 500);
      }

      return data;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error instanceof ApiError 
        ? error 
        : new ApiError(
            error instanceof Error ? error.message : 'An unknown error occurred',
            500
          );
    }
  },
};

export default authService;