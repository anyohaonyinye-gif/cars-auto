"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { VehicleImage } from "@/types/vehicle";
import { cn } from "@/lib/cn";

export function VehicleGallery({ images, title }: { images: VehicleImage[]; title: string }) {
  const [index, setIndex] = useState(0);
  const safeImages = images.length > 0 ? images : [];
  const current = safeImages[index] ?? safeImages[0];
  const multiple = safeImages.length > 1;

  function go(next: number) {
    if (!multiple) return;
    const wrapped = (next + safeImages.length) % safeImages.length;
    setIndex(wrapped);
  }

  if (!current) {
    return (
      <div className="grid aspect-[16/10] place-items-center rounded-2xl border border-dashed border-line bg-canvas px-6 text-center text-sm text-muted">
        No photograph is available for this demonstration listing.
      </div>
    );
  }

  return (
    <div
      className="space-y-3"
      tabIndex={0}
      role="region"
      aria-label={`${title} photographs`}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          go(index + 1);
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          go(index - 1);
        }
      }}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-canvas">
        <Image
          src={current.src}
          alt={current.alt}
          fill
          priority
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
        />
        <p className="absolute bottom-3 left-3 rounded-full bg-ink/85 px-3 py-1 text-xs text-white">
          Representative image
        </p>
        <p className="absolute bottom-3 right-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-ink">
          {index + 1} of {safeImages.length}
        </p>
        <button
          type="button"
          className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focusring"
          onClick={() => go(index - 1)}
          disabled={!multiple}
          aria-label="Previous photograph"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focusring"
          onClick={() => go(index + 1)}
          disabled={!multiple}
          aria-label="Next photograph"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
        {safeImages.map((image, imageIndex) => (
          <button
            key={image.src}
            type="button"
            aria-label={`Show photograph ${imageIndex + 1}`}
            aria-current={imageIndex === index}
            onClick={() => setIndex(imageIndex)}
            className={cn(
              "relative aspect-[16/10] overflow-hidden rounded-lg border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focusring",
              imageIndex === index ? "border-ink" : "border-transparent",
            )}
          >
            <Image src={image.src} alt="" fill sizes="120px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
