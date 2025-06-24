# Development Environment Setup

This guide walks through setting up your development environment for the MUD DApp Scaffold for Eve Frontier.

## Prerequisites

### ⚠️ CRITICAL: Node.js Version Requirement

**You MUST use Node.js v18.x** (not v20+ or v23+). The MUD framework has compatibility issues with newer Node.js versions.

```bash
# Check your Node.js version
node --version

# Should show v18.x.x - if not, install Node.js 18
```

**Solution: Install nvm (Node Version Manager)**

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Reload shell
source ~/.zshrc

# Install Node.js 18 and set as default
nvm install 18
nvm use 18
nvm alias default 18

# Verify installation
node --version  # Should show v18.x.x
```

**This project includes a `.nvmrc` file** - when you run `nvm use` in the project directory, it will automatically switch to Node.js 18.

### Required Tools

1. **Node.js v18.x** ⚠️ CRITICAL
2. **pnpm** (package manager)
3. **Foundry** (Ethereum development toolkit)
4. **MUD CLI** (MUD framework tools)
5. **Git**
6. **Homebrew** (macOS only)

## Installation Steps

### 1. Install pnpm

```bash
npm install -g pnpm
pnpm setup
source ~/.zshrc  # or restart terminal
```

### 2. Install Foundry

**macOS users need libusb first:**
```bash
brew install libusb
```

**Install Foundry:**
```bash
curl -L https://foundry.paradigm.xyz | bash
source ~/.zshenv
foundryup
```

**Verify Foundry:**
```bash
forge --version
cast --version
anvil --version
```

### 3. Install MUD CLI

```bash
pnpm install -g @latticexyz/cli
```

**Note:** The MUD CLI may have Node.js compatibility issues with v23+. It works with the local project installation.

### 4. Install Project Dependencies

```bash
# From project root
pnpm install
```

## Environment Setup

### Create .env Files

After installing, create your environment files from templates:

```bash
# Client environment
cp packages/client/.env.example packages/client/.env

# Contracts environment  
cp packages/contracts/.env.example packages/contracts/.env

# Eve World environment
cp packages/eveworld/.env.example packages/eveworld/.env
```

**⚠️ SECURITY WARNING**: 
- Generate NEW private keys for development
- NEVER use exposed or example private keys
- NEVER commit .env files to version control

## Development Commands

### Start Development Environment

**Always use Node.js 18 first:**
```bash
# Switch to Node.js 18 (automatic with .nvmrc)
nvm use

# Start everything
pnpm dev

# Or start components individually:
pnpm dev:client      # Start only frontend
pnpm dev:contracts   # Start only contracts (with hot reload)
pnpm dev:eveworld    # Start local blockchain
```

### Build Commands

```bash
# Build everything
pnpm build

# Build contracts only
cd packages/contracts && pnpm build

# Build frontend only  
cd packages/client && pnpm build
```

### Testing

```bash
# Run all tests
pnpm test

# Run contract tests only
cd packages/contracts && pnpm test
```

## Troubleshooting

### Common Issues

**1. "mud: command not found" when building contracts**
- The global MUD CLI may not work with newer Node.js versions
- The project uses a local MUD CLI installation which should work
- Ensure you're using Node.js v18.x

**2. "Unexpected identifier 'assert'" error**
- This indicates you're using Node.js v20+ instead of v18.x
- Install and use Node.js v18.x

**3. "forge: command not found"**
- Source your shell environment: `source ~/.zshenv`
- Or restart your terminal
- Ensure Foundry is in your PATH

**4. Build fails with "libusb" warnings**
- Install libusb: `brew install libusb` (macOS)
- This is needed for hardware wallet support

**5. pnpm global commands fail**
- Run `pnpm setup` to configure global directory
- Source your shell: `source ~/.zshrc`

### Environment Verification

Run this to verify your setup:

```bash
# Check versions
node --version    # Should be v18.x.x
pnpm --version    # Should be 8.0+
forge --version   # Should show Foundry version

# Test project build
cd packages/contracts
pnpm build        # Should complete without errors
```

## Development Workflow

1. **Always work on feature branches** (never directly on `main`)
2. **Create .env files** from templates (never commit them)
3. **Generate new private keys** for development
4. **Test builds** before committing changes
5. **Follow security practices** outlined in SECURITY_AUDIT_REPORT.md

## Next Steps

After setup is complete:
1. Create your .env files with new private keys
2. Test the development environment with `pnpm dev`
3. Read the project documentation in CLAUDE.md
4. Check out the useful links in docs/useful-links.md

## Getting Help

- **Issues**: Create an issue in GitHub and post link in #btg-mud-scaffold-chat
- **Documentation**: See docs/useful-links.md for additional resources
- **Security**: Review SECURITY_AUDIT_REPORT.md for security guidelines