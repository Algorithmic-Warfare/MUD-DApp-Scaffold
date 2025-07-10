import { ReactNode } from "react";
import WorldContext from "./WorldContext";
import { getSupportedChain } from "@/data/mud/network/supportedChains";

type Props = {
  children: ReactNode;
};

export const WorldProvider = ({ children }: Props) => {
  const worldAddress = import.meta.env.VITE_WORLD_ADDRESS;
  const chain = getSupportedChain(Number(import.meta.env.VITE_CHAIN_ID));

  if (!worldAddress) {
    console.error(
      "VITE_WORLD_ADDRESS is not defined in environment variables."
    );
    // You might want to throw an error, render a fallback UI, or handle this differently
    // depending on your application's requirements.
    return null;
  }

  if (!chain) {
    console.error("Chain not found for the provided VITE_CHAIN_ID.");
    // Handle the case where the chain is not found
    return null;
  }

  return (
    <WorldContext.Provider value={{ worldAddress, chain }}>
      {children}
    </WorldContext.Provider>
  );
};
