import { defineWorld } from "@latticexyz/world";

export default defineWorld({
  namespace: "AWAR",
  systems: {
    LogisticClearanceSystem: {
      name: "ClearanceSystem",
      openAccess: true,
    },
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
    LogisticTargetSystem: {
      name: "TargetSystem",
      openAccess: true,
    },
    LogisticConstraintSystem: {
      name: "ConstraintSystem",
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
        name: "string",
        coordinatorIds: "uint256[]",
      },
      key: ["id"],
    },
    LogisticDepot: {
      schema: {
        id: "uint256",
        timestamp: "uint256",
        smartStorageUnitId: "uint256",
        depotType: "LogisticDepotType",
        networkIds: "uint256[]",
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
        agentId: "uint256",
        depotId: "uint256",
        actionId: "uint256",
        transactionType: "LogisticTransactionType",
      },
      key: ["id"],
    },
    // Logistic Configuration
    LogisticTarget: {
      schema: {
        id: "uint256",
        targetItemId: "uint256",
        targetItemAmount: "uint256",
        operationId: "uint256",
        targetDepotIds: "uint256[]",
      },
      key: ["id"],
    },
    LogisticConstraint: {
      schema: {
        id: "uint256",
        constraintItemId: "uint256",
        constraintItemAmount: "uint256",
        operationId: "uint256",
        constraintType: "LogisticConstraintType",
        constrainedDepotIds: "uint256[]",
      },
      key: ["id"],
    },
  },
  enums: {
    LogisticDepotType: ["COLD", "WARM", "HOT"],
    LogisticConstraintType: ["EQUAL", "ABOVE", "BELOW"],
    LogisticActionType: ["INJECT", "TRANSFER", "EXTRACT"],
    LogisticTransactionType: ["WITHDRAWAL", "DEPOSIT"],
  },
});
