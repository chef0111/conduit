import { getSessionCookie } from 'better-auth/cookies';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
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

  if (isProtectedRoute && !sessionCookie) {
    const url = new URL('/sign-in', request.url);
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }

  if (isAuthRoute && sessionCookie) {
    const from = request.nextUrl.searchParams.get('from');
    const redirectUrl =
      from && from.startsWith('/') && !from.startsWith('//') ? from : '/';
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
