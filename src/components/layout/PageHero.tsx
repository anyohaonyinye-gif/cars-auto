import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

export type Crumb = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items, tone = "dark" }: { items: Crumb[]; tone?: "dark" | "light" }) {
  const light = tone === "light";

  return (
    <nav aria-label="Breadcrumb" className="mb-5">
      <ol className={cn("flex flex-wrap items-center gap-2 text-sm", light ? "text-white/75" : "text-muted")}>
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 ? <span aria-hidden="true">/</span> : null}
              {item.href && !last ? (
                <Link href={item.href} className={cn("rounded hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2", light ? "focus-visible:outline-gold" : "focus-visible:outline-focusring")}>
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className={light ? "text-white" : "text-ink"}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  crumbs?: Crumb[];
}) {
  return (
    <section className="bg-ink text-white">
      <Container className="py-12 sm:py-16">
        {crumbs ? <Breadcrumbs items={crumbs} tone="light" /> : null}
        {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{eyebrow}</p> : null}
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-white/75">{description}</p>
      </Container>
    </section>
  );
}
