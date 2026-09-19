"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { Columns3, GitCompareArrows, LayoutGrid, Route, Search, type LucideIcon } from "lucide-react";
import { CardsView } from "@/components/site/packages/cards-view";
import { CompareView } from "@/components/site/packages/compare-view";
import { FindView } from "@/components/site/packages/find-view";
import { RoadmapView } from "@/components/site/packages/roadmap-view";
import { PACKAGES } from "@/lib/data/packages";
import { cn } from "@/lib/utils";

type View = "roadmap" | "cards" | "compare" | "find";

const VIEWS: { id: View; label: string; icon: LucideIcon }[] = [
  { id: "roadmap", label: "Roadmap", icon: Route },
  { id: "cards", label: "Cards", icon: LayoutGrid },
  { id: "compare", label: "Compare", icon: Columns3 },
  { id: "find", label: "Find a test", icon: Search },
];

const isView = (v: string | null): v is View => VIEWS.some((x) => x.id === v);

export function PackagesExplorer() {
  const [view, setView] = useState<View>("roadmap");
  const [direction, setDirection] = useState(1);
  const [focusId, setFocusId] = useState<string | null>(null);
  const [initialQuery, setInitialQuery] = useState("");
  // Animate view changes only after the link has been read, so a link straight
  // to ?view=compare swaps instantly instead of fading the roadmap out first.
  const [armed, setArmed] = useState(false);

  // Read the link once: /packages?view=compare, /packages?q=thyroid, /packages#package-3
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const v = params.get("view");
    const q = params.get("q");
    const hash = window.location.hash.slice(1);
    /* eslint-disable react-hooks/set-state-in-effect */
    if (q) {
      setInitialQuery(q);
      setView("find");
    } else if (isView(v)) {
      setView(v);
    } else if (PACKAGES.some((p) => p.id === hash)) {
      setFocusId(hash);
      const t = setTimeout(
        () => document.getElementById(hash)?.scrollIntoView({ block: "start", behavior: "instant" }),
        450,
      );
      return () => clearTimeout(t);
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setArmed(true)));
    return () => cancelAnimationFrame(id);
  }, []);

  const go = useCallback(
    (next: View) => {
      setDirection(VIEWS.findIndex((v) => v.id === next) >= VIEWS.findIndex((v) => v.id === view) ? 1 : -1);
      setView(next);
      window.history.replaceState(null, "", next === "roadmap" ? window.location.pathname : `?view=${next}`);
      window.scrollTo({ top: 0, behavior: "instant" });
    },
    [view],
  );

  const openPackage = useCallback((id: string) => {
    setDirection(-1);
    setView("roadmap");
    setFocusId(id);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ block: "start", behavior: "smooth" }), 500);
  }, []);

  return (
    <LayoutGroup>
      {/* View switcher. Compare is always in view, and always lit. */}
      <div className="sticky top-[calc(84px+env(safe-area-inset-top,0px))] z-40">
        <div
          role="tablist"
          aria-label="Ways to look at the packages"
          className="mx-auto grid max-w-[720px] grid-cols-4 gap-1 rounded-[22px] border border-line-2 bg-[rgb(58_20_28/0.8)] p-1.5 shadow-float backdrop-blur-xl backdrop-saturate-150"
        >
          {VIEWS.map((v) => {
            const on = view === v.id;
            const isCompare = v.id === "compare";
            return (
              <button
                key={v.id}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => go(v.id)}
                className={cn(
                  "relative grid min-h-[54px] place-items-center gap-0.5 rounded-2xl px-1 text-[12.5px] font-semibold transition-colors duration-200 md:min-h-12 md:grid-flow-col md:gap-2 md:text-[15px]",
                  on ? "text-[#2b0c11]" : isCompare ? "text-brand-ink" : "text-ink-2 hover:text-ink",
                )}
              >
                {on ? (
                  <motion.span
                    layoutId="view-pill"
                    className="absolute inset-0 rounded-2xl"
                    style={{ background: "linear-gradient(135deg, #ffb195, #f0785a)", boxShadow: "0 10px 24px -10px rgb(240 120 90 / 0.8)" }}
                    transition={{ type: "spring", bounce: 0.22, visualDuration: 0.45 }}
                  />
                ) : isCompare ? (
                  <span aria-hidden="true" className="absolute inset-0 rounded-2xl border border-[rgb(255_180_156/0.55)] bg-[rgb(240_120_90/0.12)]" />
                ) : null}
                <v.icon className="relative size-5" aria-hidden="true" />
                <span className="relative">{v.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-7">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={view}
            role="tabpanel"
            custom={direction}
            initial={armed ? { opacity: 0, x: direction * 28 } : false}
            animate={{ opacity: 1, x: 0 }}
            exit={armed ? { opacity: 0, x: direction * -28 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
          >
            {view === "roadmap" && <RoadmapView focusId={focusId} onCompare={() => go("compare")} />}
            {view === "cards" && <CardsView onCompare={() => go("compare")} />}
            {view === "compare" && <CompareView />}
            {view === "find" && <FindView initialQuery={initialQuery} onOpenPackage={openPackage} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* A second, larger Compare button that follows you down the page. */}
      <AnimatePresence>
        {view !== "compare" && (
          <motion.button
            type="button"
            onClick={() => go("compare")}
            initial={{ scale: 0.6, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.6, opacity: 0, y: 20 }}
            transition={{ type: "spring", bounce: 0.35, visualDuration: 0.5 }}
            whileTap={{ scale: 0.95 }}
            className="fixed right-3 bottom-[calc(98px+env(safe-area-inset-bottom,0px))] z-65 inline-flex min-h-13 items-center gap-2.5 rounded-full px-5 text-[15px] font-bold text-[#2b0c11] shadow-[0_18px_40px_-14px_rgb(240_120_90/0.9),inset_0_1px_0_rgb(255_255_255/0.4)] lg:right-8 lg:bottom-8"
            style={{ background: "linear-gradient(135deg, #ffb195, #f0785a)" }}
          >
            <GitCompareArrows className="size-5" aria-hidden="true" />
            Compare all 5
          </motion.button>
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
}
