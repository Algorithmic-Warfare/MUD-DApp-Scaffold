import React, { createContext, useContext } from "react";

/**
 * @summary Type defining the value provided by WalletMudContext
 * @description Contains the MUD network configuration, setup status, and any errors.
 * This type represents the complete state needed for MUD network interactions.
 *
 * @property {Awaited<ReturnType<typeof setup>> | null} networkConfig - The initialized MUD network configuration
 * @property {boolean} isSettingUp - Indicates if network setup is in progress
 * @property {Error | null} error - Any error that occurred during setup
 *
 * @notes
 * ## AI Usage Guidance:
 * - This type should be used whenever working with MUD network state
 * - All properties should be checked before use (networkConfig could be null)
 * - Prefer using the useWalletMud hook rather than consuming this type directly
 */
export type WalletMudContextValue = {
  networkConfig: Awaited<
    ReturnType<typeof import("src/data/mud").setup>
  > | null;
  isSettingUp: boolean;
  error: Error | null;
};

/**
 * @summary React context for MUD network configuration and wallet state
 * @description Provides access to MUD network setup state throughout the component tree.
 * Default values represent an uninitialized state (null config, no error).
 *
 * @default
 * {
 *   networkConfig: null,
 *   isSettingUp: false,
 *   error: null
 * }
 *
 * @notes
 * ## AI Usage Guidance:
 * - Should be provided by WalletMudProvider at the app root
 * - Consumers should use useWalletMud hook rather than useContext directly
 * - Useful for testing or creating custom hooks
 */
const WalletMudContext = createContext<WalletMudContextValue>({
  networkConfig: null,
  isSettingUp: false,
  error: null,
});

/**
 * @summary Hook to access the MUD network configuration and wallet connection state
 * @description Provides access to the MUD network configuration, setup status, and any errors
 * that occurred during network initialization. This hook should be used by components that need
 * to interact with the MUD network or check its status.
 *
 * @returns {WalletMudContextValue} The current MUD network context containing:
 *   - networkConfig: The initialized MUD network configuration (null if not set up)
 *   - isSettingUp: Boolean indicating if network setup is in progress
 *   - error: Any error that occurred during setup
 *
 * @example
 * // Basic usage
 * const { networkConfig, isSettingUp, error } = useWalletMud();
 *
 * if (isSettingUp) return <LoadingIndicator />;
 * if (error) return <ErrorDisplay error={error} />;
 * if (!networkConfig) return <SetupRequired />;
 *
 * // Access network components
 * const { world, systems } = networkConfig;
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Recommended Usage**: Prefer this hook over direct context consumption for better testability
 * - **Performance**: Lightweight hook - no performance concerns with frequent calls
 * - **Error Handling**: Always check both `error` and `networkConfig` before proceeding
 * - **Dependencies**: Requires WalletMudProvider in component tree
 * - **Alternatives**: For simple status checks, consider creating derived hooks
 * - **Common Pitfalls**:
 *   - Not handling the loading state (check isSettingUp)
 *   - Assuming networkConfig exists without null check
 *   - Not providing proper error UI when error exists
 */
export const useWalletMud = () => useContext(WalletMudContext);

export default WalletMudContext;
