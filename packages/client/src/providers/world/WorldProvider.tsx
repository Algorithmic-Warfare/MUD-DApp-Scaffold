import { WorldProviderProps } from "./types";
import WorldContext from "./WorldContext";
import { getSupportedChain } from "@/data/mud/network/supportedChains";

/**
 * @summary Provides MUD World setup and configuration context to its children.
 * @description Manages MUD world address and chain configuration, making them available to child components.
 *
 * @param {Object} props - Provider props
 * @param {ReactNode} props.children - Components needing MUD World access
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Initialization**: Retrieves `VITE_WORLD_ADDRESS` and `VITE_CHAIN_ID` from environment variables.
 *   Ensures these are properly defined before providing the context.
 * - **Error States**: Logs errors to the console if `VITE_WORLD_ADDRESS` or `VITE_CHAIN_ID` are not found or invalid.
 *   Returns `null` in such cases, indicating that the provider cannot initialize.
 * - **Dependencies**: Relies on `getSupportedChain` from `@/data/mud/network/supportedChains` to validate the chain ID.
 */
export const WorldProvider = ({ children }: WorldProviderProps) => {
  const worldAddress = import.meta.env.VITE_WORLD_ADDRESS;
  const chain = getSupportedChain(Number(import.meta.env.VITE_CHAIN_ID));

  if (!worldAddress) {
    console.error(
      "VITE_WORLD_ADDRESS is not defined in environment variables."
    );
    // You might want to throw an error, render a fallback UI, or handle this differently
    // depending on your application's requirements.
    return null;
  }

  if (!chain) {
    console.error("Chain not found for the provided VITE_CHAIN_ID.");
    // Handle the case where the chain is not found
    return null;
  }

  return (
    <WorldContext.Provider value={{ worldAddress, chain }}>
      {children}
    </WorldContext.Provider>
  );
};
