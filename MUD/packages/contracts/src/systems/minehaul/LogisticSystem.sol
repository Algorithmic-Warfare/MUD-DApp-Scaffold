// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { System } from "@latticexyz/world/src/System.sol";

import { LogisticProvider, LogisticNetwork, LogisticNetworkData, LogisticDepot, LogisticDepotData, LogisticCoordinator, LogisticCoordinatorData, LogisticAgent, LogisticAgentData, LogisticOperation, LogisticOperationData, LogisticTarget, LogisticTargetData, LogisticConstraint, LogisticConstraintData, LogisticAction, LogisticActionData, LogisticTransaction, LogisticTransactionData } from "@store/index.sol";

import { LogisticActionType, LogisticTransactionType, LogisticDepotType, LogisticConstraintType } from "@store/common.sol";

import { ActorErrors } from "./LogisticActors/errors.sol";
import { UNREGISTERED_PROVIDER, UNREGISTERED_COORDINATOR, UNREGISTERED_AGENT } from "./LogisticActors/errors.sol";

import { StructureErrors } from "@systems/LogisticStructures/errors.sol";
import { NOT_AN_SSU_OWNER, NOT_A_PROVIDER_FOR_ALL_NETOWRKS, NOT_A_REGISTERED_PROVIDER } from "@systems/LogisticStructures/errors.sol";

import { Derivations, Fetches } from "@systems/Utils.sol";

contract LogisticSystem is System {
  using Derivations for uint256;
  using Fetches for uint256;

  // TODO all of the access control here just goes away.

  modifier onlySelf(address inputAddress) {
    require(inputAddress == _msgSender(), "Caller cannot use an address other than his own.");
    _;
  }

  modifier onlyProvider(uint256 providerId) {
    address providerAddress = LogisticProvider.getSmartCharacterAddress(providerId);
    if (providerAddress == address(0) || providerAddress != _msgSender()) {
      revert ActorErrors.PROVIDER_InvalidProvider(UNREGISTERED_PROVIDER);
    }
    _;
  }

  modifier onlyCoordinator(uint256 coordinatorId) {
    address coordinatorAddress = LogisticCoordinator.getSmartCharacterAddress(coordinatorId);
    if (coordinatorAddress == address(0) || coordinatorAddress != _msgSender()) {
      revert ActorErrors.COORDINATOR_InvalidCoordinator(UNREGISTERED_COORDINATOR);
    }
    _;
  }

  modifier coordinatorsExist(uint256[] memory coordinatorIds) {
    for (uint256 i = 0; i < coordinatorIds.length; i++) {
      uint256 coordinatorId = coordinatorIds[i];
      address coordinatorAddress = LogisticCoordinator.getSmartCharacterAddress(coordinatorId);
      if (coordinatorAddress == address(0)) {
        revert ActorErrors.COORDINATOR_InvalidCoordinator(UNREGISTERED_COORDINATOR);
      }
    }
    _;
  }

  modifier onlyAgent(uint256 agentId) {
    address agentAddress = LogisticAgent.getSmartCharacterAddress(agentId);
    if (agentAddress == address(0) || agentAddress != _msgSender()) {
      revert ActorErrors.AGENT_InvalidAgent(UNREGISTERED_AGENT);
    }
    _;
  }

  modifier agentsExist(uint256[] memory agentIds) {
    for (uint256 i = 0; i < agentIds.length; i++) {
      uint256 agentId = agentIds[i];
      address agentAddress = LogisticAgent.getSmartCharacterAddress(agentId);
      if (agentAddress == address(0)) {
        revert ActorErrors.AGENT_InvalidAgent(UNREGISTERED_AGENT);
      }
    }
    _;
  }
}
