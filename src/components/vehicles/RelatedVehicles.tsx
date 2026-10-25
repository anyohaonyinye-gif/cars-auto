import type { Vehicle } from "@/types/vehicle";
import { VehicleCard } from "@/components/vehicles/VehicleCard";

export function RelatedVehicles({ vehicles }: { vehicles: Vehicle[] }) {
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-semibold tracking-tight">Related demonstration vehicles</h2>
      {vehicles.length === 0 ? (
        <p className="mt-3 text-sm text-muted">No related sample vehicles are available for this listing.</p>
      ) : (
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      )}
    </section>
  );
}
