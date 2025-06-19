import React, { useState, useEffect, createContext, useContext } from "react";
import { setup } from "src/data/mud";
import { useConnection } from "src/providers/wallet";
import { MudProvider } from "./MudContext";
import { MudDevToolsProvider } from "./MudDevToolsContext";

type Props = {
  children: React.ReactNode;
};

export const WalletMudProvider = ({ children }: Props) => {
  const [networkConfig, setNetworkConfig] = useState<Awaited<
    ReturnType<typeof setup>
  > | null>(null);
  const [isSettingUp, setIsSettingUp] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const {
    connectedProvider,
    publicClient,
    walletClient,
    isCurrentChain,
    defaultNetwork,
  } = useConnection();

  const { connected } = connectedProvider;

  useEffect(() => {
    if (!connected || !publicClient || !walletClient || networkConfig) return;

    const setupMud = async () => {
      try {
        setIsSettingUp(true);
        setError(null);

        console.log(connectedProvider)
        console.log(publicClient)
        console.log(walletClient)
        console.log(isCurrentChain)
        console.log(defaultNetwork)

        const { worldAddress, network } = defaultNetwork;
        const { id: chainId } = network!;

        const result = await setup(
          publicClient,
          walletClient,
          chainId,
          worldAddress
        );
        setNetworkConfig(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to setup MUD"));
      } finally {
        setIsSettingUp(false);
      }
    };

    setupMud();
  }, [connected, publicClient, walletClient, networkConfig, defaultNetwork]);

  const value = {
    networkConfig,
    isSettingUp,
    error,
  };

  if (!networkConfig || !walletClient) {
    return <div>Loading MUD configuration...</div>;
  }

  if (error) {
    return <div>Error setting up MUD: {error.message}</div>;
  }

  return (
    <WalletMudContext.Provider value={value}>
      <MudDevToolsProvider config={networkConfig}>
        <MudProvider config={networkConfig}>
          {isCurrentChain ? (
            children
          ) : (
            <div>
              {`Switch network to ${walletClient.chain?.name} to continue`}
            </div>
          )}
        </MudProvider>
      </MudDevToolsProvider>
    </WalletMudContext.Provider>
  );
};

type WalletMudContextValue = {
  networkConfig: Awaited<ReturnType<typeof setup>> | null;
  isSettingUp: boolean;
  error: Error | null;
};

export const WalletMudContext = createContext<WalletMudContextValue>({
  networkConfig: null,
  isSettingUp: false,
  error: null,
});

export const useWalletMud = () => useContext(WalletMudContext);
