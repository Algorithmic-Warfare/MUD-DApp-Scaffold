import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "src/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive cursor-pointer",
  {
    variants: {
      variant: {
        "primary-default":
          "bg-[var(--button-primary-default-bg)] text-[var(--button-primary-default-text)] hover:bg-[var(--button-primary-default-focus-bg)] scale-[1] hover:scale-[1.02] transition-transform",
        neutral:
          "bg-[var(--button-neutral-default-bg)] text-[var(--button-neutral-default-text)] hover:bg-[var(--button-neutral-default-focus-bg)] hover:text-[var(--button-neutral-default-focus-text)] shadow-none hover:shadow-sm transition-shadow",
        "primary-destructive":
          "bg-[var(--button-primary-destructive-bg)] text-[var(--button-primary-destructive-text)] hover:bg-[var(--button-primary-destructive-focus-bg)] animate-none hover:animate-pulse focus-visible:ring-destructive/20",
        "primary-outline":
          "border bg-[var(--button-primary-outline-bg)] border-[var(--button-primary-outline-outline)] text-[var(--button-primary-outline-text)] hover:bg-[var(--button-primary-outline-focus-bg)] hover:border-[var(--button-primary-outline-focus-outline)] hover:text-[var(--button-primary-outline-focus-text)]",
        "secondary-default":
          "bg-[var(--button-secondary-default-bg)] text-[var(--button-secondary-default-text)] hover:bg-[var(--button-secondary-default-focus-bg)] scale-[1] hover:scale-[1.02] transition-transform",
        "primary-ghost":
          "bg-[var(--button-primary-ghost-bg)] text-[var(--button-primary-ghost-text)] hover:bg-[var(--button-primary-ghost-focus-bg)] hover:text-[var(--button-primary-ghost-focus-text)]",
        "primary-link":
          "text-[var(--button-primary-link-text)] hover:text-[var(--button-primary-link-focus-text)] hover:underline underline-offset-4",
        "secondary-outline":
          "border bg-[var(--button-secondary-outline-bg)] border-[var(--button-secondary-outline-outline)] text-[var(--button-secondary-outline-text)] hover:bg-[var(--button-secondary-outline-focus-bg)] hover:border-[var(--button-secondary-outline-focus-outline)] hover:text-[var(--button-secondary-outline-focus-text)]",
        "secondary-ghost":
          "bg-[var(--button-secondary-ghost-bg)] text-[var(--button-secondary-ghost-text)] hover:bg-[var(--button-secondary-ghost-focus-bg)] hover:text-[var(--button-secondary-ghost-focus-text)]",
        "secondary-link":
          "text-[var(--button-secondary-link-text)] hover:text-[var(--button-secondary-link-focus-text)] hover:underline underline-offset-4",
        "secondary-destructive":
          "bg-[var(--button-secondary-destructive-bg)] text-[var(--button-secondary-destructive-text)] hover:bg-[var(--button-secondary-destructive-focus-bg)] animate-none hover:animate-pulse focus-visible:ring-destructive/20",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "primary-default",
      size: "default",
    },
  }
);

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
    }
>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
});

Button.displayName = "Button";

export { Button, buttonVariants };
