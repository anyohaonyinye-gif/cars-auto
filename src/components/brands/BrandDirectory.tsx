"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { brands } from "@/data/brands";
import { countByMake, modelsForMake } from "@/lib/vehicleUtils";

export function BrandDirectory() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () => brands.filter((brand) => brand.name.toLowerCase().includes(query.trim().toLowerCase())),
    [query],
  );

  return (
    <div>
      <label htmlFor="brand-search" className="text-sm font-medium">
        Search brands
      </label>
      <input
        id="brand-search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search by manufacturer"
        className="mt-2 h-11 w-full max-w-md rounded-lg border border-line px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focusring"
      />
      {filtered.length === 0 ? (
        <p className="mt-8 text-sm text-muted" role="status">
          No brands match that search.
        </p>
      ) : (
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {filtered.map((brand) => {
            const count = countByMake(brand.name);
            const models = modelsForMake(brand.name);
            return (
              <li key={brand.name} className="rounded-2xl border border-line p-5">
                <div className="flex items-start gap-4">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-ink text-sm font-semibold text-gold" aria-hidden="true">
                    {brand.monogram}
                  </span>
                  <div>
                    <h2 className="text-xl font-semibold">{brand.name}</h2>
                    <p className="mt-1 text-sm text-muted">
                      {count === 0 ? "No sample vehicles" : `${count} sample ${count === 1 ? "vehicle" : "vehicles"}`}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-muted">{brand.description}</p>
                {models.length > 0 ? (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {models.map((model) => (
                      <li key={model.model}>
                        <Link
                          href={`/inventory?make=${encodeURIComponent(brand.name)}&model=${encodeURIComponent(model.model)}`}
                          className="inline-flex min-h-9 items-center rounded-full border border-line px-3 text-sm hover:border-ink"
                        >
                          {model.model} ({model.count})
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
                <Link
                  href={count === 0 ? "/inventory" : `/inventory?make=${encodeURIComponent(brand.name)}`}
                  className="mt-5 inline-flex text-sm font-medium underline underline-offset-4"
                >
                  {count === 0 ? "View inventory" : `View ${brand.name} vehicles`}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
