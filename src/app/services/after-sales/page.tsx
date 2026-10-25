import { ContactCard } from "@/components/contact/ContactCard";
import { AfterSalesForm } from "@/components/forms/AfterSalesForm";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "After-sales support",
  description:
    "Send Cars Auto an after-sales question about servicing, parts, or ownership. Warranty cover is not promised on this website.",
  path: "/services/after-sales",
});

export default function AfterSalesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="After-sales support"
        description="Use this form for a question about a vehicle you already have. Cars Auto will tell you what support can be discussed."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "After-sales" },
        ]}
      />
      <Container className="grid gap-10 py-14 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div>
          <p className="max-w-3xl text-sm leading-6 text-muted">
            Warranty coverage and free servicing are not offered by this page. If a vehicle has cover, the dealership confirms the terms directly.
          </p>
          <div className="mt-8">
            <AfterSalesForm />
          </div>
        </div>
        <ContactCard />
      </Container>
    </>
  );
}
