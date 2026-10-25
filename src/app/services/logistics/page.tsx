import { ContactCard } from "@/components/contact/ContactCard";
import { LogisticsForm } from "@/components/forms/LogisticsForm";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Logistics and import",
  description:
    "Enquire with Cars Auto about vehicle import and logistics. Customs charges, shipping costs, and delivery dates are not quoted on this website.",
  path: "/services/logistics",
});

export default function LogisticsPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Logistics and import assistance"
        description="Describe the vehicle, budget, and any country preference. Cars Auto can discuss whether import help is possible for that request."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Logistics" },
        ]}
      />
      <Container className="grid gap-10 py-14 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div>
          <p className="max-w-3xl text-sm leading-6 text-muted">
            This page does not publish customs charges, shipping costs, exchange rates, or guaranteed delivery dates. Those depend on the vehicle, the route, and the rules in force at the time, and they are confirmed outside the website.
          </p>
          <div className="mt-8">
            <LogisticsForm />
          </div>
        </div>
        <ContactCard />
      </Container>
    </>
  );
}
