import { ContactCard } from "@/components/contact/ContactCard";
import { TradeInForm } from "@/components/forms/TradeInForm";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Trade-in enquiry",
  description:
    "Send Cars Auto the details of a vehicle you want reviewed for a possible trade-in. No trade-in price is guaranteed online.",
  path: "/services/trade-in",
});

export default function TradeInPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Trade-in enquiry"
        description="Share the vehicle you have now and, if you want, the one you would like to consider next. Cars Auto reviews the information before discussing any value."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Trade-in" },
        ]}
      />
      <Container className="grid gap-10 py-14 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div>
          <p className="max-w-3xl rounded-xl border border-line bg-canvas px-4 py-3 text-sm leading-6">
            An expected price is optional. Submitting this form does not create a guaranteed trade-in offer, and the dealership must review the vehicle before confirming any figure.
          </p>
          <div className="mt-8">
            <TradeInForm />
          </div>
        </div>
        <ContactCard />
      </Container>
    </>
  );
}
