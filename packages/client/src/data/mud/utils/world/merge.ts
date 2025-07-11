import type { MudWorldConfigType, NamespaceConfig } from "./types";
import type { MergedMudConfig } from "../../network/types";
/**
 * Recursively merges two objects, preferring values from the second object (source) in case of conflicts.
 * This function handles deep merging of nested objects and arrays.
 *
 * @template T - The type of the target object.
 * @param {T} target - The target object to merge into.
 * @param {Partial<T>} source - The source object to merge from.
 * @returns {T} The deeply merged object.
 */
function deepMerge<T extends Record<string, any>>(
  target: T,
  source: Partial<T>
): T {
  const output = { ...target } as T;

  if (
    target &&
    typeof target === "object" &&
    source &&
    typeof source === "object"
  ) {
    Object.keys(source).forEach((key) => {
      if (
        source[key] &&
        typeof source[key] === "object" &&
        !Array.isArray(source[key])
      ) {
        if (
          !(key in target) ||
          typeof target[key] !== "object" ||
          Array.isArray(target[key])
        ) {
          Object.assign(output, { [key]: source[key] });
        } else {
          (output as Record<string, any>)[key] = deepMerge(
            target[key] as Record<string, any>,
            source[key] as Record<string, any>
          );
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }

  return output;
}

/**
 * Merges multiple MUD namespace configurations into a single `namespaces` object.
 * This function takes individual MUD world configurations (or parts of them) and
 * restructures their tables, systems, enums, and user types into a namespaced format,
 * suitable for use with `syncToZustand` when `multipleNamespaces` is enabled.
 *
 * The resulting object will contain:
 * - An empty string key namespace (`""`) for top-level configurations, if needed.
 * - Named namespaces based on the `namespace` property of each input configuration.
 *
 * @param {MudWorldConfigType[]} configs - An array of MUD world configurations to merge.
 * @returns {Record<string, NamespaceConfig>} An object where keys are namespace names
 *   (or an empty string for the default namespace) and values are `NamespaceConfig` objects.
 */
export function mergeNamespaceConfigs(
  configs: MudWorldConfigType[]
): Record<string, NamespaceConfig> {
  const mergedNamespaces: Record<string, NamespaceConfig> = {
    "": {
      label: "",
      namespace: "",
      tables: {},
      systems: {},
      enums: {},
      userTypes: {},
    },
  };

  for (const config of configs) {
    if (config.namespace) {
      mergedNamespaces[config.namespace] = {
        label: config.namespace,
        namespace: config.namespace,
        tables: config.tables,
        systems: config.systems,
        enums: config.enums,
        userTypes: config.userTypes,
      };
    }
  }

  return mergedNamespaces;
}

/**
 * Merges two MUD world configurations into a `MergedMudConfig`.
 * This function combines the base properties of two `MudWorldConfigType` objects
 * and then restructures their namespaces into the format required by `MergedMudConfig`.
 * Properties from `worldB` take precedence in case of conflicts for base properties.
 *
 * @param {MudWorldConfigType} worldA - The first world configuration.
 * @param {MudWorldConfigType} worldB - The second world configuration.
 * @returns {MergedMudConfig} The deeply merged world configuration with namespaces.
 */
export function mergeWorlds(
  worldA: MudWorldConfigType,
  worldB: MudWorldConfigType
): MergedMudConfig {
  // Construct the final MergedMudConfig object
  const mergedConfig: MergedMudConfig = {
    // Base properties from worldA, excluding those that will be moved to namespaces
    // and ensuring `multipleNamespaces` is true.
    namespace: worldA.namespace,
    sourceDirectory: worldA.sourceDirectory,
    excludeSystems: worldA.excludeSystems,
    modules: worldA.modules,
    deploy: worldA.deploy,
    codegen: worldA.codegen, // Assuming worldA's codegen is the primary one

    // Explicitly define namespaces
    namespaces: {
      "": {
        label: "",
        namespace: "",
        tables: worldA.tables,
        systems: worldA.systems,
        enums: worldA.enums,
        userTypes: worldA.userTypes,
      },
      eveworld: {
        label: "eveworld",
        namespace: "eveworld",
        tables: worldB.tables,
        systems: worldB.systems,
        enums: worldB.enums,
        userTypes: worldB.userTypes,
      },
    },
    // Explicitly set top-level properties to empty as per MergedMudConfig
    tables: {},
    systems: {},
    enums: {},
    userTypes: {},
    enumValues: {},
    multipleNamespaces: true,
  };

  return mergedConfig;
}
