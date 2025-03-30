import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getServiceClient } from '@/lib/supabase/client';

/**
 * POST /api/auth/login
 * Authenticates a user with email and password
 */
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

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

    // Sign in with email and password
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      );
    }

    // Return user and session information
    return NextResponse.json({
      user: data.user,
      session: data.session,
    });
  } catch (error) {
    console.error('Unexpected error during login:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/auth/logout
 * Signs out the current user
 */
export async function DELETE(request: NextRequest) {
  try {
    // Initialize Supabase client
    const cookieStore = cookies();
    const supabase = await getServiceClient(cookieStore);

    // Sign out the user
    const { error } = await supabase.auth.signOut();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Signed out successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Unexpected error during logout:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}