"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { brands } from "@/data/brands";
import { services } from "@/data/services";
import { cn } from "@/lib/cn";

const links = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Inventory", href: "/inventory" },
  { label: "Modifications", href: "/modifications" },
  { label: "Contact", href: "/contact" },
];

export function MobileNavigation({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [brandsOpen, setBrandsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    panelRef.current?.querySelector<HTMLElement>("[data-close]")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previous?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] lg:hidden">
      <button type="button" className="absolute inset-0 bg-ink/50" aria-label="Close menu" onClick={onClose} />
      <div
        ref={panelRef}
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className="absolute inset-y-0 right-0 flex w-[min(100%,22rem)] flex-col overflow-y-auto bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-line px-4 py-4">
          <p className="text-sm font-semibold tracking-[0.16em]">CARS AUTO</p>
          <button
            type="button"
            data-close
            className="grid h-11 w-11 place-items-center rounded-full border border-line focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focusring"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <nav aria-label="Mobile" className="flex flex-col gap-1 px-3 py-4">
          {links.slice(0, 2).map((link) => (
            <Link key={link.href} href={link.href} className={navClass(pathname === link.href)} onClick={onClose}>
              {link.label}
            </Link>
          ))}
          <Disclosure label="Brands" open={brandsOpen} onToggle={() => setBrandsOpen((value) => !value)}>
            <Link href="/brands" className={subClass} onClick={onClose}>
              All brands
            </Link>
            {brands.map((brand) => (
              <Link
                key={brand.name}
                href={`/inventory?make=${encodeURIComponent(brand.name)}`}
                className={subClass}
                onClick={onClose}
              >
                {brand.name}
              </Link>
            ))}
          </Disclosure>
          <Link href="/inventory" className={navClass(pathname.startsWith("/inventory"))} onClick={onClose}>
            Inventory
          </Link>
          <Disclosure label="Services" open={servicesOpen} onToggle={() => setServicesOpen((value) => !value)}>
            {services.map((service) => (
              <Link key={service.slug} href={service.href} className={subClass} onClick={onClose}>
                {service.title}
              </Link>
            ))}
          </Disclosure>
          {links.slice(3).map((link) => (
            <Link key={link.href} href={link.href} className={navClass(pathname === link.href)} onClick={onClose}>
              {link.label}
            </Link>
          ))}
          <Link
            href="/inventory"
            className="mt-3 inline-flex h-12 items-center justify-center rounded-full bg-ink px-5 text-sm font-medium text-white"
            onClick={onClose}
          >
            Explore Cars
          </Link>
        </nav>
      </div>
    </div>
  );
}

function Disclosure({
  label,
  open,
  onToggle,
  children,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  const id = `${label.toLowerCase()}-mobile-panel`;
  return (
    <div>
      <button
        type="button"
        className="flex min-h-12 w-full items-center justify-between rounded-xl px-3 text-left text-base font-medium text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focusring"
        aria-expanded={open}
        aria-controls={id}
        onClick={onToggle}
      >
        {label}
        <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} aria-hidden="true" />
      </button>
      {open ? (
        <div id={id} className="mb-2 ml-3 border-l border-line pl-3">
          {children}
        </div>
      ) : null}
    </div>
  );
}

function navClass(active: boolean) {
  return cn(
    "flex min-h-12 items-center rounded-xl px-3 text-base font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focusring",
    active ? "bg-canvas text-ink" : "text-ink",
  );
}

const subClass =
  "flex min-h-11 items-center rounded-lg px-3 text-sm text-muted hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focusring";
