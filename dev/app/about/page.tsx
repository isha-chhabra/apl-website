import type { Metadata } from "next";
import { Award, BookOpen, GraduationCap, ShieldCheck } from "lucide-react";
import { CtaBand } from "@/components/site/cta-band";
import { PageHead } from "@/components/site/page-head";
import { PhotoPlaceholder } from "@/components/site/placeholder";
import { Reveal } from "@/components/site/reveal";
import { Stats } from "@/components/site/stats";
import { Tray } from "@/components/site/tray";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About the lab",
  description:
    "Aakash Pathology Laboratory opened in 2005 and is one of the oldest running pathology labs in Ankleshwar. Meet Chief Pathologist Dr. Aakash Chhabra.",
};

const OFFERINGS = [
  { title: "Hormone tests", text: "Thyroid (T3, T4, TSH), vitamin B12, vitamin D3, fertility tests (AMH) and testosterone." },
  { title: "Cardiac tests", text: "Serum cholesterol, lipid profile, Troponin I, HS-CRP and homocysteine." },
  { title: "Diabetes tests", text: "HbA1c and fasting and post-meal blood sugar." },
  { title: "Infectious disease", text: "Malaria, typhoid, hepatitis B, COVID-19, flu panel, dengue and HIV." },
  { title: "Cancer screening", text: "Pap smear reporting for early detection of cervical cancer, plus PSA, CA-125 and CEA." },
  { title: "FNAC and biopsy", text: "Fine needle aspiration cytology, including sonography-guided FNAC for swellings, as an outpatient procedure." },
  { title: "Culture and sensitivity", text: "Finds bacteria in urine, blood and body fluids and shows which antibiotics work." },
  { title: "Staining", text: "Acid-fast and Gram staining to identify microorganisms, including those that cause tuberculosis." },
  { title: "Nephelometry", text: "Accurate diagnosis of kidney conditions and rheumatoid arthritis." },
  { title: "Bone marrow reporting", text: "For diagnosing complicated anemia and other blood conditions." },
  { title: "Genetic tests", text: "Double, triple and quadruple marker tests, chromosomal analysis and karyotyping." },
  { title: "Allergy tests", text: "In-vitro allergy testing." },
  { title: "Semen and stool tests", text: "Routine examinations, done in-house." },
];

const CREDENTIALS = [
  { icon: GraduationCap, title: "MBBS, 1997", text: "B.J. Medical College, affiliated with New Civil Hospital, Ahmedabad" },
  { icon: GraduationCap, title: "M.D. Pathology", text: "N.H.L. Medical College, affiliated with V.S. Hospital, Ahmedabad" },
  { icon: BookOpen, title: "4 published research papers", text: "From his years on faculty at V.S. Hospital and Surat Municipal Medical College" },
  { icon: ShieldCheck, title: "Industrial Health certificate, 2009", text: "M.S. University, Vadodara, with distinction" },
  { icon: Award, title: "Hospital Management certificate, 2021", text: "Government course, IDEMI Pune" },
];

const section = "py-14 md:py-24";

export default function AboutPage() {
  return (
    <>
      <PageHead title="Our story" lead="Nearly two decades of accurate, accessible pathology in Ankleshwar." />

      <section className="pb-14 md:pb-20">
        <div className="wrap md:grid md:grid-cols-[1fr_1fr] md:gap-14">
          <Reveal>
            <h2 className="t-h2 max-w-[16ch]">One of Ankleshwar&rsquo;s oldest pathology labs</h2>
          </Reveal>
          <Reveal className="mt-5 grid gap-4 text-[16.5px] text-ink-2 md:mt-1" delay={60}>
            <p>
              Aakash Pathology Laboratory opened in 2005, when Ankleshwar had few dedicated diagnostic
              labs. Patients who needed specialised tests often travelled to Surat or Vadodara just to get
              answers.
            </p>
            <p>
              Today the lab is known as one of the cleanest and most hygienic in the city. It works on the
              principles it started with: honesty, discipline, hard work and technical expertise. It was
              among the first in Ankleshwar to offer many specialised investigations.
            </p>
          </Reveal>
        </div>
        <div className="wrap mt-10">
          <Reveal>
            <Stats
              items={[
                { value: 19, suffix: "+", label: "Years in Ankleshwar" },
                { value: 4, label: "Locations across the city" },
                { value: 100000, suffix: "+", label: "Patients tested" },
                { value: 200000, suffix: "+", label: "Investigations completed" },
              ]}
            />
          </Reveal>
        </div>
      </section>

      <section className={cn(section, "tone-raised")}>
        <div className="wrap">
          <Reveal className="mb-8 max-w-[36em]">
            <h2 className="t-h2">Specialised diagnostics under one roof</h2>
            <p className="mt-3 text-ink-2">From everyday screening to specialised investigations.</p>
          </Reveal>
          <ul className="border-t border-line md:grid md:grid-cols-2 md:gap-x-12">
            {OFFERINGS.map((o, i) => (
              <Reveal as="li" key={o.title} delay={(i % 4) * 40}>
                <div className="border-b border-line py-4">
                  <h3 className="font-display text-[18px] leading-tight font-semibold">{o.title}</h3>
                  <p className="mt-1 text-[15px] text-ink-2">{o.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <p className="mt-6 rounded-[14px] bg-sunken px-[18px] py-4 text-[14.5px] text-ink-2">
            <b className="text-ink">Please note.</b> Paternity testing and sex determination are not done
            at this laboratory. Some tests are sent to nearby reputed labs.
          </p>
        </div>
      </section>

      <section id="pathologist" className={section}>
        <div className="wrap md:grid md:grid-cols-[0.8fr_1.2fr] md:gap-14">
          <Reveal>
            <Tray>
              <PhotoPlaceholder
                label="Photo of Dr. Aakash Chhabra, coming soon"
                className="aspect-[4/4.6]"
              />
            </Tray>
          </Reveal>
          <div className="mt-9 md:mt-0">
            <Reveal>
              <h2 className="t-h2">Dr. Aakash Chhabra</h2>
              <p className="mt-2 text-[15px] text-brand-ink">Chief pathologist and director</p>
            </Reveal>
            <Reveal className="mt-5 grid gap-4 text-[16px] text-ink-2" delay={60}>
              <p>
                Dr. Chhabra completed his MBBS in 1997 and went on to earn his M.D. in Pathology. During
                his residency and post-graduation he gained deep experience in a state-of-the-art blood
                bank and advanced hematology department, under the guidance of hematopathologist Dr.
                Urmish Chudgar.
              </p>
              <p>
                He served as faculty at V.S. Hospital and Surat Municipal Medical College and Hospital,
                where he carried out research that led to four published papers. He has also attended a
                Cytology Workshop at AFMC Pune, a QC Training Program by RANDOX in Surat, and several
                workshops run by pathologist associations.
              </p>
            </Reveal>
            <ul className="mt-7 border-t border-line">
              {CREDENTIALS.map((c) => (
                <li key={c.title} className="grid grid-cols-[auto_1fr] gap-4 border-b border-line py-4">
                  <span className="grid size-11 place-items-center rounded-full bg-brand-tint text-brand-ink">
                    <c.icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-[17px] leading-tight font-semibold">{c.title}</h3>
                    <p className="mt-0.5 text-[14.5px] text-ink-2">{c.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={cn(section, "tone-raised")}>
        <div className="wrap grid gap-10 md:grid-cols-2 md:gap-14">
          <Reveal>
            <h2 className="t-h2">Our vision</h2>
            <p className="mt-4 max-w-[34em] text-[16.5px] text-ink-2">
              To stay one of the most trusted names in pathology and diagnostics in our district. It grows
              from nearly two decades of work in this field and a lasting commitment to the health and
              well-being of people. We want families and communities here to be healthier and happier.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="t-h2">Our mission</h2>
            <p className="mt-4 max-w-[34em] text-[16.5px] text-ink-2">
              To bridge the gap between diagnosis and therapy. Patients talk directly with our
              pathologist, who sees the patient behind every sample. We use medical knowledge and modern
              equipment to deliver accurate reports quickly, at prices that stay affordable, because good
              diagnostics should be within reach of everyone.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand title="Have a question for our pathologist?" text="We are happy to walk you through any test, result or concern." />
    </>
  );
}
