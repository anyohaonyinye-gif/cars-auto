import { ContactCard } from "@/components/contact/ContactCard";
import { VehicleSelectionForm } from "@/components/forms/VehicleSelectionForm";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Vehicle selection",
  description:
    "Describe the vehicle you want and send a selection or sourcing enquiry to Cars Auto in Accra.",
  path: "/services/vehicle-selection",
});

export default function VehicleSelectionPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Vehicle selection and sourcing"
        description="Tell Cars Auto what you are looking for. The team can respond about vehicles in the conversation, including cars that are not listed on the website."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Vehicle selection" },
        ]}
      />
      <Container className="grid gap-10 py-14 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div>
          <div className="max-w-3xl space-y-4 text-sm leading-6 text-muted">
            <p>
              Use the form for a make, model, budget, vehicle type, transmission, fuel type, and the way you plan to use the car. Other specifications can go in the message.
            </p>
            <p id="sourcing">
              Sourcing is part of the same enquiry. If the vehicle is not in the demonstration inventory, say so. Cars Auto will tell you whether they can help look. A request is not a confirmed order.
            </p>
          </div>
          <div className="mt-8">
            <VehicleSelectionForm />
          </div>
        </div>
        <ContactCard />
      </Container>
    </>
  );
}
