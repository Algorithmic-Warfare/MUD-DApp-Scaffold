//@ts-nocheck
import React from "react";
import { Outlet } from "react-router-dom";

import "./App.css";

import { ConnectWallet, useConnection } from "./providers/wallet";
import { WalletMudProvider } from "./providers/mud";

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
    <WalletMudProvider>
      <Outlet />
    </WalletMudProvider>
  );
};

export default App;
