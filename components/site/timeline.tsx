"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tray } from "@/components/site/tray";

const MILESTONES = [
  {
    year: "2005",
    label: "Founded",
    title: "Aakash Pathology Laboratory opens",
    text: "One of the oldest running pathology labs in Ankleshwar, built on honesty, discipline, hard work and technical expertise.",
    impact: "Nearly two decades of continuous service.",
  },
  {
    year: "2009",
    label: "Industrial health",
    title: "Distinction in Industrial Health",
    text: "Dr. Aakash Chhabra completes a Certificate Course in Industrial Health at M.S. University, Vadodara, with distinction. It brings workplace health screening to local industry.",
    impact: "Health screening for GIDC workplaces.",
  },
  {
    year: "2020",
    label: "COVID-19",
    title: "RT-PCR testing scales up",
    text: "The lab expands its testing through the pandemic. Prices were not raised, and the government price cap on RT-PCR was followed throughout.",
    impact: "Prices held steady when costs rose worldwide.",
  },
  {
    year: "2021",
    label: "Hospital management",
    title: "Government certificate in Hospital Management",
    text: "Dr. Chhabra completes a government certificate course at IDEMI Pune, strengthening lab operations, turnaround times and patient experience.",
    impact: "Sharper systems behind every report.",
  },
  {
    year: "Today",
    label: "1 lakh patients",
    title: "1,00,000+ patients and 2,00,000+ investigations",
    text: "Nearly two decades of steady work add up to more than a lakh patients tested, across 4 locations in Ankleshwar.",
    impact: "Trusted by families across generations.",
  },
];

export function Timeline() {
  return (
    <Tabs defaultValue="2005" className="gap-4">
      <TabsList
        aria-label="Milestones"
        className="-mx-5 h-auto w-auto max-w-none group-data-horizontal/tabs:h-auto flex-nowrap justify-start gap-2 overflow-x-auto rounded-none bg-transparent px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {MILESTONES.map((m) => (
          <TabsTrigger
            key={m.year}
            value={m.year}
            className="h-auto min-h-[60px] min-w-[92px] flex-none flex-col items-start gap-0.5 rounded-2xl border-[1.5px] border-line-2 bg-surface px-4 py-2.5 text-left data-active:border-ink data-active:bg-ink data-active:text-background dark:data-active:border-ink dark:data-active:bg-ink dark:data-active:text-background"
          >
            <span className="font-display text-lg leading-none font-bold">{m.year}</span>
            <span className="text-xs font-medium whitespace-nowrap opacity-80">{m.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>

      {MILESTONES.map((m) => (
        <TabsContent key={m.year} value={m.year}>
          <Tray coreClassName="p-5 md:p-8">
            <h3 className="t-h3 text-[22px]">{m.title}</h3>
            <p className="mt-3 max-w-[38em] text-[16px] leading-relaxed text-ink-2">{m.text}</p>
            <p className="mt-5 border-t border-line pt-4 text-[15px] font-semibold text-ok-ink">{m.impact}</p>
          </Tray>
        </TabsContent>
      ))}
    </Tabs>
  );
}
