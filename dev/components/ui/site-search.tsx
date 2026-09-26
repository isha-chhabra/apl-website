import { useEffect, useMemo, useRef, useState } from "react";

/*
 * Search for the whole site, shown in the home hero.
 *   - tests and packages come from packages-data.js (APL_GROUPS, APL_PACKAGES)
 *   - pages, facts and FAQs come from search-data.js (APL_SEARCH, built by scripts/build-search-index.mjs)
 * Both are plain scripts loaded before the hero bundle, so they are read as globals.
 * Results open in place below the field (the hero clips anything that hangs outside it).
 */

type PackageRow = { id: string; name: string; num: string; mrp: number; offer: number };
type GroupRow = { id: string; name: string; keywords: string; tests: [string, number, string?][] };
type SearchRow = { kind: "page" | "info" | "faq"; t: string; s: string; u: string; k?: string; x?: string };

declare const APL_PACKAGES: PackageRow[];
declare const APL_GROUPS: GroupRow[];
declare const APL_SEARCH: SearchRow[];
type ProfileTest = string | { n: string; sub?: string[]; note?: string };
type ProfileRow = { id: string; name: string; keywords?: string; offer?: number; from?: number; sections: { tests: ProfileTest[] }[]; options?: { name: string }[] };
declare const APL_PROFILES: ProfileRow[];

type Section = "Tests & Packages" | "Profiles" | "Pages & Info" | "FAQs";
type Entry = { title: string; sub: string; href: string; section: Section; hay: string; body: string };

const inr = (n: number) => "₹" + n.toLocaleString("en-IN");
const fromLabel = (from: number) =>
  from === 0 ? "In every package" : from === 4 ? "Gold package only" : `From Package ${from + 1}`;

/** Everything searchable, built once. */
function buildIndex(): Entry[] {
  const out: Entry[] = [];
  const seen = new Set<string>();

  APL_PACKAGES.forEach((p) => {
    out.push({
      title: p.num === "Gold" ? "Gold Package" : p.name,
      sub: `${inr(p.offer)} offer price · MRP ${inr(p.mrp)}`,
      href: `packages.html#${p.id}`,
      section: "Tests & Packages",
      hay: `${p.name} package ${p.num} ${p.offer} ${p.mrp} price cost health checkup`.toLowerCase(),
      body: "",
    });
  });

  APL_GROUPS.forEach((g) => {
    out.push({
      title: g.name,
      sub: `${g.tests.length} ${g.tests.length === 1 ? "test" : "tests"} · ${fromLabel(Math.min(...g.tests.map((t) => t[1])))}`,
      href: `packages.html?q=${encodeURIComponent(g.name)}`,
      section: "Tests & Packages",
      hay: `${g.name} ${g.keywords}`.toLowerCase(),
      body: "",
    });
    g.tests.forEach(([name, from]) => {
      if (seen.has(name)) return;
      seen.add(name);
      out.push({
        title: name,
        sub: `${g.name} · ${fromLabel(from)}`,
        href: `packages.html?q=${encodeURIComponent(name)}`,
        section: "Tests & Packages",
        hay: `${name} ${g.name} ${g.keywords}`.toLowerCase(),
        body: "",
      });
    });
  });

  APL_PROFILES.forEach((p) => {
    const names = p.sections.flatMap((s) => s.tests.map((t) => (typeof t === "string" ? t : t.n + " " + (t.sub ?? []).join(" "))));
    out.push({
      title: p.name,
      sub: `Profile · ${names.length} tests · ${p.offer != null ? inr(p.offer) : p.from != null ? "from " + inr(p.from) : "call for price"}`,
      href: `packages.html#profile-${p.id}`,
      section: "Profiles",
      hay: `${p.name} profile ${p.keywords ?? ""}`.toLowerCase(),
      body: `${names.join(" ")} ${(p.options ?? []).map((o) => o.name).join(" ")}`.toLowerCase(),
    });
  });

  APL_SEARCH.forEach((r) =>
    out.push({
      title: r.t,
      sub: r.s,
      href: r.u,
      section: r.kind === "faq" ? "FAQs" : "Pages & Info",
      hay: `${r.t} ${r.k ?? ""}`.toLowerCase(),
      body: (r.x ?? r.s).toLowerCase(),
    }),
  );
  return out;
}

/** Higher is better; 0 means no match. Every word typed has to be found. */
function score(e: Entry, words: string[], q: string): number {
  const title = e.title.toLowerCase();
  let s = 0;
  for (const w of words) {
    const esc = w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    if (/^\d+$/.test(w)) {
      // a number is a whole number ("3" is Package 3, not 3,150)
      const whole = new RegExp(`(^|[^0-9,])${esc}([^0-9,]|$)`);
      if (whole.test(title)) s += 30;
      else if (whole.test(e.hay)) s += 12;
      else return 0;
      continue;
    }
    const wordStart = new RegExp(`(^|[^a-z0-9])${esc}`);
    if (wordStart.test(title)) s += 30;
    else if (title.includes(w)) s += 18;
    else if (wordStart.test(e.hay)) s += 12;
    else if (e.hay.includes(w)) s += 7;
    else if (e.body.includes(w)) s += 3;
    else return 0;
  }
  if (title.startsWith(q)) s += 60;
  else if (title.includes(q)) s += 25;
  if (e.section === "Tests & Packages") s += 2;
  return s;
}

const SECTION_ORDER: Section[] = ["Tests & Packages", "Profiles", "Pages & Info", "FAQs"];
const PER_SECTION = 4;

const IDEAS = ["thyroid", "Package 3", "home collection", "opening hours", "diabetes", "fasting"];
const TRY = ["Thyroid", "Diabetes", "Package 3", "Home collection", "Opening hours"];

function Highlight({ text, words }: { text: string; words: string[] }) {
  if (!words.length) return <>{text}</>;
  const re = new RegExp(`(${words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "ig");
  return (
    <>
      {text.split(re).map((part, i) =>
        i % 2 ? (
          <mark key={i} className="rounded-[3px] bg-[#D97706]/25 px-px text-inherit">
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  );
}

export function SiteSearch() {
  const [q, setQ] = useState("");
  const [focused, setFocused] = useState(false);
  const [active, setActive] = useState(0);
  const [idea, setIdea] = useState(0);
  const wrap = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const index = useMemo(buildIndex, []);

  // the placeholder walks through a few examples while the field is idle
  useEffect(() => {
    if (focused || q || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setIdea((i) => (i + 1) % IDEAS.length), 2600);
    return () => clearInterval(t);
  }, [focused, q]);

  // a tap outside closes the results
  useEffect(() => {
    const away = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setFocused(false);
    };
    document.addEventListener("pointerdown", away);
    return () => document.removeEventListener("pointerdown", away);
  }, []);

  const query = q.trim().toLowerCase();
  const words = useMemo(() => query.split(/\s+/).filter(Boolean), [query]);

  const groups = useMemo(() => {
    if (!words.length) return [];
    const scored = index
      .map((e) => ({ e, s: score(e, words, query) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s);
    // the section holding the best match goes first
    const best = (section: Section) => scored.find((r) => r.e.section === section)?.s ?? 0;
    return [...SECTION_ORDER].sort((a, b) => best(b) - best(a)).map((section) => ({
      section,
      total: scored.filter((r) => r.e.section === section).length,
      rows: scored.filter((r) => r.e.section === section).slice(0, PER_SECTION).map((r) => r.e),
    })).filter((g) => g.rows.length);
  }, [index, words, query]);

  const flat = groups.flatMap((g) => g.rows);
  const open = focused;

  useEffect(() => setActive(0), [query]);

  const go = (href: string) => {
    window.location.href = href;
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, flat.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && flat[active]) {
      e.preventDefault();
      go(flat[active].href);
    } else if (e.key === "Escape") {
      if (q) setQ("");
      else setFocused(false);
      input.current?.blur();
    }
  };

  let optionIndex = -1;

  return (
    <div ref={wrap} className="relative mx-auto w-full max-w-md text-left sm:max-w-xl md:max-w-[46rem]">
      <div role="search" className="relative">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-muted-foreground md:left-[18px] md:size-5"
        >
          <circle cx="11" cy="11" r="7.5" />
          <path d="m20.5 20.5-4-4" />
        </svg>

        <input
          ref={input}
          id="site-search"
          type="text"
          role="combobox"
          aria-label="Search the website"
          aria-expanded={open}
          aria-controls="site-search-results"
          aria-activedescendant={flat[active] ? `ss-opt-${active}` : undefined}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          enterKeyHint="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setFocused(true)}
          onKeyDown={onKey}
          className="h-12 w-full rounded-xl border border-border bg-white pl-11 pr-11 text-base md:h-14 md:pl-12 md:text-lg text-foreground shadow-[0_10px_26px_-16px_rgba(74,59,51,0.45)] outline-none transition-[border-color,box-shadow] placeholder:text-transparent focus:border-ring focus:shadow-[0_0_0_3px_rgba(2,132,199,0.16),0_10px_26px_-16px_rgba(74,59,51,0.45)]"
          placeholder="Search tests, packages, FAQs"
        />

        {!q && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-11 right-11 top-1/2 flex -translate-y-1/2 items-baseline gap-1.5 overflow-hidden whitespace-nowrap text-base text-muted-foreground md:left-12 md:text-lg"
          >
            {focused ? (
              <>Search tests, packages, FAQs</>
            ) : (
              <>
                Search
                <span key={idea} className="ss-idea font-semibold text-foreground/80">
                  {IDEAS[idea]}
                </span>
              </>
            )}
          </span>
        )}

        {q && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => {
              setQ("");
              input.current?.focus();
            }}
            className="absolute right-1.5 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="size-4">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        )}
      </div>

      {open && (
        <div
          id="site-search-results"
          role="listbox"
          aria-label="Search results"
          className="ss-panel mt-2 max-h-[min(56vh,420px)] overflow-y-auto overscroll-contain rounded-xl border border-border bg-white shadow-[0_24px_48px_-24px_rgba(74,59,51,0.5)]"
        >
          {!query && (
            <div className="px-3 pb-3.5 pt-3">
              <p className="mb-2 text-[10.5px] font-bold uppercase tracking-[0.08em] text-muted-foreground">Popular searches</p>
              <div className="flex flex-wrap gap-2">
                {TRY.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      setQ(t);
                      input.current?.focus();
                    }}
                    className="rounded-full border border-border bg-card px-3 py-1.5 text-[13px] font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-accent"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && flat.length === 0 && (
            <div className="px-4 py-5 text-center">
              <p className="text-sm font-semibold text-foreground">Nothing found for “{q.trim()}”</p>
              <p className="mt-1 text-[13px] text-muted-foreground">Try a test name, a package, or a word like “timings”.</p>
              <a href="tel:+916353315640" className="mt-3 inline-block text-[13px] font-semibold text-primary">
                Or call the lab: +91 63533 15640
              </a>
            </div>
          )}

          {groups.map((g) => (
            <div key={g.section} role="presentation" className="border-t border-border first:border-t-0">
              <p className="px-3 pb-1 pt-3 text-[10.5px] font-bold uppercase tracking-[0.08em] text-muted-foreground">
                {g.section}
                {g.total > g.rows.length && <span className="ml-1.5 font-medium normal-case tracking-normal">· top {g.rows.length} of {g.total}</span>}
              </p>
              {g.rows.map((r) => {
                optionIndex += 1;
                const i = optionIndex;
                return (
                  <a
                    key={r.section + r.title + r.href}
                    id={`ss-opt-${i}`}
                    role="option"
                    aria-selected={i === active}
                    href={r.href}
                    onMouseEnter={() => setActive(i)}
                    className={`group flex items-center gap-3 px-3 py-2.5 transition-colors ${i === active ? "bg-primary/[0.08]" : ""}`}
                  >
                    <span className="min-w-0 flex-1">
                      <span className="line-clamp-2 block text-[14.5px] font-semibold leading-snug text-foreground">
                        <Highlight text={r.title} words={words} />
                      </span>
                      <span className="mt-0.5 line-clamp-1 block text-[12.5px] leading-snug text-muted-foreground">{r.sub}</span>
                    </span>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`size-4 shrink-0 text-primary transition-transform ${i === active ? "translate-x-0.5" : "opacity-40"}`}
                    >
                      <path d="M5 12h14m-6-6 6 6-6 6" />
                    </svg>
                  </a>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
