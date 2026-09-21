"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowRight, LayoutGrid, Menu, Phone, X } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";
import { CALL_HREF, CALL_LABEL, NAV, WHATSAPP_HREF } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Floating header, full-screen menu and the bottom action bar.
 * They share one open/closed state, so they live together.
 */
export function SiteChrome() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isCurrent = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <a
        href="#main"
        className="fixed top-[-60px] left-3 z-200 rounded-full bg-ink px-[18px] py-3 font-semibold text-background focus:top-[calc(12px+env(safe-area-inset-top,0px))]"
      >
        Skip to content
      </a>

      <header className="fixed inset-x-3 top-[calc(12px+env(safe-area-inset-top,0px))] z-60 mx-auto max-w-[1080px]">
        <div className="flex min-h-[60px] items-center justify-between gap-3 rounded-full border border-line bg-[rgb(58_20_28/0.72)] py-1.5 pr-2 pl-5 shadow-soft backdrop-blur-xl backdrop-saturate-150">
          <Link href="/" className="flex min-h-11 items-center" aria-label="Aakash Pathology Laboratory, home">
            <Image
              src="/logo.png"
              alt=""
              width={838}
              height={217}
              priority
              className="h-[30px] w-auto brightness-0 invert-[0.93]"
            />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                aria-current={isCurrent(n.href) ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-11 items-center rounded-full px-3.5 text-[15px] font-semibold text-ink-2 transition-colors duration-200 hover:bg-lift hover:text-ink",
                  isCurrent(n.href) && "bg-lift text-ink",
                )}
              >
                {n.short}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/contact#home-collection"
              className={cn(buttonVariants({ size: "sm" }), "hidden lg:inline-flex")}
            >
              Book a home visit
            </Link>
            <Button
              variant="line"
              size="icon"
              className="lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <Menu />
            </Button>
          </div>
        </div>
      </header>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="top"
          showCloseButton={false}
          className="z-90 max-h-none w-full gap-0 data-[side=top]:h-dvh overflow-y-auto border-0 bg-background/95 px-5 pt-[calc(14px+env(safe-area-inset-top,0px))] pb-[calc(24px+env(safe-area-inset-bottom,0px))] backdrop-blur-2xl"
        >
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <SheetDescription className="sr-only">Pages on this site</SheetDescription>
          <div className="mb-3 flex min-h-[60px] items-center justify-between">
            <Image
              src="/logo.png"
              alt="Aakash Pathology Laboratory"
              width={838}
              height={217}
              className="h-[30px] w-auto brightness-0 invert-[0.93]"
            />
            <SheetClose
              render={<Button variant="line" size="icon" aria-label="Close menu" />}
            >
              <X />
            </SheetClose>
          </div>

          <nav aria-label="Menu">
            {NAV.map((n, i) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                aria-current={isCurrent(n.href) ? "page" : undefined}
                style={{ animationDelay: `${i * 45 + 90}ms` }}
                className={cn(
                  "flex min-h-16 animate-in items-center justify-between border-b border-line fill-mode-both font-display text-[clamp(26px,7.5vw,34px)] font-semibold tracking-[-0.02em] duration-500 fade-in-0 slide-in-from-bottom-4",
                  isCurrent(n.href) && "text-brand-ink",
                )}
              >
                {n.label}
                <ArrowRight className="size-5 text-ink-2" aria-hidden="true" />
              </Link>
            ))}
          </nav>

          <div className="mt-auto grid gap-2.5 pt-6">
            <a href={CALL_HREF} className={cn(buttonVariants(), "w-full")}>
              <Phone /> Call {CALL_LABEL}
            </a>
            <a href={WHATSAPP_HREF} className={cn(buttonVariants({ variant: "whatsapp" }), "w-full")}>
              <WhatsAppIcon className="size-5" /> Chat on WhatsApp
            </a>
          </div>
        </SheetContent>
      </Sheet>

      {/* Bottom action bar: the main actions stay under the thumb on every page. */}
      <nav
        aria-label="Quick actions"
        className="fixed inset-x-3 bottom-[calc(12px+env(safe-area-inset-bottom,0px))] z-70 mx-auto grid max-w-[460px] grid-cols-[1.5fr_1fr_1fr_1fr] gap-1.5 rounded-[28px] border border-line bg-[rgb(58_20_28/0.82)] p-2 shadow-float backdrop-blur-xl backdrop-saturate-150 lg:hidden"
      >
        <a
          href={CALL_HREF}
          className="flex min-h-14 items-center justify-center gap-2 rounded-[20px] text-[15px] font-semibold text-(--btn-fg) [background:var(--btn-bg)] transition-transform duration-200 ease-soft active:scale-[0.96]"
        >
          <Phone className="size-5" /> Call
        </a>
        <a href={WHATSAPP_HREF} className={barItem}>
          <WhatsAppIcon className="size-5" />
          WhatsApp
        </a>
        <Link
          href="/packages"
          aria-current={pathname.startsWith("/packages") ? "page" : undefined}
          className={cn(barItem, "aria-[current=page]:bg-lift aria-[current=page]:text-ink")}
        >
          <LayoutGrid className="size-5" />
          Packages
        </Link>
        <button type="button" onClick={() => setOpen(true)} className={barItem}>
          <Menu className="size-5" />
          Menu
        </button>
      </nav>
    </>
  );
}

const barItem =
  "flex min-h-14 flex-col items-center justify-center gap-1 rounded-[20px] text-xs font-semibold text-ink-2 transition-transform duration-200 ease-soft active:scale-[0.96]";

