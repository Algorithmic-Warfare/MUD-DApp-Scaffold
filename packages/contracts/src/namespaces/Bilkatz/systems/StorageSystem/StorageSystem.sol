// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { System } from "@latticexyz/world/src/System.sol";
import { Storage } from "@store/index.sol";
import { ephemeralInteractSystem } from "@eveworld/world-v2/src/namespaces/evefrontier/codegen/systems/EphemeralInteractSystemLib.sol";
import { inventoryInteractSystem } from "@eveworld/world-v2/src/namespaces/evefrontier/codegen/systems/InventoryInteractSystemLib.sol";
import { InventoryItemParams } from "@eveworld/world-v2/src/namespaces/evefrontier/systems/inventory/types.sol";
import { OwnershipByObject } from "@eveworld/world-v2/src/namespaces/evefrontier/codegen/index.sol";
import { Inventory, InventoryItem } from "@eveworld/world-v2/src/namespaces/evefrontier/codegen/index.sol";

contract StorageSystem is System {
    function initStorage(uint256 ssuId) public {
        ephemeralInteractSystem.setTransferToEphemeralAccess( ssuId, address(this), true );
        ephemeralInteractSystem.setTransferFromEphemeralAccess( ssuId, address(this), true );
        ephemeralInteractSystem.setCrossTransferToEphemeralAccess( ssuId, address(this), true );
        inventoryInteractSystem.setTransferToInventoryAccess( ssuId, address(this), true );
    }
    function requestItem(
        uint256 objektId,
        InventoryItemParams[] memory items
    ) public {
        address owner = OwnershipByObject.get(objektId);
        uint256[] memory ssuIds = Storage.get(owner);
        for (uint256 i = 0; i < ssuIds.length; i++) {
            InventoryItemParams[] memory itemParams = new InventoryItemParams[](items.length);
            uint256 itemIndex = 0;
            uint256[] memory itemSID = Inventory.getItems(ssuIds[i]);
            for (uint256 j = 0; j < itemSID.length; j++) {
                uint256 quantity = InventoryItem.getQuantity(ssuIds[i], itemSID[j]);
                for (uint256 k = 0; k < items.length; k++) {
                    if (itemSID[j] == items[k].smartObjectId) {
                        if (items[k].quantity <= 0){
                            continue;
                        }
                        uint256 transferQuantity = items[k].quantity - quantity;
                        if (transferQuantity <= 0) {
                            InventoryItemParams memory itemToTransfer = InventoryItemParams({
                                smartObjectId: itemSID[j],
                                quantity: items[k].quantity
                            });
                            itemParams[itemIndex] = itemToTransfer;
                            itemIndex++;
                            items[k].quantity -= items[k].quantity;
                        }
                        if (transferQuantity > 0) {
                            // Prepare the item for transfer
                            InventoryItemParams memory itemToTransfer = InventoryItemParams({
                                smartObjectId: itemSID[j],
                                quantity: quantity
                            });
                            itemParams[itemIndex] = itemToTransfer;
                            itemIndex++;
                            items[k].quantity -= quantity;
                        }
                    }
                }
            }
            inventoryInteractSystem.transferToInventory(
                ssuIds[i],
                objektId,
                itemParams
            );
        }
    }
}