/**
========================================================================
 ARCJET SECURITY — NEXT.JS + ORPC PRODUCTION GUIDE
========================================================================

This document explains how modern SaaS and mission-critical systems use:

• Arcjet (WAF + Bot + Abuse Protection)
• Next.js App Router
• ORPC middleware

to secure:
• APIs
• Dashboards
• Presim
• Telemetry
• Admin panels

========================================================================
 1. WHAT IS ARCJET?
========================================================================

Arcjet is a programmable security layer that sits in front of your app.

It protects against:
• Bots
• Credential stuffing
• SQL injection
• Abuse & scraping
• AI crawlers
• DDoS style flooding

Arcjet works like:
Cloudflare + WAF + Bot detection
but controlled from your code.


========================================================================
 2. HOW ARCJET WORKS
========================================================================

Incoming Request
    ↓
Arcjet rules (Shield, Bot, Rate Limit)
    ↓
Decision (Allow / Deny / Log)
    ↓
Next.js / ORPC Handler


========================================================================
 3. SHIELD (WAF)
========================================================================

shield({ mode: "LIVE" })

Protects against:
• SQL injection
• XSS
• Path traversal
• Common exploits

Modes:

DRY_RUN → Detect only (log)
LIVE    → Block in production


========================================================================
 4. BOT DETECTION
========================================================================

detectBot({
  mode: "LIVE",
  allow: [
    "CATEGORY:SEARCH_ENGINE",
    "CATEGORY:MONITOR",
    "CATEGORY:PREVIEW"
  ]
})

Blocks:
• AI scrapers
• Unknown bots
• Scraping tools

Allows:
• Google
• Bing
• Uptime checks
• Slack previews


========================================================================
 5. WHY BOT BLOCKING MATTERS
========================================================================

Stops:
• Data scraping
• AI model training
• Credential brute-force
• Pricing scraping
• API abuse


========================================================================
 6. LIVE vs DRY_RUN
========================================================================

DRY_RUN:
• Logs what WOULD be blocked
• No user impact
• Used in testing

LIVE:
• Blocks bad requests
• Enforced security
• Used in production


========================================================================
 7. ARCJET IN NEXT.JS
========================================================================

Arcjet must run before your route logic.

It receives:
• Request
• IP
• Headers
• User-agent

It returns:
• Allow
• Deny with reason


========================================================================
 8. ORPC MIDDLEWARE INTEGRATION
========================================================================

Arcjet is used as a middleware:

base
 .$context<{ request: Request }>()
 .middleware(async ({ context, next, errors }) => {

  const decision = await aj.protect(context.request)

  if (decision.isDenied()) {
    throw errors.FORBIDDEN()
  }

  return next()
 })


========================================================================
 9. WHY THIS IS POWERFUL
========================================================================

Arcjet runs:
BEFORE
• Zod validation
• DB queries
• Business logic

So attackers never reach your backend.


========================================================================
 10. SECURITY LAYERS
========================================================================

Arcjet provides:
• WAF
• Bot control
• Rate limit
• Abuse detection
• IP reputation

All programmable from code.


========================================================================
 11. USER-LEVEL PROTECTION
========================================================================

Arcjet supports:

aj.protect(request, {
  userId: "123"
})

This enables:
• Per-user rate limits
• Per-user abuse detection
• Per-account throttling


========================================================================
 12. REAL-WORLD USE CASES
========================================================================

Used to protect:
• Presim endpoints
• Telemetry streams
• Mission control panels
• Internal tools
• Admin APIs


========================================================================
 13. WHY NOT JUST CLOUDFLARE?
========================================================================

Cloudflare is external.

Arcjet:
• Knows your routes
• Knows your users
• Knows your sessions
• Can block per-endpoint


========================================================================
 14. FAIL-SAFE DESIGN
========================================================================

If Arcjet fails:
• Request is blocked
• App stays safe

Security > availability


========================================================================
 15. HOW ARCJET FITS ANTARIS-STYLE SYSTEMS
========================================================================

Every critical endpoint:
• Presim
• Schedule
• Fault injection
• HWIL

Is protected before execution.


========================================================================
 16. MENTAL MODEL
========================================================================

Arcjet is:
A programmable firewall inside your app.

Not outside.
Not after.
Before everything.


========================================================================
 END
========================================================================
