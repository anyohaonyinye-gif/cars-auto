"use client";

import { useEffect, useRef } from "react";
import { whatsappHref } from "@/lib/contactLinks";

export function DemoFormSuccess({
  message,
  onEdit,
}: {
  message: string;
  onEdit: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div ref={ref} tabIndex={-1} className="rounded-2xl border border-success/30 bg-success-bg p-5 outline-none" role="status">
      <h2 className="text-lg font-semibold text-success">Enquiry ready on this page</h2>
      <p className="mt-2 text-sm leading-6 text-ink">
        This is a frontend demonstration. Cars Auto has not received an email, because no enquiry service is connected. Nothing was sent until you choose WhatsApp yourself.
      </p>
      <p className="mt-4 text-sm font-medium">Message prepared for WhatsApp</p>
      <pre className="mt-2 whitespace-pre-wrap rounded-xl bg-white p-3 text-sm leading-6 text-ink">{message}</pre>
      <div className="mt-4 flex flex-wrap gap-3">
        <a
          href={whatsappHref(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center rounded-full bg-[#128C7E] px-5 text-sm font-medium text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focusring"
        >
          Send this enquiry on WhatsApp
        </a>
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex h-11 items-center rounded-full border border-line bg-white px-5 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focusring"
        >
          Edit enquiry
        </button>
      </div>
    </div>
  );
}
