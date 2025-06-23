import { useEffect, useState } from "react";
import MudDevToolsContext from "./MudDevToolsContext";
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
    <MudDevToolsContext.Provider value={{}}>
      {children}
    </MudDevToolsContext.Provider>
  );
};
