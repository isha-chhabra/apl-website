"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useSpring, useTransform } from "motion/react";
import { Check, ChevronDown, GitCompareArrows, Phone, Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  CoverageMeter,
  GroupIcon,
  PkOrb,
  PriceBlock,
  Tick,
  pkStyle,
} from "@/components/site/packages/pk-ui";
import {
  PACKAGES,
  includedGroups,
  newGroups,
  pkColor,
  type HealthPackage,
} from "@/lib/data/packages";
import { CALL_HREF } from "@/lib/site";
import { cn } from "@/lib/utils";

/** One aligned line: a fixed tick column, then the test name. */
function TestLine({ name, color, delay }: { name: string; color: string; delay: number }) {
  return (
    <li className="grid grid-cols-[22px_1fr] items-start gap-2.5 py-[7px] text-[15px] leading-snug">
      <Tick color={color} delay={delay} className="mt-[2px]" />
      <span>{name}</span>
    </li>
  );
}

function GroupBlock({
  group,
  color,
  baseDelay,
}: {
  group: ReturnType<typeof newGroups>[number];
  color: string;
  baseDelay: number;
}) {
  return (
    <div className="grid grid-cols-[40px_1fr] gap-x-3.5">
      <span
        className="grid size-10 place-items-center rounded-2xl text-[var(--c1)]"
        style={{ background: "color-mix(in srgb, var(--c1) 16%, transparent)" }}
      >
        <GroupIcon icon={group.icon} className="size-5" />
      </span>
      <div className="min-w-0">
        <h4 className="pt-2 font-display text-[17px] leading-tight font-semibold">{group.name}</h4>
        <ul className="mt-1.5 md:grid md:grid-cols-2 md:gap-x-6">
          {group.tests.map((t, i) => (
            <TestLine key={t.name} name={t.name} color={color} delay={baseDelay + i * 0.06} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function RoadmapNode({
  pkg,
  focused,
  onCompare,
}: {
  pkg: HealthPackage;
  focused: boolean;
  onCompare: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reached = useInView(cardRef, { once: true, margin: "0px 0px -42% 0px" });
  const current = useInView(cardRef, { margin: "-42% 0px -42% 0px" });
  const [showAll, setShowAll] = useState(false);

  // The glow inside the card drifts a little as it scrolls past.
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "end start"] });
  const glowY = useTransform(scrollYProgress, [0, 1], [-40, 60]);

  const prev = PACKAGES[pkg.index - 1];
  const adds = newGroups(pkg.index);
  const all = includedGroups(pkg.index);
  const color = pkColor(pkg.index);

  return (
    <li
      id={pkg.id}
      className="grid scroll-mt-44 grid-cols-[44px_1fr] gap-4 md:grid-cols-[120px_1fr] md:gap-8"
      style={pkStyle(pkg.index)}
    >
      {/* The node. It stays in view while its card scrolls past. */}
      <div className="relative z-10">
        <motion.div
          className="sticky top-[calc(170px+env(safe-area-inset-top,0px))] flex justify-center md:justify-center"
          animate={{ scale: current || focused ? 1.16 : reached ? 1 : 0.86, opacity: reached ? 1 : 0.5 }}
          transition={{ type: "spring", bounce: 0.35, visualDuration: 0.5 }}
        >
          <PkOrb pkg={pkg} className="size-11 md:size-14 md:text-xl" />
        </motion.div>
      </div>

      <motion.div
        ref={cardRef}
        className={cn("glass-glow", focused && "ring-2 ring-[var(--c1)]")}
        initial={{ y: 40, scale: 0.97 }}
        whileInView={{ y: 0, scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        transition={{ type: "spring", bounce: 0.15, visualDuration: 0.8 }}
      >
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 -right-16 size-64 rounded-full"
          style={{
            y: glowY,
            background: "radial-gradient(closest-side, color-mix(in srgb, var(--c1) 40%, transparent), transparent)",
          }}
        />

        <div className="relative p-5 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="font-mono text-[12px] tracking-wide uppercase" style={{ color }}>
                {pkg.name}
              </p>
              <h3 className="mt-1 font-display text-[30px] leading-[1.05] font-bold tracking-[-0.03em] md:text-[38px]">
                {pkg.tier}
              </h3>
              <p className="sr-only">{pkg.label}</p>
            </div>
            <PriceBlock pkg={pkg} />
          </div>

          <CoverageMeter pkg={pkg} className="mt-5" />

          <div className="mt-6 border-t border-line pt-5">
            {prev ? (
              <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-lift px-3.5 py-1.5 text-[13.5px] font-semibold">
                <Check className="size-4" style={{ color }} aria-hidden="true" />
                Everything in {prev.name}
                <Plus className="size-3.5 opacity-60" aria-hidden="true" />
              </p>
            ) : null}
            <h4 className="mb-4 font-mono text-[12px] tracking-wide text-ink-2 uppercase">
              {prev ? "Added in this package" : "Tests Included"}
            </h4>
            <div className="grid gap-6">
              {adds.map((g, i) => (
                <GroupBlock key={g.id} group={g} color={color} baseDelay={i * 0.08} />
              ))}
            </div>
          </div>

          {prev ? (
            <div className="mt-6">
              <button
                type="button"
                onClick={() => setShowAll((v) => !v)}
                aria-expanded={showAll}
                className="flex min-h-12 w-full items-center justify-between gap-3 rounded-2xl border border-line-2 bg-sunken px-4 text-left text-[15px] font-semibold transition-colors hover:border-ink"
              >
                See every test in {pkg.name}
                <motion.span animate={{ rotate: showAll ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown className="size-5" aria-hidden="true" />
                </motion.span>
              </button>
              <motion.div
                initial={false}
                animate={{ height: showAll ? "auto" : 0 }}
                transition={{ type: "spring", bounce: 0, visualDuration: 0.5 }}
                className="overflow-hidden"
                aria-hidden={!showAll}
              >
                <div className="grid gap-6 pt-6">
                  {all.map((g) => (
                    <GroupBlock key={g.id} group={g} color={color} baseDelay={0} />
                  ))}
                </div>
              </motion.div>
            </div>
          ) : null}

          <div className="mt-7 flex flex-wrap gap-2.5">
            <a href={CALL_HREF} className={buttonVariants()}>
              <Phone /> Call to book
            </a>
            <button type="button" onClick={onCompare} className={buttonVariants({ variant: "line" })}>
              <GitCompareArrows /> Compare all 5
            </button>
          </div>
        </div>
      </motion.div>
    </li>
  );
}

export function RoadmapView({
  focusId,
  onCompare,
}: {
  focusId: string | null;
  onCompare: () => void;
}) {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 62%", "end 58%"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 32, mass: 0.4 });
  const clip = useTransform(() => `inset(0 0 ${(1 - smooth.get()) * 100}% 0)`);

  return (
    <div className="relative">
      <ol ref={listRef} className="relative grid gap-12 md:gap-16">
        {/* Rail: a quiet track, and the lit line that draws down it as you scroll. */}
        <span aria-hidden="true" className="absolute top-2 bottom-2 left-[20.5px] w-[3px] rounded-full bg-line md:left-[58.5px]" />
        <motion.span
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-[20.5px] w-[3px] rounded-full md:left-[58.5px]"
          style={{
            clipPath: clip,
            background:
              "linear-gradient(180deg, var(--pk-1), var(--pk-2) 28%, var(--pk-3) 52%, var(--pk-4) 76%, var(--pk-5))",
            boxShadow: "0 0 18px 1px rgb(255 190 150 / 0.45)",
          }}
        />
        {PACKAGES.map((pkg) => (
          <RoadmapNode key={pkg.id} pkg={pkg} focused={focusId === pkg.id} onCompare={onCompare} />
        ))}
      </ol>
    </div>
  );
}
