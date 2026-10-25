import { Container } from "@/components/ui/Container";

const steps = [
  { number: "01", title: "Browse available vehicles", text: "Use search and filters to look through the demonstration catalogue." },
  { number: "02", title: "Choose a vehicle or describe your requirements", text: "Open a listing, or tell Cars Auto what you want if it is not published." },
  { number: "03", title: "Contact Cars Auto", text: "Call, email, WhatsApp, or send a form enquiry. The form prepares a message; it does not complete a sale." },
  { number: "04", title: "Discuss viewing, availability, and purchase arrangements", text: "The dealership confirms what can be viewed, what is available, and how a purchase would proceed." },
];

export function HowItWorks() {
  return (
    <section className="bg-ink py-16 text-white sm:py-20">
      <Container>
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Process</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">How an enquiry moves forward</h2>
          <p className="mt-3 text-base leading-7 text-white/75">
            An online message starts the conversation. It does not reserve a car or finish a purchase.
          </p>
        </div>
        <ol className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step) => (
            <li key={step.number}>
              <p className="text-3xl font-semibold text-gold">{step.number}</p>
              <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/75">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
