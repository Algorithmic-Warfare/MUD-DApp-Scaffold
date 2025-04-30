//SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import { SmartAssemblyTable, EntityRecordTable, EntityRecordTableData } from "@eveworld/world/src/codegen/index.sol";
import { SmartAssemblyType } from "@eveworld/world/src/codegen/common.sol";
import { IBaseWorld } from "@latticexyz/world/src/codegen/interfaces/IBaseWorld.sol";
import { IERC721 } from "@eveworld/world/src/modules/eve-erc721-puppet/IERC721.sol";
import { ERC721Registry } from "@eveworld/world/src/codegen/tables/ERC721Registry.sol";
import { ERC721_REGISTRY_TABLE_ID } from "@eveworld/world/src/modules/eve-erc721-puppet/constants.sol";

import { DeployableTokenTable } from "@eveworld/world/src/codegen/tables/DeployableTokenTable.sol";
import { ResourceId } from "@latticexyz/store/src/ResourceId.sol";
import { WorldResourceIdLib } from "@latticexyz/world/src/WorldResourceId.sol";
import { RESOURCE_SYSTEM } from "@latticexyz/world/src/worldResourceTypes.sol";
import { ResourceIds } from "@latticexyz/store/src/codegen/tables/ResourceIds.sol";
import { ProofArgs } from "@systems/LogisticClearance/types.sol";

import { LogisticNetwork, LogisticNetworkData, LogisticDepot, LogisticDepotData, LogisticOperation, LogisticOperationData, LogisticAction, LogisticActionData, LogisticTransaction, LogisticTransactionData } from "@store/index.sol";
import { IClearanceVerifierSystem } from "@world/IClearanceVerifierSystem.sol";
import { CLEARANCE_VERIFIER_SYSTEM_NAME } from "./constants.sol";
import { MINEHAUL_SYSTEM_NAME, MINEHAUL_DEPLOYMENT_NAMESPACE } from "@systems/constants.sol";
import { Utils } from "./Utils.sol";

library ClearanceLib {
  using Utils for bytes14;

  struct World {
    IBaseWorld iface;
    bytes14 namespace;
  }

  // @dev do not use this function
  function verifyClearance(World memory world, ProofArgs memory proof) internal returns (bool) {
    return true;
    // return
    //   abi.decode(
    //     world.iface.call(
    //       world.namespace.clearanceVerifierSystemId(),
    //       abi.encodeCall(IClearanceVerifierSystem.AWAR__verifyClearance, (proof))
    //     ),
    //     (bool)
    //   );
  }
}
