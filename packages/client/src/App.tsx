//@ts-nocheck
import React from "react";
import { Outlet } from "react-router-dom";

import "./App.css";

import { MudWalletAdapterProvider } from "./providers/mud";
import { useConnection } from "src/providers/wallet";
import ConnectWallet from "@/components/wallet/ConnectWallet";
import { WorldProvider } from "./providers/world";

const App = () => {
  const {
    connectedProvider,
    handleConnect,
    handleDisconnect,
    availableWallets,
  } = useConnection();

  const { connected } = connectedProvider;

  if (!connected) {
    return (
      <ConnectWallet
        handleConnect={handleConnect}
        availableWallets={availableWallets}
      />
    );
  }

  return (
    <WorldProvider>
      <MudWalletAdapterProvider>
        <Outlet />
      </MudWalletAdapterProvider>
    </WorldProvider>
  );
};

export default App;
