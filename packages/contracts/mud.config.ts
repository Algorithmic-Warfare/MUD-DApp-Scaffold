import { defineWorld } from "@latticexyz/world";

export default defineWorld({
  namespace: "TASK",
  systems: {
    TaskSystem: {
      name: "TaskSystem",
      openAccess: false,
    },
  },
  codegen: {
    generateSystemLibraries: true,
  },
  tables: {
    Tasklist: {
      schema: {
        id: "uint256",
        creator: "address",
        assignee: "address",
        deadline: "uint256",
        timestamp: "uint256",
        status: "TaskStatus",
        description: "string",
      },
      key: ["id"],
    },
  },
  enums: {
    TaskStatus: ["OPEN", "CLOSED"],
  },
});
