// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { System } from "@latticexyz/world/src/System.sol";

import { LogisticNetwork, LogisticNetworkData, LogisticDepot, LogisticDepotData, LogisticOperation, LogisticOperationData, LogisticAction, LogisticActionData, LogisticTransaction, LogisticTransactionData } from "@store/index.sol";

import { LogisticActionType, LogisticTransactionType } from "@store/common.sol";

import { StructureErrors } from "@systems/LogisticStructures/errors.sol";
import { NOT_AN_SSU_OWNER, NOT_A_PROVIDER_FOR_ALL_NETOWRKS, NOT_A_REGISTERED_PROVIDER } from "@systems/LogisticStructures/errors.sol";

import { Derivations, Fetches } from "@systems/Utils.sol";

import { ClearanceVerifier } from "./Verifier.sol";
import { ProofArgs } from "@systems/types.sol";

contract LogisticSystem is System, ClearanceVerifier {
  using Derivations for uint256;
  using Fetches for uint256;

  // TODO all of the access control here just goes away.

  modifier onlyProvider(ProofArgs memory proof) {
    this.verifyClearance(proof);
    _;
  }

  modifier onlyCoordinator(ProofArgs memory proof) {
    this.verifyClearance(proof);
    _;
  }

  modifier onlyAgent(ProofArgs memory proof) {
    this.verifyClearance(proof);
    _;
  }
}
