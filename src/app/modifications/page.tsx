import { ContactCard } from "@/components/contact/ContactCard";
import { ModificationForm } from "@/components/forms/ModificationForm";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { modificationCategories } from "@/data/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Vehicle modifications",
  description:
    "Enquire with Cars Auto about infotainment, cameras, parking assistance, and other vehicle modification requests.",
  path: "/modifications",
});

export default function ModificationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Modifications"
        title="Ask about a vehicle modification"
        description="These categories are topics you can enquire about. Listing them does not mean every upgrade is currently offered."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Modifications" },
        ]}
      />
      <Container className="grid gap-10 py-14 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {modificationCategories.map((item) => (
              <li key={item.value} className="rounded-2xl border border-line px-4 py-4 text-sm font-medium">
                {item.label}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-6 text-muted">
            Describe the vehicle and the change you want to discuss. Cars Auto will say whether that request can be taken further.
          </p>
          <div className="mt-8">
            <ModificationForm />
          </div>
        </div>
        <ContactCard />
      </Container>
    </>
  );
}
