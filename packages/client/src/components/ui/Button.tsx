/**
 * @file
 * @summary Provides a customizable Button component with various styles and sizes.
 * @description This file exports the `Button` component, which is a versatile UI element
 * for user interaction. It supports different visual variants (e.g., primary, destructive, ghost)
 * and sizes, and integrates with `class-variance-authority` for flexible styling.
 *
 * @exports Button - A component for user interaction.
 * @exports buttonVariants - A utility function for generating button CSS classes based on variants.
 * @exports VariantProps - Type definition for button variant properties.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **User Interaction**: Recognize `Button` as the primary component for clickable actions.
 * - **Styling**: The `buttonVariants` function is key to understanding the available visual styles and sizes.
 * - **Flexibility**: The `asChild` prop allows for rendering the button as a different HTML element while retaining its styles.
 */
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "src/utils/cn";

/**
 * @summary Defines the visual variants and sizes for the Button component.
 * @description This utility uses `class-variance-authority` to create different
 * visual styles and sizes for the `Button` component, including various primary,
 * secondary, destructive, outline, ghost, and link variants.
 *
 * @param {string} base - The base CSS classes applied to all button variants.
 * @param {object} options - Configuration object for variants and sizes.
 * @param {object} options.variants - Defines the different visual styles and sizes.
 * @param {object} options.defaultVariants - Specifies the default variant and size.
 * @returns {Function} A function that generates CSS classes based on the selected variant and size.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **CSS Utility**: This is a styling utility, not a React component.
 * - **Variant Mapping**: AI should map `variant` and `size` prop values to the corresponding CSS classes defined here.
 * - **Animations**: Some variants include explicit animation classes (e.g., `animate-pulse`).
 */
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

/**
 * @summary A customizable Button component with various styles and sizes.
 * @description This component renders a `button` HTML element with custom styling based on
 * `variant` and `size` props. It can also render as a child component using the `asChild` prop.
 *
 * @param {object} props - The props for the Button component.
 * @param {string} [props.className] - Additional CSS classes to apply to the button.
 * @param {VariantProps<typeof buttonVariants>["variant"]} [props.variant="primary-default"] - The visual style of the button.
 * @param {VariantProps<typeof buttonVariants>["size"]} [props.size="default"] - The size of the button.
 * @param {boolean} [props.asChild=false] - If true, the component will be rendered as the child of the element passed to it.
 * @param {React.ComponentProps<"button">} props - All other standard HTML `button` attributes.
 * @returns {JSX.Element} A React element representing the button.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Component Usage**: This is the primary component to use for interactive buttons.
 * - **Prop-driven Styling**: The `variant` and `size` props directly control the appearance based on `buttonVariants`.
 * - **Composition**: The `asChild` prop is a common Radix UI pattern for component composition.
 */
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

export { Button, buttonVariants, VariantProps };
