"use client";

import { useId, useState, type FormEvent } from "react";
import { z } from "zod";
import { emailSchema } from "@/lib/validation";

const schema = z.object({
  email: emailSchema,
});

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const id = useId();
  const inputId = `${id}-email`;
  const noteId = `${id}-note`;
  const errorId = `${id}-error`;

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = schema.safeParse({ email });
    if (!parsed.success) {
      setDone(false);
      setError(parsed.error.issues[0]?.message ?? "Enter a valid email address.");
      return;
    }
    setError("");
    setDone(true);
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <label htmlFor={inputId} className={compact ? "text-sm font-medium text-white" : "text-sm font-medium"}>
        Email address
      </label>
      <div className="mt-2 flex flex-col gap-2 sm:flex-row">
        <input
          id={inputId}
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setDone(false);
          }}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : noteId}
          placeholder="you@email.com"
          className="h-11 w-full rounded-full border border-line bg-white px-4 text-sm text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focusring"
        />
        <button
          type="submit"
          className={
            compact
              ? "h-11 shrink-0 rounded-full bg-white px-5 text-sm font-medium text-ink hover:bg-canvas focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              : "h-11 shrink-0 rounded-full bg-ink px-5 text-sm font-medium text-white hover:bg-ink-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          }
        >
          Submit
        </button>
      </div>
      <p id={noteId} className={compact ? "mt-2 text-xs leading-5 text-white/70" : "mt-2 text-xs leading-5 text-muted"}>
        Frontend demonstration only. Submitting does not add this address to a mailing list.
      </p>
      {error ? (
        <p id={errorId} className={compact ? "mt-2 text-sm text-gold" : "mt-2 text-sm text-danger"} role="alert">
          {error}
        </p>
      ) : null}
      {done ? (
        <p className={compact ? "mt-2 text-sm text-white" : "mt-2 text-sm text-success"} role="status">
          Email format accepted. No subscription was created.
        </p>
      ) : null}
    </form>
  );
}
