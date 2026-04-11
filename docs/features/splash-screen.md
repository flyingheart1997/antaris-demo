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

1. **Enter (1300ms)**: Outer container follows a curved orbital arc (X: -42vw to 0, Y: 42vh to 0) while scaling up and rotating into view.
2. **Morph-In (600ms)**: Satellite paths scatter outward while logo components (wings, mark, text) assemble inward. A glow flash emphasizes the transition.
3. **Hold (2500ms)**: Static display of the Antaris logo and mission tagline.
4. **Morph-Out (700ms)**: Logo scatters back to hidden states while satellite paths re-assemble. Another glow flash occurs.
5. **Exit (900ms)**: Satellite departs horizontally with acceleration (X: 0 to 44vw, Y: 0 to -44vh) and fades out.

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
