import type { ReactNode } from "react";
import Link from "next/link";
import { bodyCategories } from "@/data/categories";
import { services } from "@/data/services";
import { Logo } from "@/components/layout/Logo";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { siteConfig } from "@/config/site";
import { emailHref, mapsHref, phoneHref, whatsappHref } from "@/lib/contactLinks";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-4">
          <Logo tone="light" />
          <p className="mt-5 max-w-sm text-sm leading-6 text-white/75">
            Cars Auto is a dealership in Accra for people comparing brand-new and fairly used vehicles. Listings on this website are demonstration records until the dealership confirms current stock.
          </p>
        </div>
        <div className="lg:col-span-2">
          <h2 className="text-sm font-semibold">Explore</h2>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            <li><FooterLink href="/">Home</FooterLink></li>
            <li><FooterLink href="/about">About Us</FooterLink></li>
            <li><FooterLink href="/brands">Brands</FooterLink></li>
            <li><FooterLink href="/inventory">Inventory</FooterLink></li>
            <li><FooterLink href="/contact">Contact</FooterLink></li>
          </ul>
        </div>
        <div className="lg:col-span-3">
          <h2 className="text-sm font-semibold">Vehicles and services</h2>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            {bodyCategories.map((category) => (
              <li key={category.bodyType}>
                <FooterLink href={`/inventory?bodyType=${encodeURIComponent(category.bodyType)}`}>{category.label}</FooterLink>
              </li>
            ))}
            {services.map((service) => (
              <li key={service.slug}>
                <FooterLink href={service.href}>{service.title}</FooterLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-3">
          <h2 className="text-sm font-semibold">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm text-white/75">
            <li>
              <a className="hover:text-white" href={emailHref()}>{siteConfig.email}</a>
            </li>
            <li>
              <a className="hover:text-white" href={phoneHref()}>Hotline {siteConfig.phoneDisplay}</a>
            </li>
            <li>
              <a className="hover:text-white" href={whatsappHref()} target="_blank" rel="noopener noreferrer">
                WhatsApp {siteConfig.whatsappDisplay}
              </a>
            </li>
            <li>
              <a className="hover:text-white" href={mapsHref()} target="_blank" rel="noopener noreferrer">
                {siteConfig.address.full}
              </a>
            </li>
          </ul>
          <div className="mt-6">
            <NewsletterForm compact />
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {year} {siteConfig.name}. All rights reserved.</p>
          <a href="#main" className="hover:text-white">Back to top</a>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="rounded hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">
      {children}
    </Link>
  );
}
