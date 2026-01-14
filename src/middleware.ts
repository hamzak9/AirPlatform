import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isLoggedIn = !!req.auth

  // Public routes
  const isPublicRoute =
    pathname === '/' ||
    pathname.startsWith('/features') ||
    pathname.startsWith('/pricing') ||
    pathname.startsWith('/auth')

  // Dashboard routes require authentication
  const isProtectedRoute = pathname.startsWith('/dashboard') ||
    pathname.startsWith('/tasks') ||
    pathname.startsWith('/coordination') ||
    pathname.startsWith('/checklists') ||
    pathname.startsWith('/maintenance') ||
    pathname.startsWith('/inventory') ||
    pathname.startsWith('/payments') ||
    pathname.startsWith('/insights') ||
    pathname.startsWith('/smart-locks') ||
    pathname.startsWith('/housekeeping') ||
    pathname.startsWith('/messaging') ||
    pathname.startsWith('/guide') ||
    pathname.startsWith('/assist') ||
    pathname.startsWith('/upsells')

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/auth/signin', req.url))
  }

  if (isLoggedIn && pathname.startsWith('/auth/signin')) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
