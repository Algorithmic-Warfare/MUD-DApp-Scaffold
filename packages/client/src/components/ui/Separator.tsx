/**
 * @file
 * @summary Provides a customizable Separator component for dividing content.
 * @description This file exports the `Separator` component, built on top of Radix UI's Separator primitives.
 * It provides a visual and semantic way to divide content, enhancing readability and organization.
 *
 * @exports Separator - A component for dividing content.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Content Division**: Use this component to visually separate different sections or elements in the UI.
 * - **Accessibility**: Note the `decorative` prop which can be used to indicate whether the separator is purely visual or has semantic meaning.
 * - **Orientation**: Supports both horizontal and vertical orientations.
 */
import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "src/utils/cn";

/**
 * @summary A customizable Separator component for dividing content.
 * @description This component renders a visual separator, which can be either horizontal or vertical.
 * It wraps Radix UI's `SeparatorPrimitive.Root` and applies custom styling.
 *
 * @param {object} props - The props for the Separator component.
 * @param {string} [props.className] - Additional CSS classes to apply to the separator.
 * @param {"horizontal" | "vertical"} [props.orientation="horizontal"] - The orientation of the separator.
 * @param {boolean} [props.decorative=true] - Whether the separator is purely decorative (true) or has semantic meaning (false).
 * @param {React.ComponentProps<typeof SeparatorPrimitive.Root>} props - All other props supported by `SeparatorPrimitive.Root`.
 * @returns {JSX.Element} A React element representing the separator.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Visual Break**: Primarily used for visual separation.
 * - **Semantic Role**: The `decorative` prop is important for accessibility tools.
 * - **Dynamic Sizing**: The `data-orientation` attribute is used for applying dimension styles.
 */
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
