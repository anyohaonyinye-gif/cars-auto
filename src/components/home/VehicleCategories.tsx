import Image from "next/image";
import Link from "next/link";
import { bodyCategories } from "@/data/categories";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { countByBody } from "@/lib/vehicleUtils";

export function VehicleCategories() {
  return (
    <section className="bg-canvas py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Browse"
          title="Find a body type"
          description="Each category opens the inventory with that filter already applied. Counts come from the demonstration catalogue."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bodyCategories.map((category) => {
            const count = countByBody(category.bodyType);
            return (
              <Link
                key={category.bodyType}
                href={`/inventory?bodyType=${encodeURIComponent(category.bodyType)}`}
                className="group relative min-h-52 overflow-hidden rounded-2xl bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focusring"
              >
                <Image
                  src={category.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/10" />
                <span className="relative flex h-full min-h-52 flex-col justify-end p-5 text-white">
                  <span className="text-xl font-semibold">{category.label}</span>
                  <span className="mt-1 text-sm text-white/80">{category.description}</span>
                  <span className="mt-3 text-sm font-medium">{count} sample {count === 1 ? "vehicle" : "vehicles"}</span>
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
