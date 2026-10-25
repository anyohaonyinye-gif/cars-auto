import { SORT_OPTIONS, type SortOption } from "@/lib/vehicleFilters";

export function VehicleSort({ value, onChange }: { value: SortOption; onChange: (value: SortOption) => void }) {
  return (
    <div className="min-w-0">
      <label htmlFor="inventory-sort" className="mb-1.5 block text-sm font-medium">
        Sort
      </label>
      <select
        id="inventory-sort"
        className="h-11 w-full rounded-lg border border-line bg-white px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focusring sm:w-56"
        value={value}
        onChange={(event) => onChange(event.target.value as SortOption)}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
