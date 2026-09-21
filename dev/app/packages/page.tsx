import type { Metadata } from "next";
import { CtaBand } from "@/components/site/cta-band";
import { PackagesExplorer } from "@/components/site/packages/packages-explorer";

export const metadata: Metadata = {
  title: "Preventive Health Check-Up Packages",
  description:
    "Package 1 (Basic) from ₹1,499 to the Gold Package (Complete Health) at ₹9,999. See every test by body function, compare all five side by side, or find the package that includes a test.",
};

export default function PackagesPage() {
  return (
    <>
      <div className="pt-[calc(112px+env(safe-area-inset-top,0px))] pb-6">
        <div className="wrap">
          <h1 className="t-h1 max-w-[16ch]">
            Preventive Health <span className="text-warm whitespace-nowrap">Check-Up</span> Packages
          </h1>
          <p className="lead mt-4">A healthier you. A brighter tomorrow.</p>
        </div>
      </div>

      <section className="pb-20 md:pb-28">
        <div className="wrap">
          <PackagesExplorer />
          <p className="mt-12 max-w-[40em] rounded-2xl bg-sunken px-5 py-4 text-[14.5px] text-ink-2">
            Fasting Blood Sugar (FBS) and Lipid Profile need 10 to 12 hours of fasting, so fast before you
            come. Not sure which package is right? Call the lab and consult our pathologist for guidance.
          </p>
        </div>
      </section>

      <CtaBand title="Because your health matters" text="Early detection saves lives. Call the lab, or visit any of our 4 locations." />
    </>
  );
}
