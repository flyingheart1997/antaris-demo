import { cookies } from 'next/headers'

export const AUTH_COOKIE_KEY = 'atmos_access_token'
export const REFRESH_COOKIE_KEY = 'atmos_refresh_token'
const MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export async function setAuthCookies(accessToken: string, refreshToken?: string) {
    const cookieStore = await cookies()
    
    cookieStore.set(AUTH_COOKIE_KEY, accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: MAX_AGE
    })

    if (refreshToken) {
        cookieStore.set(REFRESH_COOKIE_KEY, refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: MAX_AGE
        })
    }
}

export async function clearAuthCookies() {
    const cookieStore = await cookies()
    
    cookieStore.delete(AUTH_COOKIE_KEY)
    cookieStore.delete(REFRESH_COOKIE_KEY)
}

export async function getAccessToken() {
    const cookieStore = await cookies()
    return cookieStore.get(AUTH_COOKIE_KEY)?.value
}

export async function getRefreshToken() {
    const cookieStore = await cookies()
    return cookieStore.get(REFRESH_COOKIE_KEY)?.value
}

/**
 * Checks if a JWT access token is expired (or will expire within a buffer window).
 * bufferSeconds: how many seconds before actual expiry to treat it as expired.
 * Default is 60s — gives enough runway to refresh before an in-flight request fails.
 */
export function isTokenExpired(token: string, bufferSeconds = 60): boolean {
    try {
        // JWT payload is the second base64url segment
        const payloadB64 = token.split('.')[1]
        if (!payloadB64) return true
        const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf-8'))
        // exp is Unix timestamp in seconds
        if (typeof payload.exp !== 'number') return true
        return Date.now() / 1000 >= payload.exp - bufferSeconds
    } catch {
        // Any decode error → treat as expired (safe default)
        return true
    }
}
