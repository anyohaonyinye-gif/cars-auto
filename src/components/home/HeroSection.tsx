import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { whatsappHref } from "@/lib/contactLinks";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <Image
        src="/vehicles/hero.jpg"
        alt="A white sports coupe in a dim showroom, used as the Cars Auto homepage banner. It is not a listed vehicle."
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-deep via-ink-deep/85 to-ink/35" />
      <Container className="relative flex min-h-[38rem] flex-col justify-end pb-28 pt-16 sm:min-h-[44rem] sm:pb-36">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Accra · Brand-new and fairly used</p>
        <h1 className="mt-4 max-w-xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
          Find the Car That Moves You.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
          Explore brand-new and fairly used vehicles with a straightforward, customer-focused car-buying experience in Ghana.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/inventory" variant="inverse">
            Explore Inventory
          </Button>
          <Button href={whatsappHref()} external variant="inverseSecondary">
            Talk to Our Team
          </Button>
        </div>
      </Container>
    </section>
  );
}
