// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import "forge-std/Test.sol";
import { MudTest } from "@latticexyz/world/test/MudTest.t.sol";
import { IWorld } from "@world/IWorld.sol";

import { LogisticProvider, LogisticNetwork, LogisticNetworkData, LogisticDepot, LogisticDepotData, LogisticCoordinator, LogisticCoordinatorData, LogisticAgent, LogisticAgentData, LogisticOperation, LogisticOperationData, LogisticTarget, LogisticTargetData, LogisticConstraint, LogisticConstraintData, LogisticAction, LogisticActionData, LogisticTransaction, LogisticTransactionData } from "@store/index.sol";

import { LogisticActionType, LogisticTransactionType, LogisticDepotType, LogisticConstraintType } from "@store/common.sol";

import { ActorErrors } from "@systems/LogisticActors/errors.sol";
import { UNREGISTERED_PROVIDER, UNREGISTERED_COORDINATOR, UNREGISTERED_AGENT } from "@systems/LogisticActors/errors.sol";
import { StructureErrors } from "@systems/LogisticStructures/errors.sol";
import { NOT_AN_SSU_OWNER, NOT_A_PROVIDER_FOR_ALL_NETOWRKS } from "@systems/LogisticStructures/errors.sol";

import { SetupTest } from "@tests/SetupTest.t.sol";

contract LogisticDepotTest is SetupTest {
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
  }

  function testCreateDepot() public {
    uint256[] memory networkIds = new uint256[](0);

    vm.prank(PROVIDER_ADDRESS);
    depotId = logisticWorld.AWAR__createLogisticDepot(SSUID_1, LogisticDepotType.HOT, networkIds);
    assertTrue(depotId != uint256(0), "Depot ID should not be zero");
    assertEq(LogisticDepot.getSmartStorageUnitId(depotId), SSUID_1, "Depot storage unit ID mismatch");
    assertEq(LogisticDepot.getNetworkIds(depotId), networkIds, "Network ID mismatch");
    assert(LogisticDepot.getDepotType(depotId) == LogisticDepotType.HOT);
  }

  function testEditDepotType() public {
    testCreateDepot();

    vm.prank(PROVIDER_ADDRESS);
    logisticWorld.AWAR__editDepotType(depotId, LogisticDepotType.COLD);

    assertEq(uint256(LogisticDepot.getDepotType(depotId)), uint256(LogisticDepotType.COLD), "Depot type not updated");
  }

  function testRemoveDepot() public {
    testCreateDepot();

    vm.prank(PROVIDER_ADDRESS);
    logisticWorld.AWAR__deleteLogisticDepot(depotId);

    assertEq(LogisticDepot.getSmartStorageUnitId(depotId), uint256(0), "Depot not removed.");
  }

  function testAddDepotNetwork() public {
    testCreateDepot();

    vm.prank(PROVIDER_ADDRESS);
    logisticWorld.AWAR__addDepotNetwork(depotId, networkId);

    uint256[] memory depotNetworkIds = LogisticDepot.getNetworkIds(depotId);

    assertEq(depotNetworkIds[0], networkId, "Could not add network.");
  }

  function testRemoveDepotNetwork() public {
    testAddDepotNetwork();

    vm.prank(PROVIDER_ADDRESS);
    logisticWorld.AWAR__removeDepotNetwork(depotId, networkId);

    uint256[] memory depotNetowrkIds = LogisticDepot.getNetworkIds(depotId);

    assertEq(depotNetowrkIds.length, 0, "Could not remove network.");
  }

  function testRevertInvalidProvider() public {
    testCreateDepot();

    vm.expectRevert(abi.encodeWithSelector(ActorErrors.PROVIDER_InvalidProvider.selector, UNREGISTERED_PROVIDER));
    vm.prank(INVALID_ADDRESS);
    logisticWorld.AWAR__addDepotNetwork(depotId, networkId);

    vm.expectRevert(abi.encodeWithSelector(ActorErrors.PROVIDER_InvalidProvider.selector, UNREGISTERED_PROVIDER));
    vm.prank(INVALID_ADDRESS);
    logisticWorld.AWAR__removeDepotNetwork(depotId, networkId);
  }

  function testRevertDoesNotOwnTheSSU() public {
    vm.prank(INVALID_ADDRESS);
    uint256 invalidProviderId = logisticWorld.AWAR__createLogisticProvider(INVALID_ADDRESS);

    vm.expectRevert(
      abi.encodeWithSelector(StructureErrors.DEPOT_DoesNotOwnSmartStorageUnit.selector, NOT_AN_SSU_OWNER)
    );

    vm.prank(INVALID_ADDRESS);
    uint256[] memory networkIds = new uint256[](0);
    depotId = logisticWorld.AWAR__createLogisticDepot(SSUID_1, LogisticDepotType.HOT, networkIds);

    vm.prank(PROVIDER_ADDRESS);
    depotId = logisticWorld.AWAR__createLogisticDepot(SSUID_1, LogisticDepotType.HOT, networkIds);
    //
    vm.expectRevert(
      abi.encodeWithSelector(StructureErrors.DEPOT_DoesNotOwnSmartStorageUnit.selector, NOT_AN_SSU_OWNER)
    );

    vm.prank(INVALID_ADDRESS);
    logisticWorld.AWAR__editDepotType(depotId, LogisticDepotType.COLD);

    uint256[] memory coordinatorIds = new uint256[](0);

    vm.prank(INVALID_ADDRESS);
    networkId = logisticWorld.AWAR__createLogisticNetwork("Test Network", invalidProviderId, coordinatorIds);

    vm.expectRevert(
      abi.encodeWithSelector(StructureErrors.DEPOT_DoesNotOwnSmartStorageUnit.selector, NOT_AN_SSU_OWNER)
    );

    vm.prank(INVALID_ADDRESS);
    logisticWorld.AWAR__addDepotNetwork(depotId, networkId);

    //
    vm.expectRevert(
      abi.encodeWithSelector(StructureErrors.DEPOT_DoesNotOwnSmartStorageUnit.selector, NOT_AN_SSU_OWNER)
    );

    vm.prank(INVALID_ADDRESS);
    logisticWorld.AWAR__removeDepotNetwork(depotId, networkId);

    //
    vm.expectRevert(
      abi.encodeWithSelector(StructureErrors.DEPOT_DoesNotOwnSmartStorageUnit.selector, NOT_AN_SSU_OWNER)
    );

    vm.prank(INVALID_ADDRESS);
    logisticWorld.AWAR__deleteLogisticDepot(depotId);
  }

  function testRevertDoesNotProvideForAllNetworks() public {
    vm.prank(INVALID_ADDRESS);
    uint256 invalidProviderId = logisticWorld.AWAR__createLogisticProvider(INVALID_ADDRESS);

    uint256[] memory coordinatorIds = new uint256[](0);

    vm.prank(INVALID_ADDRESS);
    uint256 invalidNetworkId = logisticWorld.AWAR__createLogisticNetwork(
      "Test Network",
      invalidProviderId,
      coordinatorIds
    );

    vm.expectRevert(
      abi.encodeWithSelector(
        StructureErrors.DEPOT_DoesNotProvideForAllNetworks.selector,
        NOT_A_PROVIDER_FOR_ALL_NETOWRKS
      )
    );

    vm.prank(PROVIDER_ADDRESS);
    uint256[] memory networkIds = new uint256[](2);
    networkIds[0] = networkId;
    networkIds[1] = invalidNetworkId;

    depotId = logisticWorld.AWAR__createLogisticDepot(SSUID_1, LogisticDepotType.HOT, networkIds);
  }
}
