import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Este middleware se ejecuta en todas las rutas
export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.has('auth') // Por ahora usaremos una cookie simple

  // Lista de rutas que requieren autenticación
  const authRoutes = ['/dashboard', '/products', '/sales', '/users']
  
  // Verificar si la ruta actual requiere autenticación
  const requiresAuth = authRoutes.some(route => request.nextUrl.pathname.startsWith(route))

  // Si la ruta requiere autenticación y el usuario no está logueado
  if (requiresAuth && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Si el usuario está logueado y trata de acceder a /login
  if (isLoggedIn && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}
