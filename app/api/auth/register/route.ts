import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getServiceClient } from '@/lib/supabase/client';

/**
 * POST /api/auth/register
 * Registers a new user with email and password
 */
export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName } = await request.json();

    // Validate request
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Initialize Supabase client
    const cookieStore = cookies();
    const supabase = await getServiceClient(cookieStore);

    // Register the user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    });

    if (authError) {
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      );
    }

    // If user was created successfully, create a profile for them
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          first_name: firstName || null,
          last_name: lastName || null,
          email_preferences: {
            marketing: true,
            orders: true,
            newsletter: true,
          },
          updated_at: new Date().toISOString(),
        });

      if (profileError) {
        console.error('Error creating user profile:', profileError);
        // We don't fail the registration if profile creation fails
        // The profile can be created later when the user logs in
      }
    }

    // Return user and session information
    return NextResponse.json({
      user: authData.user,
      session: authData.session,
      message: 'Registration successful. Please check your email to verify your account.',
    });
  } catch (error) {
    console.error('Unexpected error during registration:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}