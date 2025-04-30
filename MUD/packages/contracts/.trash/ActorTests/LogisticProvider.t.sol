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

contract LogisticProviderTest is SetupTest {
  IWorld logisticWorld;

  // Test addresses
  address private PROVIDER_ADDRESS = player1;
  address private COORDINATOR_ADDRESS = player2;
  address private AGENT_ADDRESS = player3;
  address private INVALID_ADDRESS = player4;

  // Store common IDs
  uint256 private providerId;

  // Test Setup
  function setUp() public override {
    super.setUp();
    logisticWorld = IWorld(worldAddress);
  }

  function testCreateProvider() public {
    vm.prank(PROVIDER_ADDRESS);
    providerId = logisticWorld.AWAR__createLogisticProvider(PROVIDER_ADDRESS);

    assertTrue(providerId != uint256(0), "Provider ID should not be zero");
    assertEq(LogisticProvider.getSmartCharacterAddress(providerId), PROVIDER_ADDRESS, "Provider address mismatch");
  }

  function testDeleteProvider() public {
    testCreateProvider();

    vm.prank(PROVIDER_ADDRESS);
    logisticWorld.AWAR__deleteLogisticProvider(providerId);

    assertEq(LogisticProvider.getSmartCharacterAddress(providerId), address(0), "Provider should be removed");
  }

  function testRevertInvalidProvider() public {
    testCreateProvider();

    vm.expectRevert(abi.encodeWithSelector(ActorErrors.PROVIDER_InvalidProvider.selector, UNREGISTERED_PROVIDER));

    vm.prank(INVALID_ADDRESS);
    logisticWorld.AWAR__deleteLogisticProvider(providerId);
  }
}
