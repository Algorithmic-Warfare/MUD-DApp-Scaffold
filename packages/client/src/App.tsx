//@ts-nocheck
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import "./App.css";

import {
  useNotification,
  useConnection,
  useSmartObject,
} from "@eveworld/contexts";

import mountDevTools from "./data/mud/debug/mountDevTools";
import { setup } from "./data/mud/setup";
import MUDProvider from "./data/mud/providers/MUDContext";
import MUDSyncProvider from "./data/mud/providers/MUDSyncContext";
import ConnectWallet from "./components/web3/ConnectWallet";

const App = () => {
  const [networkMUDConfig, setNetworkMUDConfig] = useState<Awaited<
    ReturnType<typeof setup>
  > | null>(null);

  const [mountedMudDevTools, setMountedMudDevTools] = useState<boolean>(false);

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
  const { notification } = useNotification();
  const { loading, smartAssembly, smartCharacter } = useSmartObject();

  const { connected } = connectedProvider;

  useEffect(() => {
    if (networkMUDConfig || !walletClient) return;

    // Get network information after wallet connect!
    const { worldAddress, network } = defaultNetwork;
    const { id: chainId } = network!;

    // This sets up MUD dev tools
    setup(publicClient, walletClient, chainId, worldAddress).then(
      async (result) => {
        setNetworkMUDConfig(result);
        // if (!mountedMudDevTools) {
        //   await mountDevTools(result);
        //   setMountedMudDevTools(true);
        // }
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
        <MUDProvider value={networkMUDConfig}>
          <MUDSyncProvider>
            {isCurrentChain ? (
              <Outlet />
            ) : (
              <ErrorNotice
                loading={loading}
                smartAssembly={smartAssembly}
                type={ErrorNoticeTypes.MESSAGE}
                errorMessage={`Switch network to ${walletClient.chain?.name} to continue`}
              />
            )}
          </MUDSyncProvider>
        </MUDProvider>
      )}
    </>
  );
};

export default App;
