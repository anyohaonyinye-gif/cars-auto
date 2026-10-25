import { ContactCard } from "@/components/contact/ContactCard";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { enquirySubjects } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Cars Auto",
  description:
    "Contact Cars Auto in Accra by email, hotline, or WhatsApp. Boundary Road, 10 Blackberry Street.",
  path: "/contact",
});

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ContactPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const subject = typeof params.subject === "string" ? params.subject : "";
  const vehicle = typeof params.vehicle === "string" ? params.vehicle : "";
  const safeSubject = enquirySubjects.some((item) => item.value === subject) ? subject : "";

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Contact Cars Auto"
        description="Email, call, or WhatsApp the dealership, or prepare an enquiry on this page. The form does not send email by itself."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
      />
      <Container className="grid gap-10 py-14 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Send an enquiry</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
            Required fields are marked. If the details are valid, you can choose to open WhatsApp with the message. Cars Auto does not receive the form unless you send it that way, because no inbox is connected.
          </p>
          <div className="mt-8">
            <ContactForm defaultSubject={safeSubject} defaultVehicle={vehicle} />
          </div>
        </div>
        <ContactCard />
      </Container>
    </>
  );
}
