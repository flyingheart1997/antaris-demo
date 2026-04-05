import { NextRequest, NextResponse } from 'next/server'
import { exchangeCodeForToken, getUmaTicket, getLoginUrl, getLogoutUrl } from '@/lib/auth/keycloak'
import { setAuthCookies, clearAuthCookies } from '@/lib/auth/session'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
const CALLBACK_URL = `${APP_URL}/api/auth/callback`

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ route: string[] }> }
) {
    const params = await context.params
    const route = params.route[0]


    switch (route) {
        case 'login':
            return NextResponse.redirect(getLoginUrl(CALLBACK_URL))

        case 'logout':
            await clearAuthCookies()
            return NextResponse.redirect(getLogoutUrl(APP_URL))

        case 'callback':
            const searchParams = request.nextUrl.searchParams
            const code = searchParams.get('code')

            if (!code) {
                return NextResponse.redirect(`${APP_URL}/login?error=no_code`)
            }

            try {
                // 1. Exchange grant code for tokens
                const tokenResponse = await exchangeCodeForToken(code, CALLBACK_URL)
                
                // 2. Perform UMA exchange (as per old system logic)
                const umaResponse = await getUmaTicket(tokenResponse.access_token)
                
                const { access_token, refresh_token } = umaResponse

                // 3. Store in secure HttpOnly cookies
                await setAuthCookies(access_token, refresh_token)

                return NextResponse.redirect(`${APP_URL}/`)
            } catch (error) {
                console.error('Auth Error:', error)
                return NextResponse.redirect(`${APP_URL}/login?error=auth_failed`)
            }

        default:
            return NextResponse.json({ error: 'Not Found' }, { status: 404 })
    }
}
