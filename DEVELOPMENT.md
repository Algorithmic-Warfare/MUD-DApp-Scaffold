# Getting Started

This document outlines the steps to set up your development environment and get the project running.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

*   Linux or WSL
*   Node.js v18+
*   pnpm
*   Foundry
*   Docker

## Setup

This section outlines the steps to set up your development environment.

### Automated Environment Setup (Recommended)

For a quick and easy setup, use the Ansible dev box setup script:

1.  Install Ansible by following [these installation steps](https://www.linuxtechi.com/how-to-install-ansible-on-ubuntu/).
2.  Clone the dev box setup script:
    ```sh
    git clone https://github.com/Algorithmic-Warfare/frontier-dev-box-setup
    ```
3.  Run the script by following the instructions in `./frontier-dev-box-setup/README.md`.

### Manual Environment Setup

If you prefer a manual setup, follow the detailed guides for [setting up tools](https://docs.evefrontier.com/Tools) and [setting up the world](https://docs.evefrontier.com/LocalWorldSetup).

### Client Application Setup

The client application is a React-based frontend for interacting with MUD systems.

*   **Dependencies**: Install pnpm packages for the client:
    ```bash
    cd packages/client
    pnpm install
    ```
*   **Environment Variables**: Create a `.env` file from `.envsample` in the `packages/client` directory:
    ```bash
    cd packages/client
    cp .envsample .env
    ```
    The required variables are `VITE_CHAIN_ID` and `VITE_WORLD_ADDRESS`.

    **Example `.env` for local development**:
    ```sh
    VITE_CHAIN_ID=31337
    VITE_WORLD_ADDRESS=0x0165878a594ca255338adfa4d48449f69242eb8f
    ```

    **Example `.env` for Pyrope testnet**:
    ```sh
    VITE_CHAIN_ID=695569
    VITE_WORLD_ADDRESS= # INSERT Current world address ...
    ```

### Contract System Setup

The contracts package contains Solidity smart contracts defining systems, tables, and namespaces within the MUD framework.

*   **Dependencies**: Install pnpm packages for the contracts:
    ```bash
    cd packages/contracts
    pnpm install
    ```
*   **Environment Variables**: Create a `.env` file from `.envsample` in the `packages/contracts` directory:
    ```bash
    cd packages/contracts
    cp .envsample .env
    ```
    The following environment variables are used to configure the `contracts` package. Variables marked with `(*)` are **REQUIRED**.

    *   `WORLD_ADDRESS`(*): The address of the MUD World contract.
    *   `CHAIN_ID`(*): The ID of the Ethereum chain.
    *   `PRIVATE_KEY`(*): The private key of the deployer account.
    *   `RPC_URL`(*): The URL of the Ethereum RPC endpoint.

    **Example `.env` for local development**:
    ```sh
    DEBUG=mud:*

    WORLD_ADDRESS=0x0165878a594ca255338adfa4d48449f69242eb8f # AUTO world deployer address
    CHAIN_ID=31337
    PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 # DEFAULT Anvil account
    RPC_URL=http://127.0.0.1:8545
    ```

    **Example `.env` for Pyrope testnet**:
    ```sh
    DEBUG=mud:*

    WORLD_ADDRESS= # INSERT Current world address ...
    CHAIN_ID=695569
    PRIVATE_KEY= # INSERT Your private key ...
    RPC_URL=https://pyrope-external-sync-node-rpc.live.tech.evefrontier.com
    ```
### Eveworld Environment Setup

The `/eveworld` package utilizes environment variables to configure its local development environment, including blockchain node connections, token parameters, and administrative accounts. These variables are crucial for the proper functioning of the local EveWorld instance.

To configure these variables:

*   Copy the `.envsample` file to `.env` in the `packages/eveworld` directory:
    ```bash
    cd packages/eveworld
    cp .envsample .env
    ```
    **Example `.env` for local development**:
    ```bash
    # Node Connection
    # Description: JSON-RPC endpoint URL
    # Example: "http://localhost:8545"
    # Explanation: Blockchain node connection endpoint
    # Usage: Primary network connection for deployments
    RPC_URL=http://foundry:8546

    # Description: Deployment wallet private key
    # Example: "0xac0974bec39... (64 hex characters)"
    # Explanation: Used for contract deployment transactions
    # Usage: Required for automated deployments
    PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

    # BASE URI FOR ERC721 tokens for v1
    # Description: Base URL for ERC721 token metadata
    # Example: "https://api.example.com/tokens/"
    # Explanation: Root URI for token metadata storage
    # Usage: ERC721 contract initialization
    BASE_URI=http://127.0.0.1:8080/ipfs/

    # .env for the docker file
    # Description: ERC20 token display name
    # Example: "ExampleToken"
    # Explanation: Human-readable token name
    # Usage: ERC20 contract deployment
    ERC20_TOKEN_NAME="TEST TOKEN"

    # Description: ERC20 token ticker symbol
    # Example: "EXMP"
    # Explanation: Short identifier for trading
    # Usage: ERC20 contract deployment
    ERC20_TOKEN_SYMBOL="TEST"

    # Description: Initial token supply
    # Example: "1000000"
    # Explanation: Total minted tokens at deployment
    # Usage: ERC20 contract initialization
    ERC20_INITIAL_SUPPLY=10000000000

    # Description: Namespace for Eveworld tokens
    # Example: "eve.core"
    # Explanation: Unique identifier for token system
    # Usage: World contract configuration
    EVE_TOKEN_NAMESPACE=test

    # Description: Admin address for token system
    # Example: "0x..."
    # Explanation: Controls token administration
    # Usage: Access control configuration
    EVE_TOKEN_ADMIN=0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266

    # ADMIN ACCESS ACCOUNTS (to assign to the ADMIN access to the world contracts)
    # Description: World contract admin addresses
    # Example: "0x...,0x..."
    # Explanation: Comma-separated admin addresses
    # Usage: World contract access control
    ADMIN_ACCOUNTS=0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266,0x70997970C51812dc3A010C7d01b50e0d17dc79C8,0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC

    # Description: Tenant/organization identifier
    # Example: "example-org"
    # Explanation: Namespace for multi-tenant systems
    # Usage: Resource isolation
    TENANT=TEST

    # TYPE ID BY ASSEBLY TYPE
    # Description: CHARACTER_TYPE_ID configuration
    # Example: "[example value]"
    # Explanation: Specific parameter for assembly system
    # Usage: World initialization scripts
    CHARACTER_TYPE_ID=42000000100

    # Description: CHARACTER_VOLUME configuration
    # Example: "[example value]"
    # Explanation: Specific parameter for assembly system
    # Usage: World initialization scripts
    CHARACTER_VOLUME=0

    # Description: NETWORK_NODE_TYPE_ID configuration
    # Example: "[example value]"
    # Explanation: Specific parameter for assembly system
    # Usage: World initialization scripts
    NETWORK_NODE_TYPE_ID=88092

    # Description: NETWORK_NODE_VOLUME configuration
    # Example: "[example value]"
    # Explanation: Specific parameter for assembly system
    # Usage: World initialization scripts
    NETWORK_NODE_VOLUME=10

    # Description: TYPE_IDS configuration
    # Example: "[example value]"
    # Explanation: Specific parameter for assembly system
    # Usage: World initialization scripts
    TYPE_IDS=42000000200,77917,84556,84955,88086,87160,88093,88094,88068,87162,87161,88067,87120

    # Energy constant by assembly
    # Description: ASSEMBLY_TYPE_ID configuration
    # Example: "[example value]"
    # Explanation: Specific parameter for assembly system
    # Usage: World initialization scripts
    ASSEMBLY_TYPE_ID=84556,84955,88086,88068,88067,87120,87119,88063,88064,88070,88071,88069,77917

    # Description: ENERGY_CONSTANT configuration
    # Example: "[example value]"
    # Explanation: Specific parameter for assembly system
    # Usage: World initialization scripts
    ENERGY_CONSTANT=10,100,50,20,20,30,10,10,20,20,30,10,100

    # Fuel efficiency by fuel type
    # Description: FUEL_TYPE_ID configuration
    # Example: "[example value]"
    # Explanation: Specific parameter for assembly system
    # Usage: World initialization scripts
    FUEL_TYPE_ID=78437,78515,78516,84868,88319,88335

    # Description: FUEL_EFFICIENCY configuration
    # Example: "[example value]"
    # Explanation: Specific parameter for assembly system
    # Usage: World initialization scripts
    FUEL_EFFICIENCY=90,80,40,40,15,10

    # Description: FUEL_VOLUME configuration
    # Example: "[example value]"
    # Explanation: Specific parameter for assembly system
    # Usage: World initialization scripts
    FUEL_VOLUME=28,28,28,28,28,28

    # Description: Protocol version identifier
    # Example: "1.0.0"
    # Explanation: Major.minor.patch version
    # Usage: Compatibility checks
    WORLD_VERSION=0.1.4
    ```

## Installation

Install the project dependencies:

```bash
pnpm install
```

## Development Workflows

Use these commands to start your development environment:

```bash
# Starts an eveworld v2 on a local node @ http://localhost:8586
pnpm world:restart

# Initiate an mprocs that:
# - Forks the world node above into http://localhost:8584
# - Deploys the systems defined in the `contracts` package in watch mode.
# - Starts the client @ http://localhost:3000 in watch mode.
# - Runs system tests defined in `contracts` (requires contract deployment to resolve first).
#   Process will fail initially, but after contract deployment, press "R" to rerun them.
pnpm dev
```

### Contract Scripts

The `contracts` package includes several utility scripts:

*   `build`: Builds the contracts using `mud build`.
*   `clean`: Cleans the build artifacts and autogenerated code.
*   `deploy:local`: Deploys the contracts to a local development network.
*   `deploy:pyrope`: Deploys the contracts to the Pyrope testnet.
*   `test`: Runs the tests using Forge.
*   `coverage`: Generates code coverage reports.

# Contract Development

Developing contracts in this project involves defining the system architecture, implementing the systems, and writing comprehensive tests. This section outlines the workflow using the existing Tasklist system as a concrete example.

## 1. Configuring System Architecture in [`mud.config.ts`](packages/contracts/mud.config.ts:1)

The [`mud.config.ts`](packages/contracts/mud.config.ts:1) file is central to defining your MUD world's architecture. It specifies the tables (components), systems (logic), and enums that make up your on-chain application.

**Example: Tasklist Configuration**

```typescript
// packages/contracts/mud.config.ts
import { defineWorld } from "@latticexyz/world";

export default defineWorld({
  namespace: "TASK", // Defines a unique namespace for your world
  systems: {
    TaskSystem: {
      name: "TaskSystem",
      openAccess: true, // Allows anyone to call functions on this system
    },
  },
  codegen: {
    generateSystemLibraries: true, // Generates Solidity libraries for systems
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
      key: ["id"], // Defines the primary key for the table
    },
  },
  enums: {
    TaskStatus: ["OPEN", "CLOSED"], // Defines custom enums for use in schemas
  },
});
```

-   **`namespace`**: A unique identifier for your MUD world.
-   **`systems`**: Declares the systems available in your world.
    -   `TaskSystem`: The name of the system.
    -   `openAccess: true`: Specifies that functions within `TaskSystem` can be called by any address.
-   **`codegen`**: Configuration for code generation. `generateSystemLibraries: true` ensures that Solidity libraries are generated for your systems, simplifying interactions.
-   **`tables`**: Defines the data structures (components) for your world.
    -   `Tasklist`: The name of the table.
    -   `schema`: Defines the fields and their types for the `Tasklist` table.
    -   `key`: Specifies the fields that form the primary key for the table.
-   **`enums`**: Allows you to define custom Solidity enums that can be used in your table schemas.

## 2. Creating Systems in `src/systems`

Systems are the core logic of your MUD application, containing the functions that interact with your world's state (tables). They are typically written in Solidity.

**Example: [`TaskSystem.sol`](packages/contracts/src/systems/Tasklist/TaskSystem.sol:1)**

The [`TaskSystem.sol`](packages/contracts/src/systems/Tasklist/TaskSystem.sol:1) contract implements the business logic for managing tasks.

```solidity
// packages/contracts/src/systems/Tasklist/TaskSystem.sol
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { System } from "@latticexyz/world/src/System.sol";
import { Tasklist, TasklistData } from "@store/index.sol"; // Import generated table library
import { TaskStatus } from "@store/common.sol"; // Import generated enum
import "./Errors.sol"; // Custom error definitions

contract TaskSystem is System {
  // Events for transparency and off-chain indexing
  event TaskCreated(
    uint256 indexed taskId,
    address indexed creator,
    address indexed assignee,
    string description,
    uint256 deadline,
    uint256 timestamp
  );
  event TaskUpdated(uint256 indexed taskId, address newAssignee, string newDescription, uint256 newDeadline);
  event TaskCompleted(uint256 indexed taskId);

  // Modifiers for access control and validation
  modifier onlyCreator(uint256 taskId) {
    TasklistData memory task = Tasklist.get(taskId);
    if (task.creator != _msgSender()) revert Unauthorized();
    _;
  }

  modifier onlyExistentTask(uint256 taskId) {
    TasklistData memory task = Tasklist.get(taskId);
    if (task.creator == address(0)) revert TaskNotFound();
    if (task.assignee == address(0)) revert InvalidAssignee();
    if (task.deadline <= task.timestamp) revert InvalidDeadline();
    _;
  }

  // Function to create a new task
  function createTask(address assignee, string memory description, uint256 deadline) public returns (uint256 taskId) {
    if (assignee == address(0)) revert InvalidAssignee();
    if (deadline <= block.timestamp) revert InvalidDeadline();

    // Generate a unique taskId
    taskId = uint256(keccak256(abi.encode(description, deadline, _msgSender(), block.timestamp)));
    
    // Set task data in the Tasklist table
    Tasklist.set(
      taskId,
      TasklistData({
        creator: _msgSender(),
        assignee: assignee,
        description: description,
        timestamp: block.timestamp,
        deadline: deadline,
        status: TaskStatus.OPEN
      })
    );
    emit TaskCreated(taskId, _msgSender(), assignee, description, deadline, block.timestamp);

    return taskId;
  }

  // Functions to update task properties
  function updateTaskAssignee(uint256 taskId, address newAssignee) public onlyExistentTask(taskId) onlyCreator(taskId) {
    TasklistData memory task = Tasklist.get(taskId);
    if (newAssignee == address(0)) revert InvalidAssignee();
    Tasklist.setAssignee(taskId, newAssignee);
    emit TaskUpdated(taskId, newAssignee, task.description, task.deadline);
  }

  function updateTaskDeadline(uint256 taskId, uint256 newDeadline) public onlyExistentTask(taskId) onlyCreator(taskId) {
    TasklistData memory task = Tasklist.get(taskId);
    if (newDeadline <= task.timestamp) revert InvalidDeadline();
    Tasklist.setDeadline(taskId, newDeadline);
    emit TaskUpdated(taskId, task.assignee, task.description, newDeadline);
  }

  function updateTaskDescription(
    uint256 taskId,
    string memory newDescription
  ) public onlyExistentTask(taskId) onlyCreator(taskId) {
    TasklistData memory task = Tasklist.get(taskId);
    Tasklist.setDescription(taskId, newDescription);
    emit TaskUpdated(taskId, task.assignee, newDescription, task.deadline);
  }

  // Function to complete a task
  function completeTask(uint256 taskId) public onlyExistentTask(taskId) onlyCreator(taskId) {
    Tasklist.setStatus(taskId, TaskStatus.CLOSED);
    emit TaskCompleted(taskId);
  }
}
```

Key aspects of system development:
-   **Imports**: Import necessary MUD libraries (e.g., `@latticexyz/world/src/System.sol` for the base `System` contract) and generated table/enum libraries (e.g., `@store/index.sol`).
-   **Events**: Emit events to signal state changes, which are crucial for off-chain indexing and user interface updates.
-   **Modifiers**: Use modifiers for common checks like access control (`onlyCreator`) and data validation (`onlyExistentTask`).
-   **Table Interactions**: Use the generated table libraries (e.g., `Tasklist.set()`, `Tasklist.get()`, `Tasklist.setAssignee()`) to read from and write to your defined tables.

## 3. Writing Tests in `tests/`

Thorough testing is essential for contract development. Tests are typically written using Foundry, a fast Solidity testing framework.

**Example: [`Task.t.sol`](packages/contracts/test/TaskTests/Task.t.sol:1)**

The [`Task.t.sol`](packages/contracts/test/TaskTests/Task.t.sol:1) file contains tests for the `TaskSystem`.

```solidity
// packages/contracts/test/TaskTests/Task.t.sol
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import "forge-std/Test.sol";
import { MudTest } from "@latticexyz/world/test/MudTest.t.sol";
import { IWorld } from "@world/IWorld.sol";
import { Tasklist, TasklistData } from "@store/index.sol";
import { TaskStatus } from "@store/common.sol";
import { TaskSystem } from "@systems/Tasklist/TaskSystem.sol";
import { SetupTest } from "../SetupTest.t.sol"; // Base setup for MUD tests
import "@systems/Tasklist/Errors.sol"; // Import custom errors for revert testing

contract TaskTest is SetupTest {
  address private creator = address(1);
  address private assignee = address(2);
  address private nonAuthorized = address(3);
  string private initialDescription = "Initial task description";
  uint256 private initialDeadline = block.timestamp + 1 days;
  uint256 private taskId;

  // Declare variables to hold task data for assertions
  TasklistData task;
  TasklistData updatedTask;
  TasklistData completedTask;

  function setUp() public override {
    super.setUp(); // Call base setup
    vm.prank(creator); // Impersonate the creator address
    taskId = taskWorld.TASK__createTask(assignee, initialDescription, initialDeadline); // Call the system function
  }

  function testCreateTask() public {
    task = Tasklist.get(taskId); // Retrieve task data from the table
    assertEq(task.creator, creator, "Creator address mismatch");
    assertEq(task.assignee, assignee, "Assignee address mismatch");
    assertEq(task.description, initialDescription, "Description mismatch");
    assertEq(uint256(task.status), uint256(TaskStatus.OPEN), "Initial status should be Open");
    assertEq(task.deadline, initialDeadline, "Deadline mismatch");
    assertEq(task.timestamp, block.timestamp, "Timestamp mismatch");
  }

  function testUpdateTaskAssignee() public {
    testCreateTask(); // Ensure task exists
    address newAssignee = address(4);
    vm.prank(creator);
    taskWorld.TASK__updateTaskAssignee(taskId, newAssignee);
    updatedTask = Tasklist.get(taskId);
    assertEq(updatedTask.assignee, newAssignee, "Assignee not updated");
  }

  function testCompleteTaskAsCreator() public {
    vm.prank(creator);
    taskWorld.TASK__completeTask(taskId);
    completedTask = Tasklist.get(taskId);
    assertEq(uint256(completedTask.status), uint256(TaskStatus.CLOSED), "Task not completed");
  }

  // Test cases for expected reverts
  function testNonCreatorCannotUpdateTask() public {
    vm.prank(nonAuthorized);
    vm.expectRevert(Unauthorized.selector); // Expect a specific revert error
    taskWorld.TASK__updateTaskAssignee(taskId, address(4));
  }

  function testCreateTaskWithInvalidAssignee() public {
    vm.prank(creator);
    vm.expectRevert(InvalidAssignee.selector);
    taskWorld.TASK__createTask(address(0), "Invalid task", block.timestamp + 1 days);
  }
}
```

Key aspects of writing tests:
-   **`SetupTest`**: Inherit from `SetupTest` (or `MudTest`) for common MUD test setup, which deploys the world and systems.
-   **`setUp()`**: Initialize test conditions, such as creating a task, before each test function runs. Use `vm.prank()` to simulate calls from specific addresses.
-   **Calling Systems**: Interact with your deployed systems through the `taskWorld` (or `world`) object, e.g., `taskWorld.TASK__createTask()`. The system name (`TASK`) is derived from your `mud.config.ts` namespace.
-   **Assertions**: Use `assertEq()` to verify expected outcomes by reading directly from the tables (e.g., `Tasklist.get(taskId)`).
-   **Revert Testing**: Use `vm.expectRevert()` to test that functions correctly revert under invalid conditions, specifying the expected error selector.

# Client Development

The client application is a React-based frontend that interacts with MUD systems through a combination of system calls, component implementations, and view composition. This section outlines the workflow using existing implementations as references.

## 1. Adding System Calls in [`createSystemCalls.ts`](packages/client/src/data/mud/systems/createSystemCalls.ts:1)

System calls bridge the client application with on-chain systems. They are defined in [`createSystemCalls.ts`](packages/client/src/data/mud/systems/createSystemCalls.ts:1) using MUD's networking layer.

**Example: Task System Calls**

```typescript
// packages/client/src/data/mud/systems/createSystemCalls.ts
import { getComponentValue } from "@latticexyz/recs";
import { ClientComponents } from "./createClientComponents";
import { SetupNetworkResult } from "./setupNetwork";
import { singletonEntity } from "@latticexyz/store-sync/recs";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
  { worldContract, waitForTransaction }: SetupNetworkResult,
  { Tasklist }: ClientComponents
) {
  const createTask = async (assignee: string, description: string, deadline: number) => {
    const tx = await worldContract.write.TASK__createTask([assignee, description, deadline]);
    await waitForTransaction(tx);
    return getComponentValue(Tasklist, singletonEntity)?.id;
  };

  const updateTaskAssignee = async (taskId: number, newAssignee: string) => {
    const tx = await worldContract.write.TASK__updateTaskAssignee([taskId, newAssignee]);
    return waitForTransaction(tx);
  };

  const updateTaskDeadline = async (taskId: number, newDeadline: number) => {
    const tx = await worldContract.write.TASK__updateTaskDeadline([taskId, newDeadline]);
    return waitForTransaction(tx);
  };

  const updateTaskDescription = async (taskId: number, newDescription: string) => {
    const tx = await worldContract.write.TASK__updateTaskDescription([taskId, newDescription]);
    return waitForTransaction(tx);
  };

  const completeTask = async (taskId: number) => {
    const tx = await worldContract.write.TASK__completeTask([taskId]);
    return waitForTransaction(tx);
  };

  return {
    createTask,
    updateTaskAssignee,
    updateTaskDeadline,
    updateTaskDescription,
    completeTask,
  };
}
```

Key aspects:
- **`worldContract`**: The generated contract client for interacting with your MUD world.
- **System Call Structure**: Each system call:
  1. Invokes the corresponding system function via `worldContract.write.[SYSTEM_NAMESPACE]__[FUNCTION_NAME]`
  2. Waits for transaction confirmation using `waitForTransaction`
  3. Returns relevant data (e.g., newly created task ID)

## 2. Implementing Calls in Components

Components connect system calls to UI interactions. The [`ConnectWallet.tsx`](packages/client/src/components/wallet/ConnectWallet.tsx:1) component demonstrates wallet connection and state management.

**Example: Task Creation Component**

```tsx
// Example component using system calls (simplified)
import { useMUD } from "../../providers/mud/MudProvider";
import { useComponentValue } from "@latticexyz/react";
import { useEntityQuery } from "@latticexyz/react";
import { Has } from "@latticexyz/recs";
import { useState } from "react";

export const TaskCreator = () => {
  const {
    network: { systemCalls },
    components: { Tasklist },
  } = useMUD();
  
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");
  const [deadline, setDeadline] = useState(0);

  // Get all tasks
  const tasks = useEntityQuery([Has(Tasklist)]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    await systemCalls.createTask(assignee, description, deadline);
    // Reset form
    setDescription("");
    setAssignee("");
    setDeadline(0);
  };

  return (
    <div>
      <form onSubmit={handleCreateTask}>
        <input 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description"
        />
        <input
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          placeholder="Assignee address"
        />
        <input
          type="number"
          value={deadline}
          onChange={(e) => setDeadline(Number(e.target.value))}
          placeholder="Deadline timestamp"
        />
        <button type="submit">Create Task</button>
      </form>
      
      <h3>Existing Tasks</h3>
      <ul>
        {tasks.map((taskEntity) => {
          const task = useComponentValue(Tasklist, taskEntity);
          return (
            <li key={task.id}>
              {task.description} (Assignee: {task.assignee})
            </li>
          );
        })}
      </ul>
    </div>
  );
};
```

Key patterns:
- **`useMUD()` Hook**: Provides access to system calls and components
- **State Management**: Combine React state with MUD components:
  - `useComponentValue` for single entity values
  - `useEntityQuery` for filtered entity lists
- **Asynchronous Calls**: System calls are async operations that update blockchain state

## 3. Composing DApp Views

Views compose components into complete application flows. The main application structure is defined in [`App.tsx`](packages/client/src/App.tsx:1) and [`routes.tsx`](packages/client/src/routes.tsx:1).

**Example: Application Routing**

```tsx
// packages/client/src/routes.tsx
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { TaskCreator } from "../components/tasks/TaskCreator";
import { TaskDashboard } from "../views/pages/TaskDashboard";
import { LandingPage } from "../views/pages/LandingPage";
import { CharacterRequired } from "../views/utils/CharacterRequired";
import { NotFound } from "../views/utils/NotFound";

// Lazy-loaded components
const MudSyncStatusView = lazy(() => import("../views/dev/MudSyncStatusView"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/dashboard",
    element: (
      <CharacterRequired>
        <TaskDashboard />
      </CharacterRequired>
    ),
    children: [
      {
        path: "tasks",
        element: <TaskCreator />,
      },
      {
        path: "status",
        element: <MudSyncStatusView />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
```

**Example: Main Application Structure**

```tsx
// packages/client/src/App.tsx
import { RouterProvider } from "react-router-dom";
import { Toaster } from "../components/ui/Sonner";
import { router } from "./routes";
import { MudProvider } from "./providers/mud/MudProvider";
import { WalletProvider } from "./providers/wallet/WalletProvider";

function App() {
  return (
    <WalletProvider>
      <MudProvider>
        <RouterProvider router={router} />
        <Toaster position="bottom-right" />
      </MudProvider>
    </WalletProvider>
  );
}

export default App;
```

View composition patterns:
- **Provider Pattern**: Wrap application with context providers:
  - `WalletProvider` for wallet state
  - `MudProvider` for MUD networking and components
- **Route Protection**: Use wrappers like `CharacterRequired` for authenticated routes
- **Lazy Loading**: Load non-critical components dynamically with `lazy()`
- **Global Components**: Include utilities like `Toaster` for notifications

## 4. Integrating with MUD Network Setup

The network configuration in [`setupNetwork.ts`](packages/client/src/data/mud/network/setupNetwork.ts:1) connects the client to your MUD world.

**Key Integration Points:**

1. **World Configuration**  
   Load contract addresses from chain ID:
   ```ts
   // packages/client/src/data/mud/network/getNetworkConfig.ts
   import { supportedChains } from "./supportedChains";
   
   export const getNetworkConfig = async (chainId: number) => {
     const chainConfig = supportedChains.find((c) => c.id === chainId);
     if (!chainConfig) throw new Error(`Chain ${chainId} not supported`);
     
     return {
       worldAddress: chainConfig.worldAddress,
       initialBlockNumber: chainConfig.initialBlockNumber,
     };
   };
   ```

2. **MUD Provider Initialization**  
   ```tsx
   // packages/client/src/providers/mud/MudProvider.tsx
   import { setupNetwork } from "../../data/mud/network/setupNetwork";
   
   export const MudProvider = ({ children }) => {
     const [network] = useState(() => setupNetwork());
     
     return (
       <MudContext.Provider value={network}>
         {children}
       </MudContext.Provider>
     );
   };
   ```

3. **Real-time Synchronization**  
   The sync process in [`mountDevTools.ts`](packages/client/src/data/mud/debug/mountDevTools.ts:1) ensures client state stays updated with blockchain events:
   ```ts
   // packages/client/src/data/mud/debug/mountDevTools.ts
   import { mount as mountDevTools } from "@latticexyz/dev-tools";
   
   export const mountDevTools = ({ network }) => {
     mountDevTools({
       config: network.config,
       publicClient: network.publicClient,
       walletClient: network.walletClient,
     });
   };
   ```

Best practices:
- Use environment variables for chain configuration
- Implement loading states during initial sync
- Handle network changes gracefully
- Use MUD's reactive components for automatic UI updates