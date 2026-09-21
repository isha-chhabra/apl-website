import type { Metadata } from "next";
import { CtaBand } from "@/components/site/cta-band";
import { PageHead } from "@/components/site/page-head";
import { PhotoPlaceholder } from "@/components/site/placeholder";
import { Reveal } from "@/components/site/reveal";
import { Tray } from "@/components/site/tray";

export const metadata: Metadata = {
  title: "Community work",
  description:
    "How Aakash Pathology Laboratory supports its community: discounts for those in need, road safety, food security and healthcare partnerships.",
};

const ITEMS = [
  {
    title: "Support for the LGBTQIA+ community",
    text: "We work with Sakhi Char Chowghi Trust, an NGO in Malad, Mumbai, that works for the welfare of the Queer (LGBTQIA+) community. We have donated fans and a refrigerator for preserving medicines, supporting people affected by HIV/AIDS among others.",
    label: "Photo of the partnership, coming soon",
  },
  {
    title: "Treatment support for a young patient",
    text: "We collaborated on, and contributed to, the treatment of a girl from a tribal community who needed serious surgery at S.I.D.S. Hospital, Surat.",
    label: "Photo, coming soon",
  },
  {
    title: "Food for women and children",
    text: "We contribute to Bhukhiya nu Bhojan, a local charitable organisation that provides free food to people in need, with special care for women and children.",
    label: "Photo, coming soon",
  },
  {
    title: "Road safety with the traffic police",
    text: "With the traffic police department, we apply free reflectors, stickers and fluorescent material to cycles, tractors and dumpsters that often go without them. It helps prevent accidents caused by poor visibility at night.",
    label: "Photo of the road safety drive, coming soon",
  },
  {
    title: "Holding prices through COVID-19",
    text: "We did not raise our prices during the pandemic, even as diagnostic chemicals and materials cost more worldwide. We also followed the government price cap on RT-PCR throughout.",
    label: "Photo, coming soon",
  },
];

export default function CsrPage() {
  return (
    <>
      <PageHead
        title="Community work"
        lead="A lab's responsibility reaches past the patients who walk through its door."
      />

      <section className="pb-14 md:pb-24">
        <div className="wrap">
          <Reveal className="max-w-[40em] text-[17px] text-ink-2">
            <p>
              We believe in doing business ethically and working towards a better society. That is why we
              have always given heavy discounts to people in need, to those who serve in uniform, and to
              relatives of police and defence personnel.
            </p>
          </Reveal>

          <ul className="mt-10 grid gap-5 md:grid-cols-2 md:gap-6">
            {ITEMS.map((item, i) => (
              <Reveal as="li" key={item.title} delay={(i % 2) * 70} className={i === 0 ? "md:col-span-2" : ""}>
                <Tray coreClassName={i === 0 ? "md:grid md:grid-cols-2" : ""}>
                  <PhotoPlaceholder
                    label={item.label}
                    className={i === 0 ? "aspect-[16/10] md:aspect-auto md:h-full" : "aspect-[16/10]"}
                  />
                  <div className="p-5 md:p-7">
                    <h2 className="font-display text-[22px] leading-tight font-semibold tracking-[-0.02em]">
                      {item.title}
                    </h2>
                    <p className="mt-2.5 text-[15.5px] text-ink-2">{item.text}</p>
                  </div>
                </Tray>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title="Want to know more about our community work?" text="We are happy to talk about it, and to hear your ideas for what we should do next." />
    </>
  );
}
