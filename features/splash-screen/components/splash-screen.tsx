'use client';

import { motion, useAnimate } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  ANIMATION_MS,
  ICON_PATHS,
  SAT_PATHS,
  SCATTER_DATA,
  TEXT_PATHS,
  WING_PATH,
} from '../constants';

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

// ─── Satellite sub-component ──────────────────────────────────────────────────
function SplashSatellite({ scattered }: { scattered: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={120}
      height={120}
      viewBox="0 0 24 24"
      fill="none"
      className="overflow-visible"
    >
      <g clipPath="url(#splash-sat-clip)">
        {SAT_PATHS.map((d, i) => {
          const v = SCATTER_DATA[i] ?? { x: 0, y: 0, r: 0 };
          return (
            <motion.path
              key={i}
              d={d}
              className="fill-icon-primary"
              initial={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
              animate={
                scattered
                  ? { opacity: 0, x: v.x, y: v.y, rotate: v.r }
                  : { opacity: 1, x: 0,   y: 0,   rotate: 0   }
              }
              transition={
                scattered
                  ? { delay: i * 0.032, duration: 0.42, ease: 'easeOut' }
                  : { delay: i * 0.022, duration: 0.30, ease: 'easeOut' }
              }
            />
          );
        })}
      </g>
      <defs>
        <clipPath id="splash-sat-clip">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

// ─── Logo sub-component ───────────────────────────────────────────────────────
function SplashLogo({ visible }: { visible: boolean }) {
  const S = 4;
  const W = 80.308 * S; // 321.232px
  const H = 24 * S;     // 96px

  // Shared transition helper
  const t = (delay: number) => ({
    duration: 0.38,
    delay,
    ease: 'easeOut' as const,
  });

  // Target states: in = assemble, out = scatter back
  const wingsIn  = { opacity: 1, y: 0 };
  const wingsOut = { opacity: 0, y: -10 };
  const iconIn   = { opacity: 1, scale: 1 };
  const iconOut  = { opacity: 0, scale: 0.7 };
  const textIn   = { opacity: 1, y: 0 };
  const textOut  = { opacity: 0, y: 14 };

  return (
    <div className="relative" style={{ width: W, height: H }}>

      {/* ── Left wing ── */}
      <motion.div
        initial={wingsOut}
        animate={visible ? wingsIn : wingsOut}
        transition={t(visible ? 0 : 0.12)}
        className="absolute"
        style={{
          width: 21 * S,
          height: 7.154 * S,
          left: 12.46 * S,
          top: 5.54 * S,
        }}
      >
        <svg
          className="block h-full w-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 21 7.15385"
        >
          <path d={WING_PATH} className="fill-icon-primary" />
        </svg>
      </motion.div>

      {/* ── Right wing ── */}
      <motion.div
        initial={wingsOut}
        animate={visible ? wingsIn : wingsOut}
        transition={t(visible ? 0.04 : 0.08)}
        className="absolute"
        style={{
          width: 21 * S,
          height: 7.154 * S,
          left: 46.15 * S,
          top: 5.54 * S,
        }}
      >
        <svg
          className="block h-full w-full -scale-x-100 -scale-y-100"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 21 7.15385"
        >
          <path d={WING_PATH} className="fill-icon-primary" />
        </svg>
      </motion.div>

      {/* ── Centre icon mark ── */}
      <motion.div
        initial={iconOut}
        animate={visible ? iconIn : iconOut}
        transition={t(visible ? 0.08 : 0.04)}
        className="absolute"
        style={{
          left: 34.15 * S,
          top: 0,
          width: 11.0769 * S,
          height: 11.0769 * S,
        }}
      >
        <svg
          className="block h-full w-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 11.0769 11.0769"
        >
          <g clipPath="url(#splash-icon-clip)">
            {ICON_PATHS.map((d, i) => (
              <path key={i} d={d} className="fill-icon-primary" />
            ))}
          </g>
          <defs>
            <clipPath id="splash-icon-clip">
              <rect fill="white" width="11.0769" height="11.0769" />
            </clipPath>
          </defs>
        </svg>
      </motion.div>

      {/* ── ANTARIS lettering ── */}
      <motion.div
        initial={textOut}
        animate={visible ? textIn : textOut}
        transition={t(visible ? 0.16 : 0)}
        className="absolute"
        style={{
          left: 0,
          top: 14.54 * S,
          width: W,
          height: 9.462 * S,
        }}
      >
        <svg
          className="block h-full w-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 80.3077 9.46154"
        >
          {TEXT_PATHS.map(({ d, rule }, i) => (
            <path
              key={i}
              d={d}
              className="fill-icon-primary"
              {...(rule ? { clipRule: rule, fillRule: rule } : {})}
            />
          ))}
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function SplashScreen() {
  const [xRef, animateX] = useAnimate();
  const [yRef, animateY] = useAnimate();

  const [showLogo, setShowLogo] = useState(false);
  const [mounted, setMounted] = useState(true);
  const [flashGlow, setFlashGlow] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    async function sequence() {
      // 1. Enter: Curved orbital arc
      await Promise.all([
        animateX(
          xRef.current,
          { x: '0vw', scale: 1, opacity: 1, rotate: 0 },
          {
            duration: ANIMATION_MS.enter / 1000,
            ease: [0.25, 0.1, 0.25, 1], // easeOut
          }
        ),
        animateY(
          yRef.current,
          { y: '0vh' },
          {
            duration: ANIMATION_MS.enter / 1000,
            ease: [0.42, 0, 1, 1], // easeIn
          }
        ),
      ]);

      if (isCancelled) return;

      // 2. Morph phase 1: Satellite → Logo
      setFlashGlow(true);
      setShowLogo(true);
      await sleep(ANIMATION_MS.morphIn);
      setFlashGlow(false);

      if (isCancelled) return;

      // 3. Hold phase: Branding visibility
      await sleep(ANIMATION_MS.hold);

      if (isCancelled) return;

      // 4. Morph phase 2: Logo → Satellite
      setFlashGlow(true);
      setShowLogo(false);
      await sleep(ANIMATION_MS.morphOut);
      setFlashGlow(false);

      if (isCancelled) return;

      // 5. Exit: Accelerated orbital departure
      await Promise.all([
        animateX(
          xRef.current,
          { x: '44vw', scale: 0.15, opacity: 0, rotate: -18 },
          {
            duration: ANIMATION_MS.exit / 1000,
            ease: [0.42, 0, 1, 1], // easeIn
          }
        ),
        animateY(
          yRef.current,
          { y: '-44vh' },
          {
            duration: ANIMATION_MS.exit / 1000,
            ease: [0.25, 0.1, 0.25, 1], // easeOut
          }
        ),
      ]);

      if (!isCancelled) setMounted(false);
    }

    sequence();
    return () => {
      isCancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center overflow-hidden bg-surface-bg">
      {/* Dynamic Background Layer: Ambient Glow + Grid */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {/* Central atmosphere */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="rounded-rounded opacity-40"
            style={{
              width: '800px',
              height: '800px',
              background: 'radial-gradient(circle, var(--color-blue-alpha-3) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
        </div>

        {/* Global grid alignment */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(circle, var(--color-icon-primary) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* ── Animation Container ── */}
      <motion.div
        ref={xRef}
        className="flex items-center justify-center"
        initial={{ x: '-42vw', scale: 0.28, opacity: 0, rotate: 20 }}
      >
        <motion.div
          ref={yRef}
          className="relative flex items-center justify-center"
          initial={{ y: '42vh' }}
        >
          {/* Morphing Glow Burst */}
          <motion.div
            className="pointer-events-none absolute rounded-rounded"
            animate={flashGlow ? { scale: 3.5, opacity: 0.8 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            style={{
              width: 120,
              height: 120,
              background: 'radial-gradient(circle, var(--color-blue-alpha-5) 0%, transparent 65%)',
              filter: 'blur(20px)',
            }}
            aria-hidden
          />

          {/* Focal Layer: Satellite and Logo */}
          <div className="absolute flex items-center justify-center">
            <SplashSatellite scattered={showLogo} />
          </div>

          <div className="absolute flex items-center justify-center">
            <SplashLogo visible={showLogo} />
          </div>
        </motion.div>
      </motion.div>

      {/* Corporate Tagline Layer */}
      <motion.p
        className="pointer-events-none absolute bottom-12 select-none font-body text-xs font-weight-regular uppercase tracking-[0.4em] text-text-secondary/30"
        animate={showLogo ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        initial={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
      >
        Mission Operations Platform
      </motion.p>
    </div>
  );
}
