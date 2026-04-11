# Splash Screen Feature

The Antaris Splash Screen is a high-fidelity orchestrated animation sequence that serves as the entry point for the application. It reinforces the "Orbital Ops" aesthetic by transitioning between satellite hardware forms and corporate branding.

## Architecture

The feature is located in [`features/splash-screen/`](file:///Users/koushikmondal/ANTARIS_PROJECTS/antaris-demo/features/splash-screen/).

### Core Components
- **`SplashScreen`**: The main orchestrator using `framer-motion` and `useAnimate`. It handles the 5-stage lifecycle and manages the unmounting logic.
- **`SplashSatellite`**: Renders the satellite SVG form. Paths are individually animated (scattered) when transitioning to the logo.
- **`SplashLogo`**: Renders the Antaris brand mark. Parts (wings, icon, text) assemble from disparate positions.

### Configuration
Data and timings are centralized in [`constants.ts`](file:///Users/koushikmondal/ANTARIS_PROJECTS/antaris-demo/features/splash-screen/constants.ts):
- `SAT_PATHS`: Raw SVG data for the satellite.
- `SCATTER_DATA`: Vectors (x, y, rotation) for each satellite path during move-aside.
- `ANIMATION_MS`: Timings for each stage of the sequence.

## Animation Lifecycle

| Stage | Duration | Description |
|---|---|---|
| **Enter** | 1300 ms | Outer container follows a curved orbital arc (X: −42 vw → 0, Y: 42 vh → 0) while scaling up and fading in. X uses `easeOut`, Y uses `easeIn` — different easing per axis produces a genuine arc rather than a straight-line diagonal. |
| **Morph-In** | 700 ms | Each of the 11 satellite `<motion.path>` elements scatters to a pre-defined vector (see `SCATTER_DATA` in `constants.ts`). Simultaneously the logo's three groups (wings, icon mark, ANTARIS text) stagger-assemble with 0 / 80 / 160 ms delays. A radial glow burst fires at the crossover. The 700 ms window is intentionally generous so both the scatter and the assemble are fully legible. |
| **Hold** | 2500 ms | Static display of the Antaris logo and mission tagline. |
| **Morph-Out** | 700 ms | Logo groups dissolve in reverse stagger order; satellite paths snap back (faster 22 ms stagger). Another glow burst fires. |
| **Exit** | 900 ms | Satellite departs on a mirrored arc to the top-right (X: 0 → 44 vw, Y: 0 → −44 vh). Y uses `easeOut`, X uses `easeIn` — the satellite first rises steeply, then swings right. |
| **Total** | **~7 s** | Component unmounts after exit completes. |

## Integration

The Splash Screen is integrated into the [`RootLayout`](file:///Users/koushikmondal/ANTARIS_PROJECTS/antaris-demo/app/layout.tsx) at the top of the provider tree. It ensures that the user is greeted with a premium experience before seeing the main content.

```tsx
// app/layout.tsx
<AllProviders token={token ?? null}>
  <SplashScreen />
  <Toaster />
  {children}
</AllProviders>
```

## Design System & Tokens

- **Background**: Uses `bg-surface-bg` with an atmospheric radial glow (`blue-alpha-3`) and a 40px cyber grid.
- **Foreground**: Icon and text paths use `fill-icon-primary`.
- **Atmosphere**: Transitions use `blue-alpha-5` for the glow burst effect.

## See Also
- [Design System](file:///Users/koushikmondal/ANTARIS_PROJECTS/antaris-demo/docs/features/design-system.md)
- [System Overview](file:///Users/koushikmondal/ANTARIS_PROJECTS/antaris-demo/docs/ai-context/system-overview.md)
