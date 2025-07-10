import { createContext, useContext } from "react";
import { WorldContextType } from "./types";

/**
 * @summary React Context for MUD World setup and configuration.
 * @description This context provides access to the MUD world address and chain configuration.
 * It's intended to be consumed by components that need to interact with or display information about the MUD world.
 *
 * @property {WorldContextType} value - The comprehensive result object from the MUD world setup process,
 *                                  including world address and chain configuration.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Consumption**: It is highly recommended to use the `useWorld` hook for accessing this context,
 *   as it provides a convenient and type-safe way to consume the context value and handles null checks.
 * - **Null States**: The context value will be `undefined` if the `WorldProvider` component, which is responsible
 *   for providing this context, has not been properly initialized or is not an ancestor in the component tree.
 *   Ensure `WorldProvider` wraps any components that use `useWorld`.
 */
const WorldContext = createContext<WorldContextType | undefined>(undefined);

/**
 * @summary Custom React Hook to access MUD World setup and configuration.
 * @description This hook provides a convenient way to consume the `WorldContext`.
 * It returns the current MUD world address and chain configuration.
 * If the hook is used outside of a `WorldProvider`, it will throw an error.
 *
 * @returns {WorldContextType} The current value of the `WorldContext`,
 *                                 containing MUD world address and chain configuration.
 *
 * @example
 * ```typescript
 * import { useWorld } from 'src/providers/world';
 *
 * function MyComponent() {
 *   const { worldAddress, chain } = useWorld();
 *
 *   return (
 *     <div>
 *       <p>World Address: {worldAddress}</p>
 *       <p>Chain ID: {chain.id}</p>
 *     </div>
 *   );
 * }
 * ```
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Performance**: This hook is designed to be lightweight and can be safely called frequently
 *   within components without significant performance overhead.
 * - **Dependencies**: This hook requires a `WorldProvider` component to be an ancestor in the React component tree.
 *   Without it, the hook will throw a runtime error.
 */
export const useWorld = () => {
  const context = useContext(WorldContext);
  if (!context) {
    throw new Error("useWorld must be used within a WorldProvider");
  }
  return context;
};

export default WorldContext;
