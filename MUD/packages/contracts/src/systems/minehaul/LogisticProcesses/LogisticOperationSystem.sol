// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { System } from "@latticexyz/world/src/System.sol";

import { LogisticProvider, LogisticNetwork, LogisticNetworkData, LogisticDepot, LogisticDepotData, LogisticCoordinator, LogisticCoordinatorData, LogisticAgent, LogisticAgentData, LogisticOperation, LogisticOperationData, LogisticAction, LogisticActionData, LogisticTransaction, LogisticTransactionData } from "@store/index.sol";

import { LogisticActionType, LogisticTransactionType } from "@store/common.sol";
import { LogisticSystem } from "@systems/LogisticSystem.sol";

import { Derivations, Fetches } from "@systems/Utils.sol";

contract LogisticOperationSystem is LogisticSystem {
  using Derivations for uint256;
  using Fetches for uint256;

  function createLogisticOperation(
    string memory codename,
    uint256 coordinatorId,
    uint256[] memory agentIds
  ) public onlyCoordinator(coordinatorId) agentsExist(agentIds) returns (uint256) {
    uint256 timestamp = block.timestamp;
    LogisticOperationData memory operation = LogisticOperationData({
      timestamp: timestamp,
      codename: codename,
      coordinatorId: coordinatorId,
      agentIds: agentIds
    });

    uint256 id = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, codename, coordinatorId)));

    LogisticOperation.set(id, operation);
    return id;
  }

  function deleteLogisticOperation(
    uint256 operationId
  ) public onlyCoordinator(operationId.coordinatorIdFromOperationId()) {
    LogisticOperation.deleteRecord(operationId);
  }

  function transferOperationalControl(
    uint256 operationId,
    uint256 newCoordinatorId
  ) public onlyCoordinator(operationId.coordinatorIdFromOperationId()) {
    LogisticOperation.setCoordinatorId(operationId, newCoordinatorId);
  }

  function addOperationAgent(
    uint256 operationId,
    uint256 agentId
  ) public onlyCoordinator(operationId.coordinatorIdFromOperationId()) {
    uint256[] memory currentAgents = LogisticOperation.getAgentIds(operationId);
    uint256[] memory newAgents = new uint256[](currentAgents.length + 1);
    for (uint i = 0; i < currentAgents.length; i++) {
      newAgents[i] = currentAgents[i];
    }
    newAgents[currentAgents.length] = agentId;
    LogisticOperation.setAgentIds(operationId, newAgents);
  }

  function removeOperationAgent(
    uint256 operationId,
    uint256 agentId
  ) public onlyCoordinator(operationId.coordinatorIdFromOperationId()) {
    uint256[] memory currentAgents = LogisticOperation.getAgentIds(operationId);
    uint256[] memory newAgents = new uint256[](currentAgents.length - 1);
    uint newIndex = 0;
    for (uint i = 0; i < currentAgents.length; i++) {
      if (currentAgents[i] != agentId) {
        newAgents[newIndex] = currentAgents[i];
        newIndex++;
      }
    }
    LogisticOperation.setAgentIds(operationId, newAgents);
  }
}
