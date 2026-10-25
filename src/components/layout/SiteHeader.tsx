"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { brands } from "@/data/brands";
import { services } from "@/data/services";
import { Logo } from "@/components/layout/Logo";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { cn } from "@/lib/cn";

const links = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Brands", href: "/brands", menu: "brands" },
  { label: "Inventory", href: "/inventory" },
  { label: "Services", href: "/services", menu: "services" },
  { label: "Modifications", href: "/modifications" },
  { label: "Contact", href: "/contact" },
] as const;

function isActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuBaseId = useId();

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenMenu(null);
    }
    function onPointer(event: MouseEvent) {
      if (!headerRef.current?.contains(event.target as Node)) setOpenMenu(null);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur",
        scrolled && "shadow-[0_8px_30px_rgba(17,19,24,0.06)]",
      )}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav aria-label="Primary" className="ml-auto hidden items-center gap-1 lg:flex">
          {links.map((item) => {
            const active = isActive(item.href, pathname);
            if (!("menu" in item)) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-full px-3 py-2 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focusring",
                    active ? "text-ink" : "text-muted hover:text-ink",
                  )}
                >
                  {item.label}
                </Link>
              );
            }

            const menuId = `${menuBaseId}-${item.menu}`;
            const open = openMenu === item.menu;
            const menuLinks =
              item.menu === "brands"
                ? [
                    { label: "All brands", href: "/brands" },
                    ...brands.map((brand) => ({
                      label: brand.name,
                      href: `/inventory?make=${encodeURIComponent(brand.name)}`,
                    })),
                  ]
                : services.map((service) => ({ label: service.title, href: service.href }));

            return (
              <div key={item.href} className="relative flex items-center">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-full px-3 py-2 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focusring",
                    active ? "text-ink" : "text-muted hover:text-ink",
                  )}
                >
                  {item.label}
                </Link>
                <button
                  type="button"
                  className="grid h-8 w-8 place-items-center rounded-full text-muted hover:bg-canvas hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focusring"
                  aria-expanded={open}
                  aria-controls={menuId}
                  aria-label={`${item.label} menu`}
                  onClick={() => setOpenMenu((current) => (current === item.menu ? null : item.menu))}
                >
                  <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} aria-hidden="true" />
                </button>
                {open ? (
                  <div id={menuId} role="menu" className="absolute left-0 top-[calc(100%+0.75rem)] z-50 w-64 rounded-2xl border border-line bg-white p-2 shadow-xl">
                    {menuLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        role="menuitem"
                        className="block rounded-xl px-3 py-2.5 text-sm text-ink hover:bg-canvas focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focusring"
                        onClick={() => setOpenMenu(null)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-2 lg:ml-3">
          <Link
            href="/inventory#inventory-search"
            className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink hover:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focusring"
            aria-label="Search inventory"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/inventory"
            className="hidden h-11 items-center rounded-full bg-ink px-5 text-sm font-medium text-white hover:bg-ink-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:inline-flex"
          >
            Explore Cars
          </Link>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink lg:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focusring"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>
      <MobileNavigation open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
