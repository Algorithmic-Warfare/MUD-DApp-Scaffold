//@ts-nocheck
import React from "react";
import { Outlet } from "react-router-dom";

import "./App.css";

import { useConnection } from "src/providers/wallet";
import ConnectWallet from "@/components/wallet/ConnectWallet";
import { MudProvider } from "./providers/mud";

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
    <MudProvider>
      <Outlet />
    </MudProvider>
  );
};

export default App;
