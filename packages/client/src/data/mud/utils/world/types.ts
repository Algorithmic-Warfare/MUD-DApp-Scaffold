/**
 * @file
 * @summary Defines types related to MUD world configurations and namespaces.
 * @description This module provides type definitions for the MUD world configuration
 * as returned by `defineWorld`, and for the structure of a namespace within
 * a merged MUD world configuration.
 *
 * @exports MudWorldConfigType - Type definition for the MUD world configuration.
 * @exports NamespaceConfig - Type definition for a single namespace entry in a MUD world.
 */
import { defineWorld, WorldInput } from "@latticexyz/world";

/**
 * @summary Type definition for the MUD world configuration.
 * @description Represents the configuration object returned by the `defineWorld` function
 * from `@latticexyz/world`, which describes the structure of a MUD world.
 */
export type MudWorldConfigType = ReturnType<typeof defineWorld>;

/**
 * @summary Defines the structure of a single namespace entry within the MUD world configuration.
 * @description This type is used to represent the configuration for a specific namespace,
 * including its tables, systems, enums, and user-defined types.
 */
export type NamespaceConfig = {
  /**
   * @description A human-readable label for the namespace.
   */
  label: string;
  /**
   * @description The programmatic name of the namespace.
   */
  namespace: string;
  /**
   * @description A record of tables defined within this namespace.
   */
  tables: Record<string, any>;
  /**
   * @description A record of systems defined within this namespace.
   */
  systems: Record<string, any>;
  /**
   * @description A record of enums defined within this namespace.
   */
  enums: Record<string, any>;
  /**
   * @description A record of user-defined types within this namespace.
   */
  userTypes: Record<string, any>;
};
