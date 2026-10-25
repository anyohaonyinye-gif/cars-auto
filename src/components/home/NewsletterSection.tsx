import { Container } from "@/components/ui/Container";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export function NewsletterSection() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-3xl">
        <h2 className="text-3xl font-semibold tracking-tight">Stay in touch</h2>
        <p className="mt-3 text-base leading-7 text-muted">
          Leave an email address to try the form. Cars Auto does not have a newsletter provider connected, so this does not create a subscription.
        </p>
        <div className="mt-6">
          <NewsletterForm />
        </div>
      </Container>
    </section>
  );
}
