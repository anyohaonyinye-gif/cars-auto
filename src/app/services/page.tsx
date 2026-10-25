import Link from "next/link";
import { services } from "@/data/services";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Dealership services",
  description:
    "Vehicle selection, sourcing, trade-in, logistics, after-sales, and modification enquiries with Cars Auto in Accra.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Services you can enquire about"
        description="These pages explain how to ask for help. They do not confirm pricing, warranty cover, shipping costs, or that a modification is available."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services" },
        ]}
      />
      <Container className="grid gap-4 py-14 md:grid-cols-2">
        {services.map((service) => (
          <article key={service.slug} className="rounded-2xl border border-line p-6">
            <h2 className="text-xl font-semibold">{service.title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted">{service.summary}</p>
            <Link href={service.href} className="mt-5 inline-flex text-sm font-medium underline underline-offset-4">
              Open this service
            </Link>
          </article>
        ))}
      </Container>
    </>
  );
}
