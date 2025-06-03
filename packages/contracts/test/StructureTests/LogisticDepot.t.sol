// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import "forge-std/Test.sol";
import { MudTest } from "@latticexyz/world/test/MudTest.t.sol";
import { IWorld } from "@world/IWorld.sol";

import { LogisticProvider, LogisticNetwork, LogisticNetworkData, LogisticDepot, LogisticDepotData, LogisticCoordinator, LogisticCoordinatorData, LogisticAgent, LogisticAgentData, LogisticOperation, LogisticOperationData, LogisticAction, LogisticActionData, LogisticTransaction, LogisticTransactionData } from "@store/index.sol";

import { LogisticActionType, LogisticTransactionType } from "@store/common.sol";

import { ActorErrors } from "@systems/LogisticActors/errors.sol";
import { UNREGISTERED_PROVIDER, UNREGISTERED_COORDINATOR, UNREGISTERED_AGENT } from "@systems/LogisticActors/errors.sol";
import { StructureErrors } from "@systems/LogisticStructures/errors.sol";
import { NOT_AN_SSU_OWNER, NOT_A_PROVIDER_FOR_ALL_NETOWRKS } from "@systems/LogisticStructures/errors.sol";

import { SetupTest } from "@tests/SetupTest.t.sol";

contract LogisticDepotTest is SetupTest {
  IWorld logisticWorld;

  // Test addresses
  address private PROVIDER_ADDRESS = player1;
  address private INVALID_ADDRESS = player4;

  // Store common IDs
  uint256 private providerId;
  uint256 private depotId;

  // Test Setup
  function setUp() public override {
    super.setUp();
    logisticWorld = IWorld(worldAddress);

    vm.prank(PROVIDER_ADDRESS);
    providerId = logisticWorld.AWAR__createLogisticProvider(PROVIDER_ADDRESS);
  }

  function testCreateDepot() public {
    vm.prank(PROVIDER_ADDRESS);
    depotId = logisticWorld.AWAR__createLogisticDepot(providerId, "Test Storage Unit", SSUID_1);
    assertTrue(depotId != uint256(0), "Depot ID should not be zero");
    assertEq(LogisticDepot.getSmartStorageUnitId(depotId), SSUID_1, "Depot storage unit Id mismatch");
    assertEq(LogisticDepot.getCodename(depotId), "Test Storage Unit", "Codename mismatch");
    assertEq(LogisticDepot.getProviderId(depotId), providerId, "Provider Id mismatch");
  }

  function testRemoveDepot() public {
    testCreateDepot();

    vm.prank(PROVIDER_ADDRESS);
    logisticWorld.AWAR__deleteLogisticDepot(depotId);

    assertEq(LogisticDepot.getSmartStorageUnitId(depotId), uint256(0), "Depot not removed.");
  }

  function testRevertInvalidProvider() public {
    testCreateDepot();

    //
    vm.expectRevert(abi.encodeWithSelector(ActorErrors.PROVIDER_InvalidProvider.selector, UNREGISTERED_PROVIDER));
    vm.prank(INVALID_ADDRESS);
    logisticWorld.AWAR__editDepotCodename(depotId, "This is my depot");

    //
    vm.expectRevert(abi.encodeWithSelector(ActorErrors.PROVIDER_InvalidProvider.selector, UNREGISTERED_PROVIDER));
    vm.prank(INVALID_ADDRESS);
    logisticWorld.AWAR__deleteLogisticDepot(depotId);
  }

  function testRevertDoesNotOwnTheSSU() public {
    //
    vm.prank(INVALID_ADDRESS);
    uint256 invalidProviderId = logisticWorld.AWAR__createLogisticProvider(INVALID_ADDRESS);

    vm.expectRevert(
      abi.encodeWithSelector(StructureErrors.DEPOT_DoesNotOwnSmartStorageUnit.selector, NOT_AN_SSU_OWNER)
    );

    vm.prank(INVALID_ADDRESS);
    depotId = logisticWorld.AWAR__createLogisticDepot(invalidProviderId, "Test Storage Unit", SSUID_1);
  }
}
