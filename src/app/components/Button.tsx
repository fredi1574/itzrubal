import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "ghost";

type BaseProps = {
  variant?: Variant;
  className?: string;
};

function classesForVariant(variant: Variant): string {
  if (variant === "secondary") {
    return "bg-transparent text-foreground border border-[color-mix(in_oklab,var(--foreground)_15%,transparent)] hover:bg-[color-mix(in_oklab,var(--foreground)_6%,transparent)] hover:border-accent/30";
  }
  if (variant === "ghost") {
    return "bg-transparent text-foreground hover:bg-[color-mix(in_oklab,var(--foreground)_6%,transparent)] hover:text-accent";
  }
  return "bg-accent text-background hover:brightness-95 hover:shadow-lg hover:shadow-accent/25";
}

export function Button({
  variant = "primary",
  className,
  ...props
}: BaseProps & ComponentProps<"button">) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ease-out shadow-sm hover:scale-105 active:scale-95 ${classesForVariant(
        variant
      )} ${className ?? ""}`}
      {...props}
    />
  );
}

export function ButtonLink({
  variant = "primary",
  className,
  href,
  ...props
}: BaseProps & ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium transition-all duration-300 ease-out shadow-sm hover:scale-105 active:scale-95 ${classesForVariant(
        variant
      )} ${className ?? ""}`}
      {...props}
    />
  );
}
