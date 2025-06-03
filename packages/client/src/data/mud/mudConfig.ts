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

    LogisticFixtureType: ["FAUCET", "SINK"],
    LogisticActionType: ["INJECT", "TRANSFER", "EXTRACT"],
    LogisticTransactionType: ["WITHDRAWAL", "DEPOSIT"],
  },
  namespaces: {
    AWAR: {
      tables: {
        LogisticProvider: {
          schema: {
            id: "uint256",
            timestamp: "uint256",
            smartCharacterAddress: "address",
          },
          key: ["id"],
        },
        LogisticCoordinator: {
          schema: {
            id: "uint256",
            timestamp: "uint256",
            smartCharacterAddress: "address",
            networkId: "uint256",
          },
          key: ["id"],
        },
        LogisticAgent: {
          schema: {
            id: "uint256",
            timestamp: "uint256",
            smartCharacterAddress: "address",
            operationId: "uint256",
          },
          key: ["id"],
        },
        LogisticNetwork: {
          schema: {
            id: "uint256",
            timestamp: "uint256",
            providerId: "uint256",
            codename: "string",
            depotIds: "uint256[]",
            coordinatorIds: "uint256[]",
            fixtureIds: "uint256[]",
          },
          key: ["id"],
        },
        LogisticDepot: {
          schema: {
            id: "uint256",
            timestamp: "uint256",
            providerId: "uint256",
            smartStorageUnitId: "uint256",
            codename: "string",
          },
          key: ["id"],
        },
        LogisticFixture: {
          schema: {
            id: "uint256",
            timestamp: "uint256",
            providerId: "uint256",
            fixtureType: "LogisticFixtureType",
            codename: "string",
          },
          key: ["id"],
        },
        LogisticOperation: {
          schema: {
            id: "uint256",
            timestamp: "uint256",
            coordinatorId: "uint256",
            codename: "string",
            agentIds: "uint256[]",
          },
          key: ["id"],
        },
        LogisticAction: {
          schema: {
            id: "uint256",
            timestamp: "uint256",
            sourceId: "uint256",
            destinationId: "uint256",
            actionItemId: "uint256",
            actionItemAmount: "uint256",
            operationId: "uint256",
            actionType: "LogisticActionType",
          },
          key: ["id"],
        },
        LogisticTransaction: {
          schema: {
            id: "uint256",
            timestamp: "uint256",
            transactionItemId: "uint256",
            transactionItemAmount: "uint256",
            agentId: "uint256",
            depotId: "uint256",
            actionId: "uint256",
            transactionType: "LogisticTransactionType",
          },
          key: ["id"],
        },
      },
    },
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

        Characters: {
          name: "Characters",
          schema: {
            smartObjectId: "uint256",
            exists: "bool",
            tribeId: "uint256",
            createdAt: "uint256",
          },
          key: ["smartObjectId"],
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
