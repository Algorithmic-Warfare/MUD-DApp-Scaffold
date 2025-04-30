import { z, ZodError } from "zod";

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
