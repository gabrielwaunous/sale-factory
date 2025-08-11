import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Este middleware se ejecuta en todas las rutas
export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.has('auth')
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/(protected)')
  const isLoginPage = request.nextUrl.pathname === '/login'

  if (!isAuthenticated && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isAuthenticated && isLoginPage) {
    return NextResponse.redirect(new URL('/(protected)/dashboard', request.url))
  }

  return NextResponse.next()
}
