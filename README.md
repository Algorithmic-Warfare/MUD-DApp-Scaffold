![](./packages/client/src/assets/Vector-Logo/Secondary.svg)

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

*   **`/client` (Frontend Application, DApp)**: A React-based client built with Vite and TypeScript, featuring:
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

## Contribute

We welcome contributions to the MUD DApp Scaffold! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) beforehand.

## Community Support

Join [Algorithmic Warfare](https://discord.gg/BZwxgahF8e) official server for community support. Talk to people who are trying to building cool projects using this scaffold!

## Author(s)

Check [CODEOWNERS](./CODEOWNERS).

## License

[MIT](/LICENSE)
