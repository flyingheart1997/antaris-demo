# Environment Variables — Setup Guide

All environment variables go in a `.env` file in the project root. Copy the values below, fill in your credentials, and restart the dev server.

---

## Complete `.env` Reference

```env
# ─────────────────────────────────────────
# ARCJET — Application Security
# ─────────────────────────────────────────
ARCJET_KEY=ajkey_your_key_here

# ─────────────────────────────────────────
# KEYCLOAK — Authentication
# ─────────────────────────────────────────
NEXT_PUBLIC_KEYCLOAK_URL=https://id.antaris-staging.cloud/
NEXT_PUBLIC_KEYCLOAK_REALM=ATMOS
NEXT_PUBLIC_KEYCLOAK_CLIENT_ID=ATMOS-UI-CLIENT
NEXT_PUBLIC_KEYCLOAK_RESOURCE_CLIENT=ATMOS-RESOURCE-SERVER

# ─────────────────────────────────────────
# BACKEND — API Base URLs
# ─────────────────────────────────────────
NEXT_PUBLIC_BACKEND_BASE_URL=https://app-flatsat.antaris-staging.cloud/api/
NEXT_PUBLIC_WEBSOCKET_BACKEND_BASE_URL=wss://app-flatsat.antaris-staging.cloud/ws/

# ─────────────────────────────────────────
# APPLICATION
# ─────────────────────────────────────────
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Variable Reference

### `ARCJET_KEY`

| | |
|---|---|
| **Required** | Yes — app will not start without it |
| **Prefix** | None (server-only) |
| **Where used** | `lib/arcjet.ts` |
| **How to get** | Create a site at [app.arcjet.com](https://app.arcjet.com), copy the site key |

Arcjet is the WAF/bot detection/rate limiting layer applied to write operations (`create`, `update`, `delete`). Without this key, the Arcjet client will fail to initialize and all protected endpoints will error.

> For local dev you can use a test key from Arcjet's dashboard — requests won't be blocked in DRY_RUN mode.

---

### `NEXT_PUBLIC_KEYCLOAK_URL`

| | |
|---|---|
| **Required** | Yes — auth flow won't work without it |
| **Prefix** | `NEXT_PUBLIC_` (exposed to browser) |
| **Where used** | `lib/auth/keycloak.ts` — login URL, logout URL, token exchange |
| **Format** | Must end with `/` |

The base URL of your Keycloak instance. For the staging environment: `https://id.antaris-staging.cloud/`.

---

### `NEXT_PUBLIC_KEYCLOAK_REALM`

| | |
|---|---|
| **Required** | Yes |
| **Prefix** | `NEXT_PUBLIC_` |
| **Where used** | `lib/auth/keycloak.ts` |
| **Value** | `ATMOS` (staging) |

The Keycloak realm name. All token endpoints are constructed as `{KEYCLOAK_URL}/realms/{REALM}/protocol/openid-connect/*`.

---

### `NEXT_PUBLIC_KEYCLOAK_CLIENT_ID`

| | |
|---|---|
| **Required** | Yes |
| **Prefix** | `NEXT_PUBLIC_` |
| **Where used** | `lib/auth/keycloak.ts` — OAuth2 code exchange |
| **Value** | `ATMOS-UI-CLIENT` (staging) |

The OAuth2 client ID registered in Keycloak for this frontend application.

---

### `NEXT_PUBLIC_KEYCLOAK_RESOURCE_CLIENT`

| | |
|---|---|
| **Required** | Yes (for UMA authorization) |
| **Prefix** | `NEXT_PUBLIC_` |
| **Where used** | `lib/auth/keycloak.ts` — UMA ticket exchange |
| **Value** | `ATMOS-RESOURCE-SERVER` (staging) |

The resource server client ID used for UMA (User-Managed Access) ticket exchange. This enables fine-grained resource authorization beyond basic OAuth scopes.

---

### `NEXT_PUBLIC_BACKEND_BASE_URL`

| | |
|---|---|
| **Required** | No (not used by current demo — CrudCrud is hardcoded) |
| **Prefix** | `NEXT_PUBLIC_` |
| **Where used** | Will be used when CrudCrud is replaced with real ATMOS backend |
| **Format** | Must end with `/` |

The base HTTP URL for the ATMOS backend REST API. Currently the app uses CrudCrud as a temporary data store with a hardcoded URL in `app/(server)/router/user.ts`. This variable is the correct place for the production backend URL.

---

### `NEXT_PUBLIC_WEBSOCKET_BACKEND_BASE_URL`

| | |
|---|---|
| **Required** | No (required only when using WebSocket features) |
| **Prefix** | `NEXT_PUBLIC_` (browser-safe — not a secret) |
| **Where used** | `lib/websocket.ts` → `WebSocketManager._buildUrl()` |
| **Format** | `wss://` URL, must end with `/` |
| **Staging value** | `wss://app-flatsat.antaris-staging.cloud/ws/` |

WebSocket base URL for real-time satellite data (telemetry, mission events, command feedback).
Endpoint paths are appended per connection: `wss://…/ws/<endpoint>/`.

See [`docs/modules/websocket.md`](../modules/websocket.md) for the full WebSocket module documentation.

---

### `NEXT_PUBLIC_APP_URL`

| | |
|---|---|
| **Required** | Yes — used in OAuth callback URL construction |
| **Prefix** | `NEXT_PUBLIC_` |
| **Where used** | `lib/auth/keycloak.ts` — redirect URI for OAuth callback |
| **Local value** | `http://localhost:3000` |
| **Production** | Set to your deployment URL, e.g. `https://demo.antaris.space` |

Used to construct the OAuth2 redirect URI: `{APP_URL}/api/auth/callback`. This must exactly match a redirect URI registered in the Keycloak client configuration.

---

## Local Dev Checklist

```bash
# 1. Copy template
cp .env.example .env   # (if .env.example exists) — or create manually

# 2. Fill in required values:
#    - ARCJET_KEY
#    - NEXT_PUBLIC_KEYCLOAK_* (all 4)
#    - NEXT_PUBLIC_APP_URL=http://localhost:3000

# 3. Install dependencies
pnpm install

# 4. Start dev server
pnpm dev

# 5. Optional: rebuild design tokens or icons if they've changed
pnpm build:token
pnpm build:icon
```

---

## Variable Security Notes

- Variables **without** `NEXT_PUBLIC_` prefix are server-only — they are never sent to the browser
- Variables **with** `NEXT_PUBLIC_` prefix are embedded in the browser bundle — **never put secrets here**
- `ARCJET_KEY` has no prefix — server-only, never exposed to client
- Keycloak client secret (if used) must also be a server-only variable — never `NEXT_PUBLIC_`
