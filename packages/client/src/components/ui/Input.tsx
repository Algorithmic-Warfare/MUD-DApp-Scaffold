/**
 * @file
 * @summary Provides a customizable Input component for single-line text input.
 * @description This file exports the `Input` component, which is a flexible and accessible
 * input field designed for capturing single-line text from users. It supports various
 * input types (e.g., text, password, email) and integrates with utility functions for
 * dynamic class application.
 *
 * @exports Input - A component for single-line text input.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **User Input**: Recognize this component as a standard input for short text entries (e.g., names, emails, passwords).
 * - **Styling**: Note the extensive use of CSS variables for theming and `cn` for conditional styling.
 * - **Accessibility**: Inherits standard HTML input accessibility features.
 */
import * as React from "react";

import { cn } from "src/utils/cn";

/**
 * @summary A customizable Input component for single-line text input.
 * @description This component renders an `input` HTML element with custom styling and
 * support for various input types and dynamic class names. It's designed to be used
 * for single-line text input.
 *
 * @param {object} props - The props for the Input component.
 * @param {string} [props.className] - Additional CSS classes to apply to the input.
 * @param {React.HTMLInputTypeAttribute} [props.type="text"] - The type of the input (e.g., "text", "password", "email").
 * @param {React.ComponentProps<"input">} props - All other standard HTML `input` attributes.
 * @returns {JSX.Element} A React element representing the input field.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Input Field**: This is a direct wrapper around the native `input` element.
 * - **Type Attribute**: The `type` prop is crucial for semantic input and browser behavior (e.g., keyboard type on mobile).
 * - **State Visuals**: Includes styles for `focus-visible`, `aria-invalid`, and `disabled` states.
 */
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-[var(--input-height)] w-full min-w-0",
        "border bg-[var(--input-bg)] px-[var(--input-padding)] py-1 text-base",
        "shadow-[var(--input-shadow)] transition-[var(--input-transition)] outline-none",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-[var(--input-disabled-opacity)]",
        "text-[var(--input-text)] placeholder:text-[var(--input-placeholder)]",
        "selection:bg-primary selection:text-primary-foreground",
        "border-[var(--input-border)]",
        "focus-visible:border-[var(--input-focus-border)] focus-visible:ring-[var(--input-focus-ring)] focus-visible:ring-[3px]",
        "aria-invalid:border-[var(--input-error-border)] aria-invalid:ring-[var(--input-error-ring)]",
        "md:text-sm file:text-foreground",
        className
      )}
      {...props}
    />
  );
}

export { Input };
