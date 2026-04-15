import { NextRequest, NextResponse } from 'next/server'
import { AUTH_COOKIE_KEY, REFRESH_COOKIE_KEY, isTokenExpired } from '@/lib/auth/session'
import { refreshAccessToken } from '@/lib/auth/keycloak'

// ---------------------------------------------------------------------------
// Cookie options (shared for both access and refresh token)
// ---------------------------------------------------------------------------

const COOKIE_OPTS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
}

// ---------------------------------------------------------------------------
// Route-protection helper — checks cookie presence and redirects if needed
// ---------------------------------------------------------------------------

function routeGuard(request: NextRequest): NextResponse {
    const { pathname } = request.nextUrl

    const publicRoutes = [
        '/',
        '/login',
        '/preview',
        '/catalog',
        '/component-docs',
    ]

    const isStaticAsset = /\.(png|jpg|jpeg|gif|webp|svg|ico)$/i.test(pathname)

    const isPublicRoute =
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api/auth') ||
        pathname.startsWith('/public') ||
        isStaticAsset ||
        publicRoutes.some(route => pathname === route || pathname.startsWith(route + '/'))

    const token = request.cookies.get(AUTH_COOKIE_KEY)?.value

    if (!token && !isPublicRoute) {
        return NextResponse.redirect(new URL('/api/auth/login', request.url))
    }

    if (token && pathname === '/login') {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

// ---------------------------------------------------------------------------
// Main proxy function — token refresh + route protection
// Next.js 16+ reads this file as the middleware entry point.
// ---------------------------------------------------------------------------

export async function proxy(request: NextRequest): Promise<NextResponse> {
    const accessToken = request.cookies.get(AUTH_COOKIE_KEY)?.value
    const refreshToken = request.cookies.get(REFRESH_COOKIE_KEY)?.value

    // Attempt silent token refresh only when:
    //   1. An access token is present (user logged in before)
    //   2. The access token is expired or within the 60s buffer window
    //   3. A refresh token is available
    if (accessToken && refreshToken && isTokenExpired(accessToken)) {
        try {
            const newTokens = await refreshAccessToken(refreshToken)

            // Run route protection on the original request, then attach fresh tokens
            const response = routeGuard(request)
            response.cookies.set(AUTH_COOKIE_KEY, newTokens.access_token, COOKIE_OPTS)
            response.cookies.set(
                REFRESH_COOKIE_KEY,
                newTokens.refresh_token ?? refreshToken, // some providers don't rotate refresh tokens
                COOKIE_OPTS,
            )
            return response
        } catch {
            // Refresh token also expired — clear cookies and force re-login
            const response = NextResponse.redirect(new URL('/api/auth/login', request.url))
            response.cookies.delete(AUTH_COOKIE_KEY)
            response.cookies.delete(REFRESH_COOKIE_KEY)
            return response
        }
    }

    return routeGuard(request)
}

// ---------------------------------------------------------------------------
// Matcher config — runs on every request except Next.js static internals
// ---------------------------------------------------------------------------

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
}
