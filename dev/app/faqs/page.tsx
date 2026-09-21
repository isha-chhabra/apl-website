import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { FaqList } from "@/components/site/faq-list";
import { PageHead } from "@/components/site/page-head";
import { CALL_HREF } from "@/lib/site";
import { Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Questions",
  description:
    "Answers to common questions about timings, reports, cancellations, home visits and how to prepare for tests at Aakash Pathology Laboratory, Ankleshwar.",
};

export default function FaqsPage() {
  return (
    <>
      <PageHead
        title="Questions, answered"
        lead="Everything patients ask most, from lab timings to how to prepare for a test."
      />
      <section className="pb-16 md:pb-24">
        <div className="wrap max-w-3xl">
          <FaqList />
        </div>
      </section>
      <section className="tone-raised py-14 md:py-20">
        <div className="wrap max-w-3xl">
          <h2 className="t-h2">Still have a question?</h2>
          <p className="mt-3 text-ink-2">We are happy to help. Reach out any time.</p>
          <div className="mt-6 grid gap-2.5 sm:flex">
            <a href={CALL_HREF} className={buttonVariants()}>
              <Phone /> Call the lab
            </a>
            <Link href="/contact" className={buttonVariants({ variant: "line" })}>
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
