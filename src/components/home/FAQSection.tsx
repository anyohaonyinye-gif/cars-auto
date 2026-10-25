"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { faqs } from "@/data/faqs";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-canvas py-16 sm:py-20">
      <Container className="max-w-4xl">
        <SectionHeading
          eyebrow="Questions"
          title="Frequently asked questions"
          description="Answers describe how to contact Cars Auto. Specific availability, delivery, finance, and warranty terms are confirmed by the dealership."
        />
        <div className="mt-8 divide-y divide-line rounded-2xl border border-line bg-white">
          {faqs.map((faq, index) => {
            const expanded = open === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;
            return (
              <div key={faq.question}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-focusring"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => setOpen(expanded ? null : index)}
                  >
                    {faq.question}
                    <Plus className={cn("h-4 w-4 shrink-0 transition-transform", expanded && "rotate-45")} aria-hidden="true" />
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!expanded} className="px-5 pb-5 text-sm leading-6 text-muted">
                  {faq.answer}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
