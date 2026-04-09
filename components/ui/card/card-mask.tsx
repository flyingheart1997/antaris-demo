"use client"

import * as React from "react"

/**
 * CardMask — selected-state background + border overlay for Card.
 *
 * Source: Figma Design System → node 2895:297
 *
 * Key implementation decisions:
 *
 * 1. viewBox="0 0 268 119.998" (card body width only, NOT 279)
 *    The path shape extends to x=279 (the bump tip), but the SVG viewport
 *    only covers x=0→268. With overflow="visible", the bump (x=268→279)
 *    paints OUTSIDE the SVG bounds → protrudes beyond the card's right edge.
 *
 * 2. -z-10 with parent's isolation:isolate
 *    The mask renders at z=-10 within the card's isolated stacking context,
 *    which places it BELOW card content but ABOVE the card's transparent bg.
 *
 * 3. Full outline stroke via vector-effect="non-scaling-stroke"
 *    Keeps stroke at 1px regardless of how the SVG is scaled.
 *
 * 4. React.useId() for unique gradient IDs (safe for multiple selected cards).
 */
export function CardMask() {
  const uid = React.useId().replace(/:/g, "")
  const fillId = `cmf${uid}`
  const bumpGlowId = `cmg${uid}`
  const clipId = `cmc${uid}`

  // Full shape: rounded rect (0→268) + right-side bump that protrudes to x=279
  const shapePath =
    "M272 39.7832C272 41.5048 273.102 43.0333 274.735 43.5779L276.265 44.0882C277.898 44.6327 279 46.1612 279 47.8828V70.1168C279 71.8386 277.898 73.3672 276.265 73.9116L274.735 74.4214C273.102 74.9658 272 76.4944 272 78.2162V115.998C272 118.207 270.209 119.998 268 119.998H4C1.79086 119.998 0 118.207 0 115.998V4C0 1.79086 1.79086 0 4 0H268C270.209 0 272 1.79086 272 4V39.7832Z"

  // Stroke path — Figma's border stroke, expanded 1px outward from shape edge
  const strokePath =
    "M274.735 74.4214L274.419 73.4727L274.735 74.4214ZM276.265 73.9116L276.581 74.8603L276.265 73.9116ZM276.265 44.0882L276.582 43.1395L276.265 44.0882ZM274.735 43.5779L274.418 44.5265L274.735 43.5779ZM274.735 43.5779L274.418 44.5265L275.949 45.0368L276.265 44.0882L276.582 43.1395L275.051 42.6292L274.735 43.5779ZM279 47.8828H278V70.1168H279H280V47.8828H279ZM276.265 73.9116L275.949 72.9629L274.419 73.4727L274.735 74.4214L275.051 75.3701L276.581 74.8603L276.265 73.9116ZM272 78.2162H271V115.998H272H273V78.2162H272ZM268 119.998V118.998H4V119.998V120.998H268V119.998ZM0 115.998H1V4H0H-1V115.998H0ZM4 0V1H268V0V-1H4V0ZM272 4H271V39.7832H272H273V4H272ZM268 0V1C269.657 1 271 2.34315 271 4H272H273C273 1.23858 270.761 -1 268 -1V0ZM0 4H1C1 2.34315 2.34315 1 4 1V0V-1C1.23858 -1 -1 1.23858 -1 4H0ZM4 119.998V118.998C2.34315 118.998 1 117.655 1 115.998H0H-1C-1 118.759 1.23858 120.998 4 120.998V119.998ZM272 115.998H271C271 117.655 269.657 118.998 268 118.998V119.998V120.998C270.761 120.998 273 118.759 273 115.998H272ZM274.735 74.4214L274.419 73.4727C272.377 74.1532 271 76.0639 271 78.2162H272H273C273 76.9248 273.826 75.7784 275.051 75.3701L274.735 74.4214ZM279 70.1168H278C278 71.4082 277.174 72.5546 275.949 72.9629L276.265 73.9116L276.581 74.8603C278.623 74.1798 280 72.2691 280 70.1168H279ZM276.265 44.0882L275.949 45.0368C277.174 45.4452 278 46.5916 278 47.8828H279H280C280 45.7308 278.623 43.8202 276.582 43.1395L276.265 44.0882ZM274.735 43.5779L275.051 42.6292C273.826 42.2208 273 41.0744 273 39.7832H272H271C271 41.9352 272.377 43.8458 274.418 44.5265L274.735 43.5779Z"

  return (
    <svg
      /**
       * viewBox covers only the card body (0→268), NOT the full 279 width.
       * The bump (x=268→279) sits outside this viewport.
       * overflow="visible" lets it paint beyond the SVG element bounds.
       * The parent card must have overflow-visible for the bump to show.
       */
      viewBox="0 0 268 119.998"
      preserveAspectRatio="none"
      overflow="visible"
      className="absolute top-0 left-0 w-full h-full overflow-visible -z-10 pointer-events-none"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Background fill: dark green (left) → transparent black (right) */}
        <linearGradient
          id={fillId}
          x1="0" y1="59.999" x2="279" y2="59.999"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1C2711" stopOpacity="1" />
          <stop offset="1" stopColor="black" stopOpacity="0.2" />
        </linearGradient>

        {/* Bump glow: transparent → lime-green near the right-side bump */}
        <linearGradient
          id={bumpGlowId}
          x1="0" y1="59.999" x2="279" y2="59.999"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.96" stopColor="var(--color-green-9)" stopOpacity="0" />
          <stop offset="0.98" stopColor="var(--color-green-9)" stopOpacity="0.4" />
        </linearGradient>

        {/* Clip mask — constrains bump glow to inside the shape boundary */}
        <mask id={clipId} fill="white">
          <path d={shapePath} />
        </mask>
      </defs>

      {/* Layer 1 — Background gradient fill */}
      <path d={shapePath} fill={`url(#${fillId})`} />

      {/* Layer 2 — Bump glow (gradient stroke, only visible near right-side bump) */}
      <path
        d={strokePath}
        fill={`url(#${bumpGlowId})`}
        mask={`url(#${clipId})`}
      />
    </svg>
  )
}
