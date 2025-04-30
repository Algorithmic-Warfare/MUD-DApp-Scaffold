// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import "forge-std/Test.sol";
import { MudTest } from "@latticexyz/world/test/MudTest.t.sol";
import { IWorld } from "@world/IWorld.sol";

import { LogisticProvider, LogisticNetwork, LogisticNetworkData, LogisticDepot, LogisticDepotData, LogisticCoordinator, LogisticCoordinatorData, LogisticAgent, LogisticAgentData, LogisticOperation, LogisticOperationData, LogisticAction, LogisticActionData, LogisticTransaction, LogisticTransactionData } from "@store/index.sol";

import { LogisticActionType, LogisticTransactionType } from "@store/common.sol";

import { ActorErrors } from "@systems/LogisticActors/errors.sol";
import { UNREGISTERED_PROVIDER, UNREGISTERED_COORDINATOR, UNREGISTERED_AGENT } from "@systems/LogisticActors/errors.sol";

import { SetupTest } from "@tests/SetupTest.t.sol";

contract LogisticAgentTest is SetupTest {
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

  // Test Setup
  function setUp() public override {
    super.setUp();
    logisticWorld = IWorld(worldAddress);

    vm.startPrank(PROVIDER_ADDRESS);
    providerId = logisticWorld.AWAR__createLogisticProvider(PROVIDER_ADDRESS);
    vm.stopPrank();

    vm.startPrank(PROVIDER_ADDRESS);
    sourceDepotId = logisticWorld.AWAR__createLogisticDepot(providerId, "Test Source Storage Unit", SSUID_2);
    sourceDepotId = logisticWorld.AWAR__createLogisticDepot(providerId, "Test Destination Storage Unit", SSUID_3);
    vm.stopPrank();

    vm.startPrank(PROVIDER_ADDRESS);
    uint256[] memory coordinatorIds = new uint256[](0);
    uint256[] memory depotIds = new uint256[](0);
    uint256[] memory fixtureIds = new uint256[](0);

    networkId = logisticWorld.AWAR__createLogisticNetwork(
      providerId,
      "Test Network",
      coordinatorIds,
      depotIds,
      fixtureIds
    );
    vm.stopPrank();

    vm.startPrank(PROVIDER_ADDRESS);
    logisticWorld.AWAR__addNetworkDepot(networkId, sourceDepotId);
    vm.stopPrank();

    vm.startPrank(PROVIDER_ADDRESS);
    logisticWorld.AWAR__addNetworkDepot(networkId, destinationDepotId);
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

  function testCreateAgent() public {
    vm.startPrank(COORDINATOR_ADDRESS);
    agentId = logisticWorld.AWAR__createLogisticAgent(AGENT_ADDRESS, operationId);
    vm.stopPrank();
    assertTrue(agentId != uint256(0), "Agent ID should not be zero");
    assertTrue(LogisticAgent.getOperationId(agentId) == operationId, "Operation Id mismatch");
    assertEq(LogisticAgent.getSmartCharacterAddress(agentId), AGENT_ADDRESS, "Agent address mismatch");
  }

  function testDeleteAgent() public {
    testCreateAgent();

    vm.startPrank(COORDINATOR_ADDRESS);
    logisticWorld.AWAR__deleteLogisticAgent(agentId);
    vm.stopPrank();

    assertTrue(agentId != uint256(0), "Agent ID should not be zero");
    assertEq(LogisticAgent.getSmartCharacterAddress(agentId), address(0), "Agent should be removed");
  }

  function testRevertInvalidCoordinator() public {
    vm.expectRevert(
      abi.encodeWithSelector(ActorErrors.COORDINATOR_InvalidCoordinator.selector, UNREGISTERED_COORDINATOR)
    );

    vm.prank(INVALID_ADDRESS);
    logisticWorld.AWAR__createLogisticAgent(AGENT_ADDRESS, operationId);

    vm.expectRevert(
      abi.encodeWithSelector(ActorErrors.COORDINATOR_InvalidCoordinator.selector, UNREGISTERED_COORDINATOR)
    );
    vm.prank(INVALID_ADDRESS);
    logisticWorld.AWAR__deleteLogisticAgent(agentId);
  }
}
