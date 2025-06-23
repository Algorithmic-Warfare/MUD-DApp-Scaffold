import { createContext, useContext } from "react";

import { WalletContextType } from "./types";

const WalletContext = createContext<WalletContextType>({
  connectedProvider: {
    provider: null,
    connected: false,
  },
  publicClient: null,
  walletClient: null,
  bundlerClient: null,
  handleConnect: async () => {},
  handleDisconnect: async () => {},
  isCurrentChain: false,
  availableWallets: [],
  defaultNetwork: undefined,
  providers: [],
  connected: false,
});

export const useConnection = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useConnection must be used within an WalletContext");
  }
  return context;
};

export default WalletContext;
