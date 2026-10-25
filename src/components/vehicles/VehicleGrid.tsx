import type { Vehicle } from "@/types/vehicle";
import { VehicleCard } from "@/components/vehicles/VehicleCard";

export function VehicleGrid({ vehicles }: { vehicles: Vehicle[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {vehicles.map((vehicle, index) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} priority={index < 3} />
      ))}
    </div>
  );
}
