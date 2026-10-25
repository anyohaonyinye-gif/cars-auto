import type { Vehicle } from "@/types/vehicle";
import { conditionLabel } from "@/lib/vehicleUtils";
import { formatCurrency, formatMileage } from "@/lib/formatCurrency";

export function VehicleSpecifications({ vehicle }: { vehicle: Vehicle }) {
  const rows = [
    ["Make", vehicle.make],
    ["Model", vehicle.model],
    ["Year", String(vehicle.year)],
    ["Trim", vehicle.trim],
    ["Condition", conditionLabel(vehicle.condition)],
    ["Price", formatCurrency(vehicle.price, vehicle.currency)],
    ["Mileage", formatMileage(vehicle.mileage)],
    ["Transmission", vehicle.transmission],
    ["Fuel type", vehicle.fuelType],
    ["Body type", vehicle.bodyType],
    ["Engine capacity", vehicle.engineCapacity],
    ["Drivetrain", vehicle.drivetrain],
    ["Exterior color", vehicle.exteriorColor],
    ["Interior color", vehicle.interiorColor],
    ["Stock reference", vehicle.stockNumber],
    ["Listing status", vehicle.availability],
  ].filter((row): row is [string, string] => Boolean(row[1]));

  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight">Specifications</h2>
      <dl className="mt-4 divide-y divide-line border-y border-line">
        {rows.map(([label, value]) => (
          <div key={label} className="grid gap-1 py-3 sm:grid-cols-[12rem_1fr] sm:gap-4">
            <dt className="text-sm text-muted">{label}</dt>
            <dd className="text-sm font-medium">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
