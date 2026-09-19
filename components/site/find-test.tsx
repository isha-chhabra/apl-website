"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, CircleHelp, FileText, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { GroupIcon } from "@/components/site/packages/pk-ui";
import { ALL_TESTS, PACKAGES, formatInr } from "@/lib/data/packages";

type Entry = { title: string; sub: string; href: string; kind: "test" | "question" | "page"; icon?: (typeof ALL_TESTS)[number]["group"]["icon"] };

const OTHER: (Entry & { haystack: string })[] = [
  { title: "What are the lab timings?", sub: "Question", href: "/faqs", kind: "question", haystack: "timing hours open close when" },
  { title: "Do you offer home visits?", sub: "Question", href: "/contact#home-collection", kind: "question", haystack: "home visit collection pickup" },
  { title: "How do I prepare for a fasting test?", sub: "Question", href: "/faqs", kind: "question", haystack: "fasting prepare before test eat drink" },
  { title: "How can I pay?", sub: "Question", href: "/faqs", kind: "question", haystack: "payment cash upi card pay" },
  { title: "About the lab and our pathologist", sub: "Page", href: "/about", kind: "page", haystack: "about doctor pathologist history story qualification" },
  { title: "Addresses and phone numbers", sub: "Page", href: "/contact", kind: "page", haystack: "contact address location phone number map" },
];

const SUGGESTIONS = ["Thyroid", "Vitamin D", "Sugar", "Heart", "Kidney", "Liver"];

export function FindTest() {
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();

  const { results, total } = useMemo(() => {
    if (!query) return { results: [] as Entry[], total: 0 };
    const tests: Entry[] = ALL_TESTS.filter(
      (t) =>
        t.name.toLowerCase().includes(query) ||
        t.group.name.toLowerCase().includes(query) ||
        t.group.keywords.includes(query),
    ).map((t) => ({
      title: t.name,
      sub: `Included from ${PACKAGES[t.from].label}, ${formatInr(PACKAGES[t.from].offer)}`,
      href: `/packages?q=${encodeURIComponent(query)}`,
      kind: "test",
      icon: t.group.icon,
    }));
    const others = OTHER.filter((o) => o.haystack.includes(query) || o.title.toLowerCase().includes(query));
    const all = [...tests, ...others];
    return { results: all.slice(0, 5), total: all.length };
  }, [query]);

  return (
    <div className="grid gap-2">
      <label htmlFor="find-test" className="text-[15px] font-semibold">
        Find a test
      </label>
      <div className="group relative">
        <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-brand-ink" aria-hidden="true" />
        <Input
          id="find-test"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Try thyroid, vitamin D or heart"
          autoComplete="off"
          className="h-[58px] rounded-[18px] border-[1.5px] border-line-2 bg-[rgb(20_3_8/0.4)] pr-4 pl-12 text-base shadow-[inset_0_1px_0_rgb(255_255_255/0.08),0_18px_40px_-24px_rgb(10_0_3/0.9)] md:text-base"
        />
      </div>

      {!query ? (
        <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pt-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setQ(s)}
              className="inline-flex min-h-11 flex-none items-center rounded-full border border-line-2 bg-surface px-[18px] text-[15px] font-semibold transition-colors hover:border-ink"
            >
              {s}
            </button>
          ))}
        </div>
      ) : null}

      <div aria-live="polite">
        {query && results.length === 0 && (
          <p className="pt-4 text-[15px] text-ink-2">
            No match yet. Try &ldquo;thyroid&rdquo; or &ldquo;heart&rdquo;, or call the lab and we will help.
          </p>
        )}
        {results.length > 0 && (
          <ul className="glass mt-3 px-4 py-1">
            {results.map((r, i) => (
              <motion.li
                key={r.href + r.title}
                initial={{ y: 10 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", bounce: 0.1, visualDuration: 0.35, delay: i * 0.035 }}
              >
                <Link href={r.href} className="flex min-h-14 items-center gap-3 border-b border-line py-2.5 last:border-b-0">
                  <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-brand-tint text-brand-ink">
                    {r.icon ? (
                      <GroupIcon icon={r.icon} className="size-5" />
                    ) : r.kind === "question" ? (
                      <CircleHelp className="size-5" aria-hidden="true" />
                    ) : (
                      <FileText className="size-5" aria-hidden="true" />
                    )}
                  </span>
                  <span className="min-w-0 flex-1 leading-tight">
                    <b className="block font-semibold">{r.title}</b>
                    <small className="text-[13px] text-ink-2">{r.sub}</small>
                  </span>
                  <ArrowRight className="size-5 text-ink-2" aria-hidden="true" />
                </Link>
              </motion.li>
            ))}
            {total > results.length ? (
              <li>
                <Link href={`/packages?q=${encodeURIComponent(query)}`} className="flex min-h-12 items-center gap-2 text-[15px] font-semibold text-brand-ink">
                  See all {total} results <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </li>
            ) : null}
          </ul>
        )}
      </div>
    </div>
  );
}
