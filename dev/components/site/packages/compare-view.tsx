"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { FileImage, Minus } from "lucide-react";
import { GroupIcon, PkOrb, Tick, pkStyle } from "@/components/site/packages/pk-ui";
import { GROUPS, PACKAGES, formatInr, pkColor, pkColor2 } from "@/lib/data/packages";
import { cn } from "@/lib/utils";

/*
 * One grid template for the header and every row, so every line and every
 * column sits on exactly the same edges.
 */
const COLS =
  "grid grid-cols-[minmax(0,1fr)_repeat(5,44px)] md:grid-cols-[minmax(0,1fr)_repeat(5,112px)]";

const PRICE_COLS = "grid grid-cols-[minmax(0,1fr)_54px_56px_58px] md:grid-cols-[minmax(0,1fr)_120px_130px_140px]";

function PriceTable() {
  return (
    <section className="glass p-4 md:p-6" aria-label="Prices">
      <div className={cn(PRICE_COLS, "items-end gap-x-1.5 pb-3 font-mono text-[10.5px] leading-tight tracking-wide text-ink-2 uppercase")}>
        <span>Package</span>
        <span className="text-right">MRP</span>
        <span className="text-right">Offer Price</span>
        <span className="text-right">You Save</span>
      </div>
      <ul>
        {PACKAGES.map((pkg, i) => (
          <motion.li
            key={pkg.id}
            style={pkStyle(pkg.index)}
            className={cn(PRICE_COLS, "min-h-[60px] items-center gap-x-1.5 border-t border-line py-2")}
            initial={{ y: 14 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "0px 0px -6% 0px" }}
            transition={{ type: "spring", bounce: 0.1, visualDuration: 0.5, delay: i * 0.05 }}
          >
            <span className="flex min-w-0 items-center gap-2">
              <PkOrb pkg={pkg} className="size-7 text-[12px] shadow-none md:size-10 md:text-[14px]" />
              <span className="min-w-0 leading-tight">
                <b className="block font-display text-[14px] font-semibold whitespace-nowrap md:text-[15px]">{pkg.name}</b>
                <span className="block text-[11.5px] text-ink-2 md:text-[12.5px]">{pkg.tier}</span>
              </span>
            </span>
            <s className="text-right font-mono text-[11px] text-ink-2 md:text-[14px]">{formatInr(pkg.mrp)}</s>
            <b className="text-right font-mono text-[11.5px] font-semibold text-brand-ink md:text-[15px]">{formatInr(pkg.offer)}</b>
            <span className="text-right font-mono text-[11px] text-ok-ink md:text-[14px]">{formatInr(pkg.save)}</span>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

export function CompareView() {
  const [focus, setFocus] = useState<number | null>(null);
  const dim = (i: number) => (focus === null || focus === i ? 1 : 0.3);
  const tint = (i: number) => ({
    background: `color-mix(in srgb, ${pkColor(i)} ${focus === i ? 18 : 8}%, transparent)`,
  });

  return (
    <div>
      <PriceTable />

      <p className="mt-6 mb-3 text-[14px] text-ink-2">Tap a package to light up its column. Tap it again to clear.</p>

      <div className="relative">
        {/* Sticky header: stays under the view switcher while the rows scroll. */}
        <div
          className={cn(
            COLS,
            "sticky top-[calc(150px+env(safe-area-inset-top,0px))] z-30 items-end rounded-2xl border border-line bg-[rgb(58_20_28/0.9)] px-3 py-2.5 shadow-soft backdrop-blur-xl md:px-4",
          )}
        >
          <span className="pr-2 pb-1 font-mono text-[11px] tracking-wide text-ink-2 uppercase">Tests Included</span>
          {PACKAGES.map((pkg) => (
            <button
              key={pkg.id}
              type="button"
              aria-pressed={focus === pkg.index}
              aria-label={`${pkg.label}, ${formatInr(pkg.offer)}`}
              onClick={() => setFocus((f) => (f === pkg.index ? null : pkg.index))}
              className="mx-auto grid w-10 place-items-center rounded-xl py-1.5 text-[#22070d] transition-[transform,opacity] duration-300 ease-soft active:scale-95 md:w-[100px] md:py-2"
              style={{
                background: `linear-gradient(135deg, ${pkColor(pkg.index)}, ${pkColor2(pkg.index)})`,
                opacity: dim(pkg.index),
                transform: focus === pkg.index ? "translateY(-2px)" : undefined,
              }}
            >
              <span className="font-display text-[15px] leading-none font-bold">{pkg.index === 4 ? "Gold" : pkg.short}</span>
              <span className="hidden text-[11px] leading-tight font-semibold md:block">{pkg.tier}</span>
              <span className="hidden font-mono text-[11px] leading-tight md:block">{formatInr(pkg.offer)}</span>
            </button>
          ))}
        </div>

        <div className="glass mt-3 px-3 pb-3 md:px-4">
          {GROUPS.map((g) => (
            <motion.section
              key={g.id}
              aria-label={g.name}
              initial={{ y: 22 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "0px 0px -6% 0px" }}
              transition={{ type: "spring", bounce: 0.1, visualDuration: 0.6 }}
            >
              <h3 className="flex items-center gap-2.5 pt-5 pb-2 font-display text-[16px] font-semibold">
                <span className="grid size-8 place-items-center rounded-xl bg-brand-tint text-brand-ink">
                  <GroupIcon icon={g.icon} className="size-[17px]" />
                </span>
                {g.name}
              </h3>
              <ul>
                {g.tests.map((t, ti) => (
                  <li key={t.name} className={cn(COLS, "min-h-11 items-stretch border-t border-line/70 transition-colors hover:bg-lift/40")}>
                    <span className="flex items-center py-2 pr-2 text-[14px] leading-snug">{t.name}</span>
                    {PACKAGES.map((pkg) => {
                      const has = pkg.index >= t.from;
                      return (
                        <span
                          key={pkg.id}
                          className="grid place-items-center transition-[opacity,background-color] duration-300"
                          style={{ ...tint(pkg.index), opacity: dim(pkg.index) }}
                        >
                          {has ? (
                            <Tick color={pkColor(pkg.index)} delay={0.05 * ti + 0.04 * pkg.index} />
                          ) : (
                            <Minus className="size-4 text-ink-2/45" aria-hidden="true" />
                          )}
                          <span className="sr-only">{has ? "Included" : "Not included"} in {pkg.label}</span>
                        </span>
                      );
                    })}
                  </li>
                ))}
              </ul>
            </motion.section>
          ))}
        </div>
      </div>

      <a
        href="/packages-chart.webp"
        target="_blank"
        rel="noopener"
        className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-brand-ink hover:underline"
      >
        <FileImage className="size-5" aria-hidden="true" /> View the printed chart
      </a>
    </div>
  );
}
