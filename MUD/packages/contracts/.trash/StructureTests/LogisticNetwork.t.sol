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

contract LogisticNetworkTest is SetupTest {
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

  // Test Setup
  function setUp() public override {
    super.setUp();
    logisticWorld = IWorld(worldAddress);
    vm.prank(PROVIDER_ADDRESS);
    providerId = logisticWorld.AWAR__createLogisticProvider(PROVIDER_ADDRESS);
  }

  function testCreateNetwork() public {
    uint256[] memory coordinatorIds = new uint256[](0);

    vm.prank(PROVIDER_ADDRESS);
    networkId = logisticWorld.AWAR__createLogisticNetwork("Test Network", providerId, coordinatorIds);

    assertTrue(networkId != uint256(0), "Network ID should not be zero");
    assertEq(LogisticNetwork.getName(networkId), "Test Network", "Network name mismatch");
    assertEq(LogisticNetwork.getProviderId(networkId), providerId, "Provider Id mismatch");
    assertEq(LogisticNetwork.getCoordinatorIds(networkId), coordinatorIds, "Coordinator Ids mismatch");
  }

  function testEditNetworkName() public {
    testCreateNetwork();

    vm.prank(PROVIDER_ADDRESS);
    logisticWorld.AWAR__editNetworkName(networkId, "Updated Network");

    assertEq(LogisticNetwork.getName(networkId), "Updated Network", "Network name not updated");
  }

  function testTransferNetworkOwnership() public {
    testCreateNetwork();

    vm.prank(address(0x9));
    uint256 newProviderId = logisticWorld.AWAR__createLogisticProvider(address(0x9));

    vm.prank(PROVIDER_ADDRESS);
    logisticWorld.AWAR__transferNetworkOwnership(networkId, newProviderId);
    assertEq(LogisticNetwork.getProviderId(networkId), newProviderId, "Network ownership not transferred");
  }

  function testAddCoordinator() public {
    testCreateNetwork();

    vm.startPrank(PROVIDER_ADDRESS);
    coordinatorId = logisticWorld.AWAR__createLogisticCoordinator(COORDINATOR_ADDRESS, networkId);
    vm.stopPrank();

    vm.startPrank(PROVIDER_ADDRESS);
    logisticWorld.AWAR__addNetworkCoordinator(networkId, coordinatorId);
    vm.stopPrank();

    uint256[] memory updatedCoordinatorIds = LogisticNetwork.getCoordinatorIds(networkId);

    assertEq(coordinatorId, updatedCoordinatorIds[0], "Failed to add coordinator.");
  }

  function testRemoveCoordinator() public {
    testAddCoordinator();

    vm.startPrank(PROVIDER_ADDRESS);
    logisticWorld.AWAR__removeNetworkCoordinator(networkId, coordinatorId);
    vm.stopPrank();

    uint256[] memory updatedCoordinatorIds = LogisticNetwork.getCoordinatorIds(networkId);

    assertEq(updatedCoordinatorIds.length, 0, "Failed to add coordinator.");
  }

  function testRevertInvalidProvider() public {
    vm.expectRevert(abi.encodeWithSelector(ActorErrors.PROVIDER_InvalidProvider.selector, UNREGISTERED_PROVIDER));
    vm.prank(INVALID_ADDRESS);
    logisticWorld.AWAR__editNetworkName(networkId, "Updated Network");

    vm.prank(address(0x9));
    uint256 newProviderId = logisticWorld.AWAR__createLogisticProvider(address(0x9));
    vm.expectRevert(abi.encodeWithSelector(ActorErrors.PROVIDER_InvalidProvider.selector, UNREGISTERED_PROVIDER));
    vm.prank(INVALID_ADDRESS);
    logisticWorld.AWAR__transferNetworkOwnership(networkId, newProviderId);

    vm.expectRevert(abi.encodeWithSelector(ActorErrors.PROVIDER_InvalidProvider.selector, UNREGISTERED_PROVIDER));
    vm.prank(INVALID_ADDRESS);
    logisticWorld.AWAR__addNetworkCoordinator(networkId, coordinatorId);

    vm.expectRevert(abi.encodeWithSelector(ActorErrors.PROVIDER_InvalidProvider.selector, UNREGISTERED_PROVIDER));
    vm.prank(INVALID_ADDRESS);
    logisticWorld.AWAR__removeNetworkCoordinator(networkId, coordinatorId);
  }
}
