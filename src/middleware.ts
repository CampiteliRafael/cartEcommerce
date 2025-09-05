import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || 
                     request.nextUrl.pathname.startsWith('/register');

  // Se estiver tentando acessar o carrinho sem estar autenticado
  if (request.nextUrl.pathname.startsWith('/cart') && !token) {
    return NextResponse.redirect(new URL('/login?redirect=/cart', request.url));
  }

  // Se já estiver autenticado e tentar acessar páginas de autenticação
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/cart/:path*', '/login', '/register'],
};