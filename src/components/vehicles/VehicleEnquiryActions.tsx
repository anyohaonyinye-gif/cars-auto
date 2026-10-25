import type { ReactNode } from "react";
import { phoneHref, vehicleEnquiryMessage, whatsappHref } from "@/lib/contactLinks";
import type { Vehicle } from "@/types/vehicle";

export function VehicleEnquiryActions({ vehicle }: { vehicle: Vehicle }) {
  const info = vehicleEnquiryMessage(vehicle, "info");
  const viewing = vehicleEnquiryMessage(vehicle, "viewing");
  const contact = `/contact?subject=information&vehicle=${encodeURIComponent(vehicle.slug)}`;

  return (
    <div className="rounded-2xl border border-line bg-canvas p-5">
      <p className="text-sm leading-6 text-muted">
        These actions contact Cars Auto about this demonstration listing. They do not reserve the vehicle or complete a purchase.
      </p>
      <div className="mt-4 grid gap-2">
        <Action href={phoneHref()}>Call About This Car</Action>
        <Action href={whatsappHref(info)} external>
          WhatsApp About This Car
        </Action>
        <Action href={whatsappHref(viewing)} external>
          Request a Viewing
        </Action>
        <Action href={contact}>Request More Information</Action>
      </div>
    </div>
  );
}

function Action({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: ReactNode;
}) {
  const className =
    "inline-flex min-h-11 items-center justify-center rounded-full border border-ink px-4 text-sm font-medium hover:bg-ink hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focusring";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }

  if (href.startsWith("/")) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
