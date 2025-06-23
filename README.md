# Tribe MUD DApp Scaffold

A modular foundation for building MUD-based decentralized applications with React frontend and Solidity smart contracts.

## Technology Stack

- **Frontend**: React + TypeScript + Vite + TailwindCSS
- **Smart Contracts**: Solidity + Foundry + MUD
- **Tooling**: pnpm workspaces, mprocs, ESLint, Prettier

## Project Structure


### Key Directories

| Package       | Purpose                          | Key Features                     |
|---------------|----------------------------------|----------------------------------|
| `/client`     | Frontend application             | - Wallet integration<br>- MUD context providers<br>- Task dashboard UI |
| `/contracts`  | Smart contract system            | - Task management system<br>- MUD world architecture<br>- Foundry testing |
| `/eveworld`   | Local development environment    | - Docker-compose setup<br>- Service configuration |

## Getting Started

### Prerequisites
- Linux or WSL
- Node.js v18+
- pnpm
- Foundry
- Docker

### Environment Setup (easy)

1. Install Ansible, following [](https://www.linuxtechi.com/how-to-install-ansible-on-ubuntu/)
2. Clone the dev box setup script
```sh
git clone https://github.com/Algorithmic-Warfare/frontier-dev-box-setup
```
3. Run the script following instructions in `./frontier-dev-box-setup/README.md`.


### Environment Setup (manual)

Follow the steps describe here, [](https://docs.evefrontier.com/Tools) and here, [](https://docs.evefrontier.com/LocalWorldSetup).

###  Testing

1. Fork the repository then clone the fork locally.
2. Follow the [](#getting-started) section and make sure everything works.
3. Make a new branch and call it `exp` (DO NOT WORK in the `main` branch)
4. If you detect an issue or have a suggestion, first read [](./.testerdocs/HOW%20TO%20ISSUE.md) and structure your feedback accordingly @ [](https://github.com/Algorithmic-Warfare/MUD-DApp-Scaffold/issues).

### Installation

```bash
pnpm install
```

### Development Workflows

#### Getting Started Commands
```bash
# Starts an eveworld v2 on a local node @ http://localhost:8586
pnpm world:up 

# Initiate an mprocs that,
# - Forks the world node above into http://localhost:8584
# - Deploys the systems defined in the `contracts` package in watch mode.
# - Start the client @ http://localhost:3000 in watch mode
# - Runs system tests defined in `contracts` (requires the contract deployement to resolve first). Process will fail initially but after contract deployement, press "R", to rerun them.
pnpm dev
```

## System Architecture
### Frontend Structure

See details in, [](./packages/client/README.md).

### Contract Structure

See details in, [](./packages/contracts/README.md).


## License

[MIT](/LICENSE)
