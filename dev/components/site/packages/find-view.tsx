"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { GroupIcon } from "@/components/site/packages/pk-ui";
import {
  ALL_TESTS,
  GROUPS,
  PACKAGES,
  formatInr,
  pkColor,
  type FlatTest,
  type TestGroup,
} from "@/lib/data/packages";
import { cn } from "@/lib/utils";

const norm = (s: string) => s.toLowerCase();

function matches(t: FlatTest, q: string) {
  return (
    norm(t.name).includes(q) ||
    norm(t.group.name).includes(q) ||
    norm(t.group.keywords).includes(q)
  );
}

/** Five dots, one per package. Filled means the package includes the test. */
function PackageDots({ from }: { from: number }) {
  return (
    <span className="flex gap-1.5" role="img" aria-label={`Included from ${PACKAGES[from].label}`}>
      {PACKAGES.map((p) => {
        const on = p.index >= from;
        return (
          <span
            key={p.id}
            className={cn("size-3 rounded-full border-[1.5px]", !on && "opacity-40")}
            style={{
              borderColor: pkColor(p.index),
              background: on ? `linear-gradient(135deg, ${pkColor(p.index)}, var(--pk-${p.index + 1}-2))` : "transparent",
            }}
          />
        );
      })}
    </span>
  );
}

function GroupTile({ group, onPick }: { group: TestGroup; onPick: () => void }) {
  const first = Math.min(...group.tests.map((t) => t.from));
  return (
    <button
      type="button"
      onClick={onPick}
      className="glass grid min-h-[92px] content-between gap-3 p-4 text-left transition-transform duration-300 ease-soft active:scale-[0.98] md:hover:-translate-y-0.5"
    >
      <span className="grid size-10 place-items-center rounded-2xl bg-brand-tint text-brand-ink">
        <GroupIcon icon={group.icon} className="size-5" />
      </span>
      <span>
        <b className="block font-display text-[16px] leading-tight font-semibold">{group.name}</b>
        <span className="mt-1 block font-mono text-[12px] text-ink-2">From {PACKAGES[first].name}</span>
      </span>
    </button>
  );
}

export function FindView({ initialQuery = "", onOpenPackage }: { initialQuery?: string; onOpenPackage: (id: string) => void }) {
  const [q, setQ] = useState(initialQuery);
  const [groupId, setGroupId] = useState<string | null>(null);
  const query = norm(q.trim());

  const results = useMemo(() => {
    if (groupId) return ALL_TESTS.filter((t) => t.group.id === groupId);
    if (query) return ALL_TESTS.filter((t) => matches(t, query));
    return [];
  }, [query, groupId]);

  const active = results.length > 0;
  const startPkg = active ? PACKAGES[Math.max(...results.map((r) => r.from))] : null;
  const group = groupId ? GROUPS.find((g) => g.id === groupId) : null;

  return (
    <div>
      <div className="grid gap-2">
        <label htmlFor="pk-find" className="text-[15px] font-semibold">
          Which test are you looking for?
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-ink-2" aria-hidden="true" />
          <Input
            id="pk-find"
            type="search"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setGroupId(null);
            }}
            placeholder="Try thyroid, vitamin D, heart or sugar"
            autoComplete="off"
            className="h-14 rounded-field border-[1.5px] border-line-2 bg-[rgb(20_3_8/0.35)] pr-4 pl-12 text-base md:text-base"
          />
        </div>
      </div>

      {group ? (
        <button
          type="button"
          onClick={() => setGroupId(null)}
          className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full border-[1.5px] border-ink bg-ink px-4 text-[15px] font-semibold text-background"
        >
          <GroupIcon icon={group.icon} className="size-4" />
          {group.name}
          <X className="size-4" aria-label="Clear" />
        </button>
      ) : null}

      <div aria-live="polite" className="mt-5">
        {!active && !query ? (
          <div>
            <h3 className="mb-3 font-mono text-[12px] tracking-wide text-ink-2 uppercase">Browse by body function</h3>
            <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {GROUPS.map((g, i) => (
                <motion.li
                  key={g.id}
                  initial={{ y: 18 }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -4% 0px" }}
                  transition={{ type: "spring", bounce: 0.15, visualDuration: 0.5, delay: (i % 4) * 0.05 }}
                >
                  <GroupTile group={g} onPick={() => setGroupId(g.id)} />
                </motion.li>
              ))}
            </ul>
          </div>
        ) : null}

        {!active && query ? (
          <p className="rounded-[14px] bg-sunken px-5 py-6 text-ink-2">
            No test matches &ldquo;{q.trim()}&rdquo;. Try a body area such as heart or thyroid, or call the lab and we will help.
          </p>
        ) : null}

        {active && startPkg ? (
          <div>
            <motion.button
              key={startPkg.id}
              type="button"
              onClick={() => onOpenPackage(startPkg.id)}
              initial={{ scale: 0.97 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.3, visualDuration: 0.45 }}
              className="glass-glow mb-5 flex w-full items-center justify-between gap-4 p-4 text-left"
              style={{ "--c1": pkColor(startPkg.index), "--c2": `var(--pk-${startPkg.index + 1}-2)` } as React.CSSProperties}
            >
              <span>
                <span className="block font-mono text-[11px] tracking-wide text-ink-2 uppercase">
                  {results.length === 1 ? "Included from" : "Everything shown is included from"}
                </span>
                <b className="mt-0.5 block font-display text-[20px] leading-tight font-semibold">{startPkg.label}</b>
                <span className="mt-1 block font-mono text-[13px] text-brand-ink">Offer Price {formatInr(startPkg.offer)}</span>
              </span>
              <ArrowRight className="size-5 shrink-0" aria-hidden="true" />
            </motion.button>

            <p className="mb-2 flex items-center justify-between font-mono text-[12px] text-ink-2">
              <span>
                {results.length} {results.length === 1 ? "test" : "tests"}
              </span>
              <span className="flex items-center gap-2">
                Packages <span className="tracking-wide">1 2 3 4 Gold</span>
              </span>
            </p>

            <ul>
              <AnimatePresence initial={false}>
                {results.map((r, i) => (
                  <motion.li
                    key={r.key}
                    layout
                    initial={{ y: 12 }}
                    animate={{ y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", bounce: 0.1, visualDuration: 0.4, delay: Math.min(i, 8) * 0.03 }}
                    className="grid grid-cols-[40px_minmax(0,1fr)_auto] items-center gap-3 border-t border-line py-3"
                  >
                    <span className="grid size-10 place-items-center rounded-2xl bg-brand-tint text-brand-ink">
                      <GroupIcon icon={r.group.icon} className="size-5" />
                    </span>
                    <span className="min-w-0 leading-tight">
                      <b className="block text-[15.5px] font-semibold">{r.name}</b>
                      <span className="block truncate text-[13px] text-ink-2">{r.group.name}</span>
                    </span>
                    <PackageDots from={r.from} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
