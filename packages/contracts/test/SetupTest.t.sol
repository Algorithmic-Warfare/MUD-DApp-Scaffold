/**
 * SetupTest.t.sol
 *
 * This file contains the base setup for all MUD-related tests in the Tribe MUD DApp.
 * It ensures the correct world address is loaded and MUD table calls and system calls are configured
 * for subsequent tests. This contract extends `MudTest` to provide a consistent testing environment.
 *
 * This contract is inherited by other test contracts to provide a pre-configured MUD testing environment.
 * `worldAddress` is loaded from environment variables, which is crucial for connecting to the correct MUD world instance.
 * `StoreSwitch.setStoreAddress` and `IWorld(worldAddress)` are used to enable MUD interactions within tests.
 */
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import "forge-std/Test.sol";
import { MudTest } from "@latticexyz/world/test/MudTest.t.sol";
import { IWorld } from "../src/codegen/world/IWorld.sol";
import { StoreSwitch } from "@latticexyz/store/src/StoreSwitch.sol";

contract SetupTest is MudTest {
  IWorld taskWorld;

  /**
   * Sets up the testing environment for MUD interactions.
   *
   * This function is called before each test to initialize the `worldAddress` from environment variables,
   * set up the `StoreSwitch` for MUD table calls, and configure `taskWorld` for MUD system calls.
   * This ensures that all subsequent tests have a properly configured MUD environment.
   *
   * @dev `worldAddress` is loaded from the `WORLD_ADDRESS` environment variable.
   * @dev `StoreSwitch.setStoreAddress` is essential for enabling MUD table read/write operations.
   * @dev `taskWorld` is cast to `IWorld` to allow direct interaction with MUD systems.
   */
  function setUp() public virtual override {
    // Load the current world address from the `.env`.
    worldAddress = vm.envAddress("WORLD_ADDRESS");

    // Allow the MUD table calls to be used in the following tests.
    StoreSwitch.setStoreAddress(worldAddress);

    // Setup to use MUD system calls in the following tests.
    taskWorld = IWorld(worldAddress);
  }
}
