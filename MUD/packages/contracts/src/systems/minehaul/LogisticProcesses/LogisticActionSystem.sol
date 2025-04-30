// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { System } from "@latticexyz/world/src/System.sol";

import { LogisticNetwork, LogisticNetworkData, LogisticDepot, LogisticDepotData, LogisticOperation, LogisticOperationData, LogisticAction, LogisticActionData, LogisticTransaction, LogisticTransactionData } from "@store/index.sol";

import { LogisticActionType, LogisticTransactionType } from "@store/common.sol";

import { InventoryItemTable, InventoryItemTableData } from "@eveworld/world/src/codegen/tables/InventoryItemTable.sol";
import { InventoryTable, InventoryTableData } from "@eveworld/world/src/codegen/tables/InventoryTable.sol";

import { ProcessErrors } from "./errors.sol";
import { NOT_IN_THE_SAME_NETWORK, INSUFFICIENT_ITEM_AMOUNT, INSUFFICIENT_INVENTORY_CAPACITY, ILLOGICAL_ACTION } from "./errors.sol";

import { LOGISTIC_SOURCE, LOGISTIC_SINK } from "@systems/LogisticStructures/constants.sol";

import { LogisticSystem } from "@systems/LogisticSystem.sol";
import { Derivations, Fetches } from "@systems/Utils.sol";

import { ProofArgs } from "@systems/LogisticClearance/types.sol";

contract LogisticActionSystem is LogisticSystem {
  using Derivations for uint256;
  using Fetches for uint256;

  // Make sure the depots are within the same network
  modifier withinTheSameNetwork(
    LogisticActionType actionType,
    uint256 sourceDepotId,
    uint256 destinationDepotId,
    uint256 operationId
  ) {
    if (actionType == LogisticActionType.TRANSFER) {
      bool matchInTheSource = false;
      bool matchInTheDestination = false;

      uint256 networkId = operationId.networkIdFromOperationId();

      uint256[] memory sourceDepotNetworkIds = LogisticDepot.getNetworkIds(sourceDepotId);
      uint256[] memory destinationDepotNetworkIds = LogisticDepot.getNetworkIds(destinationDepotId);

      for (uint32 i = 0; i < sourceDepotNetworkIds.length; i++) {
        if (sourceDepotNetworkIds[i] == networkId) {
          matchInTheSource = true;
        }
      }

      for (uint32 i = 0; i < destinationDepotNetworkIds.length; i++) {
        if (destinationDepotNetworkIds[i] == networkId) {
          matchInTheDestination = true;
        }
      }

      if (!(matchInTheSource && matchInTheDestination)) {
        revert ProcessErrors.ACTION_InvalidDepot(NOT_IN_THE_SAME_NETWORK);
      }
    }
    _;
  }
  // Make sure that the source has enough items
  // Make sure that the destination has enough space
  modifier isDoable(
    LogisticActionType actionType,
    uint256 actionItemId,
    uint256 actionItemAmount,
    uint256 sourceDepotId,
    uint256 destinationDepotId
  ) {
    if (actionType == LogisticActionType.EXTRACT || actionType == LogisticActionType.TRANSFER) {
      InventoryItemTableData memory itemstoBeWithdrawn = InventoryItemTable.get(
        LogisticDepot.getSmartStorageUnitId(sourceDepotId),
        actionItemId
      );

      if (actionItemAmount > itemstoBeWithdrawn.quantity) {
        revert ProcessErrors.ACTION_InvalidAmount(INSUFFICIENT_ITEM_AMOUNT);
      }
    }
    if (actionType == LogisticActionType.INJECT || actionType == LogisticActionType.TRANSFER) {
      InventoryTableData memory destinationInventory = InventoryTable.get(
        LogisticDepot.getSmartStorageUnitId(destinationDepotId)
      );

      if (actionItemAmount > (destinationInventory.capacity - destinationInventory.usedCapacity)) {
        revert ProcessErrors.ACTION_InvalidAmount(INSUFFICIENT_INVENTORY_CAPACITY);
      }
    }
    _;
  }
  // Make sure that action types use the proper depotIds, 0 to mean out of the Minehaul system.
  modifier logicalAction(
    LogisticActionType actionType,
    uint256 sourceDepotId,
    uint256 destinationDepotId
  ) {
    // TODO Need to add Logistic Fixtures to take care of this,
    if (actionType == LogisticActionType.INJECT && sourceDepotId != LOGISTIC_SOURCE) {
      revert ProcessErrors.ACTION_InvalidAction(ILLOGICAL_ACTION);
    }
    if (actionType == LogisticActionType.EXTRACT && destinationDepotId != LOGISTIC_SINK) {
      revert ProcessErrors.ACTION_InvalidAction(ILLOGICAL_ACTION);
    }
    if (
      actionType == LogisticActionType.TRANSFER &&
      (destinationDepotId == LOGISTIC_SINK || sourceDepotId == LOGISTIC_SOURCE)
    ) {
      revert ProcessErrors.ACTION_InvalidAction(ILLOGICAL_ACTION);
    }
    _;
  }

  function createLogisticAction(
    ProofArgs memory proof,
    LogisticActionType actionType,
    uint256 actionItemId,
    uint256 actionItemAmount,
    uint256 sourceDepotId,
    uint256 destinationDepotId,
    uint256 operationId
  )
    public
    onlyCoordinator(proof)
    logicalAction(actionType, sourceDepotId, destinationDepotId)
    isDoable(actionType, actionItemId, actionItemAmount, sourceDepotId, destinationDepotId)
    withinTheSameNetwork(actionType, sourceDepotId, destinationDepotId, operationId)
    returns (uint256)
  {
    uint256 timestamp = block.timestamp;
    LogisticActionData memory action = LogisticActionData({
      timestamp: timestamp,
      actionType: actionType,
      sourceDepotId: sourceDepotId,
      destinationDepotId: destinationDepotId,
      actionItemId: actionItemId,
      actionItemAmount: actionItemAmount,
      operationId: operationId
    });

    uint256 id = uint256(
      keccak256(
        abi.encodePacked(
          block.timestamp,
          block.prevrandao,
          operationId,
          actionItemId,
          actionItemAmount,
          sourceDepotId,
          destinationDepotId
        )
      )
    );

    LogisticAction.set(id, action);
    return id;
  }

  function deleteLogisticAction(ProofArgs memory proof, uint256 actionId) public onlyCoordinator(proof) {
    LogisticAction.deleteRecord(actionId);
  }

  function editActionType(
    ProofArgs memory proof,
    uint256 actionId,
    LogisticActionType newActionType
  ) public onlyCoordinator(proof) {
    LogisticAction.setActionType(actionId, newActionType);
  }

  function editActionSourceDepot(
    ProofArgs memory proof,
    uint256 actionId,
    uint256 newSourceDepotId
  ) public onlyCoordinator(proof) {
    LogisticAction.setSourceDepotId(actionId, newSourceDepotId);
  }

  function editActionDestinationDepot(
    ProofArgs memory proof,
    uint256 actionId,
    uint256 newDestinationDepotId
  ) public onlyCoordinator(proof) {
    LogisticAction.setDestinationDepotId(actionId, newDestinationDepotId);
  }

  function editActionItemId(
    ProofArgs memory proof,
    uint256 actionId,
    uint256 newActionItemId
  ) public onlyCoordinator(proof) {
    LogisticAction.setActionItemId(actionId, newActionItemId);
  }

  function editActionItemAmount(
    ProofArgs memory proof,
    uint256 actionId,
    uint256 newActionItemAmount
  ) public onlyCoordinator(proof) {
    LogisticAction.setActionItemAmount(actionId, newActionItemAmount);
  }
}
