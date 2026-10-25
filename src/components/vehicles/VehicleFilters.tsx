"use client";

import { getBodyFilters, getFuelTypes, getMakes, getModels, getTransmissions } from "@/lib/vehicleUtils";
import { rangeConflicts, toNumber, type VehicleQuery } from "@/lib/vehicleFilters";
import { cn } from "@/lib/cn";

const inputClass =
  "h-11 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focusring";

export function VehicleFilters({
  query,
  onChange,
  onReset,
  idPrefix = "filter",
}: {
  query: VehicleQuery;
  onChange: (patch: Partial<VehicleQuery>) => void;
  onReset: () => void;
  idPrefix?: string;
}) {
  const conflicts = rangeConflicts(query);
  const models = getModels(query.make || undefined);

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => event.preventDefault()}
      aria-label="Vehicle filters"
    >
      <Select
        id={`${idPrefix}-make`}
        label="Make"
        value={query.make}
        onChange={(make) => onChange({ make })}
        options={getMakes().map((make) => ({ value: make, label: make }))}
      />
      <Select
        id={`${idPrefix}-model`}
        label="Model"
        value={query.model}
        onChange={(model) => onChange({ model })}
        options={models.map((model) => ({ value: model, label: model }))}
      />
      <Select
        id={`${idPrefix}-condition`}
        label="Condition"
        value={query.condition}
        onChange={(condition) => onChange({ condition: condition as VehicleQuery["condition"] })}
        options={[
          { value: "new", label: "Brand new" },
          { value: "used", label: "Fairly used" },
        ]}
      />
      <Select
        id={`${idPrefix}-body`}
        label="Body type"
        value={query.bodyType}
        onChange={(bodyType) => onChange({ bodyType: bodyType as VehicleQuery["bodyType"] })}
        options={getBodyFilters().map((type) => ({
          value: type,
          label: type === "Luxury" ? "Luxury vehicles" : type === "Pickup" ? "Pickup trucks" : `${type}s`,
        }))}
      />
      <NumberPair
        minId={`${idPrefix}-min-price`}
        maxId={`${idPrefix}-max-price`}
        minLabel="Minimum price (GHS)"
        maxLabel="Maximum price (GHS)"
        minValue={query.minPrice}
        maxValue={query.maxPrice}
        onMin={(minPrice) => onChange({ minPrice })}
        onMax={(maxPrice) => onChange({ maxPrice })}
        invalid={conflicts.price}
        invalidMessage="Minimum price is higher than maximum price, so no vehicles can match."
        badMin={Boolean(query.minPrice) && toNumber(query.minPrice) == null}
        badMax={Boolean(query.maxPrice) && toNumber(query.maxPrice) == null}
      />
      <NumberPair
        minId={`${idPrefix}-min-year`}
        maxId={`${idPrefix}-max-year`}
        minLabel="Minimum year"
        maxLabel="Maximum year"
        minValue={query.minYear}
        maxValue={query.maxYear}
        onMin={(minYear) => onChange({ minYear })}
        onMax={(maxYear) => onChange({ maxYear })}
        invalid={conflicts.year}
        invalidMessage="Minimum year is higher than maximum year, so no vehicles can match."
        badMin={Boolean(query.minYear) && toNumber(query.minYear) == null}
        badMax={Boolean(query.maxYear) && toNumber(query.maxYear) == null}
      />
      <Select
        id={`${idPrefix}-transmission`}
        label="Transmission"
        value={query.transmission}
        onChange={(transmission) => onChange({ transmission })}
        options={getTransmissions().map((item) => ({ value: item, label: item }))}
      />
      <Select
        id={`${idPrefix}-fuel`}
        label="Fuel type"
        value={query.fuelType}
        onChange={(fuelType) => onChange({ fuelType })}
        options={getFuelTypes().map((item) => ({ value: item, label: item }))}
      />
      <NumberPair
        minId={`${idPrefix}-min-mileage`}
        maxId={`${idPrefix}-max-mileage`}
        minLabel="Minimum mileage (km)"
        maxLabel="Maximum mileage (km)"
        minValue={query.minMileage}
        maxValue={query.maxMileage}
        onMin={(minMileage) => onChange({ minMileage })}
        onMax={(maxMileage) => onChange({ maxMileage })}
        invalid={conflicts.mileage}
        invalidMessage="Minimum mileage is higher than maximum mileage, so no vehicles can match."
        badMin={Boolean(query.minMileage) && toNumber(query.minMileage) == null}
        badMax={Boolean(query.maxMileage) && toNumber(query.maxMileage) == null}
      />
      <button
        type="button"
        onClick={onReset}
        className="h-11 w-full rounded-full border border-line text-sm font-medium hover:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focusring"
      >
        Reset filters
      </button>
    </form>
  );
}

function Select({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      <select id={id} className={inputClass} value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">Any</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function NumberPair({
  minId,
  maxId,
  minLabel,
  maxLabel,
  minValue,
  maxValue,
  onMin,
  onMax,
  invalid,
  invalidMessage,
  badMin,
  badMax,
}: {
  minId: string;
  maxId: string;
  minLabel: string;
  maxLabel: string;
  minValue: string;
  maxValue: string;
  onMin: (value: string) => void;
  onMax: (value: string) => void;
  invalid: boolean;
  invalidMessage: string;
  badMin: boolean;
  badMax: boolean;
}) {
  return (
    <fieldset>
      <div className="grid grid-cols-2 gap-3">
        <NumberField id={minId} label={minLabel} value={minValue} onChange={onMin} invalid={badMin || invalid} />
        <NumberField id={maxId} label={maxLabel} value={maxValue} onChange={onMax} invalid={badMax || invalid} />
      </div>
      {badMin || badMax ? (
        <p className="mt-1.5 text-sm text-danger" role="alert">
          Enter a number that is zero or higher.
        </p>
      ) : null}
      {invalid ? (
        <p className={cn("text-sm text-danger", badMin || badMax ? "mt-1" : "mt-1.5")} role="alert">
          {invalidMessage}
        </p>
      ) : null}
    </fieldset>
  );
}

function NumberField({
  id,
  label,
  value,
  onChange,
  invalid,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  invalid: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        inputMode="numeric"
        className={cn(inputClass, invalid && "border-danger")}
        value={value}
        aria-invalid={invalid}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
