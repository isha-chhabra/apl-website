"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "motion/react";
import { ChevronDown, GitCompareArrows, Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  CoverageMeter,
  GroupIcon,
  PkOrb,
  PriceBlock,
  Tick,
  pkStyle,
} from "@/components/site/packages/pk-ui";
import { GROUPS, PACKAGES, includedGroups, pkColor, type HealthPackage } from "@/lib/data/packages";
import { CALL_HREF } from "@/lib/site";
import { cn } from "@/lib/utils";

function PackageCard({ pkg, onCompare }: { pkg: HealthPackage; onCompare: () => void }) {
  const [open, setOpen] = useState(false);
  const color = pkColor(pkg.index);
  const lit = new Set(includedGroups(pkg.index).map((g) => g.id));

  // Tilt and a moving light, for a mouse. Touch just gets a press.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotY = useSpring(useTransform(px, [0, 1], [-7, 7]), { stiffness: 200, damping: 22 });
  const rotX = useSpring(useTransform(py, [0, 1], [6, -6]), { stiffness: 200, damping: 22 });
  const lx = useTransform(() => px.get() * 100);
  const ly = useTransform(() => py.get() * 100);
  const light = useMotionTemplate`radial-gradient(360px circle at ${lx}% ${ly}%, rgb(255 255 255 / 0.16), transparent 60%)`;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div className="h-full [perspective:1100px]" style={pkStyle(pkg.index)}>
      <motion.article
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        whileTap={{ scale: 0.985 }}
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
        className="glass-glow h-full"
      >
        <motion.span aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: light }} />

        <div className="relative flex h-full flex-col p-5">
          <div className="flex items-center gap-3.5">
            <PkOrb pkg={pkg} className="size-12" />
            <div className="min-w-0">
              <p className="font-mono text-[12px] tracking-wide uppercase" style={{ color }}>
                {pkg.name}
              </p>
              <h3 className="font-display text-[26px] leading-[1.05] font-bold tracking-[-0.03em]">{pkg.tier}</h3>
              <p className="sr-only">{pkg.label}</p>
            </div>
          </div>

          <div className="mt-5">
            <PriceBlock pkg={pkg} align="left" />
          </div>

          <CoverageMeter pkg={pkg} className="mt-5" />

          {/* All 14 body areas. The ones this package covers are lit. */}
          <ul className="mt-5 grid grid-cols-7 gap-1.5" aria-label="Body areas covered">
            {GROUPS.map((g) => {
              const on = lit.has(g.id);
              return (
                <li
                  key={g.id}
                  title={g.name}
                  className={cn(
                    "grid aspect-square place-items-center rounded-xl transition-colors",
                    on ? "text-[#22070d]" : "bg-sunken text-ink-2/40",
                  )}
                  style={on ? { background: "linear-gradient(135deg, var(--c1), var(--c2))" } : undefined}
                >
                  <GroupIcon icon={g.icon} className="size-[17px]" />
                  <span className="sr-only">
                    {g.name}, {on ? "included" : "not included"}
                  </span>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="mt-5 flex min-h-12 w-full items-center justify-between gap-3 rounded-2xl border border-line-2 bg-sunken px-4 text-left text-[15px] font-semibold transition-colors hover:border-ink"
          >
            See all tests
            <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown className="size-5" aria-hidden="true" />
            </motion.span>
          </button>
          <motion.div
            initial={false}
            animate={{ height: open ? "auto" : 0 }}
            transition={{ type: "spring", bounce: 0, visualDuration: 0.5 }}
            className="overflow-hidden"
            aria-hidden={!open}
          >
            <div className="grid gap-5 pt-5">
              {includedGroups(pkg.index).map((g) => (
                <div key={g.id}>
                  <h4 className="flex items-center gap-2 font-display text-[16px] font-semibold">
                    <GroupIcon icon={g.icon} className="size-4 text-[var(--c1)]" />
                    {g.name}
                  </h4>
                  <ul className="mt-1">
                    {g.tests.map((t) => (
                      <li key={t.name} className="grid grid-cols-[22px_1fr] items-start gap-2.5 py-1.5 text-[14.5px] leading-snug">
                        <Tick color={color} className="mt-[2px]" />
                        <span>{t.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="mt-auto grid gap-2.5 pt-6">
            <a href={CALL_HREF} className={cn(buttonVariants(), "w-full")}>
              <Phone /> Call to book
            </a>
            <button type="button" onClick={onCompare} className={cn(buttonVariants({ variant: "line", size: "sm" }), "w-full")}>
              <GitCompareArrows /> Compare all 5
            </button>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export function CardsView({ onCompare }: { onCompare: () => void }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Which card is nearest the middle, for the dots.
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const mid = el.scrollLeft + el.clientWidth / 2;
        let best = 0;
        let bestDist = Infinity;
        for (let i = 0; i < el.children.length; i++) {
          const c = el.children[i] as HTMLElement;
          const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid);
          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
        }
        setActive(best);
      });
    };
    el.addEventListener("scroll", update, { passive: true });
    return () => {
      el.removeEventListener("scroll", update);
      cancelAnimationFrame(raf);
    };
  }, []);

  const goTo = (i: number) => {
    const el = scroller.current;
    const c = el?.children[i] as HTMLElement | undefined;
    if (el && c) el.scrollTo({ left: c.offsetLeft - (el.clientWidth - c.offsetWidth) / 2, behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={scroller}
        className="-mx-5 flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden"
      >
        {PACKAGES.map((pkg, i) => (
          <motion.div
            key={pkg.id}
            className="w-[84%] max-w-[350px] shrink-0 snap-center md:w-auto md:max-w-none"
            initial={{ y: 36 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{ type: "spring", bounce: 0.15, visualDuration: 0.7, delay: (i % 3) * 0.06 }}
          >
            <PackageCard pkg={pkg} onCompare={onCompare} />
          </motion.div>
        ))}
      </div>

      <div className="mt-2 flex justify-center gap-2 md:hidden" role="tablist" aria-label="Choose a package">
        {PACKAGES.map((pkg, i) => (
          <button
            key={pkg.id}
            type="button"
            role="tab"
            aria-selected={active === i}
            aria-label={pkg.label}
            onClick={() => goTo(i)}
            className="grid size-8 place-items-center"
          >
            <motion.span
              className="block h-2 rounded-full"
              animate={{ width: active === i ? 26 : 8, opacity: active === i ? 1 : 0.45 }}
              transition={{ type: "spring", bounce: 0.3, visualDuration: 0.4 }}
              style={{ background: `linear-gradient(90deg, ${pkColor(i)}, var(--pk-${i + 1}-2))` }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
