import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

const variants = {
  primary:
    "bg-ink text-white hover:bg-ink-deep focus-visible:outline-gold",
  secondary:
    "border border-line bg-white text-ink hover:border-ink focus-visible:outline-focusring",
  inverse:
    "bg-white text-ink hover:bg-canvas focus-visible:outline-white",
  inverseSecondary:
    "border border-white/40 text-white hover:bg-white hover:text-ink focus-visible:outline-gold",
  ghost:
    "text-ink hover:bg-canvas focus-visible:outline-focusring",
} as const;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  external?: boolean;
  variant?: keyof typeof variants;
  children: ReactNode;
};

export function Button({
  href,
  external,
  variant = "primary",
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    className,
  );

  if (href && external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
