import {
  cloneElement,
  isValidElement,
  type InputHTMLAttributes,
  type ReactElement,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/cn";

export const fieldClass =
  "w-full rounded-lg border border-line bg-white px-3 text-sm text-ink outline-none placeholder:text-muted/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focusring aria-[invalid=true]:border-danger";

export function Field({
  id,
  label,
  error,
  hint,
  required,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}) {
  const describedBy = [hint ? `${id}-hint` : "", error ? `${id}-error` : ""].filter(Boolean).join(" ") || undefined;
  const control = isValidElement(children)
    ? cloneElement(children as ReactElement<{ "aria-describedby"?: string }>, {
        "aria-describedby": describedBy,
      })
    : children;

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
        {required ? <span className="text-danger"> *</span> : null}
        {required ? <span className="sr-only"> required</span> : null}
      </label>
      {control}
      {hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs leading-5 text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }) {
  const { invalid, className, ...rest } = props;
  return <input {...rest} aria-invalid={invalid || undefined} className={cn(fieldClass, "h-11", className)} />;
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }) {
  const { invalid, className, ...rest } = props;
  return <textarea {...rest} aria-invalid={invalid || undefined} className={cn(fieldClass, "min-h-32 py-3", className)} />;
}

export function SelectInput(props: SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean }) {
  const { invalid, className, children, ...rest } = props;
  return (
    <select {...rest} aria-invalid={invalid || undefined} className={cn(fieldClass, "h-11", className)}>
      {children}
    </select>
  );
}
