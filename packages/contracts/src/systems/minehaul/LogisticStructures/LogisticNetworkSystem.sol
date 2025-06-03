// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { System } from "@latticexyz/world/src/System.sol";

import { LogisticProvider, LogisticProviderData, LogisticNetwork, LogisticNetworkData, LogisticDepot, LogisticDepotData, LogisticCoordinator, LogisticCoordinatorData, LogisticAgent, LogisticAgentData, LogisticOperation, LogisticOperationData, LogisticAction, LogisticActionData, LogisticTransaction, LogisticTransactionData } from "@store/index.sol";

import { LogisticActionType, LogisticTransactionType } from "@store/common.sol";
import { LogisticSystem } from "@systems/LogisticSystem.sol";

import { Derivations, Fetches } from "@systems/Utils.sol";

import { StructureErrors } from "@systems/LogisticStructures/errors.sol";
import { NOT_AN_SSU_OWNER, NOT_A_PROVIDER_FOR_ALL_NETOWRKS, NOT_A_REGISTERED_PROVIDER } from "@systems/LogisticStructures/errors.sol";

contract LogisticNetworkSystem is LogisticSystem {
  using Derivations for uint256;
  using Fetches for uint256;

  function createLogisticNetwork(
    uint256 providerId,
    string memory codename,
    uint256[] memory depotIds,
    uint256[] memory fixtureIds,
    uint256[] memory coordinatorIds
  ) public onlyProvider(providerId) coordinatorsExist(coordinatorIds) returns (uint256) {
    uint256 timestamp = block.timestamp;
    LogisticNetworkData memory network = LogisticNetworkData({
      timestamp: timestamp,
      codename: codename,
      providerId: providerId,
      depotIds: depotIds,
      fixtureIds: fixtureIds,
      coordinatorIds: coordinatorIds
    });

    uint256 id = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, providerId, codename)));

    LogisticNetwork.set(id, network);
    return id;
  }

  function deleteLogisticNetwork(uint256 networkId) public onlyProvider(networkId.providerIdFromNetworkId()) {
    LogisticNetwork.deleteRecord(networkId);
  }

  function editNetworkCodename(
    uint256 networkId,
    string memory newCodename
  ) public onlyProvider(networkId.providerIdFromNetworkId()) {
    LogisticNetwork.setCodename(networkId, newCodename);
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

  function addNetworkDepot(
    uint256 networkId,
    uint256 depotId
  ) public onlyProvider(networkId.providerIdFromNetworkId()) {
    uint256[] memory currentDepots = LogisticNetwork.getDepotIds(networkId);
    uint256[] memory newDepots = new uint256[](currentDepots.length + 1);
    for (uint i = 0; i < currentDepots.length; i++) {
      newDepots[i] = currentDepots[i];
    }
    newDepots[currentDepots.length] = depotId;

    LogisticNetwork.setDepotIds(networkId, newDepots);
  }

  function removeNetworkDepot(
    uint256 networkId,
    uint256 depotId
  ) public onlyProvider(networkId.providerIdFromNetworkId()) {
    uint256[] memory currentDepots = LogisticNetwork.getDepotIds(networkId);
    uint256[] memory newDepots = new uint256[](currentDepots.length - 1);
    uint newIndex = 0;
    for (uint i = 0; i < currentDepots.length; i++) {
      if (currentDepots[i] != depotId) {
        newDepots[newIndex] = currentDepots[i];
        newIndex++;
      }
    }
    LogisticNetwork.setDepotIds(networkId, newDepots);
  }

  function addNetworkFixture(
    uint256 networkId,
    uint256 fixtureId
  ) public onlyProvider(networkId.providerIdFromNetworkId()) {
    uint256[] memory currentFixtures = LogisticNetwork.getFixtureIds(networkId);
    uint256[] memory newFixtures = new uint256[](currentFixtures.length + 1);
    for (uint i = 0; i < currentFixtures.length; i++) {
      newFixtures[i] = currentFixtures[i];
    }
    newFixtures[currentFixtures.length] = fixtureId;

    LogisticNetwork.setFixtureIds(networkId, newFixtures);
  }

  function removeNetworkFixture(
    uint256 networkId,
    uint256 fixtureId
  ) public onlyProvider(networkId.providerIdFromNetworkId()) {
    uint256[] memory currentFixtures = LogisticNetwork.getFixtureIds(networkId);
    uint256[] memory newFixtures = new uint256[](currentFixtures.length - 1);
    uint newIndex = 0;
    for (uint i = 0; i < currentFixtures.length; i++) {
      if (currentFixtures[i] != fixtureId) {
        newFixtures[newIndex] = currentFixtures[i];
        newIndex++;
      }
    }
    LogisticNetwork.setFixtureIds(networkId, newFixtures);
  }
}
