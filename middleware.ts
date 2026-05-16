import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');
  const url = req.nextUrl;

  // Only protect the /admin routes
  if (url.pathname.startsWith('/admin')) {
    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = Buffer.from(authValue, 'base64').toString().split(':');

      // 🔒 YOUR SECURE ADMIN CREDENTIALS
      const ADMIN_USER = 'admin';
      const ADMIN_PASS = 'kaizo123'; 

      if (user === ADMIN_USER && pwd === ADMIN_PASS) {
        return NextResponse.next();
      }
    }

    // If login fails or no login provided, prompt for password
    return new NextResponse('Authentication Required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Kaizo Admin Area"',
      },
    });
  }

  return NextResponse.next();
}

// Specify which paths this middleware runs on
export const config = {
  matcher: ['/admin/:path*'],
};
