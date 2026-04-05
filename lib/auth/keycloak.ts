const KC_URL = process.env.KEYCLOAK_URL || 'https://id.antaris-staging.cloud/'
const KC_REALM = process.env.KEYCLOAK_REALM || 'ATMOS'
const KC_CLIENT_ID = process.env.KEYCLOAK_CLIENT_ID || 'ATMOS-UI-CLIENT'
const KC_CLIENT_SECRET = process.env.KEYCLOAK_CLIENT_SECRET // Only needed if Client is confidential
const KC_RESOURCE_CLIENT = process.env.KEYCLOAK_RESOURCE_CLIENT || 'ATMOS-RESOURCE-SERVER'

export const getLoginUrl = (redirectUri: string) => {
    return `${KC_URL}realms/${KC_REALM}/protocol/openid-connect/auth?client_id=${KC_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=openid`
}

export const getLogoutUrl = (redirectUri: string) => {
    return `${KC_URL}realms/${KC_REALM}/protocol/openid-connect/logout?client_id=${KC_CLIENT_ID}&post_logout_redirect_uri=${encodeURIComponent(redirectUri)}`
}

export async function exchangeCodeForToken(code: string, redirectUri: string) {
    const body = new URLSearchParams()
    body.append('grant_type', 'authorization_code')
    body.append('client_id', KC_CLIENT_ID)
    if (KC_CLIENT_SECRET) {
        body.append('client_secret', KC_CLIENT_SECRET)
    }
    body.append('code', code)
    body.append('redirect_uri', redirectUri)

    const response = await fetch(`${KC_URL}realms/${KC_REALM}/protocol/openid-connect/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
    })
    
    if (!response.ok) {
        throw new Error('Failed to exchange code for token')
    }

    return response.json()
}

export async function getUmaTicket(accessToken: string) {
    const body = new URLSearchParams()
    body.append('grant_type', 'urn:ietf:params:oauth:grant-type:uma-ticket')
    body.append('audience', KC_RESOURCE_CLIENT)

    const response = await fetch(`${KC_URL}realms/${KC_REALM}/protocol/openid-connect/token`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
    })

    if (!response.ok) {
        throw new Error('Failed to exchange UMA ticket')
    }

    return response.json()
}
