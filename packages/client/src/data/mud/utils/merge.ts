import { defineWorld } from "@latticexyz/world";

type World = ReturnType<typeof defineWorld>;

// Define a type that makes 'namespaces' property optional in World

export type WorldConfig = World;

// export type WorldConfig = Omit<World, "namespaces"> & {
//   namespaces?: World["namespaces"];
// };

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
 * Merges two MUD world configurations.
 * This function performs a deep merge, handling nested structures like systems, components, and other MUD-specific configurations.
 * Properties from both worlds are preserved, with `worldB`'s values taking precedence in case of conflicts.
 *
 * @param {WorldConfig} worldA - The first world configuration.
 * @param {WorldConfig} worldB - The second world configuration.
 * @returns {WorldConfig} The deeply merged world configuration.
 */
export function mergeWorlds(
  worldA: WorldConfig,
  worldB: WorldConfig
): WorldConfig {
  const mergedWorld: WorldConfig = deepMerge(worldA, worldB);

  // Handle namespaces specifically
  if (worldA.namespaces && worldB.namespaces) {
    //@ts-ignore
    mergedWorld.namespaces = deepMerge(worldA.namespaces, worldB.namespaces);
  } else if (worldB.namespaces) {
    //@ts-ignore
    mergedWorld.namespaces = worldB.namespaces;
  } else if (worldA.namespaces) {
    //@ts-ignore
    mergedWorld.namespaces = worldA.namespaces;
  }
  return mergedWorld;
}
