/**
 * @file
 * @summary Provides accessible ScrollArea and ScrollBar components for custom scrollable regions.
 * @description This file exports `ScrollArea` and `ScrollBar` components, built on top of Radix UI's ScrollArea primitives.
 * These components allow for creating custom scrollable areas with customizable scrollbars,
 * providing a consistent look and feel across different browsers and operating systems.
 *
 * @exports ScrollArea - A container for scrollable content with custom scrollbars.
 * @exports ScrollBar - The visual scrollbar component for the ScrollArea.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Custom Scrolling**: Recognize these components when a custom scroll experience is desired over native browser scrollbars.
 * - **Accessibility**: Note the use of Radix UI primitives for built-in accessibility features.
 * - **Styling**: The `cn` utility is used for conditional styling based on component state and props.
 */
import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

import { cn } from "src/utils/cn";

/**
 * @summary A container for scrollable content with custom scrollbars.
 * @description This component wraps its children in a scrollable viewport and provides
 * a customizable scrollbar. It wraps Radix UI's `ScrollAreaPrimitive.Root` and `ScrollAreaPrimitive.Viewport`.
 *
 * @param {object} props - The props for the ScrollArea component.
 * @param {string} [props.className] - Additional CSS classes to apply to the scroll area root.
 * @param {React.ReactNode} props.children - The content to be made scrollable.
 * @param {React.ComponentProps<typeof ScrollAreaPrimitive.Root>} props - All other props supported by `ScrollAreaPrimitive.Root`.
 * @returns {JSX.Element} A React element representing the scrollable area.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Content Overflow**: Use this component when content might exceed its container's dimensions and requires scrolling.
 * - **Viewport Styling**: The `ScrollAreaPrimitive.Viewport` is where the actual scrollable content resides.
 */
function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("relative", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className={cn(
          "focus-visible:ring-ring/50 size-full transition-[color,box-shadow] outline-none",
          "rounded-[var(--scroll-area-viewport-rounded)]",
          "focus-visible:ring-[var(--scroll-area-viewport-focus-ring)]",
          "focus-visible:outline-[var(--scroll-area-viewport-focus-outline)]"
        )}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}

/**
 * @summary The visual scrollbar component for the ScrollArea.
 * @description This component renders the customizable scrollbar for the `ScrollArea`.
 * It wraps Radix UI's `ScrollAreaPrimitive.ScrollAreaScrollbar` and `ScrollAreaPrimitive.ScrollAreaThumb`.
 *
 * @param {object} props - The props for the ScrollBar component.
 * @param {string} [props.className] - Additional CSS classes to apply to the scrollbar.
 * @param {"vertical" | "horizontal"} [props.orientation="vertical"] - The orientation of the scrollbar.
 * @param {React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>} props - All other props supported by `ScrollAreaPrimitive.ScrollAreaScrollbar`.
 * @returns {JSX.Element} A React element representing the scrollbar.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Styling**: This component is responsible for the visual appearance of the scrollbar.
 * - **Orientation**: The `orientation` prop determines whether it's a vertical or horizontal scrollbar.
 */
function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        "flex touch-none p-px transition-colors select-none",
        orientation === "vertical" &&
          "h-full w-[var(--scroll-area-scrollbar-width)] border-l border-l-[var(--scroll-area-scrollbar-border)]",
        orientation === "horizontal" &&
          "h-[var(--scroll-area-scrollbar-height)] flex-col border-t border-t-[var(--scroll-area-scrollbar-border)]",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="relative flex-1 bg-[var(--scroll-area-thumb-bg)]"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
}

export { ScrollArea, ScrollBar };
