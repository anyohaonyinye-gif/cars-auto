import Link from "next/link";
import Image from "next/image";
import type { Vehicle } from "@/types/vehicle";
import { conditionLabel, vehicleTitle } from "@/lib/vehicleUtils";
import { formatCurrency, formatMileage } from "@/lib/formatCurrency";
import { vehicleEnquiryMessage, whatsappHref } from "@/lib/contactLinks";

export function VehicleCard({ vehicle, priority = false }: { vehicle: Vehicle; priority?: boolean }) {
  const image = vehicle.images[0];
  const title = vehicleTitle(vehicle);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white">
      <Link href={`/inventory/${vehicle.slug}`} className="relative block aspect-[16/10] bg-canvas focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focusring">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <span className="grid h-full place-items-center px-4 text-center text-sm text-muted">Image unavailable</span>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-ink px-3 py-1 text-xs font-medium text-white">
          {conditionLabel(vehicle.condition)}
        </span>
        <span className="absolute bottom-3 left-3 rounded-full bg-white/92 px-3 py-1 text-xs font-medium text-ink">
          Representative photo
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">{vehicle.bodyType}</p>
        <h3 className="mt-2 text-lg font-semibold leading-6 tracking-tight">
          <Link href={`/inventory/${vehicle.slug}`} className="hover:underline">
            {title}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-muted">{vehicle.trim}</p>
        <p className="mt-3 text-lg font-semibold tabular-nums">{formatCurrency(vehicle.price, vehicle.currency)}</p>
        <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
          <div>
            <dt className="text-xs text-muted">Mileage</dt>
            <dd>{formatMileage(vehicle.mileage)}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted">Transmission</dt>
            <dd>{vehicle.transmission}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted">Fuel</dt>
            <dd>{vehicle.fuelType}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted">Year</dt>
            <dd>{vehicle.year}</dd>
          </div>
        </dl>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            href={`/inventory/${vehicle.slug}`}
            className="inline-flex h-10 items-center rounded-full bg-ink px-4 text-sm font-medium text-white hover:bg-ink-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            View details
          </Link>
          <a
            href={whatsappHref(vehicleEnquiryMessage(vehicle))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center rounded-full border border-line px-4 text-sm font-medium hover:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focusring"
          >
            Enquire
          </a>
        </div>
      </div>
    </article>
  );
}
