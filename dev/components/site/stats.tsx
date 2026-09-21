"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Stat = { value: number; suffix?: string; label: string };

/** Counts up once when scrolled into view. The final number is in the page from the start. */
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return; // already on screen

    setShown(0);
    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const duration = 1600;
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          setShown(Math.round(value * (1 - Math.pow(1 - t, 3))));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <b ref={ref} className="font-normal tabular-nums">
      {shown.toLocaleString("en-IN")}
      {suffix}
    </b>
  );
}

export function Stats({ items, className }: { items: Stat[]; className?: string }) {
  return (
    <dl className={cn("grid grid-cols-2 gap-x-[18px] gap-y-7 md:grid-cols-4", className)}>
      {items.map((s) => (
        <div key={s.label} className="flex flex-col-reverse justify-end border-t-[1.5px] border-line-2 pt-3">
          <dt className="mt-1.5 text-sm leading-snug text-ink-2">{s.label}</dt>
          <dd className="font-display text-[clamp(32px,9vw,52px)] leading-none font-bold tracking-[-0.03em] text-warm">
            <Counter value={s.value} suffix={s.suffix} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
