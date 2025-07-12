/**
 * @file
 * @summary Provides an accessible Checkbox component for boolean input.
 * @description This file exports the `Checkbox` component, built on top of Radix UI's Checkbox primitives.
 * It provides an accessible way to allow users to select or deselect a boolean option,
 * handling checked states, indeterminate states, and keyboard interactions.
 *
 * @exports Checkbox - A component for boolean input.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Boolean Input**: Recognize this component as a standard input for on/off or true/false selections.
 * - **Accessibility**: Note the use of Radix UI primitives for built-in accessibility features.
 * - **Styling**: The `cn` utility is used for conditional styling based on component state and props.
 */
import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "src/utils/cn"

/**
 * @summary An accessible Checkbox component for boolean input.
 * @description This component renders a checkbox input with custom styling and
 * support for checked, unchecked, and indeterminate states. It wraps Radix UI's
 * `CheckboxPrimitive.Root` and `CheckboxPrimitive.Indicator`.
 *
 * @param {object} props - The props for the Checkbox component.
 * @param {string} [props.className] - Additional CSS classes to apply to the checkbox.
 * @param {React.ComponentProps<typeof CheckboxPrimitive.Root>} props - All other props supported by `CheckboxPrimitive.Root`.
 * @returns {JSX.Element} A React element representing the checkbox.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **State Management**: The `data-state` attribute (e.g., `checked`, `unchecked`, `indeterminate`) is key for styling.
 * - **Visual Feedback**: The `CheckIcon` within `CheckboxPrimitive.Indicator` provides visual feedback for the checked state.
 * - **Peer Styling**: The `peer` class suggests it might be styled in relation to a sibling `Label` component.
 */
function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
