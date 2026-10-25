"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { getBodyFilters, getFuelTypes, getMakes, getModels, getTransmissions } from "@/lib/vehicleUtils";
import { toNumber } from "@/lib/vehicleFilters";

const fieldClass =
  "h-11 w-full rounded-lg border border-line bg-white px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focusring";

export function VehicleSearch() {
  const router = useRouter();
  const [make, setMake] = useState("");
  const [error, setError] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const params = new URLSearchParams();
    for (const [key, value] of data.entries()) {
      const text = String(value).trim();
      if (text) params.set(key, text);
    }

    const ranges: Array<[string, string, string]> = [
      ["minPrice", "maxPrice", "Minimum price cannot be higher than maximum price."],
      ["minYear", "maxYear", "Minimum year cannot be higher than maximum year."],
    ];
    for (const [minKey, maxKey, message] of ranges) {
      const min = toNumber(params.get(minKey) ?? "");
      const max = toNumber(params.get(maxKey) ?? "");
      if (min != null && max != null && min > max) {
        setError(message);
        return;
      }
    }

    setError("");
    const query = params.toString();
    router.push(query ? `/inventory?${query}` : "/inventory");
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-line bg-white p-4 shadow-[0_20px_50px_rgba(8,9,11,0.08)] sm:p-6" aria-label="Search vehicles">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <label className="text-sm font-medium">
          Make
          <select name="make" className={`${fieldClass} mt-1.5`} value={make} onChange={(event) => setMake(event.target.value)}>
            <option value="">Any</option>
            {getMakes().map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium">
          Model
          <select name="model" key={make} className={`${fieldClass} mt-1.5`} defaultValue="">
            <option value="">Any</option>
            {getModels(make || undefined).map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium">
          Condition
          <select name="condition" className={`${fieldClass} mt-1.5`} defaultValue="">
            <option value="">Any</option>
            <option value="new">Brand new</option>
            <option value="used">Fairly used</option>
          </select>
        </label>
        <label className="text-sm font-medium">
          Body type
          <select name="bodyType" className={`${fieldClass} mt-1.5`} defaultValue="">
            <option value="">Any</option>
            {getBodyFilters().map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium">
          Minimum price
          <input name="minPrice" inputMode="numeric" placeholder="GHS" className={`${fieldClass} mt-1.5`} />
        </label>
        <label className="text-sm font-medium">
          Maximum price
          <input name="maxPrice" inputMode="numeric" placeholder="GHS" className={`${fieldClass} mt-1.5`} />
        </label>
        <label className="text-sm font-medium">
          Transmission
          <select name="transmission" className={`${fieldClass} mt-1.5`} defaultValue="">
            <option value="">Any</option>
            {getTransmissions().map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium">
          Fuel type
          <select name="fuelType" className={`${fieldClass} mt-1.5`} defaultValue="">
            <option value="">Any</option>
            {getFuelTypes().map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium">
          Minimum year
          <input name="minYear" inputMode="numeric" placeholder="2018" className={`${fieldClass} mt-1.5`} />
        </label>
        <label className="text-sm font-medium">
          Maximum year
          <input name="maxYear" inputMode="numeric" placeholder="2026" className={`${fieldClass} mt-1.5`} />
        </label>
      </div>
      {error ? (
        <p className="mt-4 text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}
      <div className="mt-5 flex flex-wrap gap-3">
        <button type="submit" className="h-11 rounded-full bg-ink px-5 text-sm font-medium text-white hover:bg-ink-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">
          Search
        </button>
        <button
          type="reset"
          className="h-11 rounded-full border border-line px-5 text-sm font-medium hover:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focusring"
          onClick={() => {
            setMake("");
            setError("");
          }}
        >
          Reset
        </button>
      </div>
    </form>
  );
}
