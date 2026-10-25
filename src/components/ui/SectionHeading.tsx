import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
};

export function SectionHeading({ eyebrow, title, description, action }: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-deep">{eyebrow}</p>
        ) : null}
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{title}</h2>
        {description ? <p className="mt-3 text-base leading-7 text-muted">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
