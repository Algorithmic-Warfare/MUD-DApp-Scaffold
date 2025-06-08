//@ts-nocheck
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import "./App.css";

import { useConnection } from "./components/mud";
import { setup } from "./data/mud/setup";
import MUDProvider from "./data/mud/providers/MUDContext";
import MUDSyncProvider from "./data/mud/providers/MUDSyncContext";
import { MudDevToolsProvider } from "./data/mud/providers/MudDevToolsContext";
import { ConnectWallet } from "./components/mud";

const App = () => {
  const [networkMUDConfig, setNetworkMUDConfig] = useState<Awaited<
    ReturnType<typeof setup>
  > | null>(null);

  const {
    connectedProvider,
    publicClient,
    walletClient,
    isCurrentChain,
    handleConnect,
    handleDisconnect,
    availableWallets,
    defaultNetwork,
  } = useConnection();

  const { connected } = connectedProvider;

  useEffect(() => {
    if (networkMUDConfig || !walletClient) return;

    // Get network information after wallet connect!
    const { worldAddress, network } = defaultNetwork;
    const { id: chainId } = network!;

    setup(publicClient, walletClient, chainId, worldAddress).then(
      async (result) => {
        setNetworkMUDConfig(result);
      }
    );
  }, [walletClient]);

  if (!connected || !publicClient || !walletClient) {
    return (
      <div className="h-full w-full bg-crude-5 -z-10">
        <ConnectWallet
          handleConnect={handleConnect}
          availableWallets={availableWallets}
        />
      </div>
    );
  }

  return (
    <>
      {!networkMUDConfig || !walletClient ? (
        <div>Not configured.</div>
      ) : (
        <MudDevToolsProvider networkMUDConfig={networkMUDConfig}>
          <MUDProvider value={networkMUDConfig}>
            <MUDSyncProvider>
              {isCurrentChain ? (
                <Outlet />
              ) : (
                <div>
                  {`Switch network to ${walletClient.chain?.name} to continue`}
                </div>
              )}
            </MUDSyncProvider>
          </MUDProvider>
        </MudDevToolsProvider>
      )}
    </>
  );
};

export default App;
