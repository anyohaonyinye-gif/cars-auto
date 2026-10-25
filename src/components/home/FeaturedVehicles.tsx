import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { DemoNotice } from "@/components/ui/DemoNotice";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { getFeaturedVehicles } from "@/lib/vehicleUtils";

export function FeaturedVehicles() {
  const featured = getFeaturedVehicles();

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Inventory"
          title="Featured vehicles"
          description="A selection of demonstration listings marked as featured. Prices and specifications are sample data."
          action={
            <Link href="/inventory" className="text-sm font-medium text-ink underline underline-offset-4">
              View all vehicles
            </Link>
          }
        />
        <DemoNotice className="mt-6" />
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((vehicle, index) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} priority={index === 0} />
          ))}
        </div>
      </Container>
    </section>
  );
}
