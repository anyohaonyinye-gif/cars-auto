import Link from "next/link";
import { Car, RefreshCw, Route, Search, Settings, Wrench } from "lucide-react";
import { services } from "@/data/services";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons = {
  "vehicle-selection": Car,
  sourcing: Search,
  "trade-in": RefreshCw,
  logistics: Route,
  "after-sales": Wrench,
  modifications: Settings,
} as const;

export function ServicesOverview() {
  return (
    <section className="bg-canvas py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Services"
          title="How Cars Auto can help"
          description="Each service is a way to start a conversation. Outcomes are confirmed by the dealership, not by this website."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => {
            const Icon = icons[service.slug as keyof typeof icons] ?? Car;
            return (
              <article key={service.slug} className="flex h-full flex-col rounded-2xl border border-line bg-white p-5">
                <span className="grid h-11 w-11 place-items-center rounded-full border border-line">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-muted">{service.summary}</p>
                <Link href={service.href} className="mt-4 text-sm font-medium underline underline-offset-4">
                  Learn more
                </Link>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
