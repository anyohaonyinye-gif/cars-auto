import { NotFoundState } from "@/components/ui/NotFoundState";

export default function VehicleNotFound() {
  return (
    <NotFoundState
      title="That vehicle is not in the catalogue"
      description="The link does not match a demonstration listing. Return to the inventory and choose another vehicle."
    />
  );
}
