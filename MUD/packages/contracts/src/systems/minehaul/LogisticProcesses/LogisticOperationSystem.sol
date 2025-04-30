// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { System } from "@latticexyz/world/src/System.sol";

import { LogisticNetwork, LogisticNetworkData, LogisticDepot, LogisticDepotData, LogisticOperation, LogisticOperationData, LogisticAction, LogisticActionData, LogisticTransaction, LogisticTransactionData } from "@store/index.sol";

import { LogisticActionType, LogisticTransactionType } from "@store/common.sol";
import { LogisticSystem } from "@systems/LogisticSystem.sol";

import { Derivations, Fetches } from "@systems/Utils.sol";

import { ProofArgs } from "@systems/LogisticClearance/types.sol";

contract LogisticOperationSystem is LogisticSystem {
  using Derivations for uint256;
  using Fetches for uint256;

  function createLogisticOperation(
    ProofArgs memory proof,
    string memory codename,
    address coordinator,
    uint256 networkId
  ) public onlyCoordinator(proof) returns (uint256) {
    uint256 timestamp = block.timestamp;
    LogisticOperationData memory operation = LogisticOperationData({
      timestamp: timestamp,
      codename: codename,
      coordinator: coordinator,
      networkId: networkId
    });

    uint256 id = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, codename)));

    LogisticOperation.set(id, operation);
    return id;
  }

  function deleteLogisticOperation(ProofArgs memory proof, uint256 operationId) public onlyCoordinator(proof) {
    LogisticOperation.deleteRecord(operationId);
  }

  function transferOperationalControl(
    ProofArgs memory proof,
    uint256 operationId,
    address newCoordinatorId
  ) public onlyCoordinator(proof) {
    LogisticOperation.setCoordinator(operationId, newCoordinatorId);
  }
}
