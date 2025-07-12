/**
 * @file
 * @summary Provides a customizable Textarea component for multi-line text input.
 * @description This file exports the `Textarea` component, which is a flexible and accessible
 * input field designed for capturing multi-line text from users. It supports various
 * styling options and integrates with utility functions for dynamic class application.
 *
 * @exports Textarea - A component for multi-line text input.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **User Input**: Recognize this component as a standard input for longer text entries (e.g., comments, descriptions).
 * - **Styling**: Note the extensive use of CSS variables for theming and `cn` for conditional styling.
 * - **Accessibility**: Inherits standard HTML textarea accessibility features.
 */
import * as React from "react";

import { cn } from "src/utils/cn";

/**
 * @summary A customizable Textarea component for multi-line text input.
 * @description This component renders a `textarea` HTML element with custom styling and
 * support for dynamic class names. It's designed to be used for multi-line text input.
 *
 * @param {object} props - The props for the Textarea component.
 * @param {string} [props.className] - Additional CSS classes to apply to the textarea.
 * @param {React.ComponentProps<"textarea">} props - All other standard HTML `textarea` attributes.
 * @returns {JSX.Element} A React element representing the textarea.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Input Field**: This is a direct wrapper around the native `textarea` element.
 * - **Dynamic Sizing**: The `field-sizing-content` class suggests it might adapt its height to content.
 * - **State Visuals**: Includes styles for `focus-visible`, `aria-invalid`, and `disabled` states.
 */
function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-[var(--textarea-border)] placeholder:text-[var(--textarea-placeholder)] focus-visible:border-[var(--textarea-focus-border)] focus-visible:ring-[var(--textarea-focus-ring)] aria-invalid:ring-[var(--textarea-error-ring)] aria-invalid:border-[var(--textarea-error-border)] flex field-sizing-content min-h-16 w-full border bg-[var(--textarea-bg)] px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
