// Builds legacy-static/search-data.js: the pages, sections, FAQs and facts the home-page search looks through.
// Tests and packages are not listed here: the search reads them straight from packages-data.js.
// Run after editing the FAQs:  npm run build:search
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const site = path.join(root, "legacy-static");

const plain = (html) => html.replace(/<[^>]+>/g, " ").replace(/&ndash;/g, "-").replace(/&amp;/g, "&").replace(/&deg;/g, "°").replace(/&[a-z]+;/g, " ").replace(/\s+/g, " ").trim();
const clip = (s, n) => (s.length > n ? s.slice(0, n - 1).replace(/\s+\S*$/, "") + "…" : s);

// FAQs live in faqs.html as two JS arrays; read them from there so the two never drift apart.
const faqHtml = await readFile(path.join(site, "faqs.html"), "utf8");
const grab = (name) => new Function(`return ${faqHtml.match(new RegExp(`const ${name} = (\\[[\\s\\S]*?\\n\\]);`))[1]}`)();
const faqs = [...grab("popularFAQs"), ...grab("generalFAQs")].map(({ q, a }) => ({
  kind: "faq", t: q, s: clip(plain(a), 110), x: plain(a), u: `faqs.html?q=${encodeURIComponent(q)}`,
}));

// Pages, sections and facts. t = title, s = the line shown under it, k = extra words people might type.
const items = [
  { kind: "page", t: "Tests & Packages", s: "Compare Package 1 to Gold and see every test", u: "packages.html", k: "price cost checkup health check preventive full body" },
  { kind: "page", t: "About Us", s: "Our story since 2005, milestones and pathologist", u: "about.html", k: "history founded lab team" },
  { kind: "page", t: "FAQs", s: "Timings, reports, fasting and test preparation", u: "faqs.html", k: "questions help" },
  { kind: "page", t: "Gallery", s: "Photos of our lab in Ankleshwar", u: "gallery.html", k: "photos pictures equipment machines facility" },
  { kind: "page", t: "CSR", s: "Discounts and community work in Ankleshwar", u: "csr.html", k: "social responsibility charity discount police defence" },
  { kind: "page", t: "Contact", s: "Phone, WhatsApp, email and four locations", u: "contact.html", k: "reach call address" },

  { kind: "info", t: "Dr. Akash Chhabra", s: "Chief Pathologist & Owner, 25+ years of experience", u: "about.html#doctor", k: "doctor pathologist owner mbbs md qualification faculty research papers akash aakash" },
  { kind: "info", t: "Our Story", s: "Serving Ankleshwar for 21+ years", u: "about.html#story", k: "history since 2005 founded years" },
  { kind: "info", t: "What We Brought to Ankleshwar First", s: "Hormone tests, cardiac markers, FNAC, nephelometry", u: "about.html#firsts", k: "firsts pioneer" },
  { kind: "info", t: "What We Offer", s: "Hormones, cardiac, diabetes, infection, FNAC and more", u: "about.html#offer", k: "specialised diagnostics hormone cardiac diabetes infection fnac biopsy culture nephelometry bone marrow genetic cancer markers allergy" },
  { kind: "info", t: "Vision & Mission", s: "How the lab works and what it stands for", u: "about.html#vision", k: "values mission vision" },

  { kind: "info", t: "Home Collection", s: "Home or hospital sample collection, by appointment", u: "contact.html#home-collection", k: "home visit sample pickup phlebotomist" },
  { kind: "info", t: "Book a Test", s: "Walk in, or call first for special tests", u: "contact.html#book", k: "appointment booking walk in schedule" },
  { kind: "info", t: "Get My Report", s: "Same day, on WhatsApp or email", u: "contact.html#report", k: "results report collect download email whatsapp" },
  { kind: "info", t: "Give Feedback", s: "Call, message or email us", u: "contact.html#feedback", k: "complaint suggestion review" },
  { kind: "info", t: "Call the Lab", s: "+91 63533 15640 · +91 98240 15108", u: "tel:+916353315640", k: "phone number helpline call telephone" },
  { kind: "info", t: "WhatsApp", s: "Message us on +91 98240 15108", u: "https://wa.me/919824015108", k: "chat message whatsapp report" },
  { kind: "info", t: "Email", s: "aakashpathlab@gmail.com", u: "contact.html", k: "mail email address" },
  { kind: "info", t: "Opening Hours", s: "Mon-Sat 7 am - 9 pm · Sun 7 am - 2 pm", u: "faqs.html?q=timings", k: "timings time open close sunday hours" },
  { kind: "info", t: "Station Road, Ankleshwar (Main Lab)", s: "1st Floor, Vyapar Bhavan, Nr. Dave Orthopaedic", u: "contact.html#locations", k: "address location main lab station road vyapar bhavan" },
  { kind: "info", t: "Ganesh Plaza, GIDC", s: "4, Ravidarshan Society, GIDC, Ankleshwar", u: "contact.html#locations", k: "address location collection centre ganesh plaza gidc residence" },
  { kind: "info", t: "Sardar Park, GIDC", s: "3rd Floor, Sardar Park-2, G.I.D.C.", u: "contact.html#locations", k: "address location collection centre sardar park gidc" },
  { kind: "info", t: "Valia Road", s: "F-13, Rameshwar Residency, Opp. Kum Kum Bunglows", u: "contact.html#locations", k: "address location collection centre valia road rameshwar residency" },

  { kind: "info", t: "Support for the LGBTQIA+ Community", s: "Fans and a refrigerator donated to Sakhi Char Chowghi Trust", u: "csr.html", k: "csr ngo queer hiv aids sakhi" },
  { kind: "info", t: "Discounts for Those in Need", s: "Heavy discounts for people in uniform and defence families", u: "csr.html", k: "csr concession police army police relatives" },
  ];

const out = `/* Generated by scripts/build-search-index.mjs. Do not edit; run: npm run build:search */\nconst APL_SEARCH = ${JSON.stringify([...items, ...faqs])};\n`;
await writeFile(path.join(site, "search-data.js"), out);
console.log(`search-data.js: ${items.length} pages and facts, ${faqs.length} FAQs`);
