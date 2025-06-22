import * as React from "react";

import { cn } from "src/utils/cn";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-[var(--input-height)] w-full min-w-0",
        "border bg-[var(--input-bg)] px-[var(--input-padding)] py-1 text-base",
        "shadow-[var(--input-shadow)] transition-[var(--input-transition)] outline-none",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-[var(--input-disabled-opacity)]",
        "text-[var(--input-text)] placeholder:text-[var(--input-placeholder)]",
        "selection:bg-primary selection:text-primary-foreground",
        "border-[var(--input-border)]",
        "focus-visible:border-[var(--input-focus-border)] focus-visible:ring-[var(--input-focus-ring)] focus-visible:ring-[3px]",
        "aria-invalid:border-[var(--input-error-border)] aria-invalid:ring-[var(--input-error-ring)]",
        "md:text-sm file:text-foreground",
        className
      )}
      {...props}
    />
  );
}

export { Input };
