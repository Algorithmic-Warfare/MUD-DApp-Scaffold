/**
 * @file
 * @summary Provides an accessible Label component for form elements.
 * @description This file exports the `Label` component, built on top of Radix UI's Label primitives.
 * It provides an accessible way to associate text labels with form controls (e.g., inputs, checkboxes),
 * improving usability and accessibility for users, especially those relying on assistive technologies.
 *
 * @exports Label - A component for associating text labels with form elements.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Form Accessibility**: Always use this component to label form inputs for better accessibility.
 * - **Association**: It automatically associates with form controls when used with `htmlFor` or when wrapping the control.
 * - **Styling**: The `cn` utility is used for conditional styling, and CSS variables are used for theming.
 */
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "src/utils/cn";

/**
 * @summary An accessible Label component for form elements.
 * @description This component renders a `label` HTML element that can be associated with form controls.
 * It wraps Radix UI's `LabelPrimitive.Root` and applies custom styling.
 *
 * @param {object} props - The props for the Label component.
 * @param {string} [props.className] - Additional CSS classes to apply to the label.
 * @param {React.ComponentProps<typeof LabelPrimitive.Root>} props - All other props supported by `LabelPrimitive.Root`.
 * @returns {JSX.Element} A React element representing the label.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Input Labeling**: This component is crucial for providing clear labels for form inputs.
 * - **Disabled States**: Note the styling for `group-data-[disabled]` and `peer-disabled` states, indicating how it reacts to disabled form controls.
 */
function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-[var(--label-gap)] text-[var(--label-font-size)] leading-[var(--label-line-height)] font-[var(--label-font-weight)] select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-[var(--label-disabled-opacity)] peer-disabled:cursor-not-allowed peer-disabled:opacity-[var(--label-disabled-opacity)]",
        className
      )}
      {...props}
    />
  );
}

export { Label };
