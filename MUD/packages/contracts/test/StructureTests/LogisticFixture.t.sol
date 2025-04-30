// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import "forge-std/Test.sol";
import { MudTest } from "@latticexyz/world/test/MudTest.t.sol";
import { IWorld } from "@world/IWorld.sol";

import { LogisticProvider, LogisticProviderData, LogisticNetwork, LogisticNetworkData, LogisticDepot, LogisticDepotData, LogisticFixture, LogisticFixtureData, LogisticCoordinator, LogisticCoordinatorData, LogisticAgent, LogisticAgentData, LogisticOperation, LogisticOperationData, LogisticAction, LogisticActionData, LogisticTransaction, LogisticTransactionData } from "@store/index.sol";

import { LogisticFixtureType, LogisticActionType, LogisticTransactionType } from "@store/common.sol";

import { ActorErrors } from "@systems/LogisticActors/errors.sol";
import { UNREGISTERED_PROVIDER, UNREGISTERED_COORDINATOR, UNREGISTERED_AGENT } from "@systems/LogisticActors/errors.sol";
import { StructureErrors } from "@systems/LogisticStructures/errors.sol";
import { NOT_AN_SSU_OWNER, NOT_A_PROVIDER_FOR_ALL_NETOWRKS } from "@systems/LogisticStructures/errors.sol";

import { SetupTest } from "@tests/SetupTest.t.sol";

contract LogisticFixtureTest is SetupTest {
  IWorld logisticWorld;

  // Test addresses
  address private PROVIDER_ADDRESS = player1;
  address private INVALID_ADDRESS = player4;

  // Store common IDs
  uint256 private providerId;
  uint256 private fixtureId;

  // Test Setup
  function setUp() public override {
    super.setUp();
    logisticWorld = IWorld(worldAddress);

    vm.prank(PROVIDER_ADDRESS);
    providerId = logisticWorld.AWAR__createLogisticProvider(PROVIDER_ADDRESS);
  }

  function testCreateFixture() public {
    vm.prank(PROVIDER_ADDRESS);
    fixtureId = logisticWorld.AWAR__createLogisticFixture(
      providerId,
      "Test Logistic Faucet",
      LogisticFixtureType.FAUCET
    );

    assertTrue(fixtureId != uint256(0), "Fixture Id should not be zero");
    assertEq(LogisticFixture.getProviderId(fixtureId), providerId, "Provider Id mismatch");
    assertEq(LogisticFixture.getCodename(fixtureId), "Test Logistic Faucet", "Codename mismatch");
    assertTrue(
      uint256(LogisticFixture.getFixtureType(fixtureId)) == uint256(LogisticFixtureType.FAUCET),
      "Fixture type mismatch"
    );

    vm.prank(PROVIDER_ADDRESS);
    fixtureId = logisticWorld.AWAR__createLogisticFixture(providerId, "Test Logistic Sink", LogisticFixtureType.SINK);

    assertTrue(fixtureId != uint256(0), "Fixture Id should not be zero");
    assertEq(LogisticFixture.getProviderId(fixtureId), providerId, "Provider Id mismatch");
    assertEq(LogisticFixture.getCodename(fixtureId), "Test Logistic Sink", "Codename mismatch");
    assertTrue(LogisticFixture.getFixtureType(fixtureId) == LogisticFixtureType.SINK, "Fixture type mismatch");
  }

  function testEditFixtureCodename() public {
    testCreateFixture();

    vm.prank(PROVIDER_ADDRESS);
    logisticWorld.AWAR__editFixtureCodename(fixtureId, "Test Logistic Sink 2");

    assertEq(LogisticFixture.getCodename(fixtureId), "Test Logistic Sink 2", "Fixture codename unchanged.");
  }

  function testRemoveFixture() public {
    testCreateFixture();

    vm.prank(PROVIDER_ADDRESS);
    logisticWorld.AWAR__deleteLogisticFixture(fixtureId);

    assertEq(LogisticFixture.getProviderId(fixtureId), uint256(0), "Fixture not removed.");
  }

  function testRevertInvalidProvider() public {
    testCreateFixture();

    //
    vm.expectRevert(abi.encodeWithSelector(ActorErrors.PROVIDER_InvalidProvider.selector, UNREGISTERED_PROVIDER));
    vm.prank(INVALID_ADDRESS);
    logisticWorld.AWAR__editFixtureCodename(fixtureId, "This is my fixture");

    //
    vm.expectRevert(abi.encodeWithSelector(ActorErrors.PROVIDER_InvalidProvider.selector, UNREGISTERED_PROVIDER));
    vm.prank(INVALID_ADDRESS);
    logisticWorld.AWAR__deleteLogisticFixture(fixtureId);
  }
}
