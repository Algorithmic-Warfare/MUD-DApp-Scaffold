/**
 * @file
 * @summary Defines the type for MUD system calls.
 * @description This module exports a single type, `SystemCalls`, which represents
 * the collection of all system call functions available to the client.
 * This type is derived from the return type of `createSystemCalls`.
 *
 * @exports SystemCalls - Type definition for the MUD system calls.
 */
import { createSystemCalls } from "./createSystemCalls";

/**
 * @summary Type definition for the MUD system calls.
 * @description This type represents the collection of functions that can be used
 * to interact with the MUD world's system contracts, derived from the
 * `createSystemCalls` function.
 */
export type SystemCalls = ReturnType<typeof createSystemCalls>;
