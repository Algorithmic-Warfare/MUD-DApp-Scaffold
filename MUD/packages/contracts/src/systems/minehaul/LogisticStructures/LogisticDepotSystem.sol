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

import { LogisticNetwork, LogisticNetworkData, LogisticDepot, LogisticDepotData, LogisticOperation, LogisticOperationData, LogisticAction, LogisticActionData, LogisticTransaction, LogisticTransactionData } from "@store/index.sol";

import { LogisticActionType, LogisticTransactionType } from "@store/common.sol";

import { StructureErrors } from "@systems/LogisticStructures/errors.sol";
import { NOT_AN_SSU_OWNER, NOT_A_PROVIDER_FOR_ALL_NETOWRKS } from "@systems/LogisticStructures/errors.sol";

import { Derivations, Fetches } from "@systems/Utils.sol";

import { LogisticSystem } from "@systems/LogisticSystem.sol";
import { ProofArgs } from "@systems/LogisticClearance/types.sol";

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
    ProofArgs memory proof,
    uint256 smartStorageUnitId
  ) public onlyOwnedSmartStorageUnit(smartStorageUnitId) onlyProvider(proof) returns (uint256) {
    uint256 timestamp = block.timestamp;
    uint256[] memory networkIds = new uint256[](0);
    LogisticDepotData memory depot = LogisticDepotData({
      timestamp: timestamp,
      smartStorageUnitId: smartStorageUnitId,
      networkIds: networkIds
    });

    uint256 id = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, smartStorageUnitId)));

    // NOTE for some reason this is unecessary. Investigate further.
    // __updateInventoryAccessList(smartStorageUnitId);

    LogisticDepot.set(id, depot);
    return id;
  }

  function deleteLogisticDepot(
    ProofArgs memory proof,
    uint256 depotId
  ) public onlyOwnedSmartStorageUnit(depotId.smartStorageUnitIdFromDepotId()) onlyProvider(proof) {
    LogisticDepot.deleteRecord(depotId);
  }

  function addDepotNetwork(
    ProofArgs memory proof,
    uint256 depotId,
    uint256 networkId
  ) public onlyProvider(proof) onlyOwnedSmartStorageUnit(depotId.smartStorageUnitIdFromDepotId()) {
    uint256[] memory currentNetworks = LogisticDepot.getNetworkIds(depotId);
    uint256[] memory newNetworks = new uint256[](currentNetworks.length + 1);
    for (uint i = 0; i < currentNetworks.length; i++) {
      newNetworks[i] = currentNetworks[i];
    }
    newNetworks[currentNetworks.length] = networkId;
    LogisticDepot.setNetworkIds(depotId, newNetworks);
  }

  function removeDepotNetwork(
    ProofArgs memory proof,
    uint256 depotId,
    uint256 networkId
  ) public onlyProvider(proof) onlyOwnedSmartStorageUnit(depotId.smartStorageUnitIdFromDepotId()) {
    uint256[] memory currentNetworks = LogisticDepot.getNetworkIds(depotId);
    uint256[] memory newNetworks = new uint256[](currentNetworks.length - 1);
    uint newIndex = 0;
    for (uint i = 0; i < currentNetworks.length; i++) {
      if (currentNetworks[i] != networkId) {
        newNetworks[newIndex] = currentNetworks[i];
        newIndex++;
      }
    }
    LogisticDepot.setNetworkIds(depotId, newNetworks);
  }
}
