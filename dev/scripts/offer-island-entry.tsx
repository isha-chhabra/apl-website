import { createRoot } from "react-dom/client";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { OFFER } from "@/lib/data/offer";

const root = document.getElementById("offer-orbit");
if (root) {
  createRoot(root).render(<RadialOrbitalTimeline timelineData={OFFER} />);
}
