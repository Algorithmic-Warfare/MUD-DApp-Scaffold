import { defineWorld } from "@latticexyz/world";

export default defineWorld({
  namespace: "AWAR",
  systems: {
    LogisticProviderSystem: {
      name: "ProviderSystem",
      openAccess: true,
    },
    LogisticCoordinatorSystem: {
      name: "CoordinateSystem",
      openAccess: true,
    },
    LogisticAgentSystem: {
      name: "AgentSystem",
      openAccess: true,
    },
    LogisticNetworkSystem: {
      name: "NetworkSystem",
      openAccess: true,
    },
    LogisticDepotSystem: {
      name: "DepotSystem",
      openAccess: true,
    },
    LogisticFixtureSystem: {
      name: "FixtureSystem",
      openAccess: true,
    },
    LogisticOperationSystem: {
      name: "OperationSystem",
      openAccess: true,
    },
    LogisticActionSystem: {
      name: "ActionSystem",
      openAccess: true,
    },
    LogisticTransactionSystem: {
      name: "TransactSystem",
      openAccess: true,
    },
  },
  tables: {
    // Logistic Actors
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
    // Logistic Infrastructure
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
    // Logistic Process
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
  enums: {
    LogisticFixtureType: ["FAUCET", "SINK"],
    LogisticActionType: ["INJECT", "TRANSFER", "EXTRACT"],
    LogisticTransactionType: ["WITHDRAWAL", "DEPOSIT"],
  },
});
