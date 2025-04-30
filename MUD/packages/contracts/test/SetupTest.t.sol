// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import "forge-std/Test.sol";
import { MudTest } from "@latticexyz/world/test/MudTest.t.sol";

import { IBaseWorld } from "@latticexyz/world/src/codegen/interfaces/IBaseWorld.sol";
import { IWorldWithEntryContext } from "@eveworld/world/src/IWorldWithEntryContext.sol";
import { StoreSwitch } from "@latticexyz/store/src/StoreSwitch.sol";

import { Systems } from "@latticexyz/world/src/codegen/tables/Systems.sol";
import { SystemRegistry } from "@latticexyz/world/src/codegen/tables/SystemRegistry.sol";
import { ResourceId, WorldResourceIdLib, WorldResourceIdInstance } from "@latticexyz/world/src/WorldResourceId.sol";

import { INVENTORY_DEPLOYMENT_NAMESPACE as DEPLOYMENT_NAMESPACE, SMART_STORAGE_UNIT_DEPLOYMENT_NAMESPACE, SMART_DEPLOYABLE_DEPLOYMENT_NAMESPACE } from "@eveworld/common-constants/src/constants.sol";

import { InventoryTable, InventoryTableData } from "@eveworld/world/src/codegen/tables/InventoryTable.sol";
import { InventoryItemTable, InventoryItemTableData } from "@eveworld/world/src/codegen/tables/InventoryItemTable.sol";
import { EphemeralInvTable, EphemeralInvTableData } from "@eveworld/world/src/codegen/tables/EphemeralInvTable.sol";
import { EphemeralInvItemTable, EphemeralInvItemTableData } from "@eveworld/world/src/codegen/tables/EphemeralInvItemTable.sol";
import { EphemeralInvCapacityTable } from "@eveworld/world/src/codegen/tables/EphemeralInvCapacityTable.sol";
import { EntityRecordData as StorageEntityRecordData, SmartObjectData, WorldPosition, Coord } from "@eveworld/world/src/modules/smart-storage-unit/types.sol";
import { EntityRecordData as CharacterEntityRecordData } from "@eveworld/world/src/modules/smart-character/types.sol";
import { EntityRecordOffchainTableData } from "@eveworld/world/src/codegen/tables/EntityRecordOffchainTable.sol";

import { DeployableTokenTable } from "@eveworld/world/src/codegen/tables/DeployableTokenTable.sol";

import { IERC721 } from "@eveworld/world/src/modules/eve-erc721-puppet/IERC721.sol";

import { SmartStorageUnitLib } from "@eveworld/world/src/modules/smart-storage-unit/SmartStorageUnitLib.sol";
import { SmartDeployableLib } from "@eveworld/world/src/modules/smart-deployable/SmartDeployableLib.sol";
import { SmartCharacterLib } from "@eveworld/world/src/modules/smart-character/SmartCharacterLib.sol";
import { InventoryLib } from "@eveworld/world/src/modules/inventory/InventoryLib.sol";

import { TransferItem } from "@eveworld/world/src/modules/inventory/types.sol";
import { InventoryItem } from "@eveworld/world/src/modules/inventory/types.sol";

import { FRONTIER_WORLD_DEPLOYMENT_NAMESPACE } from "@eveworld/common-constants/src/constants.sol";

import { Utils as InventoryUtils } from "@eveworld/world/src/modules/inventory/Utils.sol";

contract SetupTest is MudTest {
  using SmartStorageUnitLib for SmartStorageUnitLib.World;
  using SmartCharacterLib for SmartCharacterLib.World;
  using SmartDeployableLib for SmartDeployableLib.World;
  using InventoryLib for InventoryLib.World;

  using InventoryUtils for bytes14;
  using WorldResourceIdInstance for ResourceId;

  IWorldWithEntryContext world;
  // IBaseWorld world;

  uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

  uint256 player1PrivateKey = vm.envUint("TEST_PRIVATE_KEY_1");
  uint256 player2PrivateKey = vm.envUint("TEST_PRIVATE_KEY_2");
  uint256 player3PrivateKey = vm.envUint("TEST_PRIVATE_KEY_3");
  uint256 player4PrivateKey = vm.envUint("TEST_PRIVATE_KEY_4");

  address deployer = vm.addr(deployerPrivateKey);
  address player1 = vm.addr(player1PrivateKey);
  address player2 = vm.addr(player2PrivateKey);
  address player3 = vm.addr(player3PrivateKey);
  address player4 = vm.addr(player4PrivateKey);

  // Test SSU IDs
  uint256 SSUID_1 = vm.envUint("TEST_SSU_ID_1");
  uint256 SSUID_2 = vm.envUint("TEST_SSU_ID_2");
  uint256 SSUID_3 = vm.envUint("TEST_SSU_ID_3");

  // Test SC IDs
  uint256 SCID_1 = vm.envUint("TEST_SC_ID_1");
  uint256 SCID_2 = vm.envUint("TEST_SC_ID_2");
  uint256 SCID_3 = vm.envUint("TEST_SC_ID_3");

  // Test Inventory Item IDs
  uint256 INVENTORY_ITEM_ID_1 = vm.envUint("TEST_INVENTORY_ITEM_ID_1");
  uint256 INVENTORY_ITEM_ID_2 = vm.envUint("TEST_INVENTORY_ITEM_ID_2");
  uint256 INVENTORY_ITEM_ID_3 = vm.envUint("TEST_INVENTORY_ITEM_ID_3");

  // Test Item IDs
  uint256 ITEM_ID_1 = vm.envUint("TEST_ITEM_ID_1");
  uint256 ITEM_ID_2 = vm.envUint("TEST_ITEM_ID_2");
  uint256 ITEM_ID_3 = vm.envUint("TEST_ITEM_ID_3");

  // Test Type IDs
  uint256 TYPE_ID_1 = vm.envUint("TEST_TYPE_ID_1");
  uint256 TYPE_ID_2 = vm.envUint("TEST_TYPE_ID_2");
  uint256 TYPE_ID_3 = vm.envUint("TEST_TYPE_ID_3");

  // Test Item Volumes
  uint256 ITEM_VOLUME_1 = vm.envUint("TEST_ITEM_VOLUME_1");
  uint256 ITEM_VOLUME_2 = vm.envUint("TEST_ITEM_VOLUME_2");
  uint256 ITEM_VOLUME_3 = vm.envUint("TEST_ITEM_VOLUME_3");

  // Test Item Quantities
  uint256 ITEM_QUANTITY_1 = vm.envUint("TEST_ITEM_QUANTITY_1");
  uint256 ITEM_QUANTITY_2 = vm.envUint("TEST_ITEM_QUANTITY_2");
  uint256 ITEM_QUANTITY_3 = vm.envUint("TEST_ITEM_QUANTITY_3");

  // Libraries
  SmartCharacterLib.World smartCharacter;
  SmartDeployableLib.World smartDeployable;
  SmartStorageUnitLib.World smartStorageUnit;
  InventoryLib.World inventory;

  // Smart Character variables
  uint256 tribeId;
  CharacterEntityRecordData charEntityRecordData;
  CharacterEntityRecordData ephCharEntityRecordData;
  EntityRecordOffchainTableData charOffchainData;
  string tokenCID;

  // Smart Storage Unit variables
  // TODO

  // Test Setup
  function setUp() public virtual override {
    vm.startPrank(deployer);
    worldAddress = vm.envAddress("WORLD_ADDRESS");
    world = IWorldWithEntryContext(worldAddress);
    StoreSwitch.setStoreAddress(worldAddress);

    smartDeployable = SmartDeployableLib.World({
      iface: IBaseWorld(worldAddress),
      namespace: FRONTIER_WORLD_DEPLOYMENT_NAMESPACE
    });
    smartStorageUnit = SmartStorageUnitLib.World({
      iface: IBaseWorld(worldAddress),
      namespace: FRONTIER_WORLD_DEPLOYMENT_NAMESPACE
    });
    inventory = InventoryLib.World({ iface: IBaseWorld(worldAddress), namespace: FRONTIER_WORLD_DEPLOYMENT_NAMESPACE });

    smartCharacter = SmartCharacterLib.World({
      iface: IBaseWorld(worldAddress),
      namespace: FRONTIER_WORLD_DEPLOYMENT_NAMESPACE
    });

    // NOTE I don't know what this do exactly.
    smartDeployable.globalResume();

    // _createCharacter(player1, SCID_1);
    // _createCharacter(player2, SCID_2);
    // _createCharacter(player3, SCID_3);

    _createAnchorAndOnline(player1, SSUID_1);
    _depositItemToInventory(player1, SSUID_1, INVENTORY_ITEM_ID_1, ITEM_QUANTITY_1);
    _depositItemToEphemeral(player2, SSUID_1, INVENTORY_ITEM_ID_2, ITEM_QUANTITY_2);

    _createAnchorAndOnline(player1, SSUID_2);
    _depositItemToInventory(player3, SSUID_2, INVENTORY_ITEM_ID_3, ITEM_QUANTITY_1 * 5);

    _createAnchorAndOnline(player1, SSUID_3);
    _depositItemToEphemeral(player3, SSUID_3, INVENTORY_ITEM_ID_3, ITEM_QUANTITY_1);
    vm.stopPrank();
  }

  function _createCharacter(address characterAddress, uint256 SCID) private {
    tribeId = 1122;
    charEntityRecordData = CharacterEntityRecordData({ itemId: 1234, typeId: 2345, volume: 0 });
    ephCharEntityRecordData = CharacterEntityRecordData({ itemId: 1234, typeId: 2345, volume: 0 });
    charOffchainData = EntityRecordOffchainTableData({
      name: "Albus Demunster",
      dappURL: "https://www.my-tribe-website.com",
      description: "The top hunter-seeker in the Frontier."
    });
    tokenCID = "Qm1234abcdxxxx";

    smartCharacter.createCharacter(SCID, characterAddress, tribeId, charEntityRecordData, charOffchainData, tokenCID);
  }

  function _createAnchorAndOnline(address _deployer, uint256 SSUID) private {
    smartStorageUnit.createAndAnchorSmartStorageUnit(
      SSUID,
      StorageEntityRecordData({ typeId: 7888, itemId: 111, volume: 10 }),
      SmartObjectData({ owner: _deployer, tokenURI: "test" }),
      WorldPosition({ solarSystemId: 1, position: Coord({ x: 1, y: 1, z: 1 }) }),
      1e18, // fuelUnitVolume,
      1, // fuelConsumptionPerMinute,
      1000000 * 1e18, //fuelMaxCapacity,
      100000000, // storageCapacity,
      100000000000 // ephemeralStorageCapacity
    );

    smartDeployable.depositFuel(SSUID, 2000);
    smartDeployable.bringOnline(SSUID);
  }

  function _depositItemToInventory(
    address characterAddress,
    uint256 SSUID,
    uint256 inventoryItemId,
    uint256 itemQuantity
  ) private {
    InventoryItem[] memory items = new InventoryItem[](1);
    items[0] = InventoryItem(
      inventoryItemId, // Inventory Item ID
      characterAddress, // Item owner
      ITEM_ID_1, // Item ID
      TYPE_ID_1, // Type ID
      ITEM_VOLUME_1, // Item Volume
      itemQuantity // Item Quantity
    );

    smartStorageUnit.createAndDepositItemsToInventory(SSUID, items);
  }

  function _depositItemToEphemeral(
    address characterAddress,
    uint256 SSUID,
    uint256 inventoryItemId,
    uint256 itemQuantity
  ) private {
    InventoryItem[] memory items = new InventoryItem[](1);
    items[0] = InventoryItem(
      inventoryItemId, // Inventory Item ID
      characterAddress, // Item owner
      ITEM_ID_2, // Item ID
      TYPE_ID_2, // Type ID
      ITEM_VOLUME_2, // Item Volume
      itemQuantity // Item Quantity
    );

    smartStorageUnit.createAndDepositItemsToEphemeralInventory(SSUID, characterAddress, items);
  }

  function testSetup() public {
    address epheremalInventoryAddress = Systems.getSystem(DEPLOYMENT_NAMESPACE.ephemeralInventorySystemId());
    ResourceId ephemeralInventorySystemId = SystemRegistry.get(epheremalInventoryAddress);
    assertEq(ephemeralInventorySystemId.getNamespace(), DEPLOYMENT_NAMESPACE);

    address inventoryAddress = Systems.getSystem(DEPLOYMENT_NAMESPACE.inventorySystemId());
    ResourceId inventorySystemId = SystemRegistry.get(inventoryAddress);
    assertEq(inventorySystemId.getNamespace(), DEPLOYMENT_NAMESPACE);
  }

  function testEphemeralToInventoryTransfer() public {
    uint256 quantity = 2;

    // Checks that the inventories contains what has been setup
    InventoryItemTableData memory storedInventoryItems = InventoryItemTable.get(SSUID_1, INVENTORY_ITEM_ID_1);
    assertEq(storedInventoryItems.quantity, ITEM_QUANTITY_1);
    EphemeralInvItemTableData memory storedEphInvItems = EphemeralInvItemTable.get(
      SSUID_1,
      INVENTORY_ITEM_ID_2,
      player2
    );
    assertEq(storedEphInvItems.quantity, ITEM_QUANTITY_2);

    // Perform item transfer
    TransferItem[] memory transferItems = new TransferItem[](1);
    transferItems[0] = TransferItem(INVENTORY_ITEM_ID_2, player2, quantity);

    vm.startPrank(player2);
    inventory.ephemeralToInventoryTransfer(SSUID_1, transferItems);
    vm.stopPrank();

    // Check the output of the operation
    storedInventoryItems = InventoryItemTable.get(SSUID_1, INVENTORY_ITEM_ID_1);
    assertEq(storedInventoryItems.quantity, ITEM_QUANTITY_1);
    storedInventoryItems = InventoryItemTable.get(SSUID_1, INVENTORY_ITEM_ID_2);
    assertEq(storedInventoryItems.quantity, quantity);
    storedEphInvItems = EphemeralInvItemTable.get(SSUID_1, INVENTORY_ITEM_ID_2, player2);
    assertEq(storedEphInvItems.quantity, ITEM_QUANTITY_2 - quantity);
  }

  function testInventoryToEphemeralTransfer() public {
    uint256 quantity = 2;

    // Checks that the inventories contains what has been setup
    InventoryItemTableData memory storedInventoryItems = InventoryItemTable.get(SSUID_1, INVENTORY_ITEM_ID_1);
    assertEq(storedInventoryItems.quantity, ITEM_QUANTITY_1);
    EphemeralInvItemTableData memory storedEphInvItems = EphemeralInvItemTable.get(
      SSUID_1,
      INVENTORY_ITEM_ID_2,
      player2
    );
    assertEq(storedEphInvItems.quantity, ITEM_QUANTITY_2);
    EphemeralInvItemTableData memory storedEphInventoryItems1 = EphemeralInvItemTable.get(
      SSUID_1,
      INVENTORY_ITEM_ID_1,
      player2
    );
    // Make sure that before transfer player2 has no "item 1"
    assertEq(storedEphInventoryItems1.quantity, 0);

    TransferItem[] memory transferItems = new TransferItem[](1);
    transferItems[0] = TransferItem(INVENTORY_ITEM_ID_1, player1, quantity);

    vm.startPrank(player1);
    inventory.inventoryToEphemeralTransfer(SSUID_1, player2, transferItems);
    vm.stopPrank();

    storedInventoryItems = InventoryItemTable.get(SSUID_1, INVENTORY_ITEM_ID_1);
    assertEq(storedInventoryItems.quantity, ITEM_QUANTITY_1 - quantity);
    storedEphInvItems = EphemeralInvItemTable.get(SSUID_1, INVENTORY_ITEM_ID_2, player2);
    assertEq(storedEphInvItems.quantity, ITEM_QUANTITY_2);
    storedEphInventoryItems1 = EphemeralInvItemTable.get(SSUID_1, INVENTORY_ITEM_ID_1, player2);
    // Make sure that before transfer player2 has no "item 1"
    assertEq(storedEphInventoryItems1.quantity, quantity);
  }

  // NOTE The approved access list is to delegate transfers capabilities to a contract.
}
