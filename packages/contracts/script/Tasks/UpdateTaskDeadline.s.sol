// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { Script } from "node_modules/forge-std/src/Script.sol";
import { console } from "node_modules/forge-std/src/console.sol";
import { StoreSwitch } from "node_modules/@latticexyz/store/src/StoreSwitch.sol";
import { taskSystem } from "../../src/codegen/systems/TaskSystemLib.sol";

contract UpdateTaskDeadline is Script {
    function run(
        address worldAddress,
        uint256 taskId,
        uint256 newDeadline
    ) external {
        StoreSwitch.setStoreAddress(worldAddress);
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);
        taskSystem.updateTaskDeadline(taskId, newDeadline);
        console.log("Updated task deadline for task ID:", taskId);
        vm.stopBroadcast();
    }
}
