import { createContext, useContext, useEffect, useState } from "react";
import mountDevTools from "../../data/mud/debug/mountDevTools";
import { SetupResult } from "../../data/mud/setup";

/**
 * DEVELOPMENT-ONLY: Context provider for MUD development tools.
 * Handles mounting of dev tools when network configuration is available.
 * Automatically disabled in production builds.
 *
 * @param config - The MUD network configuration from setup
 * @param children - Child components to render
 */
type Props = {
  config: SetupResult | null;
  children: React.ReactNode;
};

const MudDevToolsContext = createContext<null>(null);

export const MudDevToolsProvider = ({ config, children }: Props) => {
  const [mounted, setMounted] = useState(false);
  const isDevelopment = import.meta.env.MODE === "development";

  useEffect(() => {
    if (isDevelopment && config && !mounted) {
      mountDevTools(config);
      setMounted(true);
    }
  }, [config, mounted, isDevelopment]);

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
