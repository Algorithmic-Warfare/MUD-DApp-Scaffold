// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import "forge-std/Test.sol";
import { MudTest } from "@latticexyz/world/test/MudTest.t.sol";
import { IWorld } from "../src/codegen/world/IWorld.sol";
import { StoreSwitch } from "@latticexyz/store/src/StoreSwitch.sol";

contract SetupTest is MudTest {
  IWorld taskWorld;

  // Test Setup
  function setUp() public virtual override {
    // Load the current world address from the `.env`.
    worldAddress = vm.envAddress("WORLD_ADDRESS");

    // Allow the MUD table calls to be used in the following tests.
    StoreSwitch.setStoreAddress(worldAddress);

    // Setup to use MUD system calls in the following tests.
    taskWorld = IWorld(worldAddress);
  }
}
