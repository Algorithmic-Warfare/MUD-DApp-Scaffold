// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import "forge-std/Test.sol";
import { MudTest } from "@latticexyz/world/test/MudTest.t.sol";
import { IWorld } from "@world/IWorld.sol";

import { LogisticProvider, LogisticNetwork, LogisticNetworkData, LogisticDepot, LogisticDepotData, LogisticCoordinator, LogisticCoordinatorData, LogisticAgent, LogisticAgentData, LogisticOperation, LogisticOperationData, LogisticTarget, LogisticTargetData, LogisticConstraint, LogisticConstraintData, LogisticAction, LogisticActionData, LogisticTransaction, LogisticTransactionData } from "@store/index.sol";

import { InventoryItemTable, InventoryItemTableData } from "@eveworld/world/src/codegen/tables/InventoryItemTable.sol";

import { LogisticActionType, LogisticTransactionType, LogisticDepotType, LogisticConstraintType } from "@store/common.sol";

import { ActorErrors } from "@systems/LogisticActors/errors.sol";
import { UNREGISTERED_PROVIDER, UNREGISTERED_COORDINATOR, UNREGISTERED_AGENT } from "@systems/LogisticActors/errors.sol";

import { ProcessErrors } from "@systems/LogisticProcesses/errors.sol";
import { NOT_IN_THE_SAME_NETWORK, INSUFFICIENT_ITEM_AMOUNT, INSUFFICIENT_INVENTORY_CAPACITY, ILLOGICAL_ACTION } from "@systems/LogisticProcesses/errors.sol";

import { LOGISTIC_SOURCE, LOGISTIC_SINK } from "@systems/LogisticStructures/constants.sol";
import { SetupTest } from "@tests/SetupTest.t.sol";

contract LogisticActionTest is SetupTest {
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
  }

  function testCreateAction() public {
    vm.prank(COORDINATOR_ADDRESS);
    actionId = logisticWorld.AWAR__createLogisticAction(
      LogisticActionType.TRANSFER,
      INVENTORY_ITEM_ID_3,
      ITEM_QUANTITY_1,
      sourceDepotId,
      destinationDepotId,
      operationId
    );

    assertTrue(actionId != uint256(0), "Action ID should not be zero");
    assertTrue(LogisticAction.getOperationId(actionId) == operationId, "Operation Id mismatch");
    assertTrue(LogisticAction.getSourceDepotId(actionId) == sourceDepotId, "Source depot Id mismatch");
    assertTrue(LogisticAction.getDestinationDepotId(actionId) == destinationDepotId, "Destination depot Id mismatch");
    assertTrue(LogisticAction.getActionItemId(actionId) == INVENTORY_ITEM_ID_3, "Item Id mismatch");
    assertTrue(LogisticAction.getActionItemAmount(actionId) == ITEM_QUANTITY_1, "Item amount mismatch");
    assertEq(
      uint256(LogisticAction.getActionType(actionId)),
      uint256(LogisticActionType.TRANSFER),
      "Action type mismatch"
    );
  }

  function testCreateActionWithSource() public {
    vm.prank(COORDINATOR_ADDRESS);
    actionId = logisticWorld.AWAR__createLogisticAction(
      LogisticActionType.INJECT,
      INVENTORY_ITEM_ID_3,
      ITEM_QUANTITY_1,
      LOGISTIC_SOURCE,
      destinationDepotId,
      operationId
    );

    assertTrue(actionId != uint256(0), "Action ID should not be zero");
    assertEq(
      uint256(LogisticAction.getActionType(actionId)),
      uint256(LogisticActionType.INJECT),
      "Action type mismatch"
    );
    assertEq(LogisticAction.getSourceDepotId(actionId), LOGISTIC_SOURCE, "Action source mismatch");
  }

  function testCreateActionWithSink() public {
    vm.prank(COORDINATOR_ADDRESS);
    actionId = logisticWorld.AWAR__createLogisticAction(
      LogisticActionType.EXTRACT,
      INVENTORY_ITEM_ID_3,
      ITEM_QUANTITY_1,
      sourceDepotId,
      LOGISTIC_SINK,
      operationId
    );

    assertTrue(actionId != uint256(0), "Action ID should not be zero");
    assertEq(
      uint256(LogisticAction.getActionType(actionId)),
      uint256(LogisticActionType.EXTRACT),
      "Action type mismatch"
    );
    assertEq(LogisticAction.getDestinationDepotId(actionId), LOGISTIC_SINK, "Action destination mismatch");
  }

  function testDeleteAction() public {
    testCreateAction();

    vm.prank(COORDINATOR_ADDRESS);
    logisticWorld.AWAR__deleteLogisticAction(actionId);

    assertEq(LogisticAction.getOperationId(actionId), uint256(0), "Action type mismatch");
  }

  function testEditActionType() public {
    testCreateAction();

    vm.prank(COORDINATOR_ADDRESS);
    logisticWorld.AWAR__editActionType(actionId, LogisticActionType.INJECT);
    assertEq(
      uint256(LogisticAction.getActionType(actionId)),
      uint256(LogisticActionType.INJECT),
      "Action type not updated"
    );
  }

  function testEditSourceDepot() public {
    testCreateAction();

    assertEq(LogisticAction.getSourceDepotId(actionId), sourceDepotId, "Action source depot, not as expected.");

    vm.startPrank(PROVIDER_ADDRESS);
    uint256[] memory networkIds = new uint256[](0);
    uint256 newSourceDepotId = logisticWorld.AWAR__createLogisticDepot(SSUID_1, LogisticDepotType.HOT, networkIds);
    vm.stopPrank();

    vm.startPrank(PROVIDER_ADDRESS);
    logisticWorld.AWAR__addDepotNetwork(newSourceDepotId, networkId);
    vm.stopPrank();

    vm.prank(COORDINATOR_ADDRESS);

    logisticWorld.AWAR__editActionSourceDepot(actionId, newSourceDepotId);

    assertEq(LogisticAction.getSourceDepotId(actionId), newSourceDepotId, "Action type not updated");
  }

  function testEditDestinationDepot() public {
    testCreateAction();

    assertEq(
      LogisticAction.getDestinationDepotId(actionId),
      destinationDepotId,
      "Action destination depot, not as expected."
    );

    vm.startPrank(PROVIDER_ADDRESS);
    uint256[] memory networkIds = new uint256[](0);
    uint256 newDestinationDepotId = logisticWorld.AWAR__createLogisticDepot(SSUID_1, LogisticDepotType.HOT, networkIds);
    vm.stopPrank();

    vm.startPrank(PROVIDER_ADDRESS);
    logisticWorld.AWAR__addDepotNetwork(newDestinationDepotId, networkId);
    vm.stopPrank();

    vm.prank(COORDINATOR_ADDRESS);

    logisticWorld.AWAR__editActionDestinationDepot(actionId, newDestinationDepotId);

    assertEq(LogisticAction.getDestinationDepotId(actionId), newDestinationDepotId, "Action type not updated");
  }

  function testEditItem() public {
    testCreateAction();

    assertEq(LogisticAction.getActionItemId(actionId), INVENTORY_ITEM_ID_3, "Action item, not as expected.");

    vm.prank(COORDINATOR_ADDRESS);

    logisticWorld.AWAR__editActionItemId(actionId, INVENTORY_ITEM_ID_1);

    assertEq(LogisticAction.getActionItemId(actionId), INVENTORY_ITEM_ID_1, "Action item not updated");
  }

  function testEditItemAmount() public {
    testCreateAction();

    assertEq(LogisticAction.getActionItemAmount(actionId), ITEM_QUANTITY_1, "Action item amount, not as expected.");

    vm.prank(COORDINATOR_ADDRESS);

    logisticWorld.AWAR__editActionItemAmount(actionId, ITEM_QUANTITY_3);

    assertEq(LogisticAction.getActionItemAmount(actionId), ITEM_QUANTITY_3, "Action item amount not updated");
  }

  function testRevertInvalidDepot() public {
    vm.startPrank(PROVIDER_ADDRESS);
    uint256[] memory coordinatorIds = new uint256[](0);
    uint256 firstNetworkId = logisticWorld.AWAR__createLogisticNetwork("Test Network 2", providerId, coordinatorIds);
    vm.stopPrank();

    vm.startPrank(PROVIDER_ADDRESS);
    logisticWorld.AWAR__removeDepotNetwork(sourceDepotId, networkId);
    vm.stopPrank();

    // Change source and destinatin into diff networks.
    vm.startPrank(PROVIDER_ADDRESS);
    logisticWorld.AWAR__addDepotNetwork(sourceDepotId, firstNetworkId);
    vm.stopPrank();

    vm.expectRevert(abi.encodeWithSelector(ProcessErrors.ACTION_InvalidDepot.selector, NOT_IN_THE_SAME_NETWORK));
    vm.prank(COORDINATOR_ADDRESS);
    actionId = logisticWorld.AWAR__createLogisticAction(
      LogisticActionType.TRANSFER,
      INVENTORY_ITEM_ID_3,
      ITEM_QUANTITY_1,
      sourceDepotId,
      destinationDepotId,
      operationId
    );
  }

  function testRevertInvalidCoordinator() public {
    vm.expectRevert(
      abi.encodeWithSelector(ActorErrors.COORDINATOR_InvalidCoordinator.selector, UNREGISTERED_COORDINATOR)
    );
    vm.prank(INVALID_ADDRESS);
    actionId = logisticWorld.AWAR__createLogisticAction(
      LogisticActionType.TRANSFER,
      INVENTORY_ITEM_ID_3,
      ITEM_QUANTITY_1,
      sourceDepotId,
      destinationDepotId,
      operationId
    );

    vm.expectRevert(
      abi.encodeWithSelector(ActorErrors.COORDINATOR_InvalidCoordinator.selector, UNREGISTERED_COORDINATOR)
    );
    vm.prank(INVALID_ADDRESS);
    logisticWorld.AWAR__createLogisticAction(
      LogisticActionType.INJECT,
      INVENTORY_ITEM_ID_3,
      ITEM_QUANTITY_1,
      LOGISTIC_SOURCE,
      destinationDepotId,
      operationId
    );

    vm.expectRevert(
      abi.encodeWithSelector(ActorErrors.COORDINATOR_InvalidCoordinator.selector, UNREGISTERED_COORDINATOR)
    );
    vm.prank(INVALID_ADDRESS);
    actionId = logisticWorld.AWAR__createLogisticAction(
      LogisticActionType.EXTRACT,
      INVENTORY_ITEM_ID_3,
      ITEM_QUANTITY_1,
      sourceDepotId,
      LOGISTIC_SINK,
      operationId
    );

    vm.expectRevert(
      abi.encodeWithSelector(ActorErrors.COORDINATOR_InvalidCoordinator.selector, UNREGISTERED_COORDINATOR)
    );
    vm.prank(INVALID_ADDRESS);
    logisticWorld.AWAR__editActionType(actionId, LogisticActionType.INJECT);

    vm.expectRevert(
      abi.encodeWithSelector(ActorErrors.COORDINATOR_InvalidCoordinator.selector, UNREGISTERED_COORDINATOR)
    );
    vm.prank(INVALID_ADDRESS);
    logisticWorld.AWAR__deleteLogisticAction(actionId);
  }

  function testRevertInvalidAmount() public {
    vm.expectRevert(abi.encodeWithSelector(ProcessErrors.ACTION_InvalidAmount.selector, INSUFFICIENT_ITEM_AMOUNT));
    vm.prank(COORDINATOR_ADDRESS);
    actionId = logisticWorld.AWAR__createLogisticAction(
      LogisticActionType.TRANSFER,
      INVENTORY_ITEM_ID_3,
      10 * ITEM_QUANTITY_1,
      sourceDepotId,
      destinationDepotId,
      operationId
    );

    // TODO case of insufficient space in destination
  }

  function testRevertInvalidAction() public {
    vm.expectRevert(abi.encodeWithSelector(ProcessErrors.ACTION_InvalidAction.selector, ILLOGICAL_ACTION));
    vm.prank(COORDINATOR_ADDRESS);
    actionId = logisticWorld.AWAR__createLogisticAction(
      LogisticActionType.INJECT,
      INVENTORY_ITEM_ID_3,
      ITEM_QUANTITY_1,
      sourceDepotId,
      destinationDepotId,
      operationId
    );

    vm.expectRevert(abi.encodeWithSelector(ProcessErrors.ACTION_InvalidAction.selector, ILLOGICAL_ACTION));
    vm.prank(COORDINATOR_ADDRESS);
    actionId = logisticWorld.AWAR__createLogisticAction(
      LogisticActionType.EXTRACT,
      INVENTORY_ITEM_ID_3,
      ITEM_QUANTITY_1,
      sourceDepotId,
      destinationDepotId,
      operationId
    );

    vm.expectRevert(abi.encodeWithSelector(ProcessErrors.ACTION_InvalidAction.selector, ILLOGICAL_ACTION));
    vm.prank(COORDINATOR_ADDRESS);
    actionId = logisticWorld.AWAR__createLogisticAction(
      LogisticActionType.EXTRACT,
      INVENTORY_ITEM_ID_3,
      ITEM_QUANTITY_1,
      sourceDepotId,
      LOGISTIC_SOURCE,
      operationId
    );

    vm.expectRevert(abi.encodeWithSelector(ProcessErrors.ACTION_InvalidAction.selector, ILLOGICAL_ACTION));
    vm.prank(COORDINATOR_ADDRESS);
    actionId = logisticWorld.AWAR__createLogisticAction(
      LogisticActionType.INJECT,
      INVENTORY_ITEM_ID_3,
      ITEM_QUANTITY_1,
      LOGISTIC_SINK,
      destinationDepotId,
      operationId
    );

    vm.expectRevert(abi.encodeWithSelector(ProcessErrors.ACTION_InvalidAction.selector, ILLOGICAL_ACTION));
    vm.prank(COORDINATOR_ADDRESS);
    actionId = logisticWorld.AWAR__createLogisticAction(
      LogisticActionType.TRANSFER,
      INVENTORY_ITEM_ID_3,
      ITEM_QUANTITY_1,
      LOGISTIC_SOURCE,
      destinationDepotId,
      operationId
    );

    vm.expectRevert(abi.encodeWithSelector(ProcessErrors.ACTION_InvalidAction.selector, ILLOGICAL_ACTION));
    vm.prank(COORDINATOR_ADDRESS);
    actionId = logisticWorld.AWAR__createLogisticAction(
      LogisticActionType.TRANSFER,
      INVENTORY_ITEM_ID_3,
      ITEM_QUANTITY_1,
      sourceDepotId,
      LOGISTIC_SINK,
      operationId
    );
  }
}
