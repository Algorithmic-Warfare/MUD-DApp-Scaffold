/**
 * @file
 * @summary Provides accessible Accordion components for collapsible content sections.
 * @description This file exports a set of components for creating accessible accordions, built on top of Radix UI's Accordion primitives.
 * These components include `Accordion`, `AccordionItem`, `AccordionTrigger`, and `AccordionContent`.
 * They provide a flexible and accessible way to create collapsible content sections, handling
 * keyboard navigation, focus management, and proper ARIA attributes.
 *
 * @exports Accordion - The root component for an accordion.
 * @exports AccordionItem - An individual collapsible item within an accordion.
 * @exports AccordionTrigger - The clickable element that toggles the visibility of an AccordionContent.
 * @exports AccordionContent - The collapsible content area of an AccordionItem.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Collapsible Content**: Recognize these components as the standard way to implement collapsible content sections.
 * - **Accessibility**: Note the use of Radix UI primitives for built-in accessibility features.
 * - **Composition**: The components are designed to be composed together to build complete accordion experiences.
 * - **Styling**: The `cn` utility is used for conditional styling based on component state and props, including animations for opening and closing.
 */
import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "src/utils/cn";

/**
 * @summary The root component for an accordion.
 * @description This component provides the context for all other accordion-related components.
 * It wraps Radix UI's `AccordionPrimitive.Root` and applies custom styling for its background and border.
 *
 * @param {object} props - The props for the Accordion component.
 * @param {string} [props.className] - Additional CSS classes to apply to the accordion root.
 * @param {React.ComponentProps<typeof AccordionPrimitive.Root>} props - All other props supported by `AccordionPrimitive.Root`.
 * @returns {JSX.Element} A React element representing the accordion root.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Container**: This component acts as the main container for a set of collapsible items.
 * - **State Management**: The open/closed state of accordion items is managed here.
 */
function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn(
        "bg-[var(--accordion-bg)] border-[var(--accordion-border-color)]",
        className
      )}
      {...props}
    />
  );
}

/**
 * @summary An individual collapsible item within an accordion.
 * @description This component represents a single collapsible section within an `Accordion`.
 * It wraps Radix UI's `AccordionPrimitive.Item` and applies custom styling for its bottom border.
 *
 * @param {object} props - The props for the AccordionItem component.
 * @param {string} [props.className] - Additional CSS classes to apply to the accordion item.
 * @param {React.ComponentProps<typeof AccordionPrimitive.Item>} props - All other props supported by `AccordionPrimitive.Item`.
 * @returns {JSX.Element} A React element representing the accordion item.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Sectional Content**: Each `AccordionItem` represents a distinct, collapsible section of content.
 */
function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "border-b last:border-b-0 border-[var(--accordion-item-border-color)] pb-[var(--accordion-item-spacing)]",
        className
      )}
      {...props}
    />
  );
}

/**
 * @summary The clickable element that toggles the visibility of an AccordionContent.
 * @description This component renders the trigger for an `AccordionItem`, typically a button
 * that expands or collapses the associated content. It wraps Radix UI's `AccordionPrimitive.Trigger`
 * and includes a `ChevronDownIcon` that rotates based on the open/closed state.
 *
 * @param {object} props - The props for the AccordionTrigger component.
 * @param {string} [props.className] - Additional CSS classes to apply to the trigger.
 * @param {React.ReactNode} props.children - The content to be displayed within the trigger (e.g., the section title).
 * @param {React.ComponentProps<typeof AccordionPrimitive.Trigger>} props - All other props supported by `AccordionPrimitive.Trigger`.
 * @returns {JSX.Element} A React element representing the accordion trigger.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Interaction Point**: This is the user-facing element that controls the collapsible content.
 * - **Iconography**: The `ChevronDownIcon` provides visual feedback on the expanded/collapsed state.
 * - **State-based Styling**: Note the `data-state=open` attribute for rotating the icon.
 */
function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-[var(--accordion-trigger-padding)] text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          "font-[var(--accordion-trigger-font)] text-[var(--accordion-trigger-font-size)] bg-[var(--accordion-trigger-bg)] hover:text-[var(--accordion-trigger-hover-color)] hover:bg-[var(--accordion-trigger-hover-bg)] focus:ring-[var(--accordion-trigger-focus-ring)] [&[data-state=open]]text-[var(--accordion-trigger-open-color)] disabled:opacity-[var(--accordion-trigger-disabled-opacity)]",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

/**
 * @summary The collapsible content area of an AccordionItem.
 * @description This component renders the content that is shown or hidden when the `AccordionTrigger`
 * is activated. It wraps Radix UI's `AccordionPrimitive.Content` and includes animations for expanding and collapsing.
 *
 * @param {object} props - The props for the AccordionContent component.
 * @param {string} [props.className] - Additional CSS classes to apply to the content area.
 * @param {React.ReactNode} props.children - The content to be displayed when the accordion item is open.
 * @param {React.ComponentProps<typeof AccordionPrimitive.Content>} props - All other props supported by `AccordionPrimitive.Content`.
 * @returns {JSX.Element} A React element representing the accordion content.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Hidden/Shown Content**: This component holds the content that is toggled by the trigger.
 * - **Animation**: Note the `data-state` attributes for controlling entry/exit animations (`animate-accordion-up`, `animate-accordion-down`).
 */
function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className={cn(
        "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm",
        "font-[var(--accordion-content-font)] text-[var(--accordion-content-font-size)] color-[var(--accordion-content-color)] bg-[var(--accordion-content-bg)] pt-0 pb-[var(--accordion-content-padding)]",
        className
      )}
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
