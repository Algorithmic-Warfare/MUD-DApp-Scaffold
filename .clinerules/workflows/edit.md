# General rules about editing in a MUD project

- When editing `packages/contracts/mud.config.ts`, always run `cd packages/contracts/ && pnpm mud tablegen && cd -` to sync genrated table contracts with the configuration.
- When editing `packages/contracts/src/systems/**/*System.sol`, always run `cd packages/contracts/ && pnpm mud worldgen && cd -`, to sync world interface with system functions.

