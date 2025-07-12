/**
 * @file
 * @summary Utility functions for client-side operations.
 * @description This file provides a collection of reusable utility functions
 * that assist in common client-side tasks, such as class name manipulation.
 *
 * @exports cn - A utility function for conditionally joining class names.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Class Name Utility**: The `cn` function is a common pattern for handling
 *   Tailwind CSS class merging and conditional application.
 * - **Duplication Warning**: Note that this file is currently duplicated in `packages/client/src/lib/utils.ts`.
 *   Consider consolidating or clarifying the intended usage of each file.
 */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * @summary Conditionally joins class names together.
 * @description This function takes multiple class name inputs, which can be strings,
 * arrays of strings, or objects, and merges them into a single string. It uses
 * `clsx` for conditional class application and `tailwind-merge` to resolve
 * conflicting Tailwind CSS classes.
 *
 * @param {...ClassValue[]} inputs - A variable number of class name inputs.
 *   Each input can be a string, an array of strings, or an object where keys
 *   are class names and values are booleans indicating whether the class should be included.
 * @returns {string} A single string containing the merged and resolved class names.
 *
 * @example
 * ```typescript
 * import { cn } from 'src/utils/cn';
 *
 * const isActive = true;
 * const buttonClasses = cn(
 *   'p-4',
 *   'text-lg',
 *   isActive && 'bg-blue-500',
 *   { 'font-bold': true, 'text-red-500': false },
 *   ['rounded-md', 'shadow-sm']
 * );
 * // buttonClasses might be "p-4 text-lg bg-blue-500 font-bold rounded-md shadow-sm"
 * ```
 *
 * @notes
 * ## AI Usage Guidance:
 * - **UI Development**: This utility is fundamental for building dynamic and responsive
 *   user interfaces, especially when working with Tailwind CSS.
 * - **Conditional Styling**: AI should recognize its use for applying styles conditionally
 *   based on component state or props.
 * - **Tailwind CSS Integration**: It's specifically designed to work well with Tailwind CSS
 *   by handling class conflicts gracefully.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
