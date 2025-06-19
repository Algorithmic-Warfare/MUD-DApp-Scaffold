// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { Script } from "node_modules/forge-std/src/Script.sol";
import { console } from "node_modules/forge-std/src/console.sol";
import { StoreSwitch } from "node_modules/@latticexyz/store/src/StoreSwitch.sol";
import { taskSystem } from "../../src/codegen/systems/TaskSystemLib.sol";

contract CompleteTask is Script {
    function run(
        address worldAddress,
        uint256 taskId
    ) external {
        StoreSwitch.setStoreAddress(worldAddress);
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);
        taskSystem.completeTask(taskId);
        console.log("Completed task with ID:", taskId);
        vm.stopBroadcast();
    }
}
