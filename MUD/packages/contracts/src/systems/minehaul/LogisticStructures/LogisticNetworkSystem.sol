// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { System } from "@latticexyz/world/src/System.sol";

import { LogisticNetwork, LogisticNetworkData, LogisticDepot, LogisticDepotData, LogisticOperation, LogisticOperationData, LogisticAction, LogisticActionData, LogisticTransaction, LogisticTransactionData } from "@store/index.sol";

import { LogisticActionType, LogisticTransactionType } from "@store/common.sol";
import { LogisticSystem } from "@systems/LogisticSystem.sol";

import { Derivations, Fetches } from "@systems/Utils.sol";

import { StructureErrors } from "@systems/LogisticStructures/errors.sol";
import { NOT_AN_SSU_OWNER, NOT_A_PROVIDER_FOR_ALL_NETOWRKS, NOT_A_REGISTERED_PROVIDER } from "@systems/LogisticStructures/errors.sol";
import { ProofArgs } from "@systems/types.sol";

contract LogisticNetworkSystem is LogisticSystem {
  using Derivations for uint256;
  using Fetches for uint256;

  function createLogisticNetwork(
    ProofArgs memory proof,
    string memory name
  ) public onlyProvider(proof) returns (uint256) {
    uint256[] memory depotIds = new uint256[](0);
    uint256 timestamp = block.timestamp;
    LogisticNetworkData memory network = LogisticNetworkData({ timestamp: timestamp, name: name, depotIds: depotIds });

    uint256 id = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, name)));

    LogisticNetwork.set(id, network);
    return id;
  }

  function deleteLogisticNetwork(ProofArgs memory proof, uint256 networkId) public onlyProvider(proof) {
    // TODO clean the network from all depots
    LogisticNetwork.deleteRecord(networkId);
  }

  // TODO make sure the new name does not collide with another for the same provider
  function editNetworkName(
    ProofArgs memory proof,
    uint256 networkId,
    string memory newName
  ) public onlyProvider(proof) {
    LogisticNetwork.setName(networkId, newName);
  }

  function addNetworkDepot(ProofArgs memory proof, uint256 networkId, uint256 depotId) public onlyProvider(proof) {
    uint256[] memory currentDepots = LogisticNetwork.getDepotIds(networkId);
    uint256[] memory newDepots = new uint256[](currentDepots.length + 1);
    for (uint i = 0; i < currentDepots.length; i++) {
      newDepots[i] = currentDepots[i];
    }
    newDepots[currentDepots.length] = depotId;

    LogisticNetwork.setDepotIds(networkId, newDepots);
  }

  function removeNetworkDepot(ProofArgs memory proof, uint256 networkId, uint256 depotId) public onlyProvider(proof) {
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
}
