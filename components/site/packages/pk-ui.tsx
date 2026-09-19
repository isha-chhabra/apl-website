"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import {
  ChartNoAxesColumn,
  Bean,
  Crown,
  Droplet,
  Droplets,
  FlaskConical,
  Flame,
  Gauge,
  HeartPulse,
  Magnet,
  Pill,
  Ribbon,
  Utensils,
  Waves,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  GROUPS,
  TOTAL_GROUPS,
  coverage,
  formatInr,
  pkColor,
  pkColor2,
  type HealthPackage,
  type IconKey,
} from "@/lib/data/packages";

const ICONS: Record<IconKey, LucideIcon> = {
  blood: Droplet,
  kidney: Bean,
  diabetes: Gauge,
  lipid: Droplets,
  liver: FlaskConical,
  thyroid: Zap,
  vitamins: Pill,
  metabolic: ChartNoAxesColumn,
  inflammation: Flame,
  iron: Magnet,
  tumor: Ribbon,
  heart: HeartPulse,
  digestive: Utensils,
  clots: Waves,
};

export function GroupIcon({ icon, className }: { icon: IconKey; className?: string }) {
  const Icon = ICONS[icon];
  return <Icon className={cn("size-[18px]", className)} aria-hidden="true" />;
}

/** CSS variables that light an element in a package's own colour. */
export const pkStyle = (index: number): CSSProperties =>
  ({ "--c1": pkColor(index), "--c2": pkColor2(index) }) as CSSProperties;

/** The coloured circle that stands for a package. */
export function PkOrb({ pkg, className }: { pkg: HealthPackage; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid size-11 shrink-0 place-items-center rounded-full font-display text-[17px] font-bold text-[#22070d] shadow-[0_0_0_4px_rgb(255_255_255/0.06),0_10px_26px_-6px_var(--c1)]",
        className,
      )}
      style={{ ...pkStyle(pkg.index), background: "linear-gradient(135deg, var(--c1), var(--c2))" }}
    >
      {pkg.index === 4 ? <Crown className="size-5" /> : pkg.short}
    </span>
  );
}

/** A tick that draws itself. */
export function Tick({ color, delay = 0, className }: { color: string; delay?: number; className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={cn("size-[18px]", className)} aria-hidden="true">
      <motion.path
        d="M4.5 10.5l3.5 3.5 7.5-8"
        fill="none"
        stroke={color}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "0px 0px -8% 0px" }}
        transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

/** An amount in rupees that counts up once when it scrolls into view. */
export function CountInr({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const mv = useMotionValue(value);
  const text = useTransform(() => formatInr(Math.round(mv.get())));

  useEffect(() => {
    if (!inView || reduce) return;
    mv.set(0);
    const controls = animate(mv, value, { duration: 1.3, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [inView, reduce, value, mv]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      <motion.span>{text}</motion.span>
    </span>
  );
}

/** MRP, Offer Price and You Save, worded exactly as on the chart. */
export function PriceBlock({
  pkg,
  align = "right",
  size = "lg",
}: {
  pkg: HealthPackage;
  align?: "left" | "right";
  size?: "md" | "lg";
}) {
  return (
    <div className={cn("shrink-0", align === "right" ? "text-right" : "text-left")}>
      <p className="font-mono text-[12.5px] text-ink-2">
        MRP <s className="decoration-ink-2/70">{formatInr(pkg.mrp)}</s>
      </p>
      <p className="mt-1.5 font-mono text-[11px] tracking-wide text-ink-2 uppercase">Offer Price</p>
      <p
        className={cn(
          "font-display leading-none font-bold tracking-[-0.03em] whitespace-nowrap",
          size === "lg" ? "text-[38px]" : "text-[30px]",
        )}
      >
        <CountInr value={pkg.offer} className="text-warm" />
      </p>
      <p
        className={cn(
          "mt-2.5 inline-flex min-h-7 items-center rounded-full bg-ok-tint px-3 font-mono text-[12px] text-ok-ink",
        )}
      >
        You Save {formatInr(pkg.save)}
      </p>
    </div>
  );
}

/** Fourteen segments. The lit ones are the body functions this package covers. */
export function CoverageMeter({ pkg, className }: { pkg: HealthPackage; className?: string }) {
  const n = coverage(pkg.index);
  return (
    <div className={className} style={pkStyle(pkg.index)}>
      <div className="flex gap-[3px]" aria-hidden="true">
        {GROUPS.map((g, i) => (
          <span
            key={g.id}
            className={cn("h-1.5 flex-1 rounded-full", i >= n && "bg-line")}
            style={i < n ? { background: "linear-gradient(90deg, var(--c1), var(--c2))" } : undefined}
          />
        ))}
      </div>
      <p className="mt-2 font-mono text-[12.5px] text-ink-2">
        Covers {n} of {TOTAL_GROUPS} body areas
      </p>
    </div>
  );
}

