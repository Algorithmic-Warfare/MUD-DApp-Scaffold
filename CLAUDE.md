# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a MUD DApp Scaffold for building decentralized applications on the Eve Frontiers blockchain. It's a monorepo using pnpm workspaces with three main packages: client (React frontend), contracts (Solidity smart contracts), and eveworld (local blockchain environment).

## Common Development Commands

### Setup and Installation
```bash
pnpm install          # Install all dependencies
cp .env.example .env  # Set up environment variables
```

### Development
```bash
pnpm dev              # Start all services (frontend, contracts, blockchain)
pnpm dev:client       # Start only the frontend
pnpm dev:contracts    # Deploy contracts and watch for changes
pnpm dev:eveworld     # Start local blockchain
```

### Build Commands
```bash
pnpm build            # Build all packages
pnpm build:client     # Build frontend
pnpm build:contracts  # Build smart contracts
```

### Testing
```bash
pnpm test             # Run all tests
pnpm test:contracts   # Run contract tests
# Run specific test: cd packages/contracts && forge test --match-test testName
```

### Linting and Type Checking
```bash
pnpm lint             # Run ESLint on client code
pnpm typecheck        # Run TypeScript type checking
```

### Contract Management
```bash
# Deploy contracts
cd packages/contracts && pnpm mud deploy

# Generate contract types
cd packages/contracts && pnpm build

# Run specific contract test
cd packages/contracts && forge test --match-contract ContractName
```

## High-Level Architecture

### Technology Stack
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS v4, shadcn/ui
- **Smart Contracts**: Solidity, Foundry, MUD Framework
- **State Management**: MUD's built-in reactive state synchronization
- **Wallet Integration**: RainbowKit with custom MudWalletAdapter
- **Blockchain**: Eve Frontiers (local development via Docker)

### Package Structure

1. **packages/client/**
   - React application with MUD integration
   - Key directories:
     - `src/mud/`: MUD configuration and setup (automatically generated)
     - `src/components/`: React components including wallet integration
     - `src/lib/`: Utilities and helpers
     - `src/providers/`: Context providers (WalletProvider)
   - Uses Vite for development and building
   - Tailwind CSS v4 with custom configuration

2. **packages/contracts/**
   - MUD-based smart contracts
   - Key directories:
     - `src/systems/`: Core game logic systems (TaskSystem.sol)
     - `src/codegen/`: Auto-generated MUD tables and interfaces
     - `mud.config.ts`: MUD framework configuration defining tables and systems
   - Uses Foundry for compilation and testing

3. **packages/eveworld/**
   - Docker-based local blockchain environment
   - Provides local Eve Frontiers blockchain for development

### Key Integration Points

1. **MUD State Synchronization**:
   - Client automatically syncs with on-chain state via MUD
   - Tables defined in `mud.config.ts` generate TypeScript types
   - Reactive updates through MUD's store subscription system

2. **Wallet Integration**:
   - Custom `MudWalletAdapter` wraps burner wallets for MUD compatibility
   - `WalletProvider` (packages/client/src/providers/WalletProvider.tsx) manages wallet state
   - Supports multiple wallet types via RainbowKit

3. **Contract Deployment Flow**:
   - Contracts compile → Generate ABI/types → Deploy to blockchain
   - Client imports generated types for type-safe contract interaction
   - Hot reload in development mode

### Development Workflow

1. **Multi-Process Development**: Uses `mprocs` or `process-compose` to run:
   - Frontend dev server (port 3000)
   - Contract watcher and deployer
   - Local blockchain node

2. **Type Generation**: Contract changes trigger automatic type generation that flows to the client

3. **Environment Variables**: 
   - `.env` file controls blockchain endpoints and configuration
   - Different configs for local/testnet/mainnet deployment

### Security Considerations

- Frontend wallet integration uses established libraries (RainbowKit, wagmi)
- Smart contracts should follow MUD framework security patterns
- Environment variables manage sensitive configuration

## Important Configuration Files

- `mud.config.ts`: Defines on-chain tables and systems
- `vite.config.ts`: Frontend build configuration
- `foundry.toml`: Smart contract compilation settings
- `tailwind.config.js`: Styling configuration with v4 setup
- `process-compose.yml` / `mprocs.yaml`: Multi-process orchestration