// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import "forge-std/Test.sol";
import { MudTest } from "@latticexyz/world/test/MudTest.t.sol";
import { IWorld } from "@world/IWorld.sol";

import { LogisticProvider, LogisticNetwork, LogisticNetworkData, LogisticDepot, LogisticDepotData, LogisticCoordinator, LogisticCoordinatorData, LogisticAgent, LogisticAgentData, LogisticOperation, LogisticOperationData, LogisticAction, LogisticActionData, LogisticTransaction, LogisticTransactionData } from "@store/index.sol";

import { LogisticFixtureType, LogisticActionType, LogisticTransactionType } from "@store/common.sol";

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
  uint256 private depotId;
  uint256 private fixtureId;

  // Test Setup
  function setUp() public override {
    super.setUp();
    logisticWorld = IWorld(worldAddress);
    vm.prank(PROVIDER_ADDRESS);
    providerId = logisticWorld.AWAR__createLogisticProvider(PROVIDER_ADDRESS);
  }

  function testCreateNetwork() public {
    uint256[] memory coordinatorIds = new uint256[](0);
    uint256[] memory depotIds = new uint256[](0);
    uint256[] memory fixtureIds = new uint256[](0);

    vm.prank(PROVIDER_ADDRESS);
    networkId = logisticWorld.AWAR__createLogisticNetwork(
      providerId,
      "Test Network",
      coordinatorIds,
      depotIds,
      fixtureIds
    );

    assertTrue(networkId != uint256(0), "Network ID should not be zero");
    assertEq(LogisticNetwork.getCodename(networkId), "Test Network", "Network name mismatch");
    assertEq(LogisticNetwork.getProviderId(networkId), providerId, "Provider Id mismatch");
    assertEq(LogisticNetwork.getCoordinatorIds(networkId), coordinatorIds, "Coordinator Ids mismatch");
    assertEq(LogisticNetwork.getDepotIds(networkId), coordinatorIds, "Depot Ids mismatch");
    assertEq(LogisticNetwork.getFixtureIds(networkId), fixtureIds, "Fixture Ids mismatch");
  }

  function testEditNetworkCodename() public {
    testCreateNetwork();

    vm.prank(PROVIDER_ADDRESS);
    logisticWorld.AWAR__editNetworkCodename(networkId, "Updated Network");

    assertEq(LogisticNetwork.getCodename(networkId), "Updated Network", "Network name not updated");
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

  function testAddDepot() public {
    testCreateNetwork();

    vm.startPrank(PROVIDER_ADDRESS);
    depotId = logisticWorld.AWAR__createLogisticDepot(providerId, "Test Storage Unit", SSUID_1);
    vm.stopPrank();

    vm.startPrank(PROVIDER_ADDRESS);
    logisticWorld.AWAR__addNetworkDepot(networkId, depotId);
    vm.stopPrank();

    uint256[] memory updatedDepotIds = LogisticNetwork.getDepotIds(networkId);

    assertEq(depotId, updatedDepotIds[0], "Failed to add depot.");
  }

  function testRemoveDepot() public {
    testAddDepot();

    vm.startPrank(PROVIDER_ADDRESS);
    logisticWorld.AWAR__removeNetworkDepot(networkId, depotId);
    vm.stopPrank();

    uint256[] memory updatedDepotIds = LogisticNetwork.getDepotIds(networkId);

    assertEq(updatedDepotIds.length, 0, "Failed to remove depot.");
  }

  function testAddFixture() public {
    testCreateNetwork();

    vm.startPrank(PROVIDER_ADDRESS);
    fixtureId = logisticWorld.AWAR__createLogisticFixture(
      providerId,
      "Test Logistic Faucet",
      LogisticFixtureType.FAUCET
    );
    vm.stopPrank();

    vm.startPrank(PROVIDER_ADDRESS);
    logisticWorld.AWAR__addNetworkFixture(networkId, fixtureId);
    vm.stopPrank();

    uint256[] memory updatedFixtureIds = LogisticNetwork.getFixtureIds(networkId);

    assertEq(fixtureId, updatedFixtureIds[0], "Failed to add fixture.");
  }

  function testRemoveFixture() public {
    testAddFixture();

    vm.startPrank(PROVIDER_ADDRESS);
    logisticWorld.AWAR__removeNetworkFixture(networkId, fixtureId);
    vm.stopPrank();

    uint256[] memory updatedFixtureIds = LogisticNetwork.getFixtureIds(networkId);

    assertEq(updatedFixtureIds.length, 0, "Failed to remove fixture.");
  }

  function testRevertInvalidProvider() public {
    testCreateNetwork();

    //
    vm.expectRevert(abi.encodeWithSelector(ActorErrors.PROVIDER_InvalidProvider.selector, UNREGISTERED_PROVIDER));
    vm.prank(INVALID_ADDRESS);
    logisticWorld.AWAR__editNetworkCodename(networkId, "Updated Network");

    //
    vm.prank(address(0x9));
    uint256 newProviderId = logisticWorld.AWAR__createLogisticProvider(address(0x9));
    vm.expectRevert(abi.encodeWithSelector(ActorErrors.PROVIDER_InvalidProvider.selector, UNREGISTERED_PROVIDER));
    vm.prank(INVALID_ADDRESS);
    logisticWorld.AWAR__transferNetworkOwnership(networkId, newProviderId);

    //
    vm.expectRevert(abi.encodeWithSelector(ActorErrors.PROVIDER_InvalidProvider.selector, UNREGISTERED_PROVIDER));
    vm.prank(INVALID_ADDRESS);
    logisticWorld.AWAR__addNetworkCoordinator(networkId, coordinatorId);

    //
    vm.expectRevert(abi.encodeWithSelector(ActorErrors.PROVIDER_InvalidProvider.selector, UNREGISTERED_PROVIDER));
    vm.prank(INVALID_ADDRESS);
    logisticWorld.AWAR__removeNetworkCoordinator(networkId, coordinatorId);

    //
    vm.expectRevert(abi.encodeWithSelector(ActorErrors.PROVIDER_InvalidProvider.selector, UNREGISTERED_PROVIDER));
    vm.prank(INVALID_ADDRESS);
    logisticWorld.AWAR__addNetworkDepot(networkId, depotId);

    //
    vm.expectRevert(abi.encodeWithSelector(ActorErrors.PROVIDER_InvalidProvider.selector, UNREGISTERED_PROVIDER));
    vm.prank(INVALID_ADDRESS);
    logisticWorld.AWAR__removeNetworkDepot(networkId, depotId);

    //
    vm.expectRevert(abi.encodeWithSelector(ActorErrors.PROVIDER_InvalidProvider.selector, UNREGISTERED_PROVIDER));
    vm.prank(INVALID_ADDRESS);
    logisticWorld.AWAR__addNetworkFixture(networkId, fixtureId);

    //
    vm.expectRevert(abi.encodeWithSelector(ActorErrors.PROVIDER_InvalidProvider.selector, UNREGISTERED_PROVIDER));
    vm.prank(INVALID_ADDRESS);
    logisticWorld.AWAR__removeNetworkFixture(networkId, fixtureId);
  }
}
