export const LAB_NAME = "Aakash Pathology Laboratory";

export const PHONES = [
  { label: "+91 63533 15640", href: "tel:+916353315640" },
  { label: "+91 98240 15108", href: "tel:+919824015108" },
] as const;

export const CALL_HREF = PHONES[0].href;
export const CALL_LABEL = PHONES[0].label;
export const WHATSAPP_HREF = "https://wa.me/919824015108";
export const EMAIL = "aakashpathlab@gmail.com";

export const HOURS = [
  { days: "Monday to Saturday", time: "7 am to 9 pm" },
  { days: "Sunday", time: "7 am to 2 pm" },
] as const;

/** `label` is used in the menu, `short` in the desktop header. */
export const NAV = [
  { href: "/", label: "Home", short: "Home" },
  { href: "/packages", label: "Check-up packages", short: "Packages" },
  { href: "/about", label: "About the lab", short: "About" },
  { href: "/faqs", label: "Questions", short: "Questions" },
  { href: "/gallery", label: "Gallery", short: "Gallery" },
  { href: "/csr", label: "Community work", short: "Community" },
  { href: "/contact", label: "Find us", short: "Find us" },
] as const;

export type Location = {
  name: string;
  kind: string;
  address: string;
  map: string;
};

export const LOCATIONS: Location[] = [
  {
    name: "Station Road",
    kind: "Main lab",
    address:
      "1st Floor, Vyapar Bhavan, Nr. Dave Orthopaedic, Station Road, Ankleshwar 393001.",
    map: "https://maps.app.goo.gl/6vuLMD4YvkCsP4Wj8",
  },
  {
    name: "Ganesh Plaza, GIDC",
    kind: "Collection centre",
    address: "4, Ravidarshan Society, GIDC, Ankleshwar 393002.",
    map: "https://www.google.com/maps/dir//FIRST+FLOOR+FF%2F1,+Ganesh+Plaza,+GIDC,+Ankleshwar",
  },
  {
    name: "Sardar Park, GIDC",
    kind: "Collection centre",
    address: "3rd Floor, Sardar Park-2, G.I.D.C., Ankleshwar.",
    map: "https://www.google.com/maps/dir//Sardar+Park+1,+GIDC,+Ankleshwar",
  },
  {
    name: "Valia Road",
    kind: "Collection centre",
    address: "F-13, Rameshwar Residency, Opp. Kum Kum Bunglows, Ankleshwar.",
    map: "https://maps.app.goo.gl/ifEjGwKrjYyFJAM66",
  },
];
