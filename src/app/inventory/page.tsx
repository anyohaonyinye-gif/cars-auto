import { Suspense } from "react";
import { InventoryExplorer } from "@/components/vehicles/InventoryExplorer";
import { PageHero } from "@/components/layout/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Vehicle inventory",
  description:
    "Browse the Cars Auto demonstration inventory of cars for sale in Accra, including SUVs, sedans, pickups, and luxury vehicles.",
  path: "/inventory",
});

export default function InventoryPage() {
  return (
    <>
      <PageHero
        eyebrow="Catalogue"
        title="Vehicle inventory"
        description="Filter the demonstration catalogue by make, body type, price, year, and more. Contact Cars Auto to ask what is actually available."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Inventory" },
        ]}
      />
      <Suspense fallback={<p className="px-4 py-16 text-center text-sm text-muted">Loading inventory…</p>}>
        <InventoryExplorer />
      </Suspense>
    </>
  );
}
