// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { DeployableTokenTable } from "@eveworld/world/src/codegen/tables/DeployableTokenTable.sol";
import { IERC721 } from "@eveworld/world/src/modules/eve-erc721-puppet/IERC721.sol";
import { RESOURCE_SYSTEM } from "@latticexyz/world/src/worldResourceTypes.sol";
import { ResourceId } from "@latticexyz/world/src/WorldResourceId.sol";
import { ResourceIds } from "@latticexyz/store/src/codegen/tables/ResourceIds.sol";
import { WorldResourceIdLib } from "@latticexyz/world/src/WorldResourceId.sol";
import { IBaseWorld } from "@latticexyz/world/src/codegen/interfaces/IBaseWorld.sol";

import { InventoryItemTable, InventoryItemTableData } from "@eveworld/world/src/codegen/tables/InventoryItemTable.sol";

import { EphemeralInvItemTable, EphemeralInvItemTableData } from "@eveworld/world/src/codegen/tables/EphemeralInvItemTable.sol";

import { FRONTIER_WORLD_DEPLOYMENT_NAMESPACE } from "@eveworld/common-constants/src/constants.sol";
import { InventoryLib } from "@eveworld/world/src/modules/inventory/InventoryLib.sol";

import { TransferItem } from "@eveworld/world/src/modules/inventory/types.sol";
import { InventoryItem } from "@eveworld/world/src/modules/inventory/types.sol";

import { LogisticNetwork, LogisticNetworkData, LogisticDepot, LogisticDepotData, LogisticOperation, LogisticOperationData, LogisticAction, LogisticActionData, LogisticTransaction, LogisticTransactionData } from "@store/index.sol";

import { LogisticActionType, LogisticTransactionType } from "@store/common.sol";

import { Derivations, Fetches } from "@systems/Utils.sol";

import { LogisticSystem } from "@systems/LogisticSystem.sol";

import { ProcessErrors } from "./errors.sol";
import { WITHDRAW_FROM_WRONG_DEPOT, DEPOSIT_TO_WRONG_DEPOT, INVALID_TRANSACTION_ITEM, INVALID_DEPOSIT_AMOUNT, INVALID_WITHDRAWAL_AMOUNT, INVALID_TRANSACTION, AGENT_NOT_ALLOWED } from "./errors.sol";
import { ProofArgs } from "@systems/LogisticClearance/types.sol";

contract LogisticTransactionSystem is LogisticSystem {
  using Derivations for uint256;
  using Fetches for uint256;
  using InventoryLib for InventoryLib.World;

  InventoryLib.World inventory;

  // Checks if the transaction is in accordance with action type
  modifier inAccordanceWithActionType(LogisticTransactionType transactionType, uint256 actionId) {
    LogisticActionType actionType = LogisticAction.getActionType(actionId);
    if (
      (actionType == LogisticActionType.INJECT && transactionType != LogisticTransactionType.DEPOSIT) ||
      (actionType == LogisticActionType.EXTRACT && transactionType != LogisticTransactionType.WITHDRAWAL)
    ) {
      revert ProcessErrors.TRANSACTION_InvalidTransaction(INVALID_TRANSACTION);
    }
    _;
  }

  // Checks for the "Logistic Soundness" of the transaction.
  modifier logicalTransaction(
    LogisticTransactionType transactionType,
    uint256 depotId,
    uint256 actionId
  ) {
    if (
      transactionType == LogisticTransactionType.WITHDRAWAL && !(depotId == LogisticAction.getSourceDepotId(actionId))
    ) {
      revert ProcessErrors.TRANSACTION_InvalidDepot(
        WITHDRAW_FROM_WRONG_DEPOT,
        depotId,
        LogisticAction.getSourceDepotId(actionId)
      );
    }

    if (
      transactionType == LogisticTransactionType.DEPOSIT && !(depotId == LogisticAction.getDestinationDepotId(actionId))
    ) {
      revert ProcessErrors.TRANSACTION_InvalidDepot(
        DEPOSIT_TO_WRONG_DEPOT,
        depotId,
        LogisticAction.getDestinationDepotId(actionId)
      );
    }
    _;
  }

  // Makes sure the item exists in the depot
  modifier validTransactionItem(uint256 transactionItemId, uint256 actionId) {
    if (transactionItemId != LogisticAction.getActionItemId(actionId)) {
      revert ProcessErrors.TRANSACTION_InvalidItem(
        INVALID_TRANSACTION_ITEM,
        transactionItemId,
        LogisticAction.getActionItemId(actionId)
      );
    }

    _;
  }

  modifier validTransactionAmount(
    LogisticTransactionType transactionType,
    uint256 transactionItemId,
    uint256 transactionItemAmount,
    uint256 depotId,
    uint256 actionId
  ) {
    address agentAddress = _msgSender();

    if (transactionType == LogisticTransactionType.WITHDRAWAL) {
      InventoryItemTableData memory sourceInventoryItem = InventoryItemTable.get(
        LogisticDepot.getSmartStorageUnitId(depotId),
        transactionItemId
      );

      InventoryItemTableData memory destinationInventoryItem = InventoryItemTable.get(
        LogisticDepot.getSmartStorageUnitId(LogisticAction.getDestinationDepotId(actionId)),
        transactionItemId
      );

      // Case where you are trying to withdraw more than there is.
      // Case where your withdrawal leads to excess at deposit.
      if (
        transactionItemAmount > sourceInventoryItem.quantity ||
        transactionItemAmount + destinationInventoryItem.quantity > LogisticAction.getActionItemAmount(actionId)
      ) {
        revert ProcessErrors.TRANSACTION_InvalidWithdrawalAmount(
          INVALID_WITHDRAWAL_AMOUNT,
          transactionItemAmount,
          sourceInventoryItem.quantity,
          destinationInventoryItem.quantity,
          LogisticAction.getActionItemAmount(actionId)
        );
      }
    }

    if (transactionType == LogisticTransactionType.DEPOSIT) {
      EphemeralInvItemTableData memory ephemeralInventoryItem = EphemeralInvItemTable.get(
        LogisticDepot.getSmartStorageUnitId(depotId),
        transactionItemId,
        agentAddress
      );
      InventoryItemTableData memory destinationInventoryItem = InventoryItemTable.get(
        LogisticDepot.getSmartStorageUnitId(depotId),
        transactionItemId
      );

      if ((transactionItemAmount + destinationInventoryItem.quantity) > LogisticAction.getActionItemAmount(actionId)) {
        revert ProcessErrors.TRANSACTION_InvalidDepositAmount(
          INVALID_DEPOSIT_AMOUNT,
          transactionItemAmount,
          destinationInventoryItem.quantity,
          LogisticAction.getActionItemAmount(actionId)
        );
      }
    }
    _;
  }

  // TODO check that the item Id matches that of the requested action
  // TODO check that the transacted amount doesn't exceed the requested value
  // TODO transfers items between inventories
  function createLogisticTransaction(
    ProofArgs memory proof,
    LogisticTransactionType transactionType,
    uint256 transactionItemId,
    uint256 transactionItemAmount,
    address agent,
    uint256 depotId,
    uint256 actionId
  )
    public
    onlyAgent(proof)
    inAccordanceWithActionType(transactionType, actionId)
    logicalTransaction(transactionType, depotId, actionId)
    validTransactionItem(transactionItemId, actionId)
    validTransactionAmount(transactionType, transactionItemId, transactionItemAmount, depotId, actionId)
    returns (uint256)
  {
    uint256 timestamp = block.timestamp;
    LogisticTransactionData memory transaction = LogisticTransactionData({
      timestamp: timestamp,
      transactionType: transactionType,
      transactionItemId: transactionItemId,
      transactionItemAmount: transactionItemAmount,
      agent: agent,
      depotId: depotId,
      actionId: actionId
    });

    uint256 id = uint256(
      keccak256(
        abi.encodePacked(
          block.timestamp,
          block.prevrandao,
          transactionItemId,
          transactionItemAmount,
          agent,
          depotId,
          actionId
        )
      )
    );

    LogisticTransaction.set(id, transaction);

    if (transactionType == LogisticTransactionType.WITHDRAWAL) {
      __withdrawFromInventory(transactionItemId, transactionItemAmount, depotId);
    }

    if (transactionType == LogisticTransactionType.DEPOSIT) {
      __depositToInventory(transactionItemId, transactionItemAmount, depotId);
    }

    return id;
  }

  // TODO revert transaction
  // NOTE Might be useful in some use cases.

  // NOTE Someone should not be able to remove a transaction. It is mark that an interaction happened.
  // function removeLogisticTransaction(
  //   bytes32 transactionId
  // )
  //   public
  //   onlyAgent(transactionId.agentIdFromTransactionId())
  //   onlyAgentInOperation(transactionId.actionIdFromTransactionId())
  // {
  //   LogisticTransaction.deleteRecord(transactionId);
  // }

  // TODO Convert ItemId to inventoryItemId
  // NOTE transactionItemId is the needs to be the inventoryItemId and not the itemId.
  function __withdrawFromInventory(uint256 transactionItemId, uint256 transactionItemAmount, uint256 depotId) private {
    inventory = InventoryLib.World({ iface: IBaseWorld(_world()), namespace: FRONTIER_WORLD_DEPLOYMENT_NAMESPACE });

    uint256 smartStorageUnitId = LogisticDepot.getSmartStorageUnitId(depotId);

    address recepient = _msgSender();
    address source = IERC721(DeployableTokenTable.getErc721Address()).ownerOf(smartStorageUnitId);

    TransferItem[] memory transferItems = new TransferItem[](1);
    transferItems[0] = TransferItem(transactionItemId, source, transactionItemAmount);

    inventory.inventoryToEphemeralTransfer(smartStorageUnitId, recepient, transferItems);
  }

  function __depositToInventory(uint256 transactionItemId, uint256 transactionItemAmount, uint256 depotId) private {
    inventory = InventoryLib.World({ iface: IBaseWorld(_world()), namespace: FRONTIER_WORLD_DEPLOYMENT_NAMESPACE });

    uint256 smartStorageUnitId = LogisticDepot.getSmartStorageUnitId(depotId);

    address source = _msgSender();
    // address recipient = IERC721(DeployableTokenTable.getErc721Address()).ownerOf(smartStorageUnitId);

    TransferItem[] memory transferItems = new TransferItem[](1);
    transferItems[0] = TransferItem(transactionItemId, source, transactionItemAmount);

    inventory.ephemeralToInventoryTransfer(smartStorageUnitId, transferItems);
  }
}
