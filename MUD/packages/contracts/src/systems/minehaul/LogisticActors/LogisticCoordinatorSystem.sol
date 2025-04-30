// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { System } from "@latticexyz/world/src/System.sol";

import { LogisticProvider, LogisticNetwork, LogisticNetworkData, LogisticDepot, LogisticDepotData, LogisticCoordinator, LogisticCoordinatorData, LogisticAgent, LogisticAgentData, LogisticOperation, LogisticOperationData, LogisticAction, LogisticActionData, LogisticTransaction, LogisticTransactionData } from "@store/index.sol";

import { LogisticActionType, LogisticTransactionType } from "@store/common.sol";
import { LogisticSystem } from "@systems/LogisticSystem.sol";

import { Derivations, Fetches } from "@systems/Utils.sol";

contract LogisticCoordinatorSystem is LogisticSystem {
  using Derivations for uint256;
  using Fetches for uint256;

  function createLogisticCoordinator(
    address smartCharacterAddress,
    uint256 networkId
  ) public onlyProvider(networkId.providerIdFromNetworkId()) returns (uint256) {
    uint256 timestamp = block.timestamp;
    LogisticCoordinatorData memory coordinator = LogisticCoordinatorData({
      timestamp: timestamp,
      smartCharacterAddress: smartCharacterAddress,
      networkId: networkId
    });

    uint256 id = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, smartCharacterAddress)));

    LogisticCoordinator.set(id, coordinator);
    return id;
  }

  function deleteLogisticCoordinator(
    uint256 coordinatorId
  ) public onlyProvider(coordinatorId.providerIdFromCoordinatorId()) {
    LogisticCoordinator.deleteRecord(coordinatorId);
  }
}
