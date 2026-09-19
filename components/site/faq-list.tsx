"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { POPULAR_FAQS, PREP_FAQS, type Faq } from "@/lib/data/faqs";

function FaqAccordion({ items }: { items: Faq[] }) {
  return (
    <Accordion className="border-t border-line">
      {items.map((f) => (
        <AccordionItem key={f.id} value={f.id} className="border-b border-line">
          <AccordionTrigger className="min-h-[60px] items-center gap-4 rounded-none border-0 py-3.5 font-display text-[17px] leading-snug font-semibold tracking-[-0.01em] hover:no-underline focus-visible:ring-inset">
            {f.q}
          </AccordionTrigger>
          <AccordionContent className="max-w-[36em] pb-5 text-[15.5px] leading-relaxed text-ink-2 [&_li]:mb-1.5 [&_ol]:mt-2.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_p+p]:mt-2.5 [&_p:not(:last-child)]:mb-0">
            {f.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function FaqList() {
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();

  const matches = useMemo(() => {
    if (!query) return [];
    return [...POPULAR_FAQS, ...PREP_FAQS].filter((f) => `${f.q} ${f.text}`.toLowerCase().includes(query));
  }, [query]);

  return (
    <div>
      <div className="grid gap-2">
        <label htmlFor="faq-search" className="text-[15px] font-semibold">
          Search the questions
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-ink-2" aria-hidden="true" />
          <Input
            id="faq-search"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Try fasting or cancellation"
            autoComplete="off"
            className="h-[54px] rounded-field border-[1.5px] border-line-2 bg-surface pr-4 pl-12 text-base md:text-base"
          />
        </div>
      </div>

      {query ? (
        <div className="mt-6" aria-live="polite">
          {matches.length === 0 ? (
            <p className="rounded-[14px] bg-sunken px-5 py-6 text-ink-2">
              No question matches that. Try another word, or call the lab.
            </p>
          ) : (
            <>
              <p className="mb-3 text-[14px] text-ink-2">
                {matches.length} {matches.length === 1 ? "answer" : "answers"}
              </p>
              <FaqAccordion items={matches} />
            </>
          )}
        </div>
      ) : (
        <Tabs defaultValue="popular" className="mt-6 gap-5">
          <TabsList className="h-auto w-full rounded-full border border-line bg-sunken p-1 group-data-horizontal/tabs:h-auto">
            <TabsTrigger
              value="popular"
              className="min-h-12 rounded-full text-[15px] font-semibold data-active:bg-ink data-active:text-background dark:data-active:border-ink dark:data-active:bg-ink dark:data-active:text-background"
            >
              Popular questions
            </TabsTrigger>
            <TabsTrigger
              value="prep"
              className="min-h-12 rounded-full text-[15px] font-semibold data-active:bg-ink data-active:text-background dark:data-active:border-ink dark:data-active:bg-ink dark:data-active:text-background"
            >
              Test preparation
            </TabsTrigger>
          </TabsList>
          <TabsContent value="popular">
            <FaqAccordion items={POPULAR_FAQS} />
          </TabsContent>
          <TabsContent value="prep">
            <FaqAccordion items={PREP_FAQS} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
