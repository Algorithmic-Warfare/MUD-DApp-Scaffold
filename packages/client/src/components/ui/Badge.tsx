import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "src/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center justify-center border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[var(--badge-default-bg)] text-[var(--badge-default-text)] [a&]:hover:opacity-90",
        primary:
          "border-transparent bg-[var(--badge-primary-bg)] text-[var(--badge-primary-text)] [a&]:hover:opacity-90",
        secondary:
          "border-transparent bg-[var(--badge-secondary-bg)] text-[var(--badge-secondary-text)] [a&]:hover:opacity-90",
        destructive:
          "border-transparent bg-[var(--badge-destructive-bg)] text-[var(--badge-destructive-text)] [a&]:hover:opacity-90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "text-[var(--badge-outline-text)] [a&]:hover:bg-[var(--badge-outline-hover-bg)] [a&]:hover:text-[var(--badge-outline-hover-text)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
