import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { EMAIL, LAB_NAME, LOCATIONS, PHONES } from "@/lib/site";
import { PACKAGES } from "@/lib/data/packages";

const quick = [
  { href: "/about", label: "About the lab" },
  { href: "/packages", label: "Check-up packages" },
  { href: "/faqs", label: "Questions" },
  { href: "/gallery", label: "Gallery" },
  { href: "/csr", label: "Community work" },
  { href: "/contact", label: "Find us" },
];

const link = "inline-flex min-h-10 items-center text-[15px] text-ink-2 transition-colors hover:text-ink";

export function SiteFooter() {
  return (
    <footer className="tone-wine pt-14 pb-10">
      <div className="wrap">
        <div className="grid gap-9 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Image
              src="/logo.png"
              alt={LAB_NAME}
              width={838}
              height={217}
              className="h-[34px] w-auto brightness-0 invert-[0.93]"
            />
            <p className="mt-3.5 max-w-[26em] text-[14.5px] text-ink-2">
              Diagnostic testing for individuals, families and businesses in Ankleshwar. Accurate,
              affordable and on time.
            </p>
          </div>

          <div>
            <h4 className="mb-2 font-display text-[15px] font-semibold">Explore</h4>
            <ul>
              {quick.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={link}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-2 font-display text-[15px] font-semibold">Packages</h4>
            <ul>
              {PACKAGES.map((p) => (
                <li key={p.id}>
                  <Link href={`/packages#${p.id}`} className={link}>
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-2 font-display text-[15px] font-semibold">Contact</h4>
            <ul className="text-[15px] text-ink-2">
              {PHONES.map((p) => (
                <li key={p.href}>
                  <a href={p.href} className={`${link} gap-2.5`}>
                    <Phone className="size-4 text-brand-ink" aria-hidden="true" />
                    {p.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${EMAIL}`} className={`${link} gap-2.5`}>
                  <Mail className="size-4 text-brand-ink" aria-hidden="true" />
                  {EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-2.5 py-2">
                <MapPin className="mt-1 size-4 shrink-0 text-brand-ink" aria-hidden="true" />
                {LOCATIONS[0].name}, Ankleshwar 393001
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-9 flex flex-wrap justify-between gap-x-6 gap-y-1.5 border-t border-line pt-5 text-[13.5px] text-ink-2">
          <span>&copy; {new Date().getFullYear()} {LAB_NAME}. All rights reserved.</span>
          <span>Established 2005</span>
        </div>
      </div>
    </footer>
  );
}
