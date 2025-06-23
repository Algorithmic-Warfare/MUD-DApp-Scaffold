import * as React from "react";

import { cn } from "src/utils/cn";

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

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn(className, "[&_tr]:border-b-[var(--table-header-border)]")}
      {...props}
    />
  );
}

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
