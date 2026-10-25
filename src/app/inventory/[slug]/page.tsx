import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { DemoNotice } from "@/components/ui/DemoNotice";
import { RelatedVehicles } from "@/components/vehicles/RelatedVehicles";
import { VehicleEnquiryActions } from "@/components/vehicles/VehicleEnquiryActions";
import { VehicleGallery } from "@/components/vehicles/VehicleGallery";
import { VehicleSpecifications } from "@/components/vehicles/VehicleSpecifications";
import { siteConfig } from "@/config/site";
import { vehicles } from "@/data/vehicles";
import { formatCurrency } from "@/lib/formatCurrency";
import { conditionLabel, getRelatedVehicles, getVehicleBySlug, vehicleTitle } from "@/lib/vehicleUtils";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return vehicles.map((vehicle) => ({ slug: vehicle.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);
  if (!vehicle) return { title: "Vehicle not found" };
  const title = vehicleTitle(vehicle);
  const description = `Demonstration listing for a ${title}. Sample price ${formatCurrency(vehicle.price)}. Contact Cars Auto in Accra to confirm availability.`;
  return {
    title,
    description,
    alternates: { canonical: `/inventory/${vehicle.slug}` },
    openGraph: {
      title: `${title} · ${siteConfig.shortName}`,
      description,
      url: `/inventory/${vehicle.slug}`,
      type: "website",
    },
  };
}

export default async function VehicleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);
  if (!vehicle) notFound();
  const title = vehicleTitle(vehicle);
  const related = getRelatedVehicles(vehicle);

  return (
    <>
      <PageHero
        eyebrow={conditionLabel(vehicle.condition)}
        title={title}
        description={`${vehicle.trim} · Stock ${vehicle.stockNumber} · Demonstration listing`}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Inventory", href: "/inventory" },
          { label: title },
        ]}
      />
      <Container className="py-10 sm:py-14">
        <DemoNotice />
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.8fr)]">
          <VehicleGallery images={vehicle.images} title={title} />
          <div>
            <p className="text-3xl font-semibold tabular-nums">{formatCurrency(vehicle.price, vehicle.currency)}</p>
            <p className="mt-2 text-sm text-muted">Sample price in Ghanaian cedis. It is not a confirmed offer.</p>
            <div className="mt-6">
              <VehicleEnquiryActions vehicle={vehicle} />
            </div>
          </div>
        </div>
        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Description</h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-muted">{vehicle.description}</p>
            <div className="mt-10">
              <VehicleSpecifications vehicle={vehicle} />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Sample features</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6">
              {vehicle.features.map((feature) => (
                <li key={feature} className="border-b border-line pb-3">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <RelatedVehicles vehicles={related} />
      </Container>
    </>
  );
}
