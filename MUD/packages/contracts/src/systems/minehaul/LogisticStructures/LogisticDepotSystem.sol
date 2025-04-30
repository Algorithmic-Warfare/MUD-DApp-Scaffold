// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { RESOURCE_SYSTEM } from "@latticexyz/world/src/worldResourceTypes.sol";
import { ResourceId } from "@latticexyz/world/src/WorldResourceId.sol";
import { ResourceIds } from "@latticexyz/store/src/codegen/tables/ResourceIds.sol";
import { WorldResourceIdLib } from "@latticexyz/world/src/WorldResourceId.sol";
import { IBaseWorld } from "@latticexyz/world/src/codegen/interfaces/IBaseWorld.sol";
import { IWorldWithEntryContext } from "@eveworld/world/src/IWorldWithEntryContext.sol";
import { Systems } from "@latticexyz/world/src/codegen/tables/Systems.sol";
import { AccessRolePerObject } from "@eveworld/world/src/codegen/tables/AccessRolePerObject.sol";
import { AccessEnforcePerObject } from "@eveworld/world/src/codegen/tables/AccessEnforcePerObject.sol";

// import { INVENTORY_DEPLOYMENT_NAMESPACE } from "@eveworld/common-constants/src/constants.sol";
import { FRONTIER_WORLD_DEPLOYMENT_NAMESPACE } from "@eveworld/common-constants/src/constants.sol";
import { InventoryLib } from "@eveworld/world/src/modules/inventory/InventoryLib.sol";

import { LogisticProvider, LogisticNetwork, LogisticNetworkData, LogisticDepot, LogisticDepotData, LogisticCoordinator, LogisticCoordinatorData, LogisticAgent, LogisticAgentData, LogisticOperation, LogisticOperationData, LogisticAction, LogisticActionData, LogisticTransaction, LogisticTransactionData } from "@store/index.sol";

import { LogisticActionType, LogisticTransactionType } from "@store/common.sol";

import { StructureErrors } from "@systems/LogisticStructures/errors.sol";
import { NOT_AN_SSU_OWNER, NOT_A_PROVIDER_FOR_ALL_NETOWRKS } from "@systems/LogisticStructures/errors.sol";

import { MINEHAUL_DEPLOYMENT_NAMESPACE, LOGISTIC_TRANSACTION_SYSTEM_NAME } from "@systems/constants.sol";
import { Derivations, Fetches } from "@systems/Utils.sol";

import { LogisticSystem } from "@systems/LogisticSystem.sol";

contract LogisticDepotSystem is LogisticSystem {
  using Derivations for uint256;
  using Fetches for uint256;
  using InventoryLib for InventoryLib.World;

  modifier onlyOwnedSmartStorageUnit(uint256 smartStorageUnitId) {
    if (smartStorageUnitId.smartCharacterAddressFromSmartStorageUnitId() != _msgSender()) {
      revert StructureErrors.DEPOT_DoesNotOwnSmartStorageUnit(NOT_AN_SSU_OWNER);
    }
    _;
  }

  function createLogisticDepot(
    uint256 providerId,
    string memory codename,
    uint256 smartStorageUnitId
  ) public onlyProvider(providerId) onlyOwnedSmartStorageUnit(smartStorageUnitId) returns (uint256) {
    uint256 timestamp = block.timestamp;
    LogisticDepotData memory depot = LogisticDepotData({
      timestamp: timestamp,
      providerId: providerId,
      codename: codename,
      smartStorageUnitId: smartStorageUnitId
    });

    uint256 id = uint256(
      keccak256(abi.encodePacked(block.timestamp, block.prevrandao, providerId, codename, smartStorageUnitId))
    );

    LogisticDepot.set(id, depot);
    return id;
  }

  function editDepotCodename(
    uint256 depotId,
    string memory newCodename
  ) public onlyProvider(depotId.providerIdFromDepotId()) {
    LogisticDepot.setCodename(depotId, newCodename);
  }

  function deleteLogisticDepot(uint256 depotId) public onlyProvider(LogisticDepot.getProviderId(depotId)) {
    LogisticDepot.deleteRecord(depotId);
  }
}
