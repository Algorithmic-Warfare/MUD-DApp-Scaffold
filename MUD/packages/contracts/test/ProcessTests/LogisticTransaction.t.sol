// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import "forge-std/Test.sol";
import { MudTest } from "@latticexyz/world/test/MudTest.t.sol";
import { IWorld } from "@world/IWorld.sol";

import { InventoryItemTable, InventoryItemTableData } from "@eveworld/world/src/codegen/tables/InventoryItemTable.sol";
import { EphemeralInvItemTable, EphemeralInvItemTableData } from "@eveworld/world/src/codegen/tables/EphemeralInvItemTable.sol";
import { InventoryTable, InventoryTableData } from "@eveworld/world/src/codegen/tables/InventoryTable.sol";

import { LogisticProvider, LogisticNetwork, LogisticNetworkData, LogisticDepot, LogisticDepotData, LogisticCoordinator, LogisticCoordinatorData, LogisticAgent, LogisticAgentData, LogisticOperation, LogisticOperationData, LogisticTarget, LogisticTargetData, LogisticConstraint, LogisticConstraintData, LogisticAction, LogisticActionData, LogisticTransaction, LogisticTransactionData } from "@store/index.sol";

import { LogisticActionType, LogisticTransactionType, LogisticDepotType, LogisticConstraintType } from "@store/common.sol";

import { ProcessErrors } from "@systems/LogisticProcesses/errors.sol";
import { WITHDRAW_FROM_WRONG_DEPOT, DEPOSIT_TO_WRONG_DEPOT, INVALID_TRANSACTION_ITEM, INVALID_DEPOSIT_AMOUNT, INVALID_WITHDRAWAL_AMOUNT, AGENT_NOT_ALLOWED, INVALID_TRANSACTION } from "@systems/LogisticProcesses/errors.sol";

import { LOGISTIC_SOURCE, LOGISTIC_SINK } from "@systems/LogisticStructures/constants.sol";

import { SetupTest } from "@tests/SetupTest.t.sol";

contract LogisticTransactionTest is SetupTest {
  IWorld logisticWorld;

  // Test addresses
  address private PROVIDER_ADDRESS = player1;
  address private COORDINATOR_ADDRESS = player2;
  address private AGENT_ADDRESS = player3;
  address private INVALID_ADDRESS = player4;

  // Store common IDs
  uint256 private providerId;
  uint256 private networkId;
  uint256 private coordinatorId;
  uint256 private operationId;
  uint256 private agentId;
  uint256 private sourceDepotId;
  uint256 private destinationDepotId;
  uint256 private actionId;
  uint256 private transactionId;

  // Test Setup
  function setUp() public override {
    super.setUp();
    logisticWorld = IWorld(worldAddress);
    vm.prank(PROVIDER_ADDRESS);
    providerId = logisticWorld.AWAR__createLogisticProvider(PROVIDER_ADDRESS);

    uint256[] memory coordinatorIds = new uint256[](0);

    vm.startPrank(PROVIDER_ADDRESS);
    uint256[] memory networkIds = new uint256[](0);

    sourceDepotId = logisticWorld.AWAR__createLogisticDepot(SSUID_2, LogisticDepotType.HOT, networkIds);
    destinationDepotId = logisticWorld.AWAR__createLogisticDepot(SSUID_3, LogisticDepotType.HOT, networkIds);
    vm.stopPrank();

    vm.startPrank(PROVIDER_ADDRESS);
    networkId = logisticWorld.AWAR__createLogisticNetwork("Test Network", providerId, coordinatorIds);
    vm.stopPrank();

    vm.startPrank(PROVIDER_ADDRESS);
    logisticWorld.AWAR__addDepotNetwork(sourceDepotId, networkId);
    vm.stopPrank();

    vm.startPrank(PROVIDER_ADDRESS);
    logisticWorld.AWAR__addDepotNetwork(destinationDepotId, networkId);
    vm.stopPrank();

    vm.startPrank(PROVIDER_ADDRESS);
    coordinatorId = logisticWorld.AWAR__createLogisticCoordinator(COORDINATOR_ADDRESS, networkId);
    vm.stopPrank();

    vm.startPrank(PROVIDER_ADDRESS);
    logisticWorld.AWAR__addNetworkCoordinator(networkId, coordinatorId);
    vm.stopPrank();

    vm.startPrank(COORDINATOR_ADDRESS);
    uint256[] memory agentIds = new uint256[](0);
    operationId = logisticWorld.AWAR__createLogisticOperation("Test Operation", coordinatorId, agentIds);
    vm.stopPrank();

    vm.startPrank(COORDINATOR_ADDRESS);
    agentId = logisticWorld.AWAR__createLogisticAgent(AGENT_ADDRESS, operationId);
    vm.stopPrank();

    vm.startPrank(COORDINATOR_ADDRESS);
    logisticWorld.AWAR__addOperationAgent(operationId, agentId);
    vm.stopPrank();

    vm.startPrank(COORDINATOR_ADDRESS);
    actionId = logisticWorld.AWAR__createLogisticAction(
      LogisticActionType.TRANSFER,
      INVENTORY_ITEM_ID_3,
      ITEM_QUANTITY_1,
      sourceDepotId,
      destinationDepotId,
      operationId
    );
    vm.stopPrank();
  }

  /**
   * Tests if withdrawals work.
   */
  function testWithdrawTransaction() public {
    InventoryItemTableData memory itemstoBeWithdrawn = InventoryItemTable.get(
      LogisticDepot.getSmartStorageUnitId(sourceDepotId),
      INVENTORY_ITEM_ID_3
    );

    assertEq(itemstoBeWithdrawn.quantity, ITEM_QUANTITY_1 * 5);

    vm.startPrank(AGENT_ADDRESS);

    transactionId = logisticWorld.AWAR__createLogisticTransaction(
      LogisticTransactionType.WITHDRAWAL,
      INVENTORY_ITEM_ID_3,
      ITEM_QUANTITY_1,
      agentId,
      sourceDepotId,
      actionId
    );
    vm.stopPrank();

    assertTrue(transactionId != uint256(0), "Transaction ID should not be zero");
    assertTrue(
      LogisticTransaction.getTransactionItemId(transactionId) == INVENTORY_ITEM_ID_3,
      "Transaction item Id mismatch"
    );
    assertTrue(
      LogisticTransaction.getTransactionItemAmount(transactionId) == ITEM_QUANTITY_1,
      "Transaction item amount mismatch"
    );
    assertTrue(LogisticTransaction.getAgentId(transactionId) == agentId, "Agent Id mismatch");
    assertTrue(LogisticTransaction.getDepotId(transactionId) == sourceDepotId, "Depot Id mismatch");
    assertTrue(LogisticTransaction.getActionId(transactionId) == actionId, "Action Id mismatch");
    assertEq(
      uint256(LogisticTransaction.getTransactionType(transactionId)),
      uint256(LogisticTransactionType.WITHDRAWAL),
      "Transaction type mismatch"
    );

    EphemeralInvItemTableData memory withdrawnItems = EphemeralInvItemTable.get(
      LogisticDepot.getSmartStorageUnitId(sourceDepotId),
      INVENTORY_ITEM_ID_3,
      LogisticAgent.getSmartCharacterAddress(agentId)
    );
    assertEq(withdrawnItems.quantity, ITEM_QUANTITY_1);
  }

  /**
   * Tests if deposits work.
   */
  function testDepositTransaction() public {
    EphemeralInvItemTableData memory itemsToBeDeposited = EphemeralInvItemTable.get(
      LogisticDepot.getSmartStorageUnitId(destinationDepotId),
      INVENTORY_ITEM_ID_3,
      LogisticAgent.getSmartCharacterAddress(agentId)
    );
    assertEq(itemsToBeDeposited.quantity, ITEM_QUANTITY_1);

    vm.startPrank(AGENT_ADDRESS);

    transactionId = logisticWorld.AWAR__createLogisticTransaction(
      LogisticTransactionType.DEPOSIT,
      INVENTORY_ITEM_ID_3,
      ITEM_QUANTITY_1,
      agentId,
      destinationDepotId,
      actionId
    );
    vm.stopPrank();

    assertTrue(transactionId != uint256(0), "Transaction ID should not be zero");
    assertEq(
      uint256(LogisticTransaction.getTransactionType(transactionId)),
      uint256(LogisticTransactionType.DEPOSIT),
      "Transaction type mismatch"
    );

    InventoryItemTableData memory depositedItems = InventoryItemTable.get(
      LogisticDepot.getSmartStorageUnitId(destinationDepotId),
      INVENTORY_ITEM_ID_3
    );
    assertEq(depositedItems.quantity, ITEM_QUANTITY_1);
  }

  function testRevertOnInvalidAgent() public {
    // WITHDRAWAL
    vm.expectRevert(abi.encodeWithSelector(ProcessErrors.TRANSACTION_InvalidAgent.selector, AGENT_NOT_ALLOWED));
    vm.startPrank(INVALID_ADDRESS);

    transactionId = logisticWorld.AWAR__createLogisticTransaction(
      LogisticTransactionType.WITHDRAWAL,
      INVENTORY_ITEM_ID_3,
      ITEM_QUANTITY_1,
      agentId,
      destinationDepotId,
      actionId
    );
    vm.stopPrank();

    // DEPOSIT
    vm.expectRevert(abi.encodeWithSelector(ProcessErrors.TRANSACTION_InvalidAgent.selector, AGENT_NOT_ALLOWED));
    vm.startPrank(INVALID_ADDRESS);

    transactionId = logisticWorld.AWAR__createLogisticTransaction(
      LogisticTransactionType.DEPOSIT,
      INVENTORY_ITEM_ID_3,
      ITEM_QUANTITY_1,
      agentId,
      sourceDepotId,
      actionId
    );
    vm.stopPrank();
  }

  /**
   * Tests if it reverts when given an invalid depot.
   */
  function testRevertOnInvalidDepot() public {
    // WITHDRAWAL
    vm.expectRevert(
      abi.encodeWithSelector(
        ProcessErrors.TRANSACTION_InvalidDepot.selector,
        WITHDRAW_FROM_WRONG_DEPOT,
        destinationDepotId,
        LogisticAction.getSourceDepotId(actionId)
      )
    );
    vm.startPrank(AGENT_ADDRESS);

    transactionId = logisticWorld.AWAR__createLogisticTransaction(
      LogisticTransactionType.WITHDRAWAL,
      INVENTORY_ITEM_ID_3,
      ITEM_QUANTITY_1,
      agentId,
      destinationDepotId,
      actionId
    );
    vm.stopPrank();

    // DEPOSIT
    vm.expectRevert(
      abi.encodeWithSelector(
        ProcessErrors.TRANSACTION_InvalidDepot.selector,
        DEPOSIT_TO_WRONG_DEPOT,
        sourceDepotId,
        LogisticAction.getDestinationDepotId(actionId)
      )
    );
    vm.startPrank(AGENT_ADDRESS);

    transactionId = logisticWorld.AWAR__createLogisticTransaction(
      LogisticTransactionType.DEPOSIT,
      INVENTORY_ITEM_ID_3,
      ITEM_QUANTITY_1,
      agentId,
      sourceDepotId,
      actionId
    );
    vm.stopPrank();
  }

  /**
   * Tests if it reverts when given a wrong item.
   */
  function testRevertOnInvalidItem() public {
    vm.expectRevert(
      abi.encodeWithSelector(
        ProcessErrors.TRANSACTION_InvalidItem.selector,
        INVALID_TRANSACTION_ITEM,
        INVENTORY_ITEM_ID_2,
        LogisticAction.getActionItemId(actionId)
      )
    );
    vm.startPrank(AGENT_ADDRESS);

    transactionId = logisticWorld.AWAR__createLogisticTransaction(
      LogisticTransactionType.WITHDRAWAL,
      INVENTORY_ITEM_ID_2,
      ITEM_QUANTITY_1,
      agentId,
      sourceDepotId,
      actionId
    );
    vm.stopPrank();
  }

  function testRevertOnInvalidTransaction() public {
    vm.startPrank(COORDINATOR_ADDRESS);
    uint256 injectActionId = logisticWorld.AWAR__createLogisticAction(
      LogisticActionType.INJECT,
      INVENTORY_ITEM_ID_3,
      ITEM_QUANTITY_1,
      LOGISTIC_SOURCE,
      destinationDepotId,
      operationId
    );
    vm.stopPrank();

    vm.expectRevert(abi.encodeWithSelector(ProcessErrors.TRANSACTION_InvalidTransaction.selector, INVALID_TRANSACTION));
    vm.startPrank(AGENT_ADDRESS);
    transactionId = logisticWorld.AWAR__createLogisticTransaction(
      LogisticTransactionType.WITHDRAWAL,
      INVENTORY_ITEM_ID_3,
      ITEM_QUANTITY_1,
      agentId,
      sourceDepotId,
      injectActionId
    );
    vm.stopPrank();

    vm.startPrank(COORDINATOR_ADDRESS);
    uint256 extractActionId = logisticWorld.AWAR__createLogisticAction(
      LogisticActionType.EXTRACT,
      INVENTORY_ITEM_ID_3,
      ITEM_QUANTITY_1,
      sourceDepotId,
      LOGISTIC_SINK,
      operationId
    );
    vm.stopPrank();

    vm.expectRevert(abi.encodeWithSelector(ProcessErrors.TRANSACTION_InvalidTransaction.selector, INVALID_TRANSACTION));
    vm.startPrank(AGENT_ADDRESS);
    transactionId = logisticWorld.AWAR__createLogisticTransaction(
      LogisticTransactionType.DEPOSIT,
      INVENTORY_ITEM_ID_3,
      ITEM_QUANTITY_1,
      agentId,
      sourceDepotId,
      extractActionId
    );
    vm.stopPrank();
  }

  /**
   * Tests if the withdrawal amount is nonsensical.
   */
  function testRevertOnInvalidWithdrawalAmount() public {
    InventoryItemTableData memory sourceInventoryItem = InventoryItemTable.get(
      LogisticDepot.getSmartStorageUnitId(sourceDepotId),
      INVENTORY_ITEM_ID_3
    );

    InventoryItemTableData memory destinationInventoryItem = InventoryItemTable.get(
      LogisticDepot.getSmartStorageUnitId(destinationDepotId),
      INVENTORY_ITEM_ID_3
    );
    vm.expectRevert(
      abi.encodeWithSelector(
        ProcessErrors.TRANSACTION_InvalidWithdrawalAmount.selector,
        INVALID_WITHDRAWAL_AMOUNT,
        10 * ITEM_QUANTITY_1, // This value way above what is in the inventory.
        sourceInventoryItem.quantity,
        destinationInventoryItem.quantity,
        LogisticAction.getActionItemAmount(actionId)
      )
    );
    vm.startPrank(AGENT_ADDRESS);

    transactionId = logisticWorld.AWAR__createLogisticTransaction(
      LogisticTransactionType.WITHDRAWAL,
      INVENTORY_ITEM_ID_3,
      10 * ITEM_QUANTITY_1,
      agentId,
      sourceDepotId,
      actionId
    );
    vm.stopPrank();

    // TODO if withdrawal (@source) + deposited (@destination) > target
    // vm.expectRevert(
    //   abi.encodeWithSelector(
    //     ProcessErrors.TRANSACTION_InvalidWithdrawalAmount.selector,
    //     INVALID_WITHDRAWAL_AMOUNT,
    //     10 * ITEM_QUANTITY_1, // This value way above what is in the inventory.
    //     sourceInventoryItem.quantity,
    //     destinationInventoryItem.quantity,
    //     LogisticAction.getActionItemAmount(actionId)
    //   )
    // );
    // vm.startPrank(AGENT_ADDRESS);

    // transactionId = logisticWorld.AWAR__createLogisticTransaction(
    //   LogisticTransactionType.WITHDRAWAL,
    //   INVENTORY_ITEM_ID_1,
    //   10 * ITEM_QUANTITY_1,
    //   agentId,
    //   sourceDepotId,
    //   actionId
    // );
    // vm.stopPrank();
  }

  function testRevertOnInvalidDepositAmount() public {
    vm.startPrank(COORDINATOR_ADDRESS);
    uint256 newActionId = logisticWorld.AWAR__createLogisticAction(
      LogisticActionType.INJECT,
      INVENTORY_ITEM_ID_3,
      ITEM_QUANTITY_1 - 5,
      LOGISTIC_SOURCE,
      destinationDepotId,
      operationId
    );
    vm.stopPrank();

    // Checks if you are depositing more than you have in your eph
    // EphemeralInvItemTableData memory itemsToBeDeposited = EphemeralInvItemTable.get(
    //   LogisticDepot.getSmartStorageUnitId(destinationDepotId),
    //   INVENTORY_ITEM_ID_3,
    //   LogisticAgent.getSmartCharacterAddress(agentId)
    // );
    InventoryItemTableData memory destinationInventoryItem = InventoryItemTable.get(
      LogisticDepot.getSmartStorageUnitId(destinationDepotId),
      INVENTORY_ITEM_ID_3
    );

    vm.expectRevert(
      abi.encodeWithSelector(
        ProcessErrors.TRANSACTION_InvalidDepositAmount.selector,
        INVALID_DEPOSIT_AMOUNT,
        ITEM_QUANTITY_1, // This value way above what is in the inventory.
        destinationInventoryItem.quantity,
        LogisticAction.getActionItemAmount(newActionId)
      )
    );

    vm.startPrank(AGENT_ADDRESS);
    transactionId = logisticWorld.AWAR__createLogisticTransaction(
      LogisticTransactionType.DEPOSIT,
      INVENTORY_ITEM_ID_3,
      ITEM_QUANTITY_1,
      agentId,
      destinationDepotId,
      newActionId
    );
    vm.stopPrank();
  }
}
