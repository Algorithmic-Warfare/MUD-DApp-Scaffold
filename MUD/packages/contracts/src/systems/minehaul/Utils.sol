//SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import { SmartAssemblyTable, EntityRecordTable, EntityRecordTableData } from "@eveworld/world/src/codegen/index.sol";
import { SmartAssemblyType } from "@eveworld/world/src/codegen/common.sol";

import { IERC721 } from "@eveworld/world/src/modules/eve-erc721-puppet/IERC721.sol";
import { ERC721Registry } from "@eveworld/world/src/codegen/tables/ERC721Registry.sol";
import { ERC721_REGISTRY_TABLE_ID } from "@eveworld/world/src/modules/eve-erc721-puppet/constants.sol";

import { DeployableTokenTable } from "@eveworld/world/src/codegen/tables/DeployableTokenTable.sol";
import { ResourceId } from "@latticexyz/store/src/ResourceId.sol";
import { WorldResourceIdLib } from "@latticexyz/world/src/WorldResourceId.sol";
import { RESOURCE_SYSTEM } from "@latticexyz/world/src/worldResourceTypes.sol";
import { ResourceIds } from "@latticexyz/store/src/codegen/tables/ResourceIds.sol";

import { LogisticProvider, LogisticProviderData, LogisticNetwork, LogisticFixture, LogisticNetworkData, LogisticFixture, LogisticFixtureData, LogisticDepot, LogisticDepotData, LogisticCoordinator, LogisticCoordinatorData, LogisticAgent, LogisticAgentData, LogisticOperation, LogisticOperationData, LogisticAction, LogisticActionData, LogisticTransaction, LogisticTransactionData } from "@store/index.sol";

import { LogisticActionType, LogisticFixtureType, LogisticTransactionType } from "@store/common.sol";

import { MINEHAUL_SYSTEM_NAME, MINEHAUL_DEPLOYMENT_NAMESPACE } from "./constants.sol";

library Utils {
  function minehaulSystemId() internal pure returns (ResourceId) {
    return
      WorldResourceIdLib.encode({
        typeId: RESOURCE_SYSTEM,
        namespace: MINEHAUL_DEPLOYMENT_NAMESPACE,
        name: MINEHAUL_SYSTEM_NAME
      });
  }
}

library Derivations {
  function providerIdFromNetworkId(uint256 networkId) internal view returns (uint256) {
    uint256 providerId = LogisticNetwork.getProviderId(networkId);
    return providerId;
  }

  function providerIdFromDepotId(uint256 depotId) internal view returns (uint256) {
    uint256 providerId = LogisticDepot.getProviderId(depotId);
    return providerId;
  }

  function providerIdFromFixtureId(uint256 fixtureId) internal view returns (uint256) {
    uint256 providerId = LogisticFixture.getProviderId(fixtureId);
    return providerId;
  }

  function providerIdFromCoordinatorId(uint256 coordinatorId) internal view returns (uint256) {
    uint256 networkId = LogisticCoordinator.getNetworkId(coordinatorId);
    uint256 providerId = providerIdFromNetworkId(networkId);
    return providerId;
  }

  function networkIdFromOperationId(uint256 operationId) internal view returns (uint256) {
    uint256 coordinatorId = LogisticOperation.getCoordinatorId(operationId);
    uint256 networkId = LogisticCoordinator.getNetworkId(coordinatorId);
    return networkId;
  }

  function coordinatorIdFromOperationId(uint256 operationId) internal view returns (uint256) {
    uint256 coordinatorId = LogisticOperation.getCoordinatorId(operationId);
    return coordinatorId;
  }

  function coordinatorIdFromAgentId(uint256 agentId) internal view returns (uint256) {
    uint256 operationId = LogisticAgent.getOperationId(agentId);
    uint256 coordinatorId = LogisticOperation.getCoordinatorId(operationId);
    return coordinatorId;
  }

  function coordinatorIdFromActionId(uint256 actionId) internal view returns (uint256) {
    uint256 operationId = LogisticAction.getOperationId(actionId);
    uint256 coordinatorId = coordinatorIdFromOperationId(operationId);
    return coordinatorId;
  }

  function actionIdFromTransactionId(uint256 transactionId) internal view returns (uint256) {
    uint256 actionId = LogisticTransaction.getActionId(transactionId);
    return actionId;
  }

  function agentIdFromTransactionId(uint256 transactionId) internal view returns (uint256) {
    uint256 agentId = LogisticTransaction.getAgentId(transactionId);
    return agentId;
  }

  function smartStorageUnitIdFromDepotId(uint256 depotId) internal view returns (uint256) {
    uint256 smartStorageUnitId = LogisticDepot.getSmartStorageUnitId(depotId);
    return smartStorageUnitId;
  }
}

library Fetches {
  function smartCharacterAddressFromSmartStorageUnitId(uint256 smartStorageUnitId) internal returns (address) {
    bytes14 SMART_DEPLOYABLE_ERC721_NAMESPACE = "erc721deploybl";
    IERC721 erc721DeployableToken = IERC721(
      ERC721Registry.get(
        ERC721_REGISTRY_TABLE_ID,
        WorldResourceIdLib.encodeNamespace(SMART_DEPLOYABLE_ERC721_NAMESPACE)
      )
    );
    address smartCharacterAddress = erc721DeployableToken.ownerOf(smartStorageUnitId);
    return smartCharacterAddress;
  }

  function isASmartStorageUnit(uint256 smartStorageUnitId) internal view returns (bool) {
    SmartAssemblyType smartAssemblyType = SmartAssemblyTable.getSmartAssemblyType(smartStorageUnitId);

    if (smartAssemblyType == SmartAssemblyType.SMART_STORAGE_UNIT) {
      return true;
    }

    return false;
  }

  function itemExists(uint256 itemId) internal view returns (bool) {
    EntityRecordTableData memory itemRecord = EntityRecordTable.get(itemId);
    if (itemRecord.recordExists) {
      return true;
    }
    return false;
  }

  function isDepot(uint256 depotId) internal view returns (bool) {
    LogisticDepotData memory depot = LogisticDepot.get(depotId);

    if (depot.providerId != uint256(0)) {
      return true;
    }

    return false;
  }

  function isFixture(uint256 fixtureId) internal view returns (bool) {
    LogisticFixtureData memory fixture = LogisticFixture.get(fixtureId);

    if (fixture.providerId != uint256(0)) {
      return true;
    }

    return false;
  }

  function isFaucet(uint256 fixtureId) internal view returns (bool) {
    LogisticFixtureData memory fixture = LogisticFixture.get(fixtureId);

    if (isFixture(fixtureId) && fixture.fixtureType == LogisticFixtureType.FAUCET) {
      return true;
    }

    return false;
  }

  function isSink(uint256 fixtureId) internal view returns (bool) {
    LogisticFixtureData memory fixture = LogisticFixture.get(fixtureId);

    if (isFixture(fixtureId) && fixture.fixtureType == LogisticFixtureType.SINK) {
      return true;
    }

    return false;
  }
}
