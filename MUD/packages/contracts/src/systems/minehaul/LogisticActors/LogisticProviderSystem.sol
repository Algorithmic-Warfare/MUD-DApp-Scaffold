// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { System } from "@latticexyz/world/src/System.sol";

import { LogisticProvider, LogisticProviderData, LogisticNetwork, LogisticNetworkData, LogisticDepot, LogisticDepotData, LogisticCoordinator, LogisticCoordinatorData, LogisticAgent, LogisticAgentData, LogisticOperation, LogisticOperationData, LogisticTarget, LogisticTargetData, LogisticConstraint, LogisticConstraintData, LogisticAction, LogisticActionData, LogisticTransaction, LogisticTransactionData } from "@store/index.sol";

import { LogisticActionType, LogisticTransactionType, LogisticDepotType, LogisticConstraintType } from "@store/common.sol";
import { LogisticSystem } from "@systems/LogisticSystem.sol";

import { Derivations, Fetches } from "@systems/Utils.sol";

contract LogisticProviderSystem is LogisticSystem {
  using Derivations for uint256;
  using Fetches for uint256;

  function createLogisticProvider(
    address smartCharacterAddress
  ) public onlySelf(smartCharacterAddress) returns (uint256) {
    uint256 timestamp = block.timestamp;
    uint256 id = uint256(uint160(smartCharacterAddress));

    LogisticProviderData memory provider = LogisticProviderData({
      timestamp: timestamp,
      smartCharacterAddress: smartCharacterAddress
    });

    LogisticProvider.set(id, provider);

    return id;
  }

  // NOTE Anyone can be a provider as long as they own an SSU, they can use the system. No need to remove anyone.
  function deleteLogisticProvider(uint256 providerId) public onlyProvider(providerId) {
    LogisticProvider.deleteRecord(providerId);
  }
}
