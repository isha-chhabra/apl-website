import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/site/site-chrome";
import { SiteFooter } from "@/components/site/footer";
import { MotionShell } from "@/components/site/ambient";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Aakash Pathology Laboratory, Ankleshwar",
    template: "%s | Aakash Pathology Laboratory",
  },
  description:
    "Pathology lab in Ankleshwar since 2005. Accurate reports, most on the same day, from a pathologist with 25+ years of experience. Four locations and home collection.",
};

export const viewport: Viewport = {
  themeColor: "#381319",
  colorScheme: "dark",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`dark ${bricolage.variable} ${figtree.variable} ${geistMono.variable}`}
    >
      <body>
        <MotionShell>
          <SiteChrome />
          <main id="main">{children}</main>
          <SiteFooter />
        </MotionShell>
      </body>
    </html>
  );
}
