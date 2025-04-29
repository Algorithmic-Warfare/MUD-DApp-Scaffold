// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { System } from "@latticexyz/world/src/System.sol";

import { LogisticProvider, LogisticNetwork, LogisticNetworkData, LogisticDepot, LogisticDepotData, LogisticCoordinator, LogisticCoordinatorData, LogisticAgent, LogisticAgentData, LogisticOperation, LogisticOperationData, LogisticTarget, LogisticTargetData, LogisticConstraint, LogisticConstraintData, LogisticAction, LogisticActionData, LogisticTransaction, LogisticTransactionData } from "@store/index.sol";

import { LogisticActionType, LogisticTransactionType, LogisticDepotType, LogisticConstraintType } from "@store/common.sol";
import { LogisticSystem } from "@systems/LogisticSystem.sol";

import { Derivations, Fetches } from "@systems/Utils.sol";

contract LogisticConstraintSystem is System {
  using Derivations for bytes32;
  using Fetches for uint256;

  // function createLogisticConstraint(
  //   LogisticConstraintType constraintType,
  //   uint256 constraintItemId,
  //   uint256 constraintItemAmount,
  //   bytes32[] memory constrainedDepotIds,
  //   bytes32 operationId
  // ) public returns (bytes32) {
  //   LogisticConstraintData memory constraint = LogisticConstraintData({
  //     constraintType: constraintType,
  //     constraintItemId: constraintItemId,
  //     constraintItemAmount: constraintItemAmount,
  //     constrainedDepotIds: constrainedDepotIds,
  //     operationId: operationId
  //   });
  //   bytes32 id = keccak256(abi.encodePacked(block.timestamp, block.prevrandao));
  //   LogisticConstraint.set(id, constraint);
  //   return id;
  // }

  // function deleteLogisticConstraint(bytes32 constraintId) public {
  //   LogisticConstraint.deleteRecord(constraintId);
  // }
}
