# Client Application

A React-based client for interacting with MUD systems, built with Vite and TypeScript, featuring MUD integration for state management and blockchain operations.


## Requirements

Get setup using, [Frontier devbox Ansible setup script](https://github.com/Algorithmic-Warfare/frontier-dev-box-setup), to get your fresh Ubuntu envrionment ready for development in one-command run.

## Dependencies

Install NPM packages,
```bash
cd packages/contracts
pnpm install
```

## Variables

Create `.env` file from `.envsample`:
```bash
cp .envsample .env
```

Currently, the required variables are `VITE_CHAIN_ID` and `VITE_WORLD_ADDRESS`.

**Example `.env` for local**
```sh
VITE_CHAIN_ID=31337
VITE_WORLD_ADDRESS=0x0165878a594ca255338adfa4d48449f69242eb8f

```

**Example `.env` for pyrope**
```sh
VITE_CHAIN_ID=695569
VITE_WORLD_ADDRESS= # INSERT Current world address ...

```

## Scripts

- `dev`: Start development server
- `build`: Create production build
- `preview`: Preview production build locally
- `test`: Run type checking