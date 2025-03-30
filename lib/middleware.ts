import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';
import { Database } from '@/lib/types/supabase';

/**
 * Middleware runs on every request to your application before it reaches the route handler
 * Used for authentication and route protection, analytics, etc.
 */
export async function middleware(req: NextRequest) {
  // Create a response object that we'll modify as needed
  let res = NextResponse.next();

  // Create a Supabase client specifically for the middleware
  const supabase = createMiddlewareClient<Database>({ req, res });

  // Refresh session if needed
  const { data: { session } } = await supabase.auth.getSession();

  // Check if the request is for a protected route
  const isProtectedRoute = isProtected(req.nextUrl.pathname);

  // If it's a protected route and there's no session, redirect to login
  if (isProtectedRoute && !session) {
    const redirectUrl = new URL('/auth/login', req.nextUrl.origin);
    // Add the original URL as a query parameter to redirect back after login
    redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // If it's an auth route and the user is already logged in, redirect to account
  const isAuthRoute = req.nextUrl.pathname.startsWith('/auth/');
  if (isAuthRoute && session) {
    // Don't redirect if it's a password reset or callback route
    const isResetPasswordRoute = req.nextUrl.pathname.includes('/reset-password');
    const isCallbackRoute = req.nextUrl.pathname.includes('/callback');
    
    if (!isResetPasswordRoute && !isCallbackRoute) {
      return NextResponse.redirect(new URL('/account', req.nextUrl.origin));
    }
  }

  return res;
}

/**
 * Check if a route should be protected by authentication
 */
function isProtected(pathname: string): boolean {
  const protectedRoutes = [
    '/account',
    '/checkout',
    '/orders',
  ];

  // Check if the pathname starts with any of the protected routes
  return protectedRoutes.some(route => pathname.startsWith(route));
}

/**
 * Specify which routes should trigger this middleware
 */
export const config = {
  // Match all request paths except for static files, api routes, and _next/static
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|images/).*)',
  ],
};