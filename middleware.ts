import { NextRequest, NextResponse } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

/**
 * Middleware for handling authentication and protected routes
 */
export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res: response });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const pathname = request.nextUrl.pathname;

  // Check if the path is a protected route
  if (isProtected(pathname)) {
    // If there is no session, redirect to login
    if (!session) {
      const redirectUrl = new URL('/auth/login', request.url);
      // Add the original URL as a query parameter to redirect after login
      redirectUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // If the user is already logged in and tries to access auth routes
  if (session && pathname.startsWith('/auth')) {
    // Allow access to password reset and callback routes even when logged in
    if (
      pathname.includes('/auth/reset-password') ||
      pathname.includes('/auth/callback')
    ) {
      return response;
    }

    // Otherwise redirect to account page
    return NextResponse.redirect(new URL('/account', request.url));
  }

  return response;
}

/**
 * Check if a route is protected and requires authentication
 */
function isProtected(pathname: string): boolean {
  // List of protected routes that require authentication
  const protectedRoutes = [
    '/account',
    '/checkout',
    '/orders',
  ];

  return protectedRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );
}

/**
 * Configure which paths the middleware should run on
 */
export const config = {
  // Matcher for all paths except static files, api routes, and _next
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /fonts, /images (static files)
     * 4. /favicon.ico, /sitemap.xml (static files)
     */
    '/((?!api|_next|fonts|images|[\\w-]+\\.\\w+).*)',
  ],
};