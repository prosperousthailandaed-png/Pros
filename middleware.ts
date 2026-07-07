// middleware.ts (วางไว้ที่ root โปรเจกต์ ระดับเดียวกับ app/)
// เช็คคุกกี้ admin_session ทุกครั้งที่เข้า /admin/* ยกเว้น /admin/login

import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_ADMIN_PATHS = ['/admin/login'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_ADMIN_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const session = request.cookies.get('admin_session')?.value;
  const expected = process.env.ADMIN_SESSION_TOKEN;

  if (!expected) {
    // ยังไม่ได้ตั้งค่า ADMIN_SESSION_TOKEN ใน .env.local — กันไม่ให้เข้าได้เลย
    return new NextResponse('ADMIN_SESSION_TOKEN ยังไม่ถูกตั้งค่าใน .env.local', {
      status: 500,
    });
  }

  if (!session || session !== expected) {
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};