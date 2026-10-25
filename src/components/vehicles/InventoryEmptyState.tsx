import { Button } from "@/components/ui/Button";

export function InventoryEmptyState({
  message = "No demonstration vehicles match these filters.",
  onReset,
}: {
  message?: string;
  onReset: () => void;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-line bg-canvas px-6 py-14 text-center">
      <h2 className="text-2xl font-semibold tracking-tight">No matching vehicles</h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">{message}</p>
      <div className="mt-6">
        <Button type="button" onClick={onReset}>
          Clear filters
        </Button>
      </div>
    </div>
  );
}
