// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

// make sure this matches mud.config.ts namespace
bytes14 constant MINEHAUL_DEPLOYMENT_NAMESPACE = "AWAR";
bytes16 constant MINEHAUL_SYSTEM_NAME = "MinehaulSystem";

// Actor systems
bytes16 constant LOGISTIC_PROVIDER_SYSTEM_NAME = "ProviderSystem";
bytes16 constant LOGISTIC_COORDINATOR_SYSTEM_NAME = "CoordinateSystem";
bytes16 constant LOGISTIC_AGENT_SYSTEM_NAME = "AgentSystem";

// Structure systems
bytes16 constant LOGISTIC_NETWORK_SYSTEM_NAME = "NetworkSystem";
bytes16 constant LOGISTIC_DEPOT_SYSTEM_NAME = "DepotSystem";
bytes16 constant LOGISTIC_FIXTURE_SYSTEM_NAME = "FixtureSystem";

// Process systems
bytes16 constant LOGISTIC_OPERATION_SYSTEM_NAME = "OperationSystem";
bytes16 constant LOGISTIC_ACTION_SYSTEM_NAME = "ActionSystem";
bytes16 constant LOGISTIC_TRANSACTION_SYSTEM_NAME = "TransactSystem";
