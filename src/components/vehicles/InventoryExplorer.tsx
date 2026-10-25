"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { vehicles } from "@/data/vehicles";
import { VehicleFilters } from "@/components/vehicles/VehicleFilters";
import { VehicleGrid } from "@/components/vehicles/VehicleGrid";
import { VehicleSort } from "@/components/vehicles/VehicleSort";
import { InventoryEmptyState } from "@/components/vehicles/InventoryEmptyState";
import { DemoNotice } from "@/components/ui/DemoNotice";
import { Container } from "@/components/ui/Container";
import { conditionLabel } from "@/lib/vehicleUtils";
import { formatCurrency } from "@/lib/formatCurrency";
import {
  filterVehicles,
  hasActiveFilters,
  inventoryHref,
  paginate,
  queryFromSearchParams,
  rangeConflicts,
  sortVehicles,
  toNumber,
  type SortOption,
  type VehicleQuery,
} from "@/lib/vehicleFilters";

export function InventoryExplorer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = useMemo(() => queryFromSearchParams(new URLSearchParams(searchParams.toString())), [searchParams]);
  const [search, setSearch] = useState(query.q);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const update = useCallback(
    (patch: Partial<VehicleQuery>, options?: { resetPage?: boolean }) => {
      const next = { ...query, ...patch };
      const resetPage = options?.resetPage ?? !Object.prototype.hasOwnProperty.call(patch, "page");
      if (resetPage) next.page = 1;
      if (patch.make !== undefined && patch.make !== query.make && next.model) {
        const stillValid = vehicles.some(
          (vehicle) => vehicle.make === next.make && vehicle.model === next.model,
        );
        if (!next.make || !stillValid) next.model = "";
      }
      router.replace(inventoryHref(next), { scroll: false });
    },
    [query, router],
  );

  useEffect(() => {
    setSearch(query.q);
  }, [query.q]);

  useEffect(() => {
    const handle = window.setTimeout(() => {
      if (search !== query.q) update({ q: search });
    }, 300);
    return () => window.clearTimeout(handle);
  }, [search, query.q, update]);

  const filtered = sortVehicles(filterVehicles(vehicles, query), query.sort);
  const page = paginate(filtered, query.page);
  const conflicts = rangeConflicts(query);
  const conflict =
    conflicts.price || conflicts.year || conflicts.mileage
      ? "A minimum value is higher than its maximum, so there are no matches. Adjust the range or clear the filters."
      : undefined;
  const chips = activeChips(query);
  const activeCount = chips.length;

  function reset() {
    setSearch("");
    router.replace("/inventory", { scroll: false });
  }

  return (
    <Container className="py-10 sm:py-14">
      <DemoNotice />
      <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0 flex-1">
          <label htmlFor="inventory-search" className="mb-1.5 block text-sm font-medium">
            Search inventory
          </label>
          <input
            id="inventory-search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search make, model, or stock reference"
            className="h-11 w-full rounded-lg border border-line px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focusring"
          />
        </div>
        <div className="flex items-end gap-3">
          <button
            type="button"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-4 text-sm font-medium lg:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focusring"
            aria-expanded={filtersOpen}
            aria-controls="mobile-filters"
            onClick={() => setFiltersOpen(true)}
          >
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            Filters{activeCount ? ` (${activeCount})` : ""}
          </button>
          <VehicleSort value={query.sort} onChange={(sort: SortOption) => update({ sort })} />
        </div>
      </div>

      {chips.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Active filters">
          {chips.map((chip) => (
            <li key={chip.key}>
              <button
                type="button"
                className="inline-flex min-h-9 items-center gap-2 rounded-full border border-line bg-white px-3 text-sm hover:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focusring"
                onClick={() => update({ [chip.key]: chip.clear } as Partial<VehicleQuery>)}
              >
                {chip.label}
                <X className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="sr-only">Remove {chip.label}</span>
              </button>
            </li>
          ))}
          <li>
            <button type="button" className="min-h-9 rounded-full px-3 text-sm font-medium underline" onClick={reset}>
              Reset all
            </button>
          </li>
        </ul>
      ) : null}

      <p className="mt-5 text-sm text-muted" aria-live="polite">
        {page.total === 0
          ? "0 demonstration vehicles"
          : page.outOfRange
            ? `${page.total} demonstration vehicles. This page is outside the results.`
            : `Showing ${page.from}–${page.to} of ${page.total} demonstration vehicles`}
      </p>

      <div className="mt-6 grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 max-h-[calc(100dvh-7rem)] overflow-auto rounded-2xl border border-line p-4">
            <h2 className="mb-4 text-base font-semibold">Filters</h2>
            <VehicleFilters query={query} onChange={update} onReset={reset} />
          </div>
        </aside>
        <div id="inventory-results">
          {page.total === 0 ? (
            <InventoryEmptyState message={conflict} onReset={reset} />
          ) : page.outOfRange ? (
            <InventoryEmptyState
              message="There are matches, but not on this page number."
              onReset={() => update({ page: 1 }, { resetPage: false })}
            />
          ) : (
            <VehicleGrid vehicles={page.items} />
          )}
          {page.total > 0 && !page.outOfRange && page.pageCount > 1 ? (
            <nav className="mt-8 flex flex-wrap items-center gap-2" aria-label="Pagination">
              <PageLink query={query} page={query.page - 1} disabled={query.page <= 1}>
                Previous
              </PageLink>
              {Array.from({ length: page.pageCount }, (_, index) => index + 1).map((pageNumber) => (
                <PageLink key={pageNumber} query={query} page={pageNumber} current={pageNumber === query.page}>
                  {pageNumber}
                </PageLink>
              ))}
              <PageLink query={query} page={query.page + 1} disabled={query.page >= page.pageCount}>
                Next
              </PageLink>
            </nav>
          ) : null}
        </div>
      </div>

      {filtersOpen ? (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button type="button" className="absolute inset-0 bg-ink/50" aria-label="Close filters" onClick={() => setFiltersOpen(false)} />
          <div
            id="mobile-filters"
            role="dialog"
            aria-modal="true"
            aria-label="Vehicle filters"
            className="absolute inset-y-0 right-0 flex w-[min(100%,24rem)] flex-col bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-line px-4 py-4">
              <h2 className="text-base font-semibold">Filters</h2>
              <button type="button" className="h-11 rounded-full border border-line px-4 text-sm" onClick={() => setFiltersOpen(false)}>
                Close
              </button>
            </div>
            <div className="flex-1 overflow-auto px-4 py-4">
              <VehicleFilters query={query} onChange={update} onReset={reset} idPrefix="mobile-filter" />
            </div>
            <div className="border-t border-line p-4">
              <button
                type="button"
                className="h-11 w-full rounded-full bg-ink text-sm font-medium text-white"
                onClick={() => setFiltersOpen(false)}
              >
                Show {page.total} vehicles
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </Container>
  );
}

function PageLink({
  query,
  page,
  current,
  disabled,
  children,
}: {
  query: VehicleQuery;
  page: number;
  current?: boolean;
  disabled?: boolean;
  children: ReactNode;
}) {
  const className = current
    ? "inline-flex h-10 min-w-10 items-center justify-center rounded-full bg-ink px-3 text-sm text-white"
    : "inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-line px-3 text-sm hover:border-ink";

  if (disabled) {
    return <span className="inline-flex h-10 items-center px-3 text-sm text-muted">{children}</span>;
  }

  const href = inventoryHref({ ...query, page });
  return (
    <Link href={href} aria-current={current ? "page" : undefined} className={className} scroll>
      {children}
    </Link>
  );
}

function activeChips(query: VehicleQuery) {
  const chips: Array<{ key: keyof VehicleQuery; label: string; clear: string | number }> = [];
  if (query.q) chips.push({ key: "q", label: `Search: ${query.q}`, clear: "" });
  if (query.make) chips.push({ key: "make", label: query.make, clear: "" });
  if (query.model) chips.push({ key: "model", label: query.model, clear: "" });
  if (query.condition) chips.push({ key: "condition", label: conditionLabel(query.condition), clear: "" });
  if (query.bodyType) chips.push({ key: "bodyType", label: query.bodyType === "Luxury" ? "Luxury vehicles" : query.bodyType, clear: "" });
  if (query.minPrice && toNumber(query.minPrice) != null) chips.push({ key: "minPrice", label: `From ${formatCurrency(toNumber(query.minPrice) ?? 0)}`, clear: "" });
  if (query.maxPrice && toNumber(query.maxPrice) != null) chips.push({ key: "maxPrice", label: `Up to ${formatCurrency(toNumber(query.maxPrice) ?? 0)}`, clear: "" });
  if (query.minYear) chips.push({ key: "minYear", label: `From ${query.minYear}`, clear: "" });
  if (query.maxYear) chips.push({ key: "maxYear", label: `Until ${query.maxYear}`, clear: "" });
  if (query.transmission) chips.push({ key: "transmission", label: query.transmission, clear: "" });
  if (query.fuelType) chips.push({ key: "fuelType", label: query.fuelType, clear: "" });
  if (query.minMileage) chips.push({ key: "minMileage", label: `From ${query.minMileage} km`, clear: "" });
  if (query.maxMileage) chips.push({ key: "maxMileage", label: `Up to ${query.maxMileage} km`, clear: "" });
  return chips.filter((chip) => hasActiveFilters(query) || chip.key);
}
