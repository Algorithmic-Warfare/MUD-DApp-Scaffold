import { SmartCharacter } from "@eveworld/types";

import { stash } from "src/data/mud/stash";
import config from "contracts/mud.config";

import { useAccount } from "wagmi";

export const useSmartCharacter = () => {
  const { address } = useAccount();

  const character = stash.getRecord({
    table: config.namespaces.evefrontier.tables.CharactersByAccount,
    key: { account: (address as `0x${string}`) || "" },
  });

  const characterInfo = stash.getRecord({
    table: config.namespaces.evefrontier.tables.EntityRecordMeta,
    key: { smartObjectId: character?.smartObjectId || BigInt(0) },
  });

  const smartCharacter: SmartCharacter = {
    address: character?.account || address || "0x",
    id: character?.smartObjectId.toString() || "",
    name: characterInfo?.name || "Unknown Clone",
    isSmartCharacter: characterInfo != undefined,
    eveBalanceWei: 0,
    gasBalanceWei: 0,
    image: "https://artifacts.evefrontier.com/Character/123456789_256.jpg",
    smartAssemblies: [],
  };

  return { smartCharacter };
};
