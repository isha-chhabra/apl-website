import { createRoot } from "react-dom/client";
import { HeroLanding } from "@/components/ui/hero-1";
import type { HeroLandingProps } from "@/components/ui/hero-1";
import { SiteSearch } from "@/components/ui/site-search";

const heroProps: HeroLandingProps = {
  logo: { src: "assets/logo.png", alt: "Aakash Pathology Laboratory", companyName: "Aakash Pathology Laboratory" },
  navigation: [
    { name: "About", href: "about.html" },
    { name: "Packages & Profiles", href: "packages.html" },
    { name: "FAQs", href: "faqs.html" },
    { name: "Gallery", href: "gallery.html" },
    { name: "CSR", href: "csr.html" },
    { name: "Contact", href: "contact.html" },
  ],
  loginText: "Book a Visit",
  loginHref: "contact.html",
  title: "Ankleshwar's Most Trusted Pathology Lab",
  description: "Fast, accurate reports from a pathologist with 25+ years of experience.",
  announcementBanner: { text: "More Savings on New Packages", linkText: "See Prices", linkHref: "packages.html" },
  callToActions: [
    { text: "Call Us", href: "tel:+916353315640", variant: "primary" },
    { text: "View Packages", href: "packages.html", variant: "secondary" },
  ],
  titleSize: "large",
  // soft amber into burnt orange, faint over cream
  gradientColors: { from: "#FED7AA", to: "#F59E0B" },
  className: "sm:min-h-screen",
  search: <SiteSearch />,
};

const root = document.getElementById("hero-root");
if (root) {
  createRoot(root).render(<HeroLanding {...heroProps} />);
}
