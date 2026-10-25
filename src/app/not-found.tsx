import { NotFoundState } from "@/components/ui/NotFoundState";

export default function NotFound() {
  return (
    <NotFoundState
      title="This page is not available"
      description="The address does not match a page on the Cars Auto website."
    />
  );
}
