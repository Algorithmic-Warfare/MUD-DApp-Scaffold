import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { RouterProvider } from "react-router-dom";

import { StashSyncProvider } from "src/data/mud/StashSyncProvider";
import { getWorldDeploy } from "src/data/mud/getWorldDeploy";
import { wagmiConfig } from "src/data/mud/wagmiConfig";
import { stash } from "src/data/mud/stash";

import { chainId } from "src/common";
import routes from "src/routes";

const queryClient = new QueryClient();

getWorldDeploy().then((worldDeploy) => {
  createRoot(document.getElementById("react-root")!).render(
    <StrictMode>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            modalSize="compact"
            theme={darkTheme({
              accentColor: "hsla(26, 85%, 58%, 1)",
            })}
          >
            <StashSyncProvider
              address={worldDeploy.address}
              startBlock={worldDeploy.blockNumber ?? undefined}
              stash={stash}
            >
              <RouterProvider
                router={routes}
                future={{ v7_startTransition: true }}
              />
            </StashSyncProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </StrictMode>
  );
});
