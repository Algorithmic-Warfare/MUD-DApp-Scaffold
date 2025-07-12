/**
 * @file
 * @summary Provides accessible Breadcrumb components for navigation.
 * @description This file exports a set of components for creating accessible breadcrumbs,
 * including `Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`,
 * `BreadcrumbPage`, `BreadcrumbSeparator`, and `BreadcrumbEllipsis`.
 * These components provide a clear and hierarchical navigation path, helping users
 * understand their location within a website or application.
 *
 * @exports Breadcrumb - The root component for a breadcrumb navigation.
 * @exports BreadcrumbList - An ordered list of breadcrumb items.
 * @exports BreadcrumbItem - An individual item within the breadcrumb list.
 * @exports BreadcrumbLink - A clickable link within a breadcrumb item.
 * @exports BreadcrumbPage - The current page in the breadcrumb navigation.
 * @exports BreadcrumbSeparator - A visual separator between breadcrumb items.
 * @exports BreadcrumbEllipsis - A component to indicate truncated breadcrumb items.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Navigation**: Recognize these components as a primary navigation element for showing hierarchy.
 * - **Accessibility**: Note the use of `aria-label`, `role`, and `aria-hidden` for accessibility.
 * - **Composition**: The components are designed to be composed together to build complete breadcrumb paths.
 * - **Styling**: The `cn` utility is used for conditional styling, and CSS variables are used for theming.
 */
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "src/utils/cn";

/**
 * @summary The root component for a breadcrumb navigation.
 * @description This component renders a `nav` HTML element with `aria-label="breadcrumb"`,
 * providing the semantic container for the breadcrumb navigation.
 *
 * @param {object} props - The props for the Breadcrumb component.
 * @param {React.ComponentProps<"nav">} props - All other standard HTML `nav` attributes.
 * @returns {JSX.Element} A React element representing the breadcrumb navigation.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Root Element**: This is the top-level component for any breadcrumb structure.
 * - **Semantic Role**: The `aria-label` is important for screen readers.
 */
function Breadcrumb({ ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}

/**
 * @summary An ordered list of breadcrumb items.
 * @description This component renders an `ol` HTML element, which contains `BreadcrumbItem`
 * components. It handles the layout and spacing of the breadcrumb items.
 *
 * @param {object} props - The props for the BreadcrumbList component.
 * @param {string} [props.className] - Additional CSS classes to apply to the list.
 * @param {React.ComponentProps<"ol">} props - All other standard HTML `ol` attributes.
 * @returns {JSX.Element} A React element representing the breadcrumb list.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **List Structure**: This component defines the ordered sequence of navigation steps.
 */
function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "flex flex-wrap items-center text-sm break-words",
        "text-[var(--breadcrumb-list-color)]",
        "gap-[var(--breadcrumb-list-gap)]",
        "sm:gap-2.5",
        className
      )}
      {...props}
    />
  );
}

/**
 * @summary An individual item within the breadcrumb list.
 * @description This component renders an `li` HTML element, representing a single step
 * in the breadcrumb navigation. It typically contains a `BreadcrumbLink` or `BreadcrumbPage`.
 *
 * @param {object} props - The props for the BreadcrumbItem component.
 * @param {string} [props.className] - Additional CSS classes to apply to the item.
 * @param {React.ComponentProps<"li">} props - All other standard HTML `li` attributes.
 * @returns {JSX.Element} A React element representing the breadcrumb item.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Individual Step**: Each `BreadcrumbItem` represents a distinct location in the navigation path.
 */
function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  );
}

/**
 * @summary A clickable link within a breadcrumb item.
 * @description This component renders an `a` HTML element (or a custom component if `asChild` is true)
 * that serves as a navigation link within the breadcrumb.
 *
 * @param {object} props - The props for the BreadcrumbLink component.
 * @param {boolean} [props.asChild] - If true, the component will be rendered as the child of the element passed to it.
 * @param {string} [props.className] - Additional CSS classes to apply to the link.
 * @param {React.ComponentProps<"a">} props - All other standard HTML `a` attributes.
 * @returns {JSX.Element} A React element representing the breadcrumb link.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Navigation Link**: This component allows users to navigate to previous levels in the hierarchy.
 * - **Flexibility**: The `asChild` prop enables integration with routing libraries.
 */
function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn(
        "text-[var(--breadcrumb-link-color)]",
        "hover:text-[var(--breadcrumb-link-hover-color)]",
        "transition-[var(--breadcrumb-link-transition)]",
        className
      )}
      {...props}
    />
  );
}

/**
 * @summary The current page in the breadcrumb navigation.
 * @description This component renders a `span` HTML element representing the current page
 * or the last item in the breadcrumb path. It is not clickable and has `aria-current="page"`.
 *
 * @param {object} props - The props for the BreadcrumbPage component.
 * @param {string} [props.className] - Additional CSS classes to apply to the page indicator.
 * @param {React.ComponentProps<"span">} props - All other standard HTML `span` attributes.
 * @returns {JSX.Element} A React element representing the current breadcrumb page.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Current Location**: This component indicates the user's current position in the navigation.
 * - **Accessibility**: The `aria-current="page"` attribute is crucial for screen readers.
 */
function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn(
        "text-[var(--breadcrumb-page-color)]",
        "font-normal",
        className
      )}
      {...props}
    />
  );
}

/**
 * @summary A visual separator between breadcrumb items.
 * @description This component renders an `li` HTML element that acts as a visual separator
 * between `BreadcrumbLink` or `BreadcrumbPage` components. It defaults to a `ChevronRight` icon.
 *
 * @param {object} props - The props for the BreadcrumbSeparator component.
 * @param {React.ReactNode} [props.children] - Custom content to use as the separator (defaults to `ChevronRight`).
 * @param {string} [props.className] - Additional CSS classes to apply to the separator.
 * @param {React.ComponentProps<"li">} props - All other standard HTML `li` attributes.
 * @returns {JSX.Element} A React element representing the breadcrumb separator.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Visual Cue**: Helps distinguish between different levels in the breadcrumb path.
 * - **Customization**: Can accept custom children for different separator styles.
 */
function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  );
}

/**
 * @summary A component to indicate truncated breadcrumb items.
 * @description This component renders a `span` HTML element with a `MoreHorizontal` icon,
 * used to represent hidden or truncated breadcrumb items when the path is too long.
 *
 * @param {object} props - The props for the BreadcrumbEllipsis component.
 * @param {string} [props.className] - Additional CSS classes to apply to the ellipsis.
 * @param {React.ComponentProps<"span">} props - All other standard HTML `span` attributes.
 * @returns {JSX.Element} A React element representing the breadcrumb ellipsis.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Space Saving**: Used when the breadcrumb path needs to be shortened for display purposes.
 * - **Accessibility**: Includes `sr-only` text for screen readers.
 */
function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  );
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
