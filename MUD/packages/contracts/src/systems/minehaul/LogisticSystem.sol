// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { System } from "@latticexyz/world/src/System.sol";
import { IBaseWorld } from "@latticexyz/world/src/codegen/interfaces/IBaseWorld.sol";
import { LogisticNetwork, LogisticNetworkData, LogisticDepot, LogisticDepotData, LogisticOperation, LogisticOperationData, LogisticAction, LogisticActionData, LogisticTransaction, LogisticTransactionData } from "@store/index.sol";

import { LogisticActionType, LogisticTransactionType } from "@store/common.sol";

import { StructureErrors } from "@systems/LogisticStructures/errors.sol";
import { NOT_AN_SSU_OWNER, NOT_A_PROVIDER_FOR_ALL_NETOWRKS, NOT_A_REGISTERED_PROVIDER } from "@systems/LogisticStructures/errors.sol";
import { WorldResourceIdLib } from "@latticexyz/world/src/WorldResourceId.sol";
import { RESOURCE_SYSTEM } from "@latticexyz/world/src/worldResourceTypes.sol";
import { ResourceIds } from "@latticexyz/store/src/codegen/tables/ResourceIds.sol";
import { ProofArgs } from "@systems/LogisticClearance/types.sol";

import { LogisticNetwork, LogisticNetworkData, LogisticDepot, LogisticDepotData, LogisticOperation, LogisticOperationData, LogisticAction, LogisticActionData, LogisticTransaction, LogisticTransactionData } from "@store/index.sol";
import { MINEHAUL_SYSTEM_NAME, MINEHAUL_DEPLOYMENT_NAMESPACE } from "./constants.sol";

import { Derivations, Fetches } from "@systems/Utils.sol";

import { ClearanceLib } from "@systems/LogisticClearance/ClearanceLib.sol";
import { ProofArgs } from "@systems/LogisticClearance/types.sol";
import { MINEHAUL_DEPLOYMENT_NAMESPACE } from "./constants.sol";

contract LogisticSystem is System {
  using ClearanceLib for ClearanceLib.World;
  ClearanceLib.World private clearance;
  // TODO proof-based access control

  modifier onlyProvider(ProofArgs memory proof) {
    clearance = ClearanceLib.World({ iface: IBaseWorld(_world()), namespace: MINEHAUL_DEPLOYMENT_NAMESPACE });
    bool valid = clearance.verifyClearance(proof); // bool valid = abi.decode(
    //   world.iface.call(
    //     WorldResourceIdLib.encode({
    //       typeId: RESOURCE_SYSTEM,
    //       namespace: MINEHAUL_DEPLOYMENT_NAMESPACE,
    //       name: CLEARANCE_VERIFIER_SYSTEM_NAME
    //     }),
    //     abi.encodeCall(IClearanceVerifierSystem.AWAR__verifyClearance, (proof))
    //   ),
    //   (bool)
    // );
    require(valid, "Invalid clearance proof");
    _;
  }

  modifier onlyCoordinator(ProofArgs memory proof) {
    _;
  }

  modifier onlyAgent(ProofArgs memory proof) {
    _;
  }
}
