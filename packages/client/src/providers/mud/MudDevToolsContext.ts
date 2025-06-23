import { createContext, useContext } from "react";

/**
 * MUD Dev Tools Context Value
 *
 * Add properties and methods related to the MUD dev tools here.
 */
interface MudDevToolsContextValue {
  // TODO: Add context properties and methods
}

const MudDevToolsContext = createContext<MudDevToolsContextValue | undefined>(
  undefined
);

/**
 * Hook to access MUD dev tools context
 * @returns Context value for MUD dev tools (undefined if used outside provider)
 */
export const useMudDevTools = () => {
  const context = useContext(MudDevToolsContext);
  if (!context) {
    throw new Error("useMudDevTools must be used within a MudDevToolsProvider");
  }
  return context;
};

export default MudDevToolsContext;
