"use client";

import { Container } from "@/components/ui/Container";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Container className="py-20">
      <h1 className="text-4xl font-semibold tracking-tight">Something went wrong</h1>
      <p className="mt-4 max-w-xl text-muted">The page could not be displayed. You can try again.</p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 h-11 rounded-full bg-ink px-5 text-sm font-medium text-white"
      >
        Try again
      </button>
    </Container>
  );
}
