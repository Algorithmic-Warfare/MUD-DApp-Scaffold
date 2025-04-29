// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { System } from "@latticexyz/world/src/System.sol";

import { LogisticProvider, LogisticNetwork, LogisticNetworkData, LogisticDepot, LogisticDepotData, LogisticCoordinator, LogisticCoordinatorData, LogisticAgent, LogisticAgentData, LogisticOperation, LogisticOperationData, LogisticTarget, LogisticTargetData, LogisticConstraint, LogisticConstraintData, LogisticAction, LogisticActionData, LogisticTransaction, LogisticTransactionData } from "@store/index.sol";

import { LogisticActionType, LogisticTransactionType, LogisticDepotType, LogisticConstraintType } from "@store/common.sol";
import { LogisticSystem } from "@systems/LogisticSystem.sol";

import { Derivations, Fetches } from "@systems/Utils.sol";

contract LogisticAgentSystem is LogisticSystem {
  using Derivations for uint256;
  using Fetches for uint256;

  function createLogisticAgent(
    address smartCharacterAddress,
    uint256 operationId
  ) public onlyCoordinator(operationId.coordinatorIdFromOperationId()) returns (uint256) {
    uint256 timestamp = block.timestamp;
    LogisticAgentData memory agent = LogisticAgentData({
      timestamp: timestamp,
      smartCharacterAddress: smartCharacterAddress,
      operationId: operationId
    });

    uint256 id = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, smartCharacterAddress)));

    LogisticAgent.set(id, agent);
    return id;
  }

  function deleteLogisticAgent(uint256 agentId) public onlyCoordinator(agentId.coordinatorIdFromAgentId()) {
    LogisticAgent.deleteRecord(agentId);
  }
}
