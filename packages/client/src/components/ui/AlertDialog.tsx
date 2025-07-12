/**
 * @file
 * @summary Provides accessible AlertDialog components for displaying critical alerts and confirmations.
 * @description This file exports a set of components for creating accessible alert dialogs, built on top of Radix UI's AlertDialog primitives.
 * These components include `AlertDialog`, `AlertDialogTrigger`, `AlertDialogContent`, `AlertDialogHeader`, `AlertDialogFooter`,
 * `AlertDialogTitle`, `AlertDialogDescription`, `AlertDialogOverlay`, `AlertDialogPortal`, `AlertDialogAction`, and `AlertDialogCancel`.
 * They provide a flexible and accessible way to create modal alert dialogs in React applications,
 * handling focus management, keyboard interactions, and proper ARIA attributes for critical user confirmations.
 *
 * @exports AlertDialog - The root component for an alert dialog.
 * @exports AlertDialogTrigger - A component that triggers the opening of an alert dialog.
 * @exports AlertDialogPortal - A component that renders its children outside the DOM hierarchy of the parent component.
 * @exports AlertDialogOverlay - An overlay that covers the rest of the page when the alert dialog is open.
 * @exports AlertDialogContent - The main content area of the alert dialog.
 * @exports AlertDialogHeader - The header section of the alert dialog, typically containing the title and description.
 * @exports AlertDialogFooter - The footer section of the alert dialog, typically containing action buttons.
 * @exports AlertDialogTitle - The title of the alert dialog.
 * @exports AlertDialogDescription - The description of the alert dialog.
 * @exports AlertDialogAction - A button that performs the primary action of the alert dialog.
 * @exports AlertDialogCancel - A button that cancels the action and closes the alert dialog.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Critical Interactions**: Recognize these components as the standard way to implement critical user confirmations or alerts.
 * - **Accessibility**: Note the use of Radix UI primitives for built-in accessibility features like focus trapping and keyboard navigation.
 * - **Composition**: The components are designed to be composed together to build complete alert dialog experiences.
 * - **Styling**: The `cn` utility is used for conditional styling based on component state and props, including animations for opening and closing.
 */
import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

import { cn } from "src/utils/cn";
import { buttonVariants, VariantProps } from "src/components/ui/Button";

/**
 * @summary The root component for an alert dialog.
 * @description This component provides the context for all other alert dialog-related components.
 * It wraps Radix UI's `AlertDialogPrimitive.Root`.
 *
 * @param {object} props - The props for the AlertDialog component.
 * @param {React.ComponentProps<typeof AlertDialogPrimitive.Root>} props - All other props supported by `AlertDialogPrimitive.Root`.
 * @returns {JSX.Element} A React element representing the alert dialog root.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Container**: This component acts as the main container for an alert dialog.
 * - **State Management**: The open/closed state of the alert dialog is managed here.
 */
function AlertDialog({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}

/**
 * @summary A component that triggers the opening of an alert dialog.
 * @description This component renders a trigger element that, when interacted with, opens the associated alert dialog.
 * It wraps Radix UI's `AlertDialogPrimitive.Trigger`.
 *
 * @param {object} props - The props for the AlertDialogTrigger component.
 * @param {React.ComponentProps<typeof AlertDialogPrimitive.Trigger>} props - All other props supported by `AlertDialogPrimitive.Trigger`.
 * @returns {JSX.Element} A React element representing the alert dialog trigger.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Interaction Point**: This is the user-facing element that initiates the alert dialog.
 */
function AlertDialogTrigger({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  );
}

/**
 * @summary A component that renders its children outside the DOM hierarchy of the parent component.
 * @description This component is used to render alert dialog content in a React Portal, ensuring it's
 * mounted directly under the `body` element to avoid z-index issues and other layout problems.
 * It wraps Radix UI's `AlertDialogPrimitive.Portal`.
 *
 * @param {object} props - The props for the AlertDialogPortal component.
 * @param {React.ComponentProps<typeof AlertDialogPrimitive.Portal>} props - All other props supported by `AlertDialogPrimitive.Portal`.
 * @returns {JSX.Element} A React element representing the alert dialog portal.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **DOM Structure**: Understand that content within this component will be rendered at the root of the DOM.
 * - **Layering**: Essential for ensuring alert dialogs appear above all other content.
 */
function AlertDialogPortal({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  );
}

/**
 * @summary An overlay that covers the rest of the page when the alert dialog is open.
 * @description This component provides a visual backdrop behind the alert dialog, typically used to
 * dim the content underneath and indicate that the alert dialog is the primary focus.
 * It wraps Radix UI's `AlertDialogPrimitive.Overlay` and includes animation for fade-in/fade-out.
 *
 * @param {object} props - The props for the AlertDialogOverlay component.
 * @param {string} [props.className] - Additional CSS classes to apply to the overlay.
 * @param {React.ComponentProps<typeof AlertDialogPrimitive.Overlay>} props - All other props supported by `AlertDialogPrimitive.Overlay`.
 * @returns {JSX.Element} A React element representing the alert dialog overlay.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Visual Cue**: Indicates that the background content is temporarily inaccessible.
 * - **Animation**: Note the `data-[state]` attributes for controlling entry/exit animations.
 */
const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentProps<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    ref={ref}
    data-slot="alert-dialog-overlay"
    className={cn(
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50",
      "bg-[var(--alert-dialog-overlay-bg)] backdrop-blur-[var(--alert-dialog-overlay-blur)]",
      className
    )}
    {...props}
  />
));
AlertDialogOverlay.displayName = "AlertDialogOverlay";

/**
 * @summary The main content area of the alert dialog.
 * @description This component contains the primary content of the alert dialog, including the header, body, and footer.
 * It is rendered within an `AlertDialogPortal` and includes animations for entry and exit.
 *
 * @param {object} props - The props for the AlertDialogContent component.
 * @param {string} [props.className] - Additional CSS classes to apply to the content area.
 * @param {React.ComponentProps<typeof AlertDialogPrimitive.Content>} props - All other props supported by `AlertDialogPrimitive.Content`.
 * @returns {JSX.Element} A React element representing the alert dialog content.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Primary Content**: This is where the main interactive elements and information of the alert dialog reside.
 * - **Positioning**: Note the fixed positioning and `translate-x/y` for centering the alert dialog.
 */
const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentProps<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      data-slot="alert-dialog-content"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 sm:max-w-lg",
        "bg-[var(--alert-dialog-content-bg)] border-[var(--alert-dialog-content-border)] shadow-[var(--alert-dialog-content-shadow)] rounded-[var(--alert-dialog-content-radius)] max-w-[var(--alert-dialog-content-max-width)] p-[var(--alert-dialog-content-padding)]",
        className
      )}
      {...props}
    />
  </AlertDialogPortal>
));
AlertDialogContent.displayName = "AlertDialogContent";

/**
 * @summary The header section of the alert dialog, typically containing the title and description.
 * @description This component provides a consistent layout for the alert dialog's header.
 *
 * @param {object} props - The props for the AlertDialogHeader component.
 * @param {string} [props.className] - Additional CSS classes to apply to the header.
 * @param {React.ComponentProps<"div">} props - All other props supported by a `div` element.
 * @returns {JSX.Element} A React element representing the alert dialog header.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Structural Element**: Used for organizing the top section of the alert dialog.
 */
const AlertDialogHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="alert-dialog-header"
    className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
    {...props}
  />
));
AlertDialogHeader.displayName = "AlertDialogHeader";

/**
 * @summary The footer section of the alert dialog, typically containing action buttons.
 * @description This component provides a consistent layout for the alert dialog's footer,
 * often used for "Confirm" and "Cancel" buttons.
 *
 * @param {object} props - The props for the AlertDialogFooter component.
 * @param {string} [props.className] - Additional CSS classes to apply to the footer.
 * @param {React.ComponentProps<"div">} props - All other props supported by a `div` element.
 * @returns {JSX.Element} A React element representing the alert dialog footer.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Structural Element**: Used for organizing the bottom section of the alert dialog.
 * - **Action Buttons**: Typically contains buttons that perform actions related to the alert dialog.
 */
const AlertDialogFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="alert-dialog-footer"
    className={cn(
      "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
      className
    )}
    {...props}
  />
));
AlertDialogFooter.displayName = "AlertDialogFooter";

/**
 * @summary The title of the alert dialog.
 * @description This component renders the main title of the alert dialog, providing a clear heading for its purpose.
 * It wraps Radix UI's `AlertDialogPrimitive.Title`.
 *
 * @param {object} props - The props for the AlertDialogTitle component.
 * @param {string} [props.className] - Additional CSS classes to apply to the title.
 * @param {React.ComponentProps<typeof AlertDialogPrimitive.Title>} props - All other props supported by `AlertDialogPrimitive.Title`.
 * @returns {JSX.Element} A React element representing the alert dialog title.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Heading**: This is the primary heading for the alert dialog.
 */
const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentProps<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    data-slot="alert-dialog-title"
    className={cn(
      "text-lg color-[var(--alert-dialog-title-color)] font-[var(--alert-dialog-title-font)] text-[var(--alert-dialog-title-size)] ]",
      className
    )}
    {...props}
  />
));
AlertDialogTitle.displayName = "AlertDialogTitle";

/**
 * @summary The description of the alert dialog.
 * @description This component provides supplementary information or context for the alert dialog's purpose.
 * It wraps Radix UI's `AlertDialogPrimitive.Description`.
 *
 * @param {object} props - The props for the AlertDialogDescription component.
 * @param {string} [props.className] - Additional CSS classes to apply to the description.
 * @param {React.ComponentProps<typeof AlertDialogPrimitive.Description>} props - All other props supported by `AlertDialogPrimitive.Description`.
 * @returns {JSX.Element} A React element representing the alert dialog description.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Contextual Information**: Provides additional details about the alert dialog's purpose or content.
 */
const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentProps<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    data-slot="alert-dialog-description"
    className={cn(
      "text-muted-foreground text-sm color-[var(--alert-dialog-description-color)] font-[var(--alert-dialog-description-font)] text-[var(--alert-dialog-description-size)]",
      className
    )}
    {...props}
  />
));
AlertDialogDescription.displayName = "AlertDialogDescription";

/**
 * @summary A button that performs the primary action of the alert dialog.
 * @description This component renders a button that, when clicked, confirms the action and closes the alert dialog.
 * It wraps Radix UI's `AlertDialogPrimitive.Action` and applies button styling.
 *
 * @param {object} props - The props for the AlertDialogAction component.
 * @param {string} [props.className] - Additional CSS classes to apply to the button.
 * @param {"primary-default" | "primary-destructive"} [props.variant="primary-default"] - The visual style of the button.
 * @param {VariantProps<typeof buttonVariants>["size"]} [props.size] - The size of the button.
 * @param {boolean} [props.asChild] - If true, the component will be rendered as the child of the element passed to it.
 * @param {React.ComponentProps<typeof AlertDialogPrimitive.Action>} props - All other props supported by `AlertDialogPrimitive.Action`.
 * @returns {JSX.Element} A React element representing the alert dialog action button.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Confirmation Action**: This button typically represents the affirmative action in the alert dialog.
 * - **Styling**: Inherits styling from `buttonVariants`.
 */
interface AlertDialogActionProps
  extends React.ComponentProps<typeof AlertDialogPrimitive.Action> {
  variant?: "primary-default" | "primary-destructive";
  size?: VariantProps<typeof buttonVariants>["size"];
  asChild?: boolean;
}

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  AlertDialogActionProps
>(({ className, variant = "primary-default", ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(buttonVariants({ variant }), className)}
    {...props}
  />
));
AlertDialogAction.displayName = "AlertDialogAction";

/**
 * @summary A button that cancels the action and closes the alert dialog.
 * @description This component renders a button that, when clicked, cancels the action and closes the alert dialog.
 * It wraps Radix UI's `AlertDialogPrimitive.Cancel` and applies button styling.
 *
 * @param {object} props - The props for the AlertDialogCancel component.
 * @param {string} [props.className] - Additional CSS classes to apply to the button.
 * @param {React.ComponentProps<typeof AlertDialogPrimitive.Cancel>} props - All other props supported by `AlertDialogPrimitive.Cancel`.
 * @returns {JSX.Element} A React element representing the alert dialog cancel button.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Cancellation Action**: This button typically represents the negative or dismissive action in the alert dialog.
 * - **Styling**: Inherits styling from `buttonVariants`.
 */
const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentProps<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(buttonVariants({ variant: "secondary-outline" }), className)}
    {...props}
  />
));
AlertDialogCancel.displayName = "AlertDialogCancel";

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
