import type { CircularSplitRollItem } from "@/components/ui/circular-split-roll";

/**
 * Photos are placeholders for now. Add an `image` URL to any item and the
 * wheel shows it instead. `title` is the short name shown on the wheel,
 * `alt` carries the full name for screen readers.
 */
export const INSTRUMENTS: CircularSplitRollItem[] = [
  { id: "sysmex-3", title: "Sysmex 3-part cell counter", alt: "Sysmex 3-part cell counter" },
  { id: "urine", title: "Automated urine analyser", alt: "Fully automated urine analyser" },
  { id: "olympus", title: "Olympus CX21i microscope", alt: "Olympus CX21i microscope" },
  { id: "xs800", title: "5-part cell counter XS-800i", alt: "Fully automated 5-part cell counter XS-800i" },
  {
    id: "finecare",
    title: "FINECARE immunoassay system",
    alt: "Fluorescence immunochromatographic analysing system (FINECARE)",
  },
  { id: "nulyte", title: "NULYTE ISE analyser", alt: "Ion selective electrode analyser, NULYTE" },
  { id: "mispa-i3", title: "Mispa i3 nephelometer", alt: "Fully automated nephelometer, Mispa i3" },
  { id: "erba-chem5", title: "ERBA Chem 5 Plus", alt: "Semi autoanalyser ERBA Chem 5 Plus" },
  { id: "em200", title: "EM 200 biochemistry analyser", alt: "Fully automated biochemistry analyser, EM 200" },
  {
    id: "access2",
    title: "Beckman Access 2 hormone analyser",
    alt: "Chemiluminescence based hormone analyser, Beckman Coulter Access 2",
  },
  { id: "ecl105", title: "ERBA ECL 105 coagulometer", alt: "ERBA ECL 105 coagulometer" },
  { id: "nano-h5", title: "Nano H5 HPLC system", alt: "Nano H5 HPLC system" },
  { id: "ca101", title: "Sysmex CA101 coagulometer", alt: "Sysmex CA101 coagulometer" },
  { id: "vein", title: "Laser vein viewer", alt: "Laser based vein viewer" },
  { id: "nanoplus", title: "Mispa Nanoplus analyser", alt: "Mispa Nanoplus fully automatic biochemistry analyser" },
];

export const FACILITY: CircularSplitRollItem[] = [
  { id: "station-road", title: "Station Road main lab", alt: "Station Road main lab" },
  { id: "reception", title: "Reception", alt: "Reception" },
  { id: "sample-collection", title: "Sample collection", alt: "Sample collection area" },
  { id: "main-lab", title: "Main laboratory", alt: "Main laboratory floor" },
  { id: "reporting", title: "Reporting room", alt: "Reporting room" },
  { id: "waiting", title: "Waiting area", alt: "Waiting area" },
  { id: "ganesh-plaza", title: "Ganesh Plaza centre", alt: "Ganesh Plaza collection centre" },
  { id: "sardar-park", title: "Sardar Park centre", alt: "Sardar Park collection centre" },
  { id: "valia-road", title: "Valia Road centre", alt: "Valia Road collection centre" },
];
