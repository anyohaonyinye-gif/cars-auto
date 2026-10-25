import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const points = [
  {
    title: "Published specifications",
    text: "You can read the sample details attached to each demonstration listing before you enquire.",
  },
  {
    title: "A direct conversation",
    text: "Availability, viewing times, and price are discussed with Cars Auto rather than confirmed by the website.",
  },
  {
    title: "Reviews when they are verified",
    text: "Customer testimonials will be published here only when Cars Auto has permission to use them. None are shown yet.",
  },
];

export function CustomerFeedbackSection() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Customer feedback"
          title="What to expect when you enquire"
          description="Verified customer reviews are not published on this website yet."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {points.map((point) => (
            <article key={point.title} className="rounded-2xl bg-canvas p-5">
              <h3 className="text-lg font-semibold">{point.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{point.text}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
