import Link from "next/link";
import { cn } from "@/lib/cn";

type LogoProps = {
  tone?: "dark" | "light";
  className?: string;
};

export function Logo({ tone = "dark", className }: LogoProps) {
  const light = tone === "light";

  return (
    <Link
      href="/"
      className={cn("inline-flex items-center gap-3 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focusring", className)}
      aria-label="Cars Auto home"
    >
      <span className={cn("grid h-10 w-10 place-items-center rounded-md text-sm font-semibold tracking-wide", light ? "bg-white text-ink" : "bg-ink text-gold")} aria-hidden="true">
        CA
      </span>
      <span className="leading-none">
        <span className={cn("block text-[15px] font-semibold tracking-[0.18em]", light ? "text-white" : "text-ink")}>
          CARS <span className="text-gold">AUTO</span>
        </span>
        <span className={cn("mt-1 block text-[11px] tracking-wide", light ? "text-white/70" : "text-muted")}>Accra</span>
      </span>
    </Link>
  );
}
