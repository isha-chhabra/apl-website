import type { Metadata } from "next";
import { CtaBand } from "@/components/site/cta-band";
import { GalleryTabs } from "@/components/site/gallery-tabs";
import { PageHead } from "@/components/site/page-head";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A look inside Aakash Pathology Laboratory, Ankleshwar: the equipment and facility behind every accurate report.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHead
        title="Inside the lab"
        lead="The equipment and the rooms behind every accurate report."
      />
      <GalleryTabs />
      <CtaBand title="Want to see the lab in person?" text="Visit any of our 4 locations, or call ahead and we will show you around." />
    </>
  );
}
