// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;


import { System } from "@latticexyz/world/src/System.sol";
import { Dispenser, DispenserData,
    DispenserConfig, DispenserConfigData,
    InventoryItemQ, InventoryItemQData,
    DispenserAccess, DispenserTribeAccess,
    DispenserAdminAccess, DispenserTribeAdminAccess } from "@store/index.sol";
import { InventoryItemParams } from "@eveworld/world-v2/src/namespaces/evefrontier/systems/inventory/types.sol";
import { Characters } from "@eveworld/world-v2/src/namespaces/evefrontier/codegen/tables/Characters.sol";
import { CharactersByAccount } from "@eveworld/world-v2/src/namespaces/evefrontier/codegen/tables/CharactersByAccount.sol";
import { ephemeralInteractSystem } from "@eveworld/world-v2/src/namespaces/evefrontier/codegen/systems/EphemeralInteractSystemLib.sol";
import { inventoryInteractSystem } from "@eveworld/world-v2/src/namespaces/evefrontier/codegen/systems/InventoryInteractSystemLib.sol";
import { storageSystem } from "@store/systems/StorageSystemLib.sol";

contract DispenserSystem is System {
    function initDispenser(uint256 ssuId) public {
        ephemeralInteractSystem.setTransferToEphemeralAccess( ssuId, address(this), true );
        ephemeralInteractSystem.setTransferFromEphemeralAccess( ssuId, address(this), true );
        ephemeralInteractSystem.setCrossTransferToEphemeralAccess( ssuId, address(this), true );
        inventoryInteractSystem.setTransferToInventoryAccess( ssuId, address(this), true );
        storageSystem.initStorage(ssuId);
    }
    
    function requestDispensation(
        address playerID,
        uint256 dispenserID
    ) public access(msg.sender, dispenserID) {
        // Check if the player has already collected from this dispenser
        DispenserConfigData memory dispenserConfigData = DispenserConfig.get(dispenserID);
        DispenserData memory dispenserData = Dispenser.get(playerID, dispenserID);
        if (!dispenserConfigData.repeatable) {
            require(!dispenserData.collected, "Item already collected");
        }
        require(dispenserConfigData.stackIds.length > 0, "No items available for dispensation");
        // prepare the params for the transfer
        InventoryItemParams[] memory items = StackIdsToItemParams(dispenserConfigData.stackIds);
        // transfer the items to the player
        // Call the EphemeralInteractSystem to transfer items to the player
        ephemeralInteractSystem.transferToEphemeral(dispenserID, playerID, items);
        // Mark the item as collected
        DispenserData memory data = DispenserData({collected: true, timestamp: block.timestamp});
        Dispenser.set(playerID, dispenserID, data );
    }
    function configureDispenser(
        uint256 dispenserID,
        bool repeatable,
        uint256[] memory stackIds
    ) public adminAccess(msg.sender) {
        DispenserConfig.set(dispenserID,repeatable, stackIds);
    }
    function addStacksToDispenser(
        uint256 dispenserID,
        uint256[] memory stackIds
    ) public adminAccess(msg.sender) {
        require(stackIds.length > 0, "No stack IDs provided");
        // Check if dispenser has config by getting the first item stack id; it reverts with _index out of bounds which stops execution if no config is present
        DispenserConfig.getItemStackIds(dispenserID,0);
        for (uint256 i=0 ; i < stackIds.length; i++) {
            DispenserConfig.pushStackIds(dispenserID, stackIds[i]);
        }
    }
    function itemParamsToStackIds(
        InventoryItemParams[] memory items
    ) public returns (uint256[] memory) {
        uint256[] memory stackIds = new uint256[](items.length);
        for (uint256 i = 0; i < items.length; i++) {
            stackIds[i] = uint256(keccak256(abi.encodePacked(items[i].smartObjectId, items[i].quantity)));
            InventoryItemQData memory itemData = InventoryItemQ.get(stackIds[i]);
            if (itemData.itemId == 0) {
                // If the item does not exist, create a new entry
                InventoryItemQ.set(stackIds[i], items[i].smartObjectId, items[i].quantity);
            }
        }
        return stackIds;
    }
    function StackIdsToItemParams(
        uint256[] memory stackIds
    ) public view returns (InventoryItemParams[] memory) {
        InventoryItemParams[] memory items = new InventoryItemParams[](stackIds.length);
        for (uint256 i = 0; i < stackIds.length; i++) {
            InventoryItemQData memory itemData = InventoryItemQ.get(stackIds[i]);
            items[i] = InventoryItemParams({
                smartObjectId: itemData.itemId,
                quantity: itemData.quantity
            });
        }
        return items;
    }
    function setPlayerAccess(
        address playerID,
        uint256 dispenserID,
        bool hasAccessFlag
    ) public adminAccess(msg.sender) {
        DispenserAccess.set(playerID, dispenserID, hasAccessFlag);
    }
    function setTribeAccess(
        uint256 tribeID,
        uint256 dispenserID,
        bool hasAccessFlag
    ) public adminAccess(msg.sender) {
        DispenserTribeAccess.set(tribeID, dispenserID, hasAccessFlag);
    }
    function setPlayerAdminAccess(
        address playerID,
        bool hasAdminAccessFlag
    ) public adminAccess(msg.sender) {
        DispenserAdminAccess.set(playerID, hasAdminAccessFlag);
    }
    function setTribeAdminAccess(
        uint256 tribeID,
        bool hasAdminAccessFlag
    ) public adminAccess(msg.sender) {
        DispenserTribeAdminAccess.set(tribeID, hasAdminAccessFlag);
    }
    modifier access(address playerID, uint256 dispenserID) {
        require(hasAccess(playerID, dispenserID)||hasAdminAccess(playerID), "Access denied");
        _;
    }
    function hasAccess(address playerID, uint256 dispenserID) internal view returns (bool) {
        uint256 charid = CharactersByAccount.get(playerID);
        uint256 playerTribeID = Characters.getTribeId(charid);
        return
            DispenserAccess.get(playerID, dispenserID) ||
            DispenserTribeAccess.get(playerTribeID, dispenserID);
    }
    function hasAdminAccess(address playerID) internal view returns (bool) {
        uint256 charid = CharactersByAccount.get(playerID);
        uint256 playerTribeID = Characters.getTribeId(charid);
        return
            DispenserAdminAccess.get(playerID) ||
            DispenserTribeAdminAccess.get(playerTribeID);
    }
    modifier adminAccess(address playerID) {
        require(hasAdminAccess(playerID), "Admin access denied");
        _;
    }
}