// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { RESOURCE_SYSTEM } from "@latticexyz/world/src/worldResourceTypes.sol";
import { ResourceId } from "@latticexyz/world/src/WorldResourceId.sol";
import { ResourceIds } from "@latticexyz/store/src/codegen/tables/ResourceIds.sol";
import { WorldResourceIdLib } from "@latticexyz/world/src/WorldResourceId.sol";
import { IBaseWorld } from "@latticexyz/world/src/codegen/interfaces/IBaseWorld.sol";
import { IWorldWithEntryContext } from "@eveworld/world/src/IWorldWithEntryContext.sol";
import { Systems } from "@latticexyz/world/src/codegen/tables/Systems.sol";

import { LogisticProvider, LogisticProviderData, LogisticNetwork, LogisticNetworkData, LogisticDepot, LogisticDepotData, LogisticFixture, LogisticFixtureData, LogisticCoordinator, LogisticCoordinatorData, LogisticAgent, LogisticAgentData, LogisticOperation, LogisticOperationData, LogisticAction, LogisticActionData, LogisticTransaction, LogisticTransactionData } from "@store/index.sol";

import { LogisticActionType, LogisticFixtureType, LogisticTransactionType } from "@store/common.sol";

import { Derivations, Fetches } from "@systems/Utils.sol";

import { LogisticSystem } from "@systems/LogisticSystem.sol";

contract LogisticFixtureSystem is LogisticSystem {
  using Derivations for uint256;
  using Fetches for uint256;

  function createLogisticFixture(
    uint256 providerId,
    string memory codename,
    LogisticFixtureType fixtureType
  ) public onlyProvider(providerId) returns (uint256) {
    uint256 timestamp = block.timestamp;
    LogisticFixtureData memory fixture = LogisticFixtureData({
      timestamp: timestamp,
      providerId: providerId,
      codename: codename,
      fixtureType: fixtureType
    });

    uint256 id = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, providerId, codename)));

    LogisticFixture.set(id, fixture);
    return id;
  }

  function editFixtureCodename(
    uint256 fixtureId,
    string memory newCodename
  ) public onlyProvider(fixtureId.providerIdFromFixtureId()) {
    LogisticFixture.setCodename(fixtureId, newCodename);
  }

  function deleteLogisticFixture(uint256 fixtureId) public onlyProvider(LogisticFixture.getProviderId(fixtureId)) {
    LogisticFixture.deleteRecord(fixtureId);
  }
}
