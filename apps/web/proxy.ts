import { getSessionCookie } from '@repo/auth';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const session = getSessionCookie(request);
  const pathname = request.nextUrl.pathname;

  const protectedRoutes = ['/dashboard'];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const authRoutes = [
    '/sign-in',
    '/sign-up',
    '/reset-password',
    '/forgot-password',
    '/verify-email',
  ];
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Redirect unauthenticated users from protected routes to login
  if (isProtectedRoute && !session) {
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackURL', pathname);
    return NextResponse.redirect(url);
  }

  // Redirect logged-in users away from auth pages
  if (isAuthRoute && session) {
    const callbackURL = request.nextUrl.searchParams.get('callbackURL');
    const redirectUrl =
      callbackURL &&
      callbackURL.startsWith('/') &&
      !callbackURL.startsWith('//')
        ? callbackURL
        : '/';
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
