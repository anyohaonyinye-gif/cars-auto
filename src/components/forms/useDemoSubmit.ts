"use client";

import { useState } from "react";

export function useDemoSubmit() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [summary, setSummary] = useState("");

  async function complete(message: string) {
    setStatus("submitting");
    await new Promise((resolve) => window.setTimeout(resolve, 300));
    setSummary(message);
    setStatus("success");
  }

  return {
    status,
    summary,
    complete,
    edit: () => setStatus("idle"),
  };
}
