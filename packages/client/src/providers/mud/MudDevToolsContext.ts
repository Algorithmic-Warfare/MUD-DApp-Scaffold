import { createContext, useContext } from "react";

/**
 * @summary Context for MUD Dev Tools
 * @description Provides access to MUD development tools and related functionalities.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Consumption**: Use the `useMudDevTools` hook to access this context.
 * - **Availability**: This context is only available in development mode.
 */
interface MudDevToolsContextValue {
  // TODO: Add context properties and methods
}

const MudDevToolsContext = createContext<MudDevToolsContextValue | undefined>(
  undefined
);

/**
 * @summary Hook to access MUD dev tools context
 * @description Provides access to the MUD dev tools context.
 * @returns {MudDevToolsContextValue} Context value for MUD dev tools.
 *
 * @example
 * const devTools = useMudDevTools();
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Dependencies**: Requires `MudDevToolsProvider` parent.
 * - **Availability**: Only available in development mode.
 */
export const useMudDevTools = () => {
  const context = useContext(MudDevToolsContext);
  if (!context) {
    throw new Error("useMudDevTools must be used within a MudDevToolsProvider");
  }
  return context;
};

export default MudDevToolsContext;
