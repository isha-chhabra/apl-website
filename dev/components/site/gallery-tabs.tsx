"use client";

import { useEffect, useState } from "react";
import CircularSplitRoll from "@/components/ui/circular-split-roll";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FACILITY, INSTRUMENTS } from "@/lib/data/gallery";

const trigger =
  "min-h-12 rounded-full text-[15px] font-semibold data-active:bg-ink data-active:text-background dark:data-active:border-ink dark:data-active:bg-ink dark:data-active:text-background";

/** Two groups, as before: lab instruments and the lab itself. Scroll turns the wheel. */
export function GalleryTabs() {
  const [tab, setTab] = useState("instruments");

  // The URL hash is an external system, so syncing from it after mount is fine.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (window.location.hash === "#facility") setTab("facility");
  }, []);

  return (
    <Tabs
      value={tab}
      onValueChange={(v) => {
        setTab(v as string);
        window.scrollTo({ top: 0, behavior: "instant" });
      }}
      className="gap-0"
    >
      <TabsList
        aria-label="Gallery groups"
        className="sticky top-[calc(84px+env(safe-area-inset-top,0px))] z-50 mx-auto h-auto w-[calc(100%-24px)] max-w-md rounded-full border border-line bg-surface/85 p-1 shadow-soft backdrop-blur-xl group-data-horizontal/tabs:h-auto"
      >
        <TabsTrigger value="instruments" className={trigger}>
          Lab instruments
        </TabsTrigger>
        <TabsTrigger value="facility" className={trigger}>
          The lab
        </TabsTrigger>
      </TabsList>

      <TabsContent value="instruments">
        <CircularSplitRoll
          aria-label="Lab instruments"
          items={INSTRUMENTS}
          radius={500}
          cardSize={205}
          sectionHeight={50}
          phoneCenterOffset={26}
        />
      </TabsContent>
      <TabsContent value="facility">
        <CircularSplitRoll
          aria-label="The lab and our centres"
          items={FACILITY}
          radius={500}
          cardSize={205}
          sectionHeight={50}
          phoneCenterOffset={26}
        />
      </TabsContent>
    </Tabs>
  );
}
