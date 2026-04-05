import { NextRequest, NextResponse } from 'next/server'
import { AUTH_COOKIE_KEY } from '@/lib/auth/session'

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl
    
    // 1. Define Public routes
    const isPublicRoute = 
        pathname.startsWith('/_next') || 
        pathname.startsWith('/api/auth') || 
        pathname.startsWith('/favicon.ico') ||
        pathname.startsWith('/public') ||
        pathname === '/login'

    // 2. Get the token from cookies
    const token = request.cookies.get(AUTH_COOKIE_KEY)?.value

    // 3. If no token and not a public route, redirect to login
    if (!token && !isPublicRoute) {
        const loginUrl = new URL('/api/auth/login', request.url)
        return NextResponse.redirect(loginUrl)
    }

    // 4. (Optional) If token exists and they're on login page, redirect to home
    if (token && pathname === '/login') {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
}
