// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { System } from "@latticexyz/world/src/System.sol";

import { LogisticProvider, LogisticProviderData, LogisticNetwork, LogisticNetworkData, LogisticDepot, LogisticDepotData, LogisticCoordinator, LogisticCoordinatorData, LogisticAgent, LogisticAgentData, LogisticOperation, LogisticOperationData, LogisticTarget, LogisticTargetData, LogisticConstraint, LogisticConstraintData, LogisticAction, LogisticActionData, LogisticTransaction, LogisticTransactionData } from "@store/index.sol";

import { LogisticActionType, LogisticTransactionType, LogisticDepotType, LogisticConstraintType } from "@store/common.sol";
import { LogisticSystem } from "@systems/LogisticSystem.sol";

import { Derivations, Fetches } from "@systems/Utils.sol";

import { StructureErrors } from "@systems/LogisticStructures/errors.sol";
import { NOT_AN_SSU_OWNER, NOT_A_PROVIDER_FOR_ALL_NETOWRKS, NOT_A_REGISTERED_PROVIDER } from "@systems/LogisticStructures/errors.sol";

contract LogisticNetworkSystem is LogisticSystem {
  using Derivations for uint256;
  using Fetches for uint256;

  function createLogisticNetwork(
    string memory name,
    uint256 providerId,
    uint256[] memory coordinatorIds
  ) public onlyProvider(providerId) coordinatorsExist(coordinatorIds) returns (uint256) {
    uint256 timestamp = block.timestamp;
    LogisticNetworkData memory network = LogisticNetworkData({
      timestamp: timestamp,
      name: name,
      providerId: providerId,
      coordinatorIds: coordinatorIds
    });

    uint256 id = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, providerId, name)));

    LogisticNetwork.set(id, network);
    return id;
  }

  function deleteLogisticNetwork(uint256 networkId) public onlyProvider(networkId.providerIdFromNetworkId()) {
    LogisticNetwork.deleteRecord(networkId);
  }

  // TODO make sure the new name does not collide with another for the same provider
  function editNetworkName(
    uint256 networkId,
    string memory newName
  ) public onlyProvider(networkId.providerIdFromNetworkId()) {
    LogisticNetwork.setName(networkId, newName);
  }

  function transferNetworkOwnership(
    uint256 networkId,
    uint256 newNetworkProviderId
  ) public onlyProvider(networkId.providerIdFromNetworkId()) {
    LogisticNetwork.setProviderId(networkId, newNetworkProviderId);
  }

  function addNetworkCoordinator(
    uint256 networkId,
    uint256 coordinatorId
  ) public onlyProvider(networkId.providerIdFromNetworkId()) {
    uint256[] memory currentCoordinators = LogisticNetwork.getCoordinatorIds(networkId);
    uint256[] memory newCoordinators = new uint256[](currentCoordinators.length + 1);
    for (uint i = 0; i < currentCoordinators.length; i++) {
      newCoordinators[i] = currentCoordinators[i];
    }
    newCoordinators[currentCoordinators.length] = coordinatorId;

    LogisticNetwork.setCoordinatorIds(networkId, newCoordinators);
  }

  function removeNetworkCoordinator(
    uint256 networkId,
    uint256 coordinatorId
  ) public onlyProvider(networkId.providerIdFromNetworkId()) {
    uint256[] memory currentCoordinators = LogisticNetwork.getCoordinatorIds(networkId);
    uint256[] memory newCoordinators = new uint256[](currentCoordinators.length - 1);
    uint newIndex = 0;
    for (uint i = 0; i < currentCoordinators.length; i++) {
      if (currentCoordinators[i] != coordinatorId) {
        newCoordinators[newIndex] = currentCoordinators[i];
        newIndex++;
      }
    }
    LogisticNetwork.setCoordinatorIds(networkId, newCoordinators);
  }
}
