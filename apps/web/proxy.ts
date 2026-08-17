import { getSessionCookie } from 'better-auth/cookies';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const protectedRoutes = ['/dashboard'];
const authRoutes = [
  '/sign-in',
  '/sign-up',
  '/reset-password',
  '/forgot-password',
  '/verify-email',
];
const marketingRoutes = ['/'];

function matchesPath(pathname: string, routes: readonly string[]) {
  return routes.some((route) => {
    if (route === '/') {
      return pathname === '/';
    }

    return pathname === route || pathname.startsWith(`${route}/`);
  });
}

export function proxy(request: NextRequest) {
  const session = getSessionCookie(request);
  const pathname = request.nextUrl.pathname;

  if (matchesPath(pathname, protectedRoutes) && !session) {
    const url = new URL('/sign-in', request.url);
    url.searchParams.set('callbackURL', pathname);
    return NextResponse.redirect(url);
  }

  if (matchesPath(pathname, authRoutes) && session) {
    const callbackURL = request.nextUrl.searchParams.get('callbackURL');
    const redirectUrl =
      callbackURL &&
      callbackURL.startsWith('/') &&
      !callbackURL.startsWith('//')
        ? callbackURL
        : '/dashboard';
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  if (matchesPath(pathname, marketingRoutes) && session) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
