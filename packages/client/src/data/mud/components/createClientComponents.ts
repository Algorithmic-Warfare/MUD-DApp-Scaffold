/**
 * @file
 * @summary Creates and manages client-side MUD components.
 * @description This file is responsible for initializing and providing access to
 * MUD components for the client application. It extends the automatically
 * inferred components from `mud.config.ts` with any additional user-defined
 * or overridden components.
 *
 * @exports createClientComponents - Function to create client components.
 * @exports ClientComponents - Type definition for the client components.
 */
//@ts-nocheck
/*
 * Creates components for use by the client.
 *
 * By default it returns the components from setupNetwork.ts, those which are
 * automatically inferred from the mud.config.ts table definitions.
 *
 * However, you can add or override components here as needed. This
 * lets you add user defined components, which may or may not have
 * an onchain component.
 */

import { SetupNetworkResult } from "../network/setupNetwork";

/**
 * @summary Type definition for the client-side MUD components.
 * @description Represents the collection of components available to the client,
 * including those inferred from the MUD configuration and any custom additions.
 */
export type ClientComponents = ReturnType<typeof createClientComponents>;

/**
 * @summary Creates a set of client-side MUD components.
 * @description This function takes the components derived from the MUD network setup
 * and allows for the addition or overriding of components. This is useful for
 * integrating user-defined components that may or may not have an on-chain counterpart.
 *
 * @param {Object} params - The parameters object.
 * @param {SetupNetworkResult['components']} params.components - The components inferred from the MUD network setup.
 * @returns {ClientComponents} An object containing all client-side MUD components.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Extensibility**: This function is a key extension point for adding custom client-side logic
 *   that interacts with MUD's component system.
 * - **Component Access**: The returned `ClientComponents` object is the primary way to access
 *   MUD components throughout the client application.
 */
export function createClientComponents({ components }: SetupNetworkResult) {
  return {
    ...components,
    // add your client components or overrides here
  };
}
