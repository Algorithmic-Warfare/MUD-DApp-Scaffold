// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { System } from "@latticexyz/world/src/System.sol";

import { LogisticProvider, LogisticNetwork, LogisticNetworkData, LogisticDepot, LogisticDepotData, LogisticCoordinator, LogisticCoordinatorData, LogisticAgent, LogisticAgentData, LogisticOperation, LogisticOperationData, LogisticTarget, LogisticTargetData, LogisticConstraint, LogisticConstraintData, LogisticAction, LogisticActionData, LogisticTransaction, LogisticTransactionData } from "@store/index.sol";

import { LogisticActionType, LogisticTransactionType, LogisticDepotType, LogisticConstraintType } from "@store/common.sol";
import { LogisticSystem } from "@systems/LogisticSystem.sol";

import { Derivations, Fetches } from "@systems/Utils.sol";

contract LogisticTargetSystem is LogisticSystem {
  using Derivations for bytes32;
  using Fetches for uint256;

  // function createLogisticTarget(
  //   uint256 targetItemId,
  //   uint256 targetItemAmount,
  //   bytes32[] memory targetDepotIds,
  //   bytes32 operationId
  // ) public returns (bytes32) {
  //   LogisticTargetData memory target = LogisticTargetData({
  //     targetItemId: targetItemId,
  //     targetItemAmount: targetItemAmount,
  //     targetDepotIds: targetDepotIds,
  //     operationId: operationId
  //   });

  //   bytes32 id = keccak256(abi.encodePacked(block.timestamp, block.prevrandao));
  //   LogisticTarget.set(id, target);
  //   return id;
  // }

  // function deleteLogisticTarget(bytes32 targetId) public {
  //   LogisticTarget.deleteRecord(targetId);
  // }

  // function addTargetDepot(bytes32 targetId, bytes32 depotId) public {
  //   bytes32[] memory currentDepots = LogisticTarget.getTargetDepotIds(targetId);
  //   bytes32[] memory newDepots = new bytes32[](currentDepots.length + 1);
  //   for (uint i = 0; i < currentDepots.length; i++) {
  //     newDepots[i] = currentDepots[i];
  //   }
  //   newDepots[currentDepots.length] = depotId;
  //   LogisticTarget.setTargetDepotIds(targetId, newDepots);
  // }

  // function removeTargetDepot(bytes32 targetId, bytes32 depotId) public {
  //   bytes32[] memory currentDepots = LogisticTarget.getTargetDepotIds(targetId);
  //   bytes32[] memory newDepots = new bytes32[](currentDepots.length - 1);
  //   uint newIndex = 0;
  //   for (uint i = 0; i < currentDepots.length; i++) {
  //     if (currentDepots[i] != depotId) {
  //       newDepots[newIndex] = currentDepots[i];
  //       newIndex++;
  //     }
  //   }
  //   LogisticTarget.setTargetDepotIds(targetId, newDepots);
  // }
}
