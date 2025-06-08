import { createContext, useContext, useEffect, useState } from "react";
import mountDevTools from "../debug/mountDevTools";
import { SetupResult } from "../setup";

/**
 * DEVELOPMENT-ONLY: Context provider for MUD development tools.
 * Handles mounting of dev tools when network configuration is available.
 * Automatically disabled in production builds.
 *
 * @param networkMUDConfig - The MUD network configuration from setup
 * @param children - Child components to render
 */
type Props = {
  networkMUDConfig: SetupResult | null;
  children: React.ReactNode;
};

const MudDevToolsContext = createContext<null>(null);

export const MudDevToolsProvider = ({ networkMUDConfig, children }: Props) => {
  const [mounted, setMounted] = useState(false);
  const isDevelopment = import.meta.env.MODE === "development";

  useEffect(() => {
    if (isDevelopment && networkMUDConfig && !mounted) {
      mountDevTools(networkMUDConfig);
      setMounted(true);
    }
  }, [networkMUDConfig, mounted, isDevelopment]);

  return (
    <MudDevToolsContext.Provider value={null}>
      {children}
    </MudDevToolsContext.Provider>
  );
};

/**
 * Hook to access MUD dev tools context
 * @returns Context value for MUD dev tools (null in production)
 */
export const useMudDevTools = () => useContext(MudDevToolsContext);
