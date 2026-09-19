import { Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";
import { CALL_HREF, CALL_LABEL, WHATSAPP_HREF } from "@/lib/site";
import { cn } from "@/lib/utils";

/** The one maroon band on a page. Always the closing call to action. */
export function CtaBand({
  title = "Ready to book your test?",
  text = "Call, message us on WhatsApp, or visit any of our 4 locations.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="tone-maroon py-14 md:py-20">
      <div className="wrap">
        <h2 className="t-h2 max-w-[18ch]">{title}</h2>
        <p className="mt-3.5 max-w-[32em] text-[17px] text-ink-2">{text}</p>
        <div className="mt-7 grid gap-2.5 sm:flex sm:flex-wrap">
          <a href={CALL_HREF} className={cn(buttonVariants())}>
            <Phone /> Call the lab
          </a>
          <a href={WHATSAPP_HREF} className={cn(buttonVariants({ variant: "line" }))}>
            <WhatsAppIcon className="size-5" /> Chat on WhatsApp
          </a>
        </div>
        <p className="mt-4 font-mono text-[13px] text-ink-2">{CALL_LABEL}</p>
      </div>
    </section>
  );
}
