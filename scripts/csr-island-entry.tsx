import { createRoot } from "react-dom/client";
import Component from "@/components/ui/stacking-card";
import { CSR_INTRO, CSR_PROJECTS, CSR_TITLE } from "@/lib/data/csr";

const root = document.getElementById("csr-stack");
if (root) {
  createRoot(root).render(
    <Component projects={CSR_PROJECTS} title={CSR_TITLE} intro={CSR_INTRO} />,
  );
}
