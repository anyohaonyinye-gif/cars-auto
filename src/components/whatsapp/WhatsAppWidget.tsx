"use client";

import { useEffect, useId, useRef, useState } from "react";
import { X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { whatsappHref } from "@/lib/contactLinks";
import { WhatsAppIcon } from "@/components/whatsapp/WhatsAppIcon";
import { cn } from "@/lib/cn";

const quickChoices = [
  {
    id: "availability",
    label: "Vehicle Availability",
    message: "Hello Cars Auto, I would like to enquire about vehicle availability.",
  },
  {
    id: "pricing",
    label: "Vehicle Pricing",
    message: "Hello Cars Auto, I would like to enquire about vehicle pricing.",
  },
  {
    id: "viewing",
    label: "Request a Viewing",
    message: "Hello Cars Auto, I would like to request a vehicle viewing.",
  },
  {
    id: "trade-in",
    label: "Trade-In",
    message: "Hello Cars Auto, I would like to discuss a possible trade-in.",
  },
  {
    id: "sourcing",
    label: "Vehicle Sourcing",
    message: "Hello Cars Auto, I would like help sourcing a vehicle.",
  },
  {
    id: "general",
    label: "General Enquiry",
    message: siteConfig.defaultWhatsAppMessage,
  },
];

export function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const [choice, setChoice] = useState<string | null>(null);
  const [message, setMessage] = useState<string>(siteConfig.defaultWhatsAppMessage);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const canSend = message.trim().length >= 5;

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    function onPointer(event: MouseEvent) {
      const target = event.target as Node;
      if (panelRef.current?.contains(target) || buttonRef.current?.contains(target)) return;
      setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    panelRef.current?.querySelector<HTMLElement>("[data-close-panel]")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [open]);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-end px-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6">
      <div className="flex flex-col items-end gap-3">
        {open ? (
          <div
            ref={panelRef}
            id={panelId}
            role="dialog"
            aria-label="WhatsApp enquiry"
            className="pointer-events-auto max-h-[min(34rem,calc(100dvh-7rem))] w-[min(100vw-2rem,22rem)] overflow-auto rounded-2xl border border-line bg-white p-4 text-ink shadow-2xl"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold tracking-[0.14em]">CARS AUTO</p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Send a WhatsApp message to the dealership. This opens WhatsApp and does not start a live chat on the website.
                </p>
              </div>
              <button
                type="button"
                data-close-panel
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focusring"
                aria-label="Close WhatsApp panel"
                onClick={() => {
                  setOpen(false);
                  buttonRef.current?.focus();
                }}
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <p className="mt-4 text-sm">
              WhatsApp <span className="font-medium">{siteConfig.whatsappDisplay}</span>
            </p>
            <div className="mt-3 grid gap-2" role="group" aria-label="Quick enquiry choices">
              {quickChoices.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={choice === item.id}
                  className={cn(
                    "min-h-11 rounded-xl border px-3 py-2 text-left text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focusring",
                    choice === item.id ? "border-ink bg-canvas" : "border-line hover:border-ink",
                  )}
                  onClick={() => {
                    setChoice(item.id);
                    setMessage(item.message);
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <label htmlFor="whatsapp-draft" className="mt-4 block text-sm font-medium">
              Message that will open in WhatsApp
            </label>
            <textarea
              id="whatsapp-draft"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={4}
              className="mt-2 w-full rounded-xl border border-line px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focusring"
            />
            <a
              href={canSend ? whatsappHref(message) : undefined}
              aria-disabled={!canSend}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "mt-3 inline-flex h-11 w-full items-center justify-center rounded-full bg-[#128C7E] px-4 text-sm font-medium text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focusring",
                !canSend && "pointer-events-none opacity-50",
              )}
            >
              Start WhatsApp Chat
            </a>
          </div>
        ) : null}
        <button
          ref={buttonRef}
          type="button"
          className="pointer-events-auto grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#1ebe5b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focusring"
          aria-expanded={open}
          aria-controls={open ? panelId : undefined}
          aria-label={open ? "Close WhatsApp enquiry panel" : "Open WhatsApp enquiry panel"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-6 w-6" aria-hidden="true" /> : <WhatsAppIcon className="h-7 w-7" />}
        </button>
      </div>
    </div>
  );
}
