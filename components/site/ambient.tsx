"use client";

import type { ReactNode } from "react";
import { MotionConfig, motion, useScroll, useSpring, useTransform } from "motion/react";

/**
 * Site-wide motion setup.
 * - Honours "reduce motion": transforms and layout animations switch off.
 * - Two soft lights drift behind the page as you scroll (transform only).
 * - A thin progress line across the top shows how far down you are.
 */
export function MotionShell({ children }: { children: ReactNode }) {
  const { scrollYProgress, scrollY } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  const a = useTransform(scrollY, [0, 4000], [0, -520]);
  const b = useTransform(scrollY, [0, 4000], [0, 380]);

  return (
    <MotionConfig reducedMotion="user">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 size-[620px] rounded-full"
          style={{ y: a, background: "radial-gradient(closest-side, rgb(255 140 110 / 0.34), transparent)" }}
        />
        <motion.div
          className="absolute top-[45%] -left-56 size-[680px] rounded-full"
          style={{ y: b, background: "radial-gradient(closest-side, rgb(196 83 106 / 0.4), transparent)" }}
        />
      </div>
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-80 h-[3px] origin-left"
        style={{
          scaleX: progress,
          background: "linear-gradient(90deg, var(--pk-1), var(--pk-2), var(--pk-3), var(--pk-4), var(--pk-5))",
        }}
      />
      {children}
    </MotionConfig>
  );
}
