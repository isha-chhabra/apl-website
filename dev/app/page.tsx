import Link from "next/link";
import { ArrowRight, Clock, MapPin, RotateCcw, ScanSearch, UserRound } from "lucide-react";
import { ButtonIsland, buttonVariants } from "@/components/ui/button";
import { CtaBand } from "@/components/site/cta-band";
import { FindTest } from "@/components/site/find-test";
import { PackageStrip } from "@/components/site/package-strip";
import { PhotoPlaceholder } from "@/components/site/placeholder";
import { Reveal } from "@/components/site/reveal";
import { Stats } from "@/components/site/stats";
import { Tag } from "@/components/site/tag";
import { Timeline } from "@/components/site/timeline";
import { Tray } from "@/components/site/tray";
import { LOCATIONS } from "@/lib/site";
import { cn } from "@/lib/utils";

const WHY = [
  { icon: Clock, title: "Same-day reports", text: "Most tests run in our own lab, so most reports are ready the same day." },
  { icon: ScanSearch, title: "Read by a pathologist", text: "Our pathologist and trained technologists interpret every result." },
  { icon: UserRound, title: "A doctor you can talk to", text: "Ask our pathologist about your report. We see the patient behind every sample." },
  { icon: RotateCcw, title: "Free retest if in doubt", text: "If a result does not sit right, we repeat the collection and retest at our cost." },
];

const STEPS = [
  { title: "Book", text: "Call, message us on WhatsApp, or walk in. Most tests need no appointment." },
  { title: "Give your sample", text: "Visit any of our 4 locations, or book a home visit." },
  { title: "Get your report", text: "Collect it in person, or receive it by email or WhatsApp." },
];

const section = "py-14 md:py-24";
const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export default function HomePage() {
  return (
    <>
      {/* Tests first: a short opener, then the search, then the packages. */}
      <section className="pt-[calc(108px+env(safe-area-inset-top,0px))] pb-6 md:pb-10">
        <div className="wrap">
          <h1 className="t-display enter max-w-[15ch]" style={d(0)}>
            Accurate reports, most on the <span className="text-warm">same day</span>
          </h1>
          <p className="lead enter mt-4" style={d(120)}>
            Pathology in Ankleshwar since 2005, read by a pathologist with 25+ years of experience.
          </p>
        </div>
      </section>

      <section className="pb-8">
        <div className="wrap enter max-w-2xl md:mx-0" style={d(220)}>
          <FindTest />
        </div>
      </section>

      <section className="pb-14 md:pb-20">
        <div className="wrap">
          <div className="enter mb-5 max-w-[34em]" style={d(320)}>
            <h2 className="t-h2">
              Preventive Health <span className="text-warm whitespace-nowrap">Check-Up</span> Packages
            </h2>
            <p className="mt-2.5 text-ink-2">A healthier you. A brighter tomorrow. Tap a package to see every test in it.</p>
          </div>
          <PackageStrip />
        </div>
      </section>

      <section className="tone-raised py-14 md:py-20">
        <div className="wrap">
          <Reveal>
            <Stats
              items={[
                { value: 19, suffix: "+", label: "Years serving Ankleshwar" },
                { value: 25, suffix: "+", label: "Years of pathologist experience" },
                { value: 100000, suffix: "+", label: "Patients tested" },
                { value: 200000, suffix: "+", label: "Investigations completed" },
              ]}
            />
          </Reveal>
        </div>
      </section>

      <section className={section}>
        <div className="wrap">
          <Reveal className="mb-8 max-w-[36em]">
            <h2 className="t-h2">Built on accuracy, experience and care</h2>
          </Reveal>
          <ul className="grid gap-3.5 md:grid-cols-2">
            {WHY.map((w, i) => (
              <Reveal as="li" key={w.title} delay={i * 60}>
                <div className="glass grid h-full grid-cols-[auto_1fr] items-start gap-4 p-5">
                  <span className="grid size-11 place-items-center rounded-2xl bg-[linear-gradient(135deg,#ff9a78,#c4536a)] text-[#2b0c11]">
                    <w.icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-[19px] leading-tight font-semibold">{w.title}</h3>
                    <p className="mt-1 text-[15px] text-ink-2">{w.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className={cn(section, "tone-raised")}>
        <div className="wrap">
          <Reveal className="mb-6 max-w-[36em]">
            <h2 className="t-h2">Two decades of building trust</h2>
            <p className="mt-3 text-ink-2">Tap a year to see what it added to the lab you visit today.</p>
          </Reveal>
          <Timeline />
        </div>
      </section>

      <section className={section}>
        <div className="wrap md:grid md:grid-cols-[0.8fr_1.2fr] md:items-center md:gap-14">
          <Reveal>
            <Tray glow={{ c1: "var(--coral)", c2: "var(--rose)" }}>
              <PhotoPlaceholder label="Photo of Dr. Aakash Chhabra, coming soon" className="aspect-[4/4.6]" />
            </Tray>
          </Reveal>
          <Reveal className="mt-8 md:mt-0" delay={80}>
            <h2 className="t-h2">The doctor behind every report</h2>
            <p className="mt-5 font-display text-xl font-semibold">Dr. Aakash Chhabra</p>
            <p className="text-[15px] text-brand-ink">Chief pathologist and director</p>
            <p className="mt-4 max-w-[36em] text-ink-2">
              MBBS from B.J. Medical College, Ahmedabad (1997), then an M.D. in Pathology from N.H.L. Medical
              College. Former faculty at V.S. Hospital and Surat Municipal Medical College, with 4 published
              research papers.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Tag>MBBS, M.D. Pathology</Tag>
              <Tag>4 research papers</Tag>
              <Tag>25+ years</Tag>
            </div>
            <Link href="/about#pathologist" className={cn(buttonVariants({ variant: "link" }), "mt-4")}>
              Read his full profile <ArrowRight />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className={cn(section, "tone-raised")}>
        <div className="wrap">
          <Reveal className="mb-6 max-w-[36em]">
            <h2 className="t-h2">Getting tested is simple</h2>
          </Reveal>
          <ol className="grid gap-3.5 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 70}>
                <div className="glass h-full p-5">
                  <span className="font-mono text-3xl leading-none text-warm" aria-hidden="true">
                    {i + 1}
                  </span>
                  <h3 className="mt-3 font-display text-xl leading-tight font-semibold">{s.title}</h3>
                  <p className="mt-1 text-[15.5px] text-ink-2">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className={section}>
        <div className="wrap">
          <Reveal className="mb-6 max-w-[36em]">
            <h2 className="t-h2">4 locations across Ankleshwar</h2>
          </Reveal>
          <ul className="grid gap-3.5 md:grid-cols-2">
            {LOCATIONS.map((l, i) => (
              <Reveal as="li" key={l.name} delay={i * 50}>
                <div className="glass h-full p-5">
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
          <Link href="/contact#home-collection" className={cn(buttonVariants(), "mt-8")}>
            Book a home visit
            <ButtonIsland />
          </Link>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
