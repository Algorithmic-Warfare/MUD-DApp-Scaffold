import { defineStore } from "@latticexyz/store";

export default defineStore({
  userTypes: {
    ResourceId: {
      type: "bytes32",
      filePath: "@latticexyz/store/src/ResourceId.sol",
    },
  },
  enums: {
    State: ["NULL", "UNANCHORED", "ANCHORED", "ONLINE", "DESTROYED"],
    SmartAssemblyType: ["SMART_STORAGE_UNIT", "SMART_TURRET", "SMART_GATE"],
    KillMailLossType: ["SHIP", "POD"],
  },
  namespaces: {
    evefrontier: {
      tables: {
        EntityRecordMeta: {
          name: "EntityRecordMeta",
          schema: {
            smartObjectId: "uint256",
            name: "string",
            dappURL: "string",
            description: "string",
          },
          key: ["smartObjectId"],
        },

        CharactersTable: {
          name: "CharactersTable",
          schema: {
            characterId: "uint256",
            characterAddress: "address",
            corpId: "uint256",
            createdAt: "uint256",
          },
          key: ["characterId"],
        },

        CharactersByAccount: {
          name: "CharactersByAcco",
          schema: {
            account: "address",
            smartObjectId: "uint256",
          },
          key: ["account"],
        },
      },
    },
    world: {
      tables: {
        NamespaceOwner: {
          name: "NamespaceOwner",
          schema: { namespaceId: "ResourceId", owner: "address" },
          key: ["namespaceId"],
        },
      },
    },
  },
});
