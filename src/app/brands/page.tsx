import { BrandDirectory } from "@/components/brands/BrandDirectory";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Vehicle brands",
  description:
    "Browse vehicle brands in the Cars Auto demonstration catalogue and open the matching inventory for each manufacturer.",
  path: "/brands",
});

export default function BrandsPage() {
  return (
    <>
      <PageHero
        eyebrow="Brands"
        title="Manufacturers in the sample catalogue"
        description="Search the directory and open a filtered inventory. Counts are calculated from the demonstration vehicles, not from a separate stock system."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Brands" },
        ]}
      />
      <Container className="py-14">
        <BrandDirectory />
      </Container>
    </>
  );
}
