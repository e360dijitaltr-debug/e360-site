import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Sadece /admin ile başlayan sayfalarda çalışsın
  if (request.nextUrl.pathname.startsWith('/admin')) {
    
    const basicAuth = request.headers.get('authorization');

    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');

      const validUser = process.env.ADMIN_USER || 'admin';
      const validPass = process.env.ADMIN_PASS || '123456';

      if (user === validUser && pwd === validPass) {
        return NextResponse.next();
      }
    }

    return new NextResponse('Yetkisiz Giris!', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="e-360 Dijital"',
      },
    });
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};