/**
 * @file
 * @summary Provides accessible Dialog (Modal) components for displaying interactive overlays.
 * @description This file exports a set of components for creating accessible dialogs, built on top of Radix UI's Dialog primitives.
 * These components include `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`,
 * `DialogDescription`, `DialogOverlay`, `DialogPortal`, and `DialogClose`. They provide a flexible and
 * accessible way to create modal dialogs in React applications, handling focus management,
 * keyboard interactions, and proper ARIA attributes.
 *
 * @exports Dialog - The root component for a dialog.
 * @exports DialogTrigger - A component that triggers the opening of a dialog.
 * @exports DialogPortal - A component that renders its children outside the DOM hierarchy of the parent component.
 * @exports DialogClose - A component that closes the dialog when interacted with.
 * @exports DialogOverlay - An overlay that covers the rest of the page when the dialog is open.
 * @exports DialogContent - The main content area of the dialog.
 * @exports DialogHeader - The header section of the dialog, typically containing the title and description.
 * @exports DialogFooter - The footer section of the dialog, typically containing action buttons.
 * @exports DialogTitle - The title of the dialog.
 * @exports DialogDescription - The description of the dialog.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Modal Interactions**: Recognize these components as the standard way to implement modal dialogs.
 * - **Accessibility**: Note the use of Radix UI primitives for built-in accessibility features like focus trapping and keyboard navigation.
 * - **Composition**: The components are designed to be composed together to build complete dialog experiences.
 * - **Styling**: The `cn` utility is used for conditional styling based on component state and props, including animations for opening and closing.
 */
import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";

import { cn } from "src/utils/cn";

/**
 * @summary The root component for a dialog.
 * @description This component provides the context for all other dialog-related components.
 * It wraps Radix UI's `DialogPrimitive.Root`.
 *
 * @param {object} props - The props for the Dialog component.
 * @param {React.ComponentProps<typeof DialogPrimitive.Root>} props - All other props supported by `DialogPrimitive.Root`.
 * @returns {JSX.Element} A React element representing the dialog root.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Container**: This component acts as the main container for a modal dialog.
 * - **State Management**: The open/closed state of the dialog is managed here.
 */
function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

/**
 * @summary A component that triggers the opening of a dialog.
 * @description This component renders a trigger element that, when interacted with, opens the associated dialog.
 * It wraps Radix UI's `DialogPrimitive.Trigger`.
 *
 * @param {object} props - The props for the DialogTrigger component.
 * @param {React.ComponentProps<typeof DialogPrimitive.Trigger>} props - All other props supported by `DialogPrimitive.Trigger`.
 * @returns {JSX.Element} A React element representing the dialog trigger.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Interaction Point**: This is the user-facing element that initiates the dialog.
 */
function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

/**
 * @summary A component that renders its children outside the DOM hierarchy of the parent component.
 * @description This component is used to render dialog content in a React Portal, ensuring it's
 * mounted directly under the `body` element to avoid z-index issues and other layout problems.
 * It wraps Radix UI's `DialogPrimitive.Portal`.
 *
 * @param {object} props - The props for the DialogPortal component.
 * @param {React.ComponentProps<typeof DialogPrimitive.Portal>} props - All other props supported by `DialogPrimitive.Portal`.
 * @returns {JSX.Element} A React element representing the dialog portal.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **DOM Structure**: Understand that content within this component will be rendered at the root of the DOM.
 * - **Layering**: Essential for ensuring dialogs appear above all other content.
 */
function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

/**
 * @summary A component that closes the dialog when interacted with.
 * @description This component renders a close button or element that, when clicked, closes the dialog.
 * It wraps Radix UI's `DialogPrimitive.Close`.
 *
 * @param {object} props - The props for the DialogClose component.
 * @param {React.ComponentProps<typeof DialogPrimitive.Close>} props - All other props supported by `DialogPrimitive.Close`.
 * @returns {JSX.Element} A React element representing the dialog close button.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Closing Mechanism**: This is a standard way to dismiss the dialog.
 */
function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

/**
 * @summary An overlay that covers the rest of the page when the dialog is open.
 * @description This component provides a visual backdrop behind the dialog, typically used to
 * dim the content underneath and indicate that the dialog is the primary focus.
 * It wraps Radix UI's `DialogPrimitive.Overlay` and includes animation for fade-in/fade-out.
 *
 * @param {object} props - The props for the DialogOverlay component.
 * @param {string} [props.className] - Additional CSS classes to apply to the overlay.
 * @param {React.ComponentProps<typeof DialogPrimitive.Overlay>} props - All other props supported by `DialogPrimitive.Overlay`.
 * @returns {JSX.Element} A React element representing the dialog overlay.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Visual Cue**: Indicates that the background content is temporarily inaccessible.
 * - **Animation**: Note the `data-[state]` attributes for controlling entry/exit animations.
 */
function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50",
        "bg-[var(--dialog-overlay-bg)]",
        className
      )}
      {...props}
    />
  );
}

/**
 * @summary The main content area of the dialog.
 * @description This component contains the primary content of the dialog, including the header, body, and footer.
 * It is rendered within a `DialogPortal` and includes animations for entry and exit.
 *
 * @param {object} props - The props for the DialogContent component.
 * @param {string} [props.className] - Additional CSS classes to apply to the content area.
 * @param {React.ReactNode} props.children - The child components to be rendered within the dialog content.
 * @param {React.ComponentProps<typeof DialogPrimitive.Content>} props - All other props supported by `DialogPrimitive.Content`.
 * @returns {JSX.Element} A React element representing the dialog content.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Primary Content**: This is where the main interactive elements and information of the dialog reside.
 * - **Positioning**: Note the fixed positioning and `translate-x/y` for centering the dialog.
 * - **Close Button**: Includes a default close button (`XIcon`) for user convenience.
 */
function DialogContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "bg-[var(--dialog-content-bg)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 border-[var(--dialog-content-border)] p-[var(--dialog-content-padding)] shadow-[var(--dialog-content-shadow)] duration-200 sm:max-w-lg",
          className
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
          <XIcon />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

/**
 * @summary The header section of the dialog, typically containing the title and description.
 * @description This component provides a consistent layout for the dialog's header.
 *
 * @param {object} props - The props for the DialogHeader component.
 * @param {string} [props.className] - Additional CSS classes to apply to the header.
 * @param {React.ComponentProps<"div">} props - All other props supported by a `div` element.
 * @returns {JSX.Element} A React element representing the dialog header.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Structural Element**: Used for organizing the top section of the dialog.
 */
function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  );
}

/**
 * @summary The footer section of the dialog, typically containing action buttons.
 * @description This component provides a consistent layout for the dialog's footer,
 * often used for "Confirm" and "Cancel" buttons.
 *
 * @param {object} props - The props for the DialogFooter component.
 * @param {string} [props.className] - Additional CSS classes to apply to the footer.
 * @param {React.ComponentProps<"div">} props - All other props supported by a `div` element.
 * @returns {JSX.Element} A React element representing the dialog footer.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Structural Element**: Used for organizing the bottom section of the dialog.
 * - **Action Buttons**: Typically contains buttons that perform actions related to the dialog.
 */
function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  );
}

/**
 * @summary The title of the dialog.
 * @description This component renders the main title of the dialog, providing a clear heading for its purpose.
 * It wraps Radix UI's `DialogPrimitive.Title`.
 *
 * @param {object} props - The props for the DialogTitle component.
 * @param {string} [props.className] - Additional CSS classes to apply to the title.
 * @param {React.ComponentProps<typeof DialogPrimitive.Title>} props - All other props supported by `DialogPrimitive.Title`.
 * @returns {JSX.Element} A React element representing the dialog title.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Heading**: This is the primary heading for the dialog.
 */
function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  );
}

/**
 * @summary The description of the dialog.
 * @description This component provides supplementary information or context for the dialog's purpose.
 * It wraps Radix UI's `DialogPrimitive.Description`.
 *
 * @param {object} props - The props for the DialogDescription component.
 * @param {string} [props.className] - Additional CSS classes to apply to the description.
 * @param {React.ComponentProps<typeof DialogPrimitive.Description>} props - All other props supported by `DialogPrimitive.Description`.
 * @returns {JSX.Element} A React element representing the dialog description.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Contextual Information**: Provides additional details about the dialog's purpose or content.
 */
function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
