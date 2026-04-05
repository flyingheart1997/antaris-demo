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
