import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function NotFoundState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Container className="py-20 sm:py-28">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-deep">Page not found</p>
      <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl">{title}</h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-muted">{description}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/inventory">Back to inventory</Button>
        <Button href="/" variant="secondary">
          Home
        </Button>
      </div>
    </Container>
  );
}
