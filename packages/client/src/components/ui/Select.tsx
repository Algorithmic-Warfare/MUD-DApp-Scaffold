/**
 * @file
 * @summary Provides accessible Select components for custom dropdown menus.
 * @description This file exports a set of components for creating accessible select dropdowns, built on top of Radix UI's Select primitives.
 * These components include `Select`, `SelectGroup`, `SelectValue`, `SelectTrigger`, `SelectContent`, `SelectLabel`,
 * `SelectItem`, `SelectSeparator`, `SelectScrollUpButton`, and `SelectScrollDownButton`. They provide a flexible and
 * accessible way to create custom select inputs in React applications, handling keyboard navigation,
 * focus management, and proper ARIA attributes.
 *
 * @exports Select - The root component for a select dropdown.
 * @exports SelectGroup - A component for grouping select items.
 * @exports SelectValue - A component that displays the currently selected value.
 * @exports SelectTrigger - A component that triggers the opening of the select dropdown.
 * @exports SelectContent - The content area of the select dropdown, containing items.
 * @exports SelectLabel - A label for a group of select items.
 * @exports SelectItem - An individual selectable item within the dropdown.
 * @exports SelectSeparator - A visual separator between select items or groups.
 * @exports SelectScrollUpButton - A button to scroll up within the select content.
 * @exports SelectScrollDownButton - A button to scroll down within the select content.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Dropdown Menus**: Recognize these components as the standard way to implement custom dropdown select inputs.
 * - **Accessibility**: Note the use of Radix UI primitives for built-in accessibility features.
 * - **Composition**: The components are designed to be composed together to build complete select experiences.
 * - **Styling**: The `cn` utility is used for conditional styling based on component state and props, including animations for opening and closing.
 */
import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";

import { cn } from "src/utils/cn";

/**
 * @summary The root component for a select dropdown.
 * @description This component provides the context for all other select-related components.
 * It wraps Radix UI's `SelectPrimitive.Root`.
 *
 * @param {object} props - The props for the Select component.
 * @param {React.ComponentProps<typeof SelectPrimitive.Root>} props - All other props supported by `SelectPrimitive.Root`.
 * @returns {JSX.Element} A React element representing the select root.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Container**: This component acts as the main container for a select dropdown.
 * - **State Management**: The open/closed state and selected value of the select are managed here.
 */
function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

/**
 * @summary A component for grouping select items.
 * @description This component is used to logically group related `SelectItem` components within a `SelectContent`.
 * It wraps Radix UI's `SelectPrimitive.Group`.
 *
 * @param {object} props - The props for the SelectGroup component.
 * @param {React.ComponentProps<typeof SelectPrimitive.Group>} props - All other props supported by `SelectPrimitive.Group`.
 * @returns {JSX.Element} A React element representing the select group.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Organization**: Use this to categorize options within a large select dropdown.
 */
function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

/**
 * @summary A component that displays the currently selected value.
 * @description This component is typically placed inside `SelectTrigger` and displays the value
 * of the currently selected `SelectItem`. It wraps Radix UI's `SelectPrimitive.Value`.
 *
 * @param {object} props - The props for the SelectValue component.
 * @param {React.ComponentProps<typeof SelectPrimitive.Value>} props - All other props supported by `SelectPrimitive.Value`.
 * @returns {JSX.Element} A React element representing the selected value display.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Display**: This component is responsible for rendering the chosen option.
 */
function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

/**
 * @summary A component that triggers the opening of the select dropdown.
 * @description This component renders the visible part of the select input that, when interacted with,
 * opens the associated `SelectContent`. It wraps Radix UI's `SelectPrimitive.Trigger` and includes
 * a `ChevronDownIcon` as a visual indicator.
 *
 * @param {object} props - The props for the SelectTrigger component.
 * @param {string} [props.className] - Additional CSS classes to apply to the trigger.
 * @param {"sm" | "default"} [props.size="default"] - The size of the select trigger.
 * @param {React.ReactNode} props.children - The child components to be rendered within the trigger (e.g., `SelectValue`).
 * @param {React.ComponentProps<typeof SelectPrimitive.Trigger>} props - All other props supported by `SelectPrimitive.Trigger`.
 * @returns {JSX.Element} A React element representing the select trigger.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Interaction Point**: This is the user-facing element that opens the dropdown.
 * - **Iconography**: The `ChevronDownIcon` indicates its dropdown functionality.
 */
function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default";
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "border-[var(--select-trigger-border)] data-[placeholder]:text-[var(--input-placeholder)] [&_svg:not([class*='text-'])]:text-[var(--select-indicator-color)] focus-visible:border-[var(--select-trigger-hover)] focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 aria-invalid:border-destructive flex w-fit items-center justify-between gap-2 border bg-[var(--select-trigger-bg)] px-3 py-2 text-[var(--select-trigger-text)] whitespace-nowrap outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

/**
 * @summary The content area of the select dropdown, containing items.
 * @description This component renders the dropdown menu containing `SelectItem` components.
 * It wraps Radix UI's `SelectPrimitive.Content` and includes animations for entry and exit.
 * It also handles positioning and includes scroll buttons if the content overflows.
 *
 * @param {object} props - The props for the SelectContent component.
 * @param {string} [props.className] - Additional CSS classes to apply to the content area.
 * @param {React.ReactNode} props.children - The child components to be rendered within the select content.
 * @param {"popper" | "item-aligned"} [props.position="popper"] - The positioning strategy for the content.
 * @param {React.ComponentProps<typeof SelectPrimitive.Content>} props - All other props supported by `SelectPrimitive.Content`.
 * @returns {JSX.Element} A React element representing the select content.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Dropdown Menu**: This is the actual dropdown panel that appears when the trigger is clicked.
 * - **Scrollability**: Includes `SelectScrollUpButton` and `SelectScrollDownButton` for handling long lists.
 */
function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "bg-[var(--select-content-bg)] text-[var(--foreground)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto border",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

/**
 * @summary A label for a group of select items.
 * @description This component provides a non-interactive label for a group of `SelectItem` components
 * within a `SelectContent`. It wraps Radix UI's `SelectPrimitive.Label`.
 *
 * @param {object} props - The props for the SelectLabel component.
 * @param {string} [props.className] - Additional CSS classes to apply to the label.
 * @param {React.ComponentProps<typeof SelectPrimitive.Label>} props - All other props supported by `SelectPrimitive.Label`.
 * @returns {JSX.Element} A React element representing the select label.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Categorization**: Used to visually separate and label sections within the dropdown.
 */
function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn(
        "text-[var(--foreground-muted)] px-2 py-1.5 text-xs",
        className
      )}
      {...props}
    />
  );
}

/**
 * @summary An individual selectable item within the dropdown.
 * @description This component represents a single option in the select dropdown. When selected,
 * it displays a `CheckIcon`. It wraps Radix UI's `SelectPrimitive.Item` and applies custom styling.
 *
 * @param {object} props - The props for the SelectItem component.
 * @param {string} [props.className] - Additional CSS classes to apply to the item.
 * @param {React.ReactNode} props.children - The content to be displayed within the select item.
 * @param {React.ComponentProps<typeof SelectPrimitive.Item>} props - All other props supported by `SelectPrimitive.Item`.
 * @returns {JSX.Element} A React element representing the select item.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Option Element**: This is the clickable option within the dropdown.
 * - **Visual Feedback**: The `CheckIcon` provides visual feedback for the selected state.
 */
function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "focus:bg-[var(--select-item-hover-bg)] focus:text-[var(--select-item-hover-text)] [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-جه">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn(
        "bg-[var(--select-content-border)] pointer-events-none -mx-1 my-1 h-px",
        className
      )}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
