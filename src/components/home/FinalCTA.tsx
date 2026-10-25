import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { whatsappHref } from "@/lib/contactLinks";

export function FinalCTA() {
  return (
    <section className="bg-ink-deep py-16 text-white sm:py-20">
      <Container className="max-w-3xl text-center">
        <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Your Next Car Starts Here.</h2>
        <p className="mt-4 text-base leading-7 text-white/75">
          Browse the sample inventory or contact {siteConfig.shortName} in Accra to talk about a vehicle.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/inventory" variant="inverse">
            Explore Inventory
          </Button>
          <Button href="/contact" variant="inverseSecondary">
            Contact Cars Auto
          </Button>
          <Button href={whatsappHref()} external variant="inverseSecondary">
            WhatsApp enquiry
          </Button>
        </div>
      </Container>
    </section>
  );
}
