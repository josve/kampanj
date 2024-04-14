import { NextResponse } from 'next/server';

let locales = ['sv', 'en'];

export function middleware(request) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  if (pathname == '/') {
    request.nextUrl.pathname = `/sv`;
    return NextResponse.redirect(request.nextUrl);
  }

  return;
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Skip all paths starting with /images/
    '/((?!images).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
};
