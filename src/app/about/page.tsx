import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Cars Auto",
  description:
    "Cars Auto is an Accra dealership helping customers explore brand-new and fairly used vehicles and enquire directly about selection, sourcing, and trade-ins.",
  path: "/about",
});

const sections = [
  {
    title: "Mission",
    text: "Help people compare vehicles with clear information and a direct line to the dealership, whether they are looking at a brand-new car or a fairly used one.",
  },
  {
    title: "Vision",
    text: "A straightforward place in Accra to explore cars and to ask for help when the right vehicle is not already listed.",
  },
  {
    title: "Customer service",
    text: "Enquiries are handled as conversations. The website can prepare a message, and Cars Auto confirms availability, viewing, and purchase arrangements.",
  },
  {
    title: "Vehicle selection",
    text: "Customers can share a budget, body type, transmission, and intended use so the team can talk through suitable options.",
  },
  {
    title: "Sourcing support",
    text: "If a preferred vehicle is not in the catalogue, Cars Auto can be asked to look. The website does not promise that every request can be sourced.",
  },
  {
    title: "Trade-in assistance",
    text: "A current vehicle can be described for review. Any value is discussed after that review and is not guaranteed by an online form.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A dealership focused on the next conversation"
        description="Cars Auto sells brand-new and fairly used vehicles from Boundary Road, 10 Blackberry Street, Accra. This website is the public place to browse sample listings and start an enquiry."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "About" },
        ]}
      />
      <Container className="py-14">
        <div className="max-w-3xl space-y-5 text-base leading-7 text-muted">
          <p>
            Cars Auto works with customers who want a clearer path from looking at a car to speaking with someone about it. The inventory on this site shows how listings, filters, and enquiry actions fit together. The vehicles themselves are demonstration records.
          </p>
          <p>
            There is one published address, one hotline, and one WhatsApp number. Opening hours, staff profiles, awards, and customer totals are not stated here because they were not supplied.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {sections.map((section) => (
            <article key={section.title} className="rounded-2xl border border-line p-5">
              <h2 className="text-xl font-semibold">{section.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted">{section.text}</p>
            </article>
          ))}
        </div>
        <div className="mt-12 rounded-2xl bg-ink px-6 py-8 text-white sm:px-8">
          <h2 className="text-2xl font-semibold">Talk with the team</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">
            Ask about a listing, a vehicle you cannot find, or a trade-in. Cars Auto will confirm what can be discussed.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/contact" variant="inverse">
              Contact Cars Auto
            </Button>
            <Button href="/inventory" variant="inverseSecondary">
              Explore inventory
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}
