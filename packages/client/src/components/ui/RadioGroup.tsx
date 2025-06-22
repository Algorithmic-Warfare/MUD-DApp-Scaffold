import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { CircleIcon } from "lucide-react";

import { cn } from "src/utils/cn";

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  );
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed",
        "border-[var(--radio-group-item-border)] text-[var(--radio-group-item-text)] shadow-[var(--radio-group-item-shadow)]",
        "focus-visible:border-[var(--radio-group-item-focus-ring)] focus-visible:ring-[var(--radio-group-item-focus-ring)] focus-visible:ring-opacity-[var(--radio-group-item-focus-ring-opacity)] focus-visible:ring-[3px]",
        "aria-invalid:ring-[var(--radio-group-error-ring)] aria-invalid:border-[var(--radio-group-error-border)] aria-invalid:ring-opacity-[var(--radio-group-error-ring-opacity)]",
        "dark:bg-[var(--radio-group-dark-bg)] disabled:opacity-[var(--radio-group-item-disabled-opacity)]",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <CircleIcon className="fill-[var(--radio-group-indicator-bg)] absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
