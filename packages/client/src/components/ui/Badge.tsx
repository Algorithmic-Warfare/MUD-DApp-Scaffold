/**
 * @file
 * @summary Provides a customizable Badge component for displaying small, informative labels.
 * @description This file exports the `Badge` component, which is a versatile UI element used to highlight
 * or categorize information with various visual styles. It leverages `class-variance-authority` for
 * flexible variant-based styling and `Radix UI's Slot` for render customization.
 *
 * @exports Badge - A component for displaying small, informative labels.
 * @exports badgeVariants - A utility function for generating badge CSS classes based on variants.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Categorization**: Recognize `Badge` as a component for visual categorization or status indication.
 * - **Styling**: The `badgeVariants` function is key to understanding the available visual styles (e.g., `default`, `primary`, `destructive`).
 * - **Flexibility**: The `asChild` prop allows for rendering the badge as a different HTML element while retaining its styles.
 */
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "src/utils/cn";

/**
 * @summary Defines the visual variants for the Badge component.
 * @description This utility uses `class-variance-authority` to create different
 * visual styles for the `Badge` component, including default, primary, secondary,
 * destructive, and outline variants.
 *
 * @param {string} base - The base CSS classes applied to all badge variants.
 * @param {object} options - Configuration object for variants.
 * @param {object} options.variants - Defines the different visual styles.
 * @param {object} options.defaultVariants - Specifies the default variant.
 * @returns {Function} A function that generates CSS classes based on the selected variant.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **CSS Utility**: This is a styling utility, not a React component.
 * - **Variant Mapping**: AI should map `variant` prop values to the corresponding CSS classes defined here.
 */
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

/**
 * @summary A customizable Badge component for displaying small, informative labels.
 * @description This component renders a badge with various styling options. It can be rendered
 * as a `span` element by default or as a child component using the `asChild` prop.
 *
 * @param {object} props - The props for the Badge component.
 * @param {string} [props.className] - Additional CSS classes to apply to the badge.
 * @param {VariantProps<typeof badgeVariants>["variant"]} [props.variant="default"] - The visual style of the badge.
 * @param {boolean} [props.asChild=false] - If true, the component will be rendered as the child of the element passed to it.
 * @param {React.ComponentProps<"span">} props - All other props supported by a `span` element.
 * @returns {JSX.Element} A React element representing the badge.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Component Usage**: This is the primary component to use for displaying badges.
 * - **Prop-driven Styling**: The `variant` prop directly controls the appearance based on `badgeVariants`.
 * - **Composition**: The `asChild` prop is a common Radix UI pattern for component composition.
 */
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
