import { defineWorld } from "@latticexyz/world";

export default defineWorld({
  namespace: "Bilkatz",
  systems: {
    StorageSystem: {
      name: "StorageSystem",
      openAccess: true,
    },
    DispenserSystem:{
      name: "DispenserSystem",
      openAccess: true,
    }
  },
  codegen: {
    generateSystemLibraries: true,
  },
  tables: {
    Storage: {
      schema: {
        ownerId: "address",
        ssuId: "uint256[]",
      },
      key: ["ownerId"]
    },
    Dispenser: {
      schema: {
        playerID: "address",
        dispenserID: "uint256",
        collected: "bool",
        timestamp: "uint256"
      },
      key: ["playerID", "dispenserID"]
    },
    DispenserAccess: {
      schema: {
        playerID: "address",
        dispenserID: "uint256",
        access: "bool",
      },
      key: ["playerID", "dispenserID"]
    },
    DispenserTribeAccess: {
      schema: {
        tribeID: "uint256",
        dispenserID: "uint256",
        access: "bool",
      },
      key: ["tribeID", "dispenserID"]
    },
    DispenserAdminAccess: {
      schema: {
        playerID: "address",
        adminAccess: "bool"
      },
      key: ["playerID"]
    },
    DispenserTribeAdminAccess: {
      schema: {
        tribeID: "uint256",
        adminAccess: "bool"
      },
      key: ["tribeID"]
    },
    DispenserConfig: {
      schema: {
        dispenserID: "uint256",
        repeatable: "bool",
        stackIds: "uint256[]",
      },
      key: ["dispenserID"]
    },
    InventoryItemQ: {
      schema: {
        stackid: "uint256",
        itemId: "uint256",
        quantity: "uint256",
      },
      key: ["stackid"]
   }
  },
});
