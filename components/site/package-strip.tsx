"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, GitCompareArrows } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { CountInr, CoverageMeter, PkOrb, pkStyle } from "@/components/site/packages/pk-ui";
import { PACKAGES, formatInr, pkColor } from "@/lib/data/packages";
import { cn } from "@/lib/utils";

/** The quick view on the home page. Each card opens that package on the packages page. */
export function PackageStrip() {
  return (
    <div>
      <ul className="-mx-5 flex snap-x snap-mandatory items-stretch gap-3.5 overflow-x-auto px-5 pt-1 pb-5 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 lg:grid-cols-5 [&::-webkit-scrollbar]:hidden">
        {PACKAGES.map((pkg, i) => (
          <motion.li
            key={pkg.id}
            className="w-[72%] max-w-[300px] shrink-0 snap-start md:w-auto md:max-w-none"
            initial={{ y: 32 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "0px 0px -6% 0px" }}
            transition={{ type: "spring", bounce: 0.18, visualDuration: 0.7, delay: i * 0.07 }}
            style={pkStyle(pkg.index)}
          >
            <motion.div whileTap={{ scale: 0.97 }} whileHover={{ y: -4 }} transition={{ type: "spring", bounce: 0.3, visualDuration: 0.3 }} className="h-full">
              <Link href={`/packages#${pkg.id}`} className="glass-glow flex h-full flex-col p-4">
                <span className="flex items-center gap-3">
                  <PkOrb pkg={pkg} className="size-10 text-[15px]" />
                  <span className="min-w-0 leading-tight">
                    <span className="block font-mono text-[11px] tracking-wide uppercase" style={{ color: pkColor(pkg.index) }}>
                      {pkg.name}
                    </span>
                    <b className="block font-display text-[19px] font-bold tracking-[-0.02em]">{pkg.tier}</b>
                  </span>
                </span>

                <span className="mt-4 block">
                  <span className="block font-mono text-[11px] tracking-wide text-ink-2 uppercase">Offer Price</span>
                  <span className="block font-display text-[34px] leading-none font-bold tracking-[-0.03em]">
                    <CountInr value={pkg.offer} className="text-warm" />
                  </span>
                  <span className="mt-1.5 block font-mono text-[12px] text-ink-2">
                    MRP <s>{formatInr(pkg.mrp)}</s>
                  </span>
                </span>

                <CoverageMeter pkg={pkg} className="mt-4" />

                <span className="mt-auto flex items-center justify-between pt-4 text-[14.5px] font-semibold">
                  See what&rsquo;s included
                  <ArrowRight className="size-[18px]" aria-hidden="true" />
                </span>
              </Link>
            </motion.div>
          </motion.li>
        ))}
      </ul>
      <Link href="/packages?view=compare" className={cn(buttonVariants({ variant: "line" }), "mt-1")}>
        <GitCompareArrows /> Compare all 5
      </Link>
    </div>
  );
}
