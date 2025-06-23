import * as React from "react";

import { cn } from "src/utils/cn";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-[var(--textarea-border)] placeholder:text-[var(--textarea-placeholder)] focus-visible:border-[var(--textarea-focus-border)] focus-visible:ring-[var(--textarea-focus-ring)] aria-invalid:ring-[var(--textarea-error-ring)] aria-invalid:border-[var(--textarea-error-border)] flex field-sizing-content min-h-16 w-full border bg-[var(--textarea-bg)] px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
