import type { Metadata } from "next";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { PageHead } from "@/components/site/page-head";
import { PhotoPlaceholder } from "@/components/site/placeholder";
import { Reveal } from "@/components/site/reveal";
import { Tag } from "@/components/site/tag";
import { Tray } from "@/components/site/tray";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";
import { CALL_HREF, EMAIL, HOURS, LOCATIONS, PHONES, WHATSAPP_HREF } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Find us",
  description:
    "Call, message or visit Aakash Pathology Laboratory at any of our 4 locations across Ankleshwar. Book a home visit or ask about a test.",
};

const row =
  "grid min-h-[76px] grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-line py-4 transition-colors hover:bg-lift/50";
const icon = "grid size-11 place-items-center rounded-full bg-brand-tint text-brand-ink";

export default function ContactPage() {
  return (
    <>
      <PageHead
        title="Reach out to us"
        lead="For every pathology test you need, across 4 locations in Ankleshwar."
      />

      <section className="pb-14 md:pb-20">
        <div className="wrap md:grid md:grid-cols-[1.1fr_0.9fr] md:gap-14">
          <Reveal>
            <ul className="border-t border-line">
              {PHONES.map((p) => (
                <li key={p.href}>
                  <a href={p.href} className={row}>
                    <span className={icon}><Phone className="size-5" aria-hidden="true" /></span>
                    <span>
                      <small className="block text-[13px] text-ink-2">Call</small>
                      <b className="font-mono text-[17px] font-medium">{p.label}</b>
                    </span>
                    <ArrowRight className="size-5 text-ink-2" aria-hidden="true" />
                  </a>
                </li>
              ))}
              <li>
                <a href={WHATSAPP_HREF} className={row}>
                  <span className={icon}><WhatsAppIcon className="size-5" /></span>
                  <span>
                    <small className="block text-[13px] text-ink-2">WhatsApp</small>
                    <b className="font-mono text-[17px] font-medium">+91 98240 15108</b>
                  </span>
                  <ArrowRight className="size-5 text-ink-2" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className={row}>
                  <span className={icon}><Mail className="size-5" aria-hidden="true" /></span>
                  <span className="min-w-0">
                    <small className="block text-[13px] text-ink-2">Email</small>
                    <b className="block truncate font-medium">{EMAIL}</b>
                  </span>
                  <ArrowRight className="size-5 text-ink-2" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </Reveal>

          <Reveal className="mt-9 md:mt-0" delay={80}>
            <div id="home-collection" className="tone-wine scroll-mt-28 rounded-tray p-6">
              <h2 className="t-h3 text-[24px]">Book a home visit</h2>
              <p className="mt-2 text-[15.5px] text-ink-2">
                For home collection, questions and feedback, call the helpline. Home visits are by
                appointment.
              </p>
              <a href={CALL_HREF} className={cn(buttonVariants(), "mt-5 w-full sm:w-auto")}>
                <Phone /> Call the lab
              </a>
              <dl className="mt-6 border-t border-line pt-4 text-[15px]">
                {HOURS.map((h) => (
                  <div key={h.days} className="flex justify-between gap-4 py-1">
                    <dt className="text-ink-2">{h.days}</dt>
                    <dd className="font-mono text-[14px]">{h.time}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-[13.5px] text-ink-2">Collection centre hours can differ. Call to confirm.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="tone-raised py-14 md:py-24">
        <div className="wrap">
          <Reveal className="mb-6 max-w-[36em]">
            <h2 className="t-h2">4 locations across Ankleshwar</h2>
          </Reveal>
          <ul className="border-t border-line md:grid md:grid-cols-2 md:gap-x-12">
            {LOCATIONS.map((l, i) => (
              <Reveal as="li" key={l.name} delay={i * 50}>
                <div className="border-b border-line py-5">
                  <Tag>{l.kind}</Tag>
                  <h3 className="mt-2.5 font-display text-xl font-semibold">{l.name}</h3>
                  <p className="mt-1 text-[15px] text-ink-2">{l.address}</p>
                  <a href={l.map} target="_blank" rel="noopener" className={cn(buttonVariants({ variant: "link" }), "mt-1")}>
                    <MapPin className="size-4" /> Get directions
                  </a>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-10">
            <Tray>
              <PhotoPlaceholder label="Map of our locations, coming soon" className="aspect-[16/10] md:aspect-[16/6]" />
            </Tray>
            <a href={LOCATIONS[0].map} target="_blank" rel="noopener" className={cn(buttonVariants({ variant: "line" }), "mt-4")}>
              Open main lab in Maps
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
