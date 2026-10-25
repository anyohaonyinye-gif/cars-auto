import Link from "next/link";
import { brands } from "@/data/brands";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { countByMake } from "@/lib/vehicleUtils";

export function BrandDirectoryPreview() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Manufacturers"
          title="Browse by brand"
          description="These names organise the sample catalogue. A count is shown only when matching demonstration vehicles exist."
          action={
            <Link href="/brands" className="text-sm font-medium underline underline-offset-4">
              All brands
            </Link>
          }
        />
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {brands.map((brand) => {
            const count = countByMake(brand.name);
            return (
              <li key={brand.name}>
                <Link
                  href={`/inventory?make=${encodeURIComponent(brand.name)}`}
                  className="flex h-full items-center gap-3 rounded-2xl border border-line px-4 py-4 hover:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focusring"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-canvas text-xs font-semibold tracking-wide" aria-hidden="true">
                    {brand.monogram}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">{brand.name}</span>
                    <span className="mt-1 block text-xs text-muted">
                      {count === 0 ? "No sample vehicles" : `${count} sample ${count === 1 ? "vehicle" : "vehicles"}`}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
