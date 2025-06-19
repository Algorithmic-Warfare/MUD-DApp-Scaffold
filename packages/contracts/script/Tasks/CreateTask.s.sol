// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { Script } from "node_modules/forge-std/src/Script.sol";
import { console } from "node_modules/forge-std/src/console.sol";
import { StoreSwitch } from "node_modules/@latticexyz/store/src/StoreSwitch.sol";
import { taskSystem } from "../../src/codegen/systems/TaskSystemLib.sol";

contract CreateTask is Script {
    function run(
        address worldAddress,
        address assignee,
        string memory description,
        uint256 deadline
    ) external {
        StoreSwitch.setStoreAddress(worldAddress);
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);
        uint256 taskId = taskSystem.createTask(
            assignee,
            description,
            deadline
        );
        console.logString("Created task with ID:");
        console.logUint(taskId);
        vm.stopBroadcast();
    }
}
