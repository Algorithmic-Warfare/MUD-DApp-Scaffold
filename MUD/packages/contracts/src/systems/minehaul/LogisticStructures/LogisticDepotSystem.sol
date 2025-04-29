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

import { LogisticProvider, LogisticNetwork, LogisticNetworkData, LogisticDepot, LogisticDepotData, LogisticCoordinator, LogisticCoordinatorData, LogisticAgent, LogisticAgentData, LogisticOperation, LogisticOperationData, LogisticTarget, LogisticTargetData, LogisticConstraint, LogisticConstraintData, LogisticAction, LogisticActionData, LogisticTransaction, LogisticTransactionData } from "@store/index.sol";

import { LogisticActionType, LogisticTransactionType, LogisticDepotType, LogisticConstraintType } from "@store/common.sol";

import { StructureErrors } from "@systems/LogisticStructures/errors.sol";
import { NOT_AN_SSU_OWNER, NOT_A_PROVIDER_FOR_ALL_NETOWRKS } from "@systems/LogisticStructures/errors.sol";

import { MINEHAUL_DEPLOYMENT_NAMESPACE, LOGISTIC_TRANSACTION_SYSTEM_NAME } from "@systems/constants.sol";
import { Derivations, Fetches } from "@systems/Utils.sol";

import { LogisticSystem } from "@systems/LogisticSystem.sol";

contract LogisticDepotSystem is LogisticSystem {
  using Derivations for uint256;
  using Fetches for uint256;
  using InventoryLib for InventoryLib.World;

  modifier onlyProviderForAllNetworks(uint256[] memory networkIds) {
    bool isProviderForAllNetworks = true;

    for (uint256 i = 0; i < networkIds.length; i++) {
      isProviderForAllNetworks =
        isProviderForAllNetworks &&
        (LogisticProvider.getSmartCharacterAddress(networkIds[i].providerIdFromNetworkId()) == _msgSender());
    }

    if (!isProviderForAllNetworks) {
      revert StructureErrors.DEPOT_DoesNotProvideForAllNetworks(NOT_A_PROVIDER_FOR_ALL_NETOWRKS);
    }
    _;
  }

  modifier onlyOwnedSmartStorageUnit(uint256 smartStorageUnitId) {
    if (smartStorageUnitId.smartCharacterAddressFromSmartStorageUnitId() != _msgSender()) {
      revert StructureErrors.DEPOT_DoesNotOwnSmartStorageUnit(NOT_AN_SSU_OWNER);
    }
    _;
  }

  function createLogisticDepot(
    uint256 smartStorageUnitId,
    LogisticDepotType depotType,
    uint256[] memory networkIds
  ) public onlyOwnedSmartStorageUnit(smartStorageUnitId) onlyProviderForAllNetworks(networkIds) returns (uint256) {
    uint256 timestamp = block.timestamp;
    LogisticDepotData memory depot = LogisticDepotData({
      timestamp: timestamp,
      smartStorageUnitId: smartStorageUnitId,
      depotType: depotType,
      networkIds: networkIds
    });

    uint256 id = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, smartStorageUnitId)));

    // NOTE for some reason this is unecessary. Investigate further.
    // __updateInventoryAccessList(smartStorageUnitId);

    LogisticDepot.set(id, depot);
    return id;
  }

  function deleteLogisticDepot(
    uint256 depotId
  ) public onlyOwnedSmartStorageUnit(depotId.smartStorageUnitIdFromDepotId()) {
    LogisticDepot.deleteRecord(depotId);
  }

  function editDepotType(
    uint256 depotId,
    LogisticDepotType newDepotType
  ) public onlyOwnedSmartStorageUnit(depotId.smartStorageUnitIdFromDepotId()) {
    LogisticDepot.setDepotType(depotId, newDepotType);
  }

  function addDepotNetwork(
    uint256 depotId,
    uint256 networkId
  )
    public
    onlyProvider(networkId.providerIdFromNetworkId())
    onlyOwnedSmartStorageUnit(depotId.smartStorageUnitIdFromDepotId())
  {
    uint256[] memory currentNetworks = LogisticDepot.getNetworkIds(depotId);
    uint256[] memory newNetworks = new uint256[](currentNetworks.length + 1);
    for (uint i = 0; i < currentNetworks.length; i++) {
      newNetworks[i] = currentNetworks[i];
    }
    newNetworks[currentNetworks.length] = networkId;
    LogisticDepot.setNetworkIds(depotId, newNetworks);
  }

  function removeDepotNetwork(
    uint256 depotId,
    uint256 networkId
  )
    public
    onlyProvider(networkId.providerIdFromNetworkId())
    onlyOwnedSmartStorageUnit(depotId.smartStorageUnitIdFromDepotId())
  {
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

  // function __updateInventoryAccessList(uint256 smartStorageUnitId) private {
  //   address[] memory oldAccessList = AccessRolePerObject.get(smartStorageUnitId, APPROVED);
  //   address[] memory newAccessList = new address[](oldAccessList.length + 1);

  //   for (uint256 i = 0; i < oldAccessList.length; i++) {
  //     newAccessList[i] = oldAccessList[i];
  //   }

  //   ResourceId LOGISTIC_TRANSACTION_SYSTEM_ID = ResourceId.wrap(
  //     (uint256(abi.encodePacked(RESOURCE_SYSTEM, MINEHAUL_DEPLOYMENT_NAMESPACE, LOGISTIC_TRANSACTION_SYSTEM_NAME)))
  //   );

  //   address logisticTransactionSystemAddress = Systems.getSystem(LOGISTIC_TRANSACTION_SYSTEM_ID);

  //   newAccessList[oldAccessList.length] = logisticTransactionSystemAddress;
  //   _inventoryLib().setApprovedAccessList(smartStorageUnitId, newAccessList);
  // }

  // function _inventoryLib() internal view returns (InventoryLib.World memory) {
  //   if (!ResourceIds.getExists(WorldResourceIdLib.encodeNamespace(FRONTIER_WORLD_DEPLOYMENT_NAMESPACE))) {
  //     return
  //       InventoryLib.World({ iface: IWorldWithEntryContext(_world()), namespace: FRONTIER_WORLD_DEPLOYMENT_NAMESPACE });
  //   } else
  //     return
  //       InventoryLib.World({ iface: IWorldWithEntryContext(_world()), namespace: FRONTIER_WORLD_DEPLOYMENT_NAMESPACE });
  // }
}
