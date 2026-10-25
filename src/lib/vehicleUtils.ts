import { vehicles } from "@/data/vehicles";
import type { Vehicle } from "@/types/vehicle";
import { bodyTypes } from "@/types/vehicle";

export function getVehicleBySlug(slug: string) {
  return vehicles.find((vehicle) => vehicle.slug === slug);
}

export function getFeaturedVehicles() {
  return vehicles.filter((vehicle) => vehicle.featured);
}

export function getMakes() {
  return [...new Set(vehicles.map((vehicle) => vehicle.make))].sort((a, b) => a.localeCompare(b));
}

export function getModels(make?: string) {
  return [
    ...new Set(
      vehicles
        .filter((vehicle) => !make || vehicle.make === make)
        .map((vehicle) => vehicle.model),
    ),
  ].sort((a, b) => a.localeCompare(b));
}

export function getTransmissions() {
  return [...new Set(vehicles.map((vehicle) => vehicle.transmission))].sort((a, b) =>
    a.localeCompare(b),
  );
}

export function getFuelTypes() {
  return [...new Set(vehicles.map((vehicle) => vehicle.fuelType))].sort((a, b) =>
    a.localeCompare(b),
  );
}

export function countByMake(make: string) {
  return vehicles.filter((vehicle) => vehicle.make === make).length;
}

export function countByModel(make: string, model: string) {
  return vehicles.filter((vehicle) => vehicle.make === make && vehicle.model === model).length;
}

export function countByBody(bodyType: string) {
  if (bodyType === "Luxury") return vehicles.filter((vehicle) => vehicle.luxury).length;
  return vehicles.filter((vehicle) => vehicle.bodyType === bodyType).length;
}

export function getBodyFilters() {
  const available = bodyTypes.filter((type) => vehicles.some((vehicle) => vehicle.bodyType === type));
  if (vehicles.some((vehicle) => vehicle.luxury)) return [...available, "Luxury" as const];
  return available;
}

export function conditionLabel(condition: Vehicle["condition"]) {
  return condition === "new" ? "Brand new" : "Fairly used";
}

export function vehicleTitle(vehicle: Pick<Vehicle, "year" | "make" | "model">) {
  return `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
}

export function getRelatedVehicles(vehicle: Vehicle, limit = 3) {
  return vehicles
    .filter((candidate) => candidate.id !== vehicle.id)
    .map((candidate) => {
      let score = 0;
      if (candidate.bodyType === vehicle.bodyType) score += 3;
      if (candidate.make === vehicle.make) score += 2;
      if (candidate.luxury === vehicle.luxury) score += 1;
      const delta = Math.abs(candidate.price - vehicle.price) / Math.max(vehicle.price, 1);
      if (delta <= 0.3) score += 2;
      return { candidate, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.candidate.price - b.candidate.price)
    .slice(0, limit)
    .map((entry) => entry.candidate);
}

export function modelsForMake(make: string) {
  const models = vehicles
    .filter((vehicle) => vehicle.make === make)
    .reduce<Map<string, number>>((map, vehicle) => {
      map.set(vehicle.model, (map.get(vehicle.model) ?? 0) + 1);
      return map;
    }, new Map());

  return [...models.entries()]
    .map(([model, count]) => ({ model, count }))
    .sort((a, b) => a.model.localeCompare(b.model));
}
