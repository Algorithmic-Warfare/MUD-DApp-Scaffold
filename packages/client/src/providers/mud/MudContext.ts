import { createContext, useContext } from "react";
import { MudContextValueType } from "./types";

/**
 * @summary React Context for MUD setup and synchronization state.
 * @description This context provides access to the combined MUD setup result and its synchronization status.
 * It's intended to be consumed by components that need to interact with or display information about the MUD network.
 *
 * @property {SetupResultT} setup - The comprehensive result object from the MUD setup process,
 *                                  including network configuration, components, and system calls.
 * @property {object} sync - An object containing various synchronization status indicators.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Consumption**: It is highly recommended to use the `useMud` hook for accessing this context,
 *   as it provides a convenient and type-safe way to consume the context value and handles null checks.
 * - **Null States**: The context value will be `null` if the `MudProvider` component, which is responsible
 *   for providing this context, has not been properly initialized or is not an ancestor in the component tree.
 *   Ensure `MudProvider` wraps any components that use `useMud`.
 */
const MudContext = createContext<MudContextValueType | null>(null);

/**
 * @summary Custom React Hook to access MUD setup and synchronization state.
 * @description This hook provides a convenient way to consume the `MudContext`.
 * It returns the current MUD configuration, loading status, and synchronization status.
 * If the hook is used outside of a `MudProvider`, it will throw an error.
 *
 * @returns {MudContextValueType} The current value of the `MudContext`,
 *                                 containing MUD setup results and synchronization status.
 *
 * @example
 * ```typescript
 * import { useMud } from 'src/providers/mud';
 *
 * function MyComponent() {
 *   const { config, sync } = useMud();
 *
 *   if (sync.isSyncing) {
 *     return <Loader />; // Display a loader while MUD is syncing
 *   }
 *
 *   return (
 *     <div>
 *       <p>MUD is live: {sync.live ? 'Yes' : 'No'}</p>
 *       <p>Current Block: {sync.currentBlock.toString()}</p>
 *       // ... further usage of config and sync
 *     </div>
 *   );
 * }
 * ```
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Performance**: This hook is designed to be lightweight and can be safely called frequently
 *   within components without significant performance overhead.
 * - **Dependencies**: This hook requires a `MudProvider` component to be an ancestor in the React component tree.
 *   Without it, the hook will throw a runtime error.
 * - **Alternatives**: For simple checks or derived states based on the MUD context, consider creating
 *   more specific derived hooks (e.g., `useIsMudSynced`) to encapsulate logic and improve reusability.
 */
export const useMud = (): MudContextValueType => {
  const value = useContext(MudContext);
  if (!value) throw new Error("Must be used within a MudProvider");
  return value;
};

export default MudContext;
