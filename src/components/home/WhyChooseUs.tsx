import { Car, MessageSquare, Phone, Search, RefreshCw, Wrench } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const points = [
  {
    title: "Vehicle selection assistance",
    text: "Tell us the budget, body type, and use you have in mind, and we can help narrow the conversation.",
    icon: Search,
  },
  {
    title: "Clear vehicle specifications",
    text: "Listings show the sample details that were entered for them, without invented discounts or crossed-out prices.",
    icon: Car,
  },
  {
    title: "Personal enquiries",
    text: "Call, email, or WhatsApp the dealership about a specific vehicle or a requirement.",
    icon: MessageSquare,
  },
  {
    title: "Sourcing support",
    text: "If a vehicle is not in the catalogue, you can still describe it and ask whether Cars Auto can help look.",
    icon: Phone,
  },
  {
    title: "Trade-in enquiries",
    text: "Share your current vehicle for review. The website does not guarantee a trade-in figure.",
    icon: RefreshCw,
  },
  {
    title: "After-sales guidance",
    text: "Ownership questions can be sent to the team. Warranty and servicing terms are confirmed by the dealership.",
    icon: Wrench,
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="The experience"
          title="Why customers contact Cars Auto"
          description="A direct way to explore vehicles and ask questions, without unsupported claims about certification or guarantees."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {points.map((point) => (
            <article key={point.title} className="rounded-2xl border border-line p-5">
              <point.icon className="h-5 w-5 text-gold-deep" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-semibold">{point.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{point.text}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
