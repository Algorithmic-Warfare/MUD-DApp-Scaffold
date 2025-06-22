import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "src/utils/cn";

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-[var(--label-gap)] text-[var(--label-font-size)] leading-[var(--label-line-height)] font-[var(--label-font-weight)] select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-[var(--label-disabled-opacity)] peer-disabled:cursor-not-allowed peer-disabled:opacity-[var(--label-disabled-opacity)]",
        className
      )}
      {...props}
    />
  );
}

export { Label };
