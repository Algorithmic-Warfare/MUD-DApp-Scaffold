import { defineWorld, WorldInput } from "@latticexyz/world";

export type MudWorldConfigType = ReturnType<typeof defineWorld>;

/**
 * Defines the structure of a single namespace entry within the MUD world configuration.
 * This type is used to represent the configuration for a specific namespace,
 * including its tables, systems, enums, and user-defined types.
 */
export type NamespaceConfig = {
  label: string;
  namespace: string;
  tables: Record<string, any>;
  systems: Record<string, any>;
  enums: Record<string, any>;
  userTypes: Record<string, any>;
};
