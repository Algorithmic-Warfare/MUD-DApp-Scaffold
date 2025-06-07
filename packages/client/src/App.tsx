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
import {
  EveConnectWallet,
  EveFeralCodeGen,
  ErrorNotice,
  ErrorNoticeTypes,
  EveLayout,
  EveAlert,
} from "@eveworld/ui-components";
import MUDProvider from "./data/mud/providers/MUDContext";
import MUDSyncProvider from "./data/mud/providers/MUDSyncContext";

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
        <EveConnectWallet
          handleConnect={handleConnect}
          availableWallets={availableWallets}
        />
        <GenerateEveFeralCodeGen style="top-12" />
        <GenerateEveFeralCodeGen style="bottom-12" />
      </div>
    );
  }

  return (
    <>
      <EveAlert
        defaultNetwork={defaultNetwork}
        message={notification.message}
        txHash={notification.txHash}
        severity={notification.severity}
        handleClose={notification.handleClose}
        isOpen={notification.isOpen}
        isStyled={false}
      />

      <>
        {!networkMUDConfig || !walletClient ? (
          <div>Not configured.</div>
        ) : (
          <MUDProvider value={networkMUDConfig}>
            <MUDSyncProvider>
              <EveLayout
                isCurrentChain={isCurrentChain}
                connected={connectedProvider.connected}
                handleDisconnect={handleDisconnect}
                walletClient={walletClient}
                smartCharacter={smartCharacter}
              >
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
              </EveLayout>
            </MUDSyncProvider>
          </MUDProvider>
        )}
      </>
      <GenerateEveFeralCodeGen style="bottom-12 text-xs -z-10" />
    </>
  );
};

export default App;

const GenerateEveFeralCodeGen = ({
  style,
  count = 5,
}: {
  style?: string;
  count?: number;
}) => {
  const codes = Array.from({ length: count }, (_, i) => i);
  return (
    <div
      className={`absolute flex justify-between px-10 justify-items-center w-full text-xs ${style}`}
    >
      {codes.map((index) => (
        <EveFeralCodeGen key={index} />
      ))}{" "}
    </div>
  );
};
