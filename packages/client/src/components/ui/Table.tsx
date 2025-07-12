/**
 * @file
 * @summary Provides accessible Table components for displaying tabular data.
 * @description This file exports a set of components for creating accessible tables, including
 * `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableHead`, `TableRow`, `TableCell`, and `TableCaption`.
 * These components provide a structured and semantic way to present tabular data in React applications,
 * ensuring proper accessibility and customizable styling.
 *
 * @exports Table - The main container for tabular data.
 * @exports TableHeader - The header section of the table.
 * @exports TableBody - The body section of the table, containing rows of data.
 * @exports TableFooter - The footer section of the table.
 * @exports TableHead - A header cell within a table row.
 * @exports TableRow - A row within the table body or header.
 * @exports TableCell - A data cell within a table row.
 * @exports TableCaption - A descriptive caption for the table.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Tabular Data**: Recognize these components as the standard way to render data in a table format.
 * - **Semantic HTML**: The components map directly to semantic HTML table elements, which is important for accessibility.
 * - **Styling**: The `cn` utility is used for conditional styling, and CSS variables are used for theming.
 */
import * as React from "react";

import { cn } from "src/utils/cn";

/**
 * @summary The main container for tabular data.
 * @description This component renders a `table` HTML element wrapped in a responsive container
 * to handle horizontal overflow. It provides the basic structure for a table.
 *
 * @param {object} props - The props for the Table component.
 * @param {string} [props.className] - Additional CSS classes to apply to the table.
 * @param {React.ComponentProps<"table">} props - All other standard HTML `table` attributes.
 * @returns {JSX.Element} A React element representing the table container.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Root Element**: This is the top-level component for any table structure.
 * - **Responsiveness**: The `overflow-x-auto` class on the container indicates it handles horizontal scrolling for wide tables.
 */
function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn(
          "caption-bottom text-sm",
          className,
          "w-[var(--table-width)]",
          "border-collapse-[var(--table-border-collapse)]"
        )}
        {...props}
      />
    </div>
  );
}

/**
 * @summary The header section of the table.
 * @description This component renders a `thead` HTML element, which typically contains
 * `TableRow` and `TableHead` components to define the table's column headers.
 *
 * @param {object} props - The props for the TableHeader component.
 * @param {string} [props.className] - Additional CSS classes to apply to the table header.
 * @param {React.ComponentProps<"thead">} props - All other standard HTML `thead` attributes.
 * @returns {JSX.Element} A React element representing the table header.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Column Definitions**: This section defines the labels for each column.
 */
function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn(className, "[&_tr]:border-b-[var(--table-header-border)]")}
      {...props}
    />
  );
}

/**
 * @summary The body section of the table, containing rows of data.
 * @description This component renders a `tbody` HTML element, which contains `TableRow`
 * components representing the actual data rows of the table.
 *
 * @param {object} props - The props for the TableBody component.
 * @param {string} [props.className] - Additional CSS classes to apply to the table body.
 * @param {React.ComponentProps<"tbody">} props - All other standard HTML `tbody` attributes.
 * @returns {JSX.Element} A React element representing the table body.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Data Rows**: This is where the primary data of the table resides.
 */
function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn(className, "[&_tr:last-child]:border-0")}
      style={{ borderBottom: "var(--table-body-border)" }}
      {...props}
    />
  );
}

/**
 * @summary The footer section of the table.
 * @description This component renders a `tfoot` HTML element, typically used for displaying
 * summary information or totals at the bottom of the table.
 *
 * @param {object} props - The props for the TableFooter component.
 * @param {string} [props.className] - Additional CSS classes to apply to the table footer.
 * @param {React.ComponentProps<"tfoot">} props - All other standard HTML `tfoot` attributes.
 * @returns {JSX.Element} A React element representing the table footer.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Summary Information**: Look for aggregate data or totals in this section.
 */
function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn("font-medium [&>tr]:last:border-b-0", className)}
      style={{
        backgroundColor: "var(--table-footer-bg)",
        borderTop: "var(--table-footer-border)",
        font: "var(--table-footer-font)",
      }}
      {...props}
    />
  );
}

/**
 * @summary A row within the table body or header.
 * @description This component renders a `tr` HTML element, representing a single row
 * in the table. It applies hover and selected state styling.
 *
 * @param {object} props - The props for the TableRow component.
 * @param {string} [props.className] - Additional CSS classes to apply to the table row.
 * @param {React.ComponentProps<"tr">} props - All other standard HTML `tr` attributes.
 * @returns {JSX.Element} A React element representing the table row.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Row Structure**: This component defines a horizontal grouping of cells.
 * - **Interactive States**: Note the `hover` and `data-[state=selected]` styles for user interaction.
 */
function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "transition-colors",
        className,
        "hover:bg-[var(--table-row-hover-bg)]",
        "data-[state=selected]:bg-[var(--table-row-selected-bg)]"
      )}
      style={{ borderBottom: "var(--table-row-border)" }}
      {...props}
    />
  );
}

/**
 * @summary A header cell within a table row.
 * @description This component renders a `th` HTML element, used for column headers
 * within a `TableHeader`. It applies text alignment and padding.
 *
 * @param {object} props - The props for the TableHead component.
 * @param {string} [props.className] - Additional CSS classes to apply to the table head cell.
 * @param {React.ComponentProps<"th">} props - All other standard HTML `th` attributes.
 * @returns {JSX.Element} A React element representing the table head cell.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Column Label**: This component provides the label for a column of data.
 */
function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-left whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      style={{
        color: "var(--table-head-text)",
        font: "var(--table-head-font)",
        padding: "var(--table-head-padding)",
      }}
      {...props}
    />
  );
}

/**
 * @summary A data cell within a table row.
 * @description This component renders a `td` HTML element, used for individual data points
 * within a `TableRow` in the `TableBody`. It applies text alignment and padding.
 *
 * @param {object} props - The props for the TableCell component.
 * @param {string} [props.className] - Additional CSS classes to apply to the table cell.
 * @param {React.ComponentProps<"td">} props - All other standard HTML `td` attributes.
 * @returns {JSX.Element} A React element representing the table data cell.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Data Point**: This component holds a single piece of data within the table.
 */
function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "text-left whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      style={{ padding: "var(--table-cell-padding)" }}
      {...props}
    />
  );
}

/**
 * @summary A descriptive caption for the table.
 * @description This component renders a `caption` HTML element, providing a brief description
 * or title for the entire table. It is important for accessibility.
 *
 * @param {object} props - The props for the TableCaption component.
 * @param {string} [props.className] - Additional CSS classes to apply to the caption.
 * @param {React.ComponentProps<"caption">} props - All other standard HTML `caption` attributes.
 * @returns {JSX.Element} A React element representing the table caption.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Accessibility**: This component provides context for screen readers and other assistive technologies.
 * - **Table Context**: Use this to give a concise overview of the table's content.
 */
function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-sm", className)}
      style={{
        color: "var(--table-caption-text)",
        marginTop: "var(--table-caption-margin)",
      }}
      {...props}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
