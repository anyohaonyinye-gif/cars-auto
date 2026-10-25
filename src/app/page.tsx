import { BrandDirectoryPreview } from "@/components/home/BrandDirectoryPreview";
import { CustomerFeedbackSection } from "@/components/home/CustomerFeedbackSection";
import { FAQSection } from "@/components/home/FAQSection";
import { FeaturedVehicles } from "@/components/home/FeaturedVehicles";
import { FinalCTA } from "@/components/home/FinalCTA";
import { HeroSection } from "@/components/home/HeroSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { VehicleCategories } from "@/components/home/VehicleCategories";
import { VehicleSearch } from "@/components/home/VehicleSearch";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Container } from "@/components/ui/Container";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <div className="relative z-10 -mt-16 sm:-mt-24">
        <Container>
          <VehicleSearch />
        </Container>
      </div>
      <FeaturedVehicles />
      <VehicleCategories />
      <BrandDirectoryPreview />
      <WhyChooseUs />
      <ServicesOverview />
      <HowItWorks />
      <CustomerFeedbackSection />
      <FAQSection />
      <FinalCTA />
      <NewsletterSection />
    </>
  );
}
