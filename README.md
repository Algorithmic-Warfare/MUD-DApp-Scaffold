# MUD DApp Scaffold

A modular foundation for building MUD-based decentralized applications with React frontend and Solidity smart contracts for EVE Frontier systems.

## Table of Contents

*   [Features](#features)
*   [Prerequisites](#prerequisites)
*   [Setup](#setup)
*   [Getting Started](#getting-started)
*   [Contribute](#contribute)
*   [License](#license)

## Features

This project provides a comprehensive scaffold for developing MUD-based decentralized applications, offering a structured approach with distinct packages for frontend, smart contracts, and local development.

*   **`/client` (Frontend Application)**: A React-based client built with Vite and TypeScript, featuring:
    *   Wallet integration for seamless user interaction.
    *   MUD context providers for efficient state management and blockchain operations.
    *   A dedicated Task dashboard UI.

*   **`/contracts` (Smart Contract System)**: A repository of Solidity smart contracts, defining systems, tables, and namespaces within the MUD framework. Key capabilities include:
    *   A robust Task management system.
    *   MUD world architecture for scalable on-chain logic.
    *   Foundry for comprehensive testing of smart contracts.

*   **`/eveworld` (Local Development Environment)**: Facilitates a streamlined local development workflow with:
    *   Docker-compose setup for easy environment orchestration.
    *   Pre-configured service configurations for quick deployment.

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
### EveWorld Environment Setup

The `/eveworld` package utilizes environment variables to configure its local development environment, including blockchain node connections, token parameters, and administrative accounts. These variables are crucial for the proper functioning of the local EveWorld instance.

| Variable Name          | Description                        | Example Value                                                                                                                      | Required Status |
| ---------------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `RPC_URL`              | JSON-RPC endpoint URL              | `http://foundry:8546`                                                                                                              | Yes             |
| `PRIVATE_KEY`          | Deployment wallet private key      | `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`                                                               | Yes             |
| `BASE_URI`             | Base URL for ERC721 token metadata | `http://127.0.0.1:8080/ipfs/`                                                                                                      | No              |
| `ERC20_TOKEN_NAME`     | ERC20 token display name           | `TEST TOKEN`                                                                                                                       | No              |
| `ERC20_TOKEN_SYMBOL`   | ERC20 token ticker symbol          | `TEST`                                                                                                                             | No              |
| `ERC20_INITIAL_SUPPLY` | Initial token supply               | `10000000000`                                                                                                                      | No              |
| `EVE_TOKEN_NAMESPACE`  | Namespace for Eveworld tokens      | `test`                                                                                                                             | No              |
| `EVE_TOKEN_ADMIN`      | Admin address for token system     | `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`                                                                                       | No              |
| `ADMIN_ACCOUNTS`       | World contract admin addresses     | `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266,0x70997970C51812dc3A010C7d01b50e0d17dc79C8,0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC` | Yes             |
| `TENANT`               | Tenant/organization identifier     | `TEST`                                                                                                                             | No              |
| `CHARACTER_TYPE_ID`    | CHARACTER_TYPE_ID configuration    | `42000000100`                                                                                                                      | No              |
| `CHARACTER_VOLUME`     | CHARACTER_VOLUME configuration     | `0`                                                                                                                                | No              |
| `NETWORK_NODE_TYPE_ID` | NETWORK_NODE_TYPE_ID configuration | `88092`                                                                                                                            | No              |
| `NETWORK_NODE_VOLUME`  | NETWORK_NODE_VOLUME configuration  | `10`                                                                                                                               | No              |
| `TYPE_IDS`             | TYPE_IDS configuration             | `42000000200,77917,84556,84955,88086,87160,88093,88094,88068,87162,87161,88067,87120`                                              | No              |
| `ASSEMBLY_TYPE_ID`     | ASSEMBLY_TYPE_ID configuration     | `84556,84955,88086,88068,88067,87120,87119,88063,88064,88070,88071,88069,77917`                                                    | No              |
| `ENERGY_CONSTANT`      | ENERGY_CONSTANT configuration      | `10,100,50,20,20,30,10,10,20,20,30,10,100`                                                                                         | No              |
| `FUEL_TYPE_ID`         | FUEL_TYPE_ID configuration         | `78437,78515,78516,84868,88319,88335`                                                                                              | No              |
| `FUEL_EFFICIENCY`      | FUEL_EFFICIENCY configuration      | `90,80,40,40,15,10`                                                                                                                | No              |
| `FUEL_VOLUME`          | FUEL_VOLUME configuration          | `28,28,28,28,28,28`                                                                                                                | No              |
| `WORLD_VERSION`        | Protocol version identifier        | `0.1.4`                                                                                                                            | Yes             |

To configure these variables:

*   Copy the `.envsample` file to `.env` in the `packages/eveworld` directory:
    ```bash
    cd packages/eveworld
    cp .envsample .env
    ```
*   Fill in the required values for the variables marked "Yes" in the table above.
*   **Security Note**: Never commit your `.env` file to version control, as it may contain sensitive information like private keys. Add `.env` to your `.gitignore` file.

## Getting Started

Follow these steps to get the project up and running.

### Installation

Install the project dependencies:

```bash
pnpm install
```

### Development Workflows

Use these commands to start your development environment:

```bash
# Starts an eveworld v2 on a local node @ http://localhost:8586
pnpm world:up

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

## Contribute

We welcome contributions to the MUD DApp Scaffold!

## License

[MIT](/LICENSE)
