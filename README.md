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

### Testing

To contribute to testing:

1.  Fork the repository, then clone your fork locally.
2.  Follow the [Getting Started](#getting-started) section to ensure everything works correctly.
3.  Create a new branch for your work (e.g., `exp`). **DO NOT WORK in the `main` branch.**
4.  If you find an issue or have a suggestion, please read [HOW TO ISSUE](./.testerdocs/HOW%20TO%20ISSUE.md) and structure your feedback accordingly at [Scaffold Issues](https://github.com/Algorithmic-Warfare/MUD-DApp-Scaffold/issues).

## License

[MIT](/LICENSE)
