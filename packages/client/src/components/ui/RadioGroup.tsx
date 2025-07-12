/**
 * @file
 * @summary Provides accessible RadioGroup and RadioGroupItem components.
 * @description This file exports `RadioGroup` and `RadioGroupItem` components, built on top of Radix UI's RadioGroup primitives.
 * These components provide a flexible and accessible way to create radio button groups in React applications,
 * handling selection state and keyboard navigation.
 *
 * @exports RadioGroup - A container for a set of radio buttons.
 * @exports RadioGroupItem - An individual radio button within a RadioGroup.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Form Inputs**: Recognize these components as standard form input elements for single-selection choices.
 * - **Accessibility**: Note the use of Radix UI primitives for built-in accessibility features.
 * - **Styling**: The `cn` utility is used for conditional styling based on component state and props.
 */
import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { CircleIcon } from "lucide-react";

import { cn } from "src/utils/cn";

/**
 * @summary A container for a set of radio buttons.
 * @description This component renders a group of radio buttons, ensuring only one can be selected at a time.
 * It wraps Radix UI's `RadioGroupPrimitive.Root` and applies custom styling.
 *
 * @param {object} props - The props for the RadioGroup component.
 * @param {string} [props.className] - Additional CSS classes to apply to the root element.
 * @param {React.ComponentProps<typeof RadioGroupPrimitive.Root>} props - All other props supported by `RadioGroupPrimitive.Root`.
 * @returns {JSX.Element} A React element representing the radio group.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Grouping**: This component defines the scope for radio button selection.
 * - **State Management**: The selection state is managed internally by Radix UI, but can be controlled via `value` and `onValueChange` props.
 */
function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  );
}

/**
 * @summary An individual radio button within a RadioGroup.
 * @description This component represents a single radio button. When selected, it displays a `CircleIcon`.
 * It wraps Radix UI's `RadioGroupPrimitive.Item` and applies custom styling for appearance and focus states.
 *
 * @param {object} props - The props for the RadioGroupItem component.
 * @param {string} [props.className] - Additional CSS classes to apply to the item element.
 * @param {React.ComponentProps<typeof RadioGroupPrimitive.Item>} props - All other props supported by `RadioGroupPrimitive.Item`.
 * @returns {JSX.Element} A React element representing the radio group item.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Interactive Element**: This is the clickable element for selecting an option within a radio group.
 * - **Visual Feedback**: The `CircleIcon` within `RadioGroupPrimitive.Indicator` provides visual feedback for the selected state.
 * - **Styling**: Extensive `cn` usage for dynamic styling based on state (e.g., `disabled`, `focus-visible`, `aria-invalid`).
 */
function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed",
        "border-[var(--radio-group-item-border)] text-[var(--radio-group-item-text)] shadow-[var(--radio-group-item-shadow)]",
        "focus-visible:border-[var(--radio-group-item-focus-ring)] focus-visible:ring-[var(--radio-group-item-focus-ring)] focus-visible:ring-opacity-[var(--radio-group-item-focus-ring-opacity)] focus-visible:ring-[3px]",
        "aria-invalid:ring-[var(--radio-group-error-ring)] aria-invalid:border-[var(--radio-group-error-border)] aria-invalid:ring-opacity-[var(--radio-group-error-ring-opacity)]",
        "dark:bg-[var(--radio-group-dark-bg)] disabled:opacity-[var(--radio-group-item-disabled-opacity)]",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <CircleIcon className="fill-[var(--radio-group-indicator-bg)] absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
