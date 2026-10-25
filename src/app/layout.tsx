import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { WhatsAppWidget } from "@/components/whatsapp/WhatsAppWidget";
import { siteConfig } from "@/config/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Cars Auto | Cars for sale in Accra",
    template: "%s · Cars Auto",
  },
  description: siteConfig.description,
  applicationName: siteConfig.shortName,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Cars Auto | Cars for sale in Accra",
    description: siteConfig.description,
    siteName: siteConfig.shortName,
    locale: "en_GH",
    type: "website",
    url: "/",
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#111318",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  name: siteConfig.name,
  url: siteConfig.url,
  email: siteConfig.email,
  telephone: siteConfig.phoneE164,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.city,
    addressCountry: "GH",
  },
  areaServed: "Accra, Ghana",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} flex min-h-dvh flex-col font-sans antialiased`}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <AnnouncementBar />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <WhatsAppWidget />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
