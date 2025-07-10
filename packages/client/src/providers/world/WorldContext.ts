import { ChainIdT, WorldAddressT } from "@/utils/mud/core";
import { MUDChain } from "@latticexyz/common/chains";
import { createContext, useContext } from "react";
import { Hex } from "viem";

interface WorldContextType {
  worldAddress: WorldAddressT;
  chain: MUDChain;
}

const WorldContext = createContext<WorldContextType | undefined>(undefined);

export const useWorld = () => {
  const context = useContext(WorldContext);
  if (!context) {
    throw new Error("useWorld must be used within a WorldProvider");
  }
  return context;
};

export default WorldContext;
