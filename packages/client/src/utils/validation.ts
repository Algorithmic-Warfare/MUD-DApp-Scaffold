/**
 * @file
 * @summary Utility functions for Zod schema validation and error handling.
 * @description This file provides helper functions to process Zod validation errors
 * and to safely parse values against Zod schemas, providing consistent error messaging.
 *
 * @exports zodErrorToError - Converts a ZodError or other error types into a standardized Error object.
 * @exports zodParse - Parses a value against a Zod schema, throwing a standardized error on failure.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Validation Layer**: These utilities are crucial for input validation and data integrity
 *   across the application, especially when dealing with external data or user input.
 * - **Error Handling**: AI should recognize the pattern for converting detailed Zod errors
 *   into more user-friendly or loggable error messages.
 */
import { z, ZodError } from "zod";

/**
 * @summary Converts a ZodError or other error types into a standardized Error object.
 * @description This function takes an unknown error and an optional message prefix.
 * If the error is a `ZodError`, it flattens the validation issues into a single
 * human-readable message. For other error types (string or Error instance), it
 * wraps them with the provided prefix.
 *
 * @param {unknown} error - The error to convert. Can be a `ZodError`, a string, or an `Error` instance.
 * @param {string} messagePrefix - A prefix to prepend to the error message.
 * @returns {Error | unknown} A new `Error` object with a formatted message, or the original error if it's not a recognized type.
 *
 * @example
 * ```typescript
 * import { z } from 'zod';
 * import { zodErrorToError } from 'src/utils/validation';
 *
 * const UserSchema = z.object({
 *   name: z.string().min(1),
 *   age: z.number().min(18),
 * });
 *
 * try {
 *   UserSchema.parse({ name: '', age: 10 });
 * } catch (e) {
 *   const formattedError = zodErrorToError(e, 'User validation failed:');
 *   console.error(formattedError.message);
 *   // Expected output: "User validation failed: name: String must contain at least 1 character(s), age: Number must be greater than or equal to 18"
 * }
 * ```
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Error Normalization**: This function is key for normalizing validation errors,
 *   making them easier to display to users or log consistently.
 * - **Debugging**: When debugging validation issues, AI should trace calls to this
 *   function to understand how raw Zod errors are transformed.
 */
export function zodErrorToError(error: unknown, messagePrefix: string) {
  if (error instanceof ZodError) {
    error.flatten();
    let message = error.errors
      .map((error) => `${error.path.join(".")}: ${error.message}`)
      .join(", ");
    if (messagePrefix) {
      message = `${messagePrefix} ${message}`;
    }
    return new Error(message);
  } else if (typeof error === "string") {
    return new Error(`${messagePrefix} ${error}`);
  }
  if (error instanceof Error) {
    return new Error(`${messagePrefix} ${error.message}`);
  }
  return error;
}

/**
 * @summary Parses a value against a Zod schema, throwing a standardized error on failure.
 * @description This function attempts to parse a given `value` using the provided `schema`.
 * If the parsing fails due to a `ZodError`, it catches the error and re-throws it
 * after converting it into a more readable format using `zodErrorToError`.
 *
 * @template T - The Zod schema type.
 * @param {T} schema - The Zod schema to validate against.
 * @param {object} value - The value to parse and validate.
 * @param {string} [errorMessagePrefix="Invalid value"] - An optional prefix for the error message if validation fails.
 * @returns {z.infer<T>} The parsed and validated value.
 * @throws {Error} If the value does not conform to the schema, or if another unexpected error occurs during parsing.
 *
 * @example
 * ```typescript
 * import { z } from 'zod';
 * import { zodParse } from 'src/utils/validation';
 *
 * const ConfigSchema = z.object({
 *   port: z.number().min(1024).max(65535),
 *   env: z.enum(['development', 'production']),
 * });
 *
 * try {
 *   const config = zodParse(ConfigSchema, { port: 3000, env: 'development' });
 *   console.log('Configuration:', config);
 *
 *   // This will throw an error
 *   zodParse(ConfigSchema, { port: 80, env: 'test' });
 * } catch (e) {
 *   console.error('Validation error:', e.message);
 *   // Expected output: "Validation error: Invalid value env: Invalid enum value. Expected 'development' | 'production', received 'test', port: Number must be greater than or equal to 1024"
 * }
 * ```
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Safe Parsing**: AI should use this function when parsing any data that needs
 *   to conform to a strict schema, especially configuration objects or API responses.
 * - **Input Sanitization**: It serves as a primary gate for ensuring that data
 *   structures are correct before further processing.
 */
export function zodParse<T extends z.ZodTypeAny>(
  schema: T,
  value: object,
  errorMessagePrefix: string = "Invalid value"
): z.infer<T> {
  try {
    return schema.parse(value);
  } catch (e) {
    if (e instanceof ZodError) {
      throw zodErrorToError(e, errorMessagePrefix);
    }
    throw e;
  }
}
