/**
 * @file
 * @summary Provides access to MUD world configurations from different sources.
 * @description This module imports and re-exports MUD world configurations from
 * `contracts/mud.config` and `@eveworld/world-v2/mud.config`.
 * These configurations are used to define the structure and behavior of the MUD world.
 *
 * @exports contracts_mudWorldConfig - MUD world configuration from the contracts package.
 * @exports eveworld_mudWorldConfig - MUD world configuration from the eveworld package.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Configuration Aggregation**: This file serves as a central point for aggregating
 *   different MUD world configurations.
 * - **Source of Truth**: The imported `mud.config` files are the primary source of truth
 *   for the MUD world's schema and systems.
 */
import contracts_mudWorldConfig from "contracts/mud.config";
import eveworld_mudWorldConfig from "@eveworld/world-v2/mud.config";

/**
 * @summary Re-exports the MUD world configuration from the `contracts` package.
 * @description This configuration defines the tables, systems, and other
 * aspects of the MUD world as defined in the `contracts` package.
 */
export { contracts_mudWorldConfig };

/**
 * @summary Re-exports the MUD world configuration from the `@eveworld/world-v2` package.
 * @description This configuration defines the tables, systems, and other
 * aspects of the MUD world as defined in the `@eveworld/world-v2` package.
 */
export { eveworld_mudWorldConfig };
