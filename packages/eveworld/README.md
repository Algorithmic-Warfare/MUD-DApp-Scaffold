# CCP Contract Deployment Stack

## Overview
Local development environment for EVE token and smart contract system featuring:
- Local Anvil Ethereum node (Foundry)
- Automated world contract deployer
- Integrated logging system

## Services
```mermaid
graph LR
    Foundry[Foundry Node\nport 8546] -->|RPC| Deployer[World Deployer]
    Deployer -->|Writes| Logs[Deployment Logs]
```

## Configuration

### Required .env Variables
```ini
# Node Connection
RPC_URL=http://foundry:8546  # Anvil RPC endpoint
PRIVATE_KEY=0xac0974...ff80  # Test account private key

# Token Configuration
BASE_URI="https://api.example.com/metadata/"  # Metadata service endpoint
ERC20_TOKEN_NAME="EVE Token"                 # ERC20 token name
ERC20_TOKEN_SYMBOL="EVE"                     # ERC20 token symbol
ERC20_INITIAL_SUPPLY="1000000000000000000000000"  # Initial supply (wei)
EVE_TOKEN_NAMESPACE="eve"                    # Token namespace
EVE_TOKEN_ADMIN="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"  # Admin address

# Deployment Configuration
ADMIN_ACCOUNTS="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"  # Admin addresses
TENANT="your-tenant-id"                     # Tenant identifier
WORLD_VERSION="1.0.0"                       # Contract version

# Smart Object Configuration
CHARACTER_TYPE_ID="1"                       # Character type identifier  
CHARACTER_VOLUME="100"                      # Character volume
NETWORK_NODE_TYPE_ID="2"                    # Network node type ID
NETWORK_NODE_VOLUME="50"                    # Network node volume
TYPE_IDS="4,5,6"                            # Additional type IDs
ASSEMBLY_TYPE_ID="3"                        # Assembly type identifier

# Fuel/Energy System
ENERGY_CONSTANT="1000000"                   # Base energy constant
FUEL_TYPE_ID="4"                            # Fuel type identifier
FUEL_EFFICIENCY="80"                        # Fuel efficiency percentage
FUEL_VOLUME="5000"                          # Fuel volume
```

## Usage
```bash
# Start services
docker compose up -d && docker compose logs -f world-deployer

```