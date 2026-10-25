import { cn } from "@/lib/cn";

export function DemoNotice({ className }: { className?: string }) {
  return (
    <p className={cn("rounded-xl border border-line bg-canvas px-4 py-3 text-sm leading-6 text-ink", className)}>
      <strong className="font-semibold">Demonstration inventory.</strong> These vehicles, prices, and specifications are sample records for this website. They are not confirmation that a vehicle is available from Cars Auto.
    </p>
  );
}
