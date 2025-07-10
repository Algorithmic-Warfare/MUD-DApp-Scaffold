import { MUDChain } from "@latticexyz/common/chains";
import { ReactNode } from "react";
import { Hex } from "viem";

/**
 * @summary Defines the structure of the value provided by the WorldContext.
 * @description This interface specifies the properties available through the WorldContext,
 * including the world address and the supported MUD chain.
 */
export interface WorldContextType {
  /**
   * @summary The hexadecimal address of the MUD world.
   * @description This address is used to interact with the deployed MUD world contract.
   */
  worldAddress: Hex;
  /**
   * @summary The MUD chain configuration.
   * @description This object contains details about the blockchain network the MUD world is deployed on.
   */
  chain: MUDChain;
}

/**
 * @summary Props for the WorldProvider component.
 * @description Defines the expected properties for the WorldProvider, primarily its children.
 */
export type WorldProviderProps = {
  /**
   * @description The child components that will have access to the World context.
   */
  children: ReactNode;
};
