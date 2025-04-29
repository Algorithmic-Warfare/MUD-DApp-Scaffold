// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import "forge-std/Test.sol";
import { MudTest } from "@latticexyz/world/test/MudTest.t.sol";
import { IWorld } from "@world/IWorld.sol";

import { LogisticProvider, LogisticNetwork, LogisticNetworkData, LogisticDepot, LogisticDepotData, LogisticCoordinator, LogisticCoordinatorData, LogisticAgent, LogisticAgentData, LogisticOperation, LogisticOperationData, LogisticTarget, LogisticTargetData, LogisticConstraint, LogisticConstraintData, LogisticAction, LogisticActionData, LogisticTransaction, LogisticTransactionData } from "@store/index.sol";

import { LogisticActionType, LogisticTransactionType, LogisticDepotType, LogisticConstraintType } from "@store/common.sol";

import { ActorErrors } from "@systems/LogisticActors/errors.sol";
import { UNREGISTERED_PROVIDER, UNREGISTERED_COORDINATOR, UNREGISTERED_AGENT } from "@systems/LogisticActors/errors.sol";

import { SetupTest } from "@tests/SetupTest.t.sol";

contract LogisticOperationTest is SetupTest {
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

  // Test Setup
  function setUp() public override {
    super.setUp();
    logisticWorld = IWorld(worldAddress);

    vm.prank(PROVIDER_ADDRESS);
    providerId = logisticWorld.AWAR__createLogisticProvider(PROVIDER_ADDRESS);

    uint256[] memory coordinatorIds = new uint256[](0);

    vm.startPrank(PROVIDER_ADDRESS);
    networkId = logisticWorld.AWAR__createLogisticNetwork("Test Network", providerId, coordinatorIds);
    vm.stopPrank();

    vm.startPrank(PROVIDER_ADDRESS);
    coordinatorId = logisticWorld.AWAR__createLogisticCoordinator(COORDINATOR_ADDRESS, networkId);
    vm.stopPrank();

    vm.startPrank(PROVIDER_ADDRESS);
    logisticWorld.AWAR__addNetworkCoordinator(networkId, coordinatorId);
    vm.stopPrank();
  }

  function testCreateOperation() public {
    uint256[] memory agentIds = new uint256[](0);

    vm.prank(COORDINATOR_ADDRESS);
    operationId = logisticWorld.AWAR__createLogisticOperation("Test Operation", coordinatorId, agentIds);

    assertTrue(operationId != uint256(0), "Operation ID should not be zero");
    assertTrue(LogisticOperation.getCoordinatorId(operationId) == coordinatorId, "Coordinator ID mismatch");
    assertEq(LogisticOperation.getAgentIds(operationId), agentIds, "Agent Ids mismatch");
    assertEq(LogisticOperation.getCodename(operationId), "Test Operation", "Operation codename mismatch");
  }

  function testDeleteOperation() public {
    testCreateOperation();

    vm.prank(COORDINATOR_ADDRESS);
    logisticWorld.AWAR__deleteLogisticOperation(operationId);

    assertEq(LogisticOperation.getCoordinatorId(operationId), uint256(0), "Operation codename mismatch");
  }

  function testTransferOperationalControl() public {
    testCreateOperation();

    vm.prank(PROVIDER_ADDRESS);
    uint256 newCoordinatorId = logisticWorld.AWAR__createLogisticCoordinator(address(0x4), networkId);

    vm.prank(COORDINATOR_ADDRESS);
    logisticWorld.AWAR__transferOperationalControl(operationId, newCoordinatorId);

    assertEq(LogisticOperation.getCoordinatorId(operationId), newCoordinatorId, "Operation control not transferred");
  }

  function testAddOperationAgent() public {
    testCreateOperation();

    vm.prank(COORDINATOR_ADDRESS);
    agentId = logisticWorld.AWAR__createLogisticAgent(AGENT_ADDRESS, operationId);

    vm.prank(COORDINATOR_ADDRESS);
    logisticWorld.AWAR__addOperationAgent(operationId, agentId);

    uint256[] memory addedAgentIds = LogisticOperation.getAgentIds(operationId);

    assertEq(agentId, addedAgentIds[0], "Operation control not transferred");
  }

  function testRemoveOperationAgent() public {
    testAddOperationAgent();

    vm.prank(COORDINATOR_ADDRESS);
    logisticWorld.AWAR__removeOperationAgent(operationId, agentId);

    uint256[] memory addedAgentIds = LogisticOperation.getAgentIds(operationId);

    assertEq(addedAgentIds.length, 0, "Operation control not transferred");
  }

  function testRevertInvalidCoordinator() public {
    uint256[] memory agentIds = new uint256[](0);

    vm.expectRevert(
      abi.encodeWithSelector(ActorErrors.COORDINATOR_InvalidCoordinator.selector, UNREGISTERED_COORDINATOR)
    );
    vm.prank(INVALID_ADDRESS);
    operationId = logisticWorld.AWAR__createLogisticOperation("Test Operation", coordinatorId, agentIds);

    vm.prank(COORDINATOR_ADDRESS);
    operationId = logisticWorld.AWAR__createLogisticOperation("Test Operation", coordinatorId, agentIds);

    vm.prank(PROVIDER_ADDRESS);
    uint256 newCoordinatorId = logisticWorld.AWAR__createLogisticCoordinator(address(0x4), networkId);

    vm.expectRevert(
      abi.encodeWithSelector(ActorErrors.COORDINATOR_InvalidCoordinator.selector, UNREGISTERED_COORDINATOR)
    );
    vm.prank(INVALID_ADDRESS);
    logisticWorld.AWAR__transferOperationalControl(operationId, newCoordinatorId);

    vm.prank(COORDINATOR_ADDRESS);
    agentId = logisticWorld.AWAR__createLogisticAgent(AGENT_ADDRESS, operationId);

    vm.expectRevert(
      abi.encodeWithSelector(ActorErrors.COORDINATOR_InvalidCoordinator.selector, UNREGISTERED_COORDINATOR)
    );
    vm.prank(INVALID_ADDRESS);
    logisticWorld.AWAR__addOperationAgent(operationId, agentId);

    vm.expectRevert(
      abi.encodeWithSelector(ActorErrors.COORDINATOR_InvalidCoordinator.selector, UNREGISTERED_COORDINATOR)
    );
    vm.prank(INVALID_ADDRESS);
    logisticWorld.AWAR__removeOperationAgent(operationId, agentId);

    vm.expectRevert(
      abi.encodeWithSelector(ActorErrors.COORDINATOR_InvalidCoordinator.selector, UNREGISTERED_COORDINATOR)
    );
    vm.prank(INVALID_ADDRESS);
    logisticWorld.AWAR__deleteLogisticOperation(operationId);
  }
}
