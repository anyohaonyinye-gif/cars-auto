import type { BodyFilter, Vehicle, VehicleCondition } from "@/types/vehicle";

export const SORT_OPTIONS = [
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "year-desc", label: "Newest model year" },
  { value: "year-asc", label: "Oldest model year" },
  { value: "mileage-asc", label: "Lowest mileage" },
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number]["value"];

export type VehicleQuery = {
  q: string;
  make: string;
  model: string;
  condition: "" | VehicleCondition;
  bodyType: "" | BodyFilter;
  minPrice: string;
  maxPrice: string;
  minYear: string;
  maxYear: string;
  transmission: string;
  fuelType: string;
  minMileage: string;
  maxMileage: string;
  sort: SortOption;
  page: number;
};

export const PAGE_SIZE = 9;

export function emptyQuery(): VehicleQuery {
  return {
    q: "",
    make: "",
    model: "",
    condition: "",
    bodyType: "",
    minPrice: "",
    maxPrice: "",
    minYear: "",
    maxYear: "",
    transmission: "",
    fuelType: "",
    minMileage: "",
    maxMileage: "",
    sort: "year-desc",
    page: 1,
  };
}

const sortValues = new Set<string>(SORT_OPTIONS.map((option) => option.value));
const conditions = new Set(["new", "used"]);
const bodyFilters = new Set(["SUV", "Sedan", "Hatchback", "Pickup", "Crossover", "Luxury"]);

function first(value: string | null) {
  return value?.trim() ?? "";
}

export function toNumber(value: string) {
  if (!value.trim()) return undefined;
  if (!/^\d+(\.\d+)?$/.test(value.trim())) return undefined;
  const number = Number(value);
  if (!Number.isFinite(number) || number < 0) return undefined;
  return number;
}

export function queryFromSearchParams(params: URLSearchParams): VehicleQuery {
  const base = emptyQuery();
  const condition = first(params.get("condition"));
  const bodyType = first(params.get("bodyType"));
  const sort = first(params.get("sort"));
  const page = Number(first(params.get("page")));

  return {
    ...base,
    q: first(params.get("q")),
    make: first(params.get("make")),
    model: first(params.get("model")),
    condition: conditions.has(condition) ? (condition as VehicleCondition) : "",
    bodyType: bodyFilters.has(bodyType) ? (bodyType as BodyFilter) : "",
    minPrice: first(params.get("minPrice")),
    maxPrice: first(params.get("maxPrice")),
    minYear: first(params.get("minYear")),
    maxYear: first(params.get("maxYear")),
    transmission: first(params.get("transmission")),
    fuelType: first(params.get("fuelType")),
    minMileage: first(params.get("minMileage")),
    maxMileage: first(params.get("maxMileage")),
    sort: sortValues.has(sort) ? (sort as SortOption) : "year-desc",
    page: Number.isInteger(page) && page > 0 ? page : 1,
  };
}

export function searchParamsFromQuery(query: VehicleQuery) {
  const params = new URLSearchParams();
  const entries: Array<[string, string]> = [
    ["q", query.q],
    ["make", query.make],
    ["model", query.model],
    ["condition", query.condition],
    ["bodyType", query.bodyType],
    ["minPrice", query.minPrice],
    ["maxPrice", query.maxPrice],
    ["minYear", query.minYear],
    ["maxYear", query.maxYear],
    ["transmission", query.transmission],
    ["fuelType", query.fuelType],
    ["minMileage", query.minMileage],
    ["maxMileage", query.maxMileage],
  ];

  entries.forEach(([key, value]) => {
    if (value.trim()) params.set(key, value.trim());
  });

  if (query.sort !== "year-desc") params.set("sort", query.sort);
  if (query.page > 1) params.set("page", String(query.page));
  return params;
}

export function inventoryHref(query: VehicleQuery) {
  const params = searchParamsFromQuery(query);
  const value = params.toString();
  return value ? `/inventory?${value}` : "/inventory";
}

export function rangeConflicts(query: VehicleQuery) {
  const minPrice = toNumber(query.minPrice);
  const maxPrice = toNumber(query.maxPrice);
  const minYear = toNumber(query.minYear);
  const maxYear = toNumber(query.maxYear);
  const minMileage = toNumber(query.minMileage);
  const maxMileage = toNumber(query.maxMileage);

  return {
    price: minPrice != null && maxPrice != null && minPrice > maxPrice,
    year: minYear != null && maxYear != null && minYear > maxYear,
    mileage: minMileage != null && maxMileage != null && minMileage > maxMileage,
  };
}

export function invalidNumberFields(query: VehicleQuery) {
  const checks: Array<[string, string]> = [
    ["minPrice", "Minimum price"],
    ["maxPrice", "Maximum price"],
    ["minYear", "Minimum year"],
    ["maxYear", "Maximum year"],
    ["minMileage", "Minimum mileage"],
    ["maxMileage", "Maximum mileage"],
  ];

  return checks.flatMap(([key, label]) => {
    const raw = query[key as keyof VehicleQuery];
    if (typeof raw !== "string" || !raw.trim() || toNumber(raw) != null) return [];
    return [`${label} must be a number that is zero or higher.`];
  });
}

export function filterVehicles(list: Vehicle[], query: VehicleQuery) {
  const conflicts = rangeConflicts(query);
  const minPrice = toNumber(query.minPrice);
  const maxPrice = toNumber(query.maxPrice);
  const minYear = toNumber(query.minYear);
  const maxYear = toNumber(query.maxYear);
  const minMileage = toNumber(query.minMileage);
  const maxMileage = toNumber(query.maxMileage);
  const keyword = query.q.trim().toLowerCase();

  return list.filter((vehicle) => {
    if (keyword) {
      const haystack = [
        vehicle.make,
        vehicle.model,
        vehicle.trim,
        vehicle.year,
        vehicle.stockNumber,
        vehicle.bodyType,
        vehicle.fuelType,
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(keyword)) return false;
    }

    if (query.make && vehicle.make !== query.make) return false;
    if (query.model && vehicle.model !== query.model) return false;
    if (query.condition && vehicle.condition !== query.condition) return false;
    if (query.bodyType === "Luxury" && !vehicle.luxury) return false;
    if (query.bodyType && query.bodyType !== "Luxury" && vehicle.bodyType !== query.bodyType) return false;
    if (query.transmission && vehicle.transmission !== query.transmission) return false;
    if (query.fuelType && vehicle.fuelType !== query.fuelType) return false;
    if (conflicts.price || conflicts.year || conflicts.mileage) return false;
    if (minPrice != null && vehicle.price < minPrice) return false;
    if (maxPrice != null && vehicle.price > maxPrice) return false;
    if (minYear != null && vehicle.year < minYear) return false;
    if (maxYear != null && vehicle.year > maxYear) return false;
    if (minMileage != null && vehicle.mileage < minMileage) return false;
    if (maxMileage != null && vehicle.mileage > maxMileage) return false;
    return true;
  });
}

export function sortVehicles(list: Vehicle[], sort: SortOption) {
  const copy = [...list];
  const byName = (a: Vehicle, b: Vehicle) =>
    a.make.localeCompare(b.make) || a.model.localeCompare(b.model);

  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price || byName(a, b));
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price || byName(a, b));
    case "year-asc":
      return copy.sort((a, b) => a.year - b.year || byName(a, b));
    case "mileage-asc":
      return copy.sort((a, b) => a.mileage - b.mileage || b.year - a.year);
    case "year-desc":
    default:
      return copy.sort((a, b) => b.year - a.year || byName(a, b));
  }
}

export function paginate<T>(items: T[], page: number, pageSize = PAGE_SIZE) {
  const total = items.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const current = page > 0 ? page : 1;
  const start = (current - 1) * pageSize;

  return {
    page: current,
    pageCount,
    total,
    items: items.slice(start, start + pageSize),
    from: total === 0 || start >= total ? 0 : start + 1,
    to: Math.min(start + pageSize, total),
    outOfRange: total > 0 && start >= total,
  };
}

export function hasActiveFilters(query: VehicleQuery) {
  const { sort, page, ...filters } = query;
  void sort;
  void page;
  return Object.values(filters).some((value) => String(value).trim() !== "");
}
