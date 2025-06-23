import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "src/utils/cn";

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator-root"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-[var(--separator-bg)] shrink-0",
        "data-[orientation=horizontal]:h-[var(--separator-horizontal-height)] data-[orientation=horizontal]:w-[var(--separator-horizontal-width)]",
        "data-[orientation=vertical]:h-[var(--separator-vertical-height)] data-[orientation=vertical]:w-[var(--separator-vertical-width)]",
        className
      )}
      {...props}
    />
  );
}

export { Separator };
