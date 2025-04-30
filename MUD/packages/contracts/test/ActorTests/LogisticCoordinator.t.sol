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

contract LogisticCoordinatorTest is SetupTest {
  IWorld logisticWorld;

  // Test Setup
  function setUp() public override {
    super.setUp();
    logisticWorld = IWorld(worldAddress);
    vm.prank(PROVIDER_ADDRESS);
    providerId = logisticWorld.AWAR__createLogisticProvider(PROVIDER_ADDRESS);

    vm.prank(PROVIDER_ADDRESS);
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
  }

  // Test addresses
  address private PROVIDER_ADDRESS = player1;
  address private COORDINATOR_ADDRESS = player2;
  address private AGENT_ADDRESS = player3;
  address private INVALID_ADDRESS = player4;

  // Store common IDs
  uint256 private providerId;
  uint256 private networkId;
  uint256 private coordinatorId;

  function testCreateCoordinator() public {
    vm.prank(PROVIDER_ADDRESS);
    coordinatorId = logisticWorld.AWAR__createLogisticCoordinator(COORDINATOR_ADDRESS, networkId);

    assertTrue(coordinatorId != uint256(0), "Coordinator ID should not be zero");
    assertTrue(LogisticCoordinator.getNetworkId(coordinatorId) == networkId, "Network Id mismatch");
    assertEq(
      LogisticCoordinator.getSmartCharacterAddress(coordinatorId),
      COORDINATOR_ADDRESS,
      "Coordinator address mismatch"
    );
  }

  function testDeleteCoordinator() public {
    testCreateCoordinator();

    vm.prank(PROVIDER_ADDRESS);
    logisticWorld.AWAR__deleteLogisticCoordinator(coordinatorId);
    assertEq(LogisticCoordinator.getSmartCharacterAddress(coordinatorId), address(0), "Coordinator should be removed");
  }

  function testRevertInvalidProvider() public {
    vm.expectRevert(abi.encodeWithSelector(ActorErrors.PROVIDER_InvalidProvider.selector, UNREGISTERED_PROVIDER));

    vm.prank(INVALID_ADDRESS);
    coordinatorId = logisticWorld.AWAR__createLogisticCoordinator(COORDINATOR_ADDRESS, networkId);

    vm.expectRevert(abi.encodeWithSelector(ActorErrors.PROVIDER_InvalidProvider.selector, UNREGISTERED_PROVIDER));
    vm.prank(INVALID_ADDRESS);
    logisticWorld.AWAR__deleteLogisticCoordinator(coordinatorId);
  }
}
