// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { System } from "@latticexyz/world/src/System.sol";

import { LogisticProvider, LogisticNetwork, LogisticNetworkData, LogisticDepot, LogisticDepotData, LogisticCoordinator, LogisticCoordinatorData, LogisticAgent, LogisticAgentData, LogisticOperation, LogisticOperationData, LogisticAction, LogisticActionData, LogisticTransaction, LogisticTransactionData } from "@store/index.sol";

import { LogisticActionType, LogisticTransactionType } from "@store/common.sol";

import { InventoryItemTable, InventoryItemTableData } from "@eveworld/world/src/codegen/tables/InventoryItemTable.sol";
import { InventoryTable, InventoryTableData } from "@eveworld/world/src/codegen/tables/InventoryTable.sol";

import { ProcessErrors } from "./errors.sol";
import { NOT_IN_THE_SAME_NETWORK, INSUFFICIENT_ITEM_AMOUNT, INSUFFICIENT_INVENTORY_CAPACITY, ILLOGICAL_ACTION } from "./errors.sol";

import { LogisticSystem } from "@systems/LogisticSystem.sol";
import { Derivations, Fetches } from "@systems/Utils.sol";

contract LogisticActionSystem is LogisticSystem {
  using Derivations for uint256;
  using Fetches for uint256;

  // Make sure the depots are within the same network
  modifier withinTheSameNetwork(
    LogisticActionType actionType,
    uint256 sourceId,
    uint256 destinationId,
    uint256 operationId
  ) {
    if (actionType == LogisticActionType.TRANSFER) {
      bool matchInTheSource = false;
      bool matchInTheDestination = false;

      uint256 networkId = operationId.networkIdFromOperationId();
      uint256[] memory depotIds = LogisticNetwork.getDepotIds(networkId);

      for (uint32 i = 0; i < depotIds.length; i++) {
        if (depotIds[i] == sourceId) {
          matchInTheSource = true;
        }

        if (depotIds[i] == destinationId) {
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
    uint256 sourceId,
    uint256 destinationId
  ) {
    if (actionType == LogisticActionType.EXTRACT || actionType == LogisticActionType.TRANSFER) {
      InventoryItemTableData memory itemstoBeWithdrawn = InventoryItemTable.get(
        LogisticDepot.getSmartStorageUnitId(sourceId),
        actionItemId
      );

      if (actionItemAmount > itemstoBeWithdrawn.quantity) {
        revert ProcessErrors.ACTION_InvalidAmount(INSUFFICIENT_ITEM_AMOUNT);
      }
    }
    if (actionType == LogisticActionType.INJECT || actionType == LogisticActionType.TRANSFER) {
      InventoryTableData memory destinationInventory = InventoryTable.get(
        LogisticDepot.getSmartStorageUnitId(destinationId)
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
    uint256 sourceId,
    uint256 destinationId
  ) {
    // TODO Need to add Logistic Fixtures to take care of this,
    if (actionType == LogisticActionType.INJECT && !sourceId.isFaucet()) {
      revert ProcessErrors.ACTION_InvalidAction(ILLOGICAL_ACTION);
    }
    if (actionType == LogisticActionType.EXTRACT && !destinationId.isSink()) {
      revert ProcessErrors.ACTION_InvalidAction(ILLOGICAL_ACTION);
    }
    if (actionType == LogisticActionType.TRANSFER && (destinationId.isSink() || sourceId.isFaucet())) {
      revert ProcessErrors.ACTION_InvalidAction(ILLOGICAL_ACTION);
    }
    _;
  }

  function createLogisticAction(
    LogisticActionType actionType,
    uint256 actionItemId,
    uint256 actionItemAmount,
    uint256 sourceId,
    uint256 destinationId,
    uint256 operationId
  )
    public
    onlyCoordinator(operationId.coordinatorIdFromOperationId())
    logicalAction(actionType, sourceId, destinationId)
    isDoable(actionType, actionItemId, actionItemAmount, sourceId, destinationId)
    withinTheSameNetwork(actionType, sourceId, destinationId, operationId)
    returns (uint256)
  {
    uint256 timestamp = block.timestamp;
    LogisticActionData memory action = LogisticActionData({
      timestamp: timestamp,
      actionType: actionType,
      sourceId: sourceId,
      destinationId: destinationId,
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
          sourceId,
          destinationId
        )
      )
    );

    LogisticAction.set(id, action);
    return id;
  }

  function deleteLogisticAction(uint256 actionId) public onlyCoordinator(actionId.coordinatorIdFromActionId()) {
    LogisticAction.deleteRecord(actionId);
  }

  function editActionType(
    uint256 actionId,
    LogisticActionType newActionType
  ) public onlyCoordinator(actionId.coordinatorIdFromActionId()) {
    LogisticAction.setActionType(actionId, newActionType);
  }

  function editActionSource(
    uint256 actionId,
    uint256 newSourceId
  ) public onlyCoordinator(actionId.coordinatorIdFromActionId()) {
    LogisticAction.setSourceId(actionId, newSourceId);
  }

  function editActionDestination(
    uint256 actionId,
    uint256 newDestinationId
  ) public onlyCoordinator(actionId.coordinatorIdFromActionId()) {
    LogisticAction.setDestinationId(actionId, newDestinationId);
  }

  function editActionItemId(
    uint256 actionId,
    uint256 newActionItemId
  ) public onlyCoordinator(actionId.coordinatorIdFromActionId()) {
    LogisticAction.setActionItemId(actionId, newActionItemId);
  }

  function editActionItemAmount(
    uint256 actionId,
    uint256 newActionItemAmount
  ) public onlyCoordinator(actionId.coordinatorIdFromActionId()) {
    LogisticAction.setActionItemAmount(actionId, newActionItemAmount);
  }
}
