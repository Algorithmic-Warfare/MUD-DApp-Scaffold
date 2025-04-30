import { defineWorld } from "@latticexyz/world";

export default defineWorld({
  namespace: "AWAR",
  systems: {
    ClearanceVerifierSystem: {
      name: "VerifierSystem",
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
    // Logistic Infrastructure
    LogisticNetwork: {
      schema: {
        id: "uint256",
        timestamp: "uint256",
        name: "string",
        depotIds: "uint256[]",
      },
      key: ["id"],
    },
    LogisticDepot: {
      schema: {
        id: "uint256",
        timestamp: "uint256",
        smartStorageUnitId: "uint256",
        networkIds: "uint256[]",
      },
      key: ["id"],
    },
    // Logistic Process
    LogisticOperation: {
      schema: {
        id: "uint256",
        timestamp: "uint256",
        coordinator: "address",
        networkId: "uint256",
        codename: "string",
      },
      key: ["id"],
    },
    LogisticAction: {
      schema: {
        id: "uint256",
        timestamp: "uint256",
        sourceDepotId: "uint256",
        destinationDepotId: "uint256",
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
        agent: "address",
        depotId: "uint256",
        actionId: "uint256",
        transactionType: "LogisticTransactionType",
      },
      key: ["id"],
    },
  },
  enums: {
    LogisticActionType: ["INJECT", "TRANSFER", "EXTRACT"],
    LogisticTransactionType: ["WITHDRAWAL", "DEPOSIT"],
  },
});
