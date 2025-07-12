/**
 * @file
 * @summary Provides a customizable Progress component for displaying progress of a task.
 * @description This file exports the `Progress` component, built on top of Radix UI's Progress primitives.
 * It provides a visual indicator of the completion status of a task, typically represented as a progress bar.
 *
 * @exports Progress - A component for displaying progress of a task.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Progress Indication**: Use this component to show the progress of operations like loading, uploading, or processing.
 * - **Accessibility**: Note the use of Radix UI primitives for built-in accessibility features.
 * - **Styling**: The `cn` utility is used for conditional styling, and CSS variables are used for theming.
 */
import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

/**
 * @summary A customizable Progress component for displaying progress of a task.
 * @description This component renders a progress bar that visually indicates the completion status.
 * It wraps Radix UI's `ProgressPrimitive.Root` and `ProgressPrimitive.Indicator`.
 *
 * @param {object} props - The props for the Progress component.
 * @param {string} [props.className] - Additional CSS classes to apply to the progress bar.
 * @param {number} [props.value] - The current progress value (0-100).
 * @param {React.ComponentProps<typeof ProgressPrimitive.Root>} props - All other props supported by `ProgressPrimitive.Root`.
 * @returns {JSX.Element} A React element representing the progress bar.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Value Mapping**: The `value` prop directly controls the width of the progress indicator.
 * - **Visual Feedback**: Provides immediate visual feedback on the status of an ongoing process.
 */
function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "relative h-2 w-full overflow-hidden",
        "bg-[var(--progress-bg)] rounded-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="h-full w-full flex-1 transition-all bg-[var(--progress-indicator-bg)]"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
