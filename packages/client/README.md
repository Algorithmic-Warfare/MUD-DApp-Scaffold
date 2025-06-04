# Client Application

A React-based client for interacting with blockchain systems, built with Vite and TypeScript, featuring MUD integration for state management and blockchain operations.

## Features

- **React 18** with TypeScript
- **Vite** build tool
- **Tailwind CSS** for styling
- **MUD** (Mutable Universe Design) for state management
- **Radix UI** component library
- **Zod** for schema validation
- **viem** and **wagmi** for blockchain interactions

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- pnpm

### Installation

```bash
pnpm install
```

### Running the Development Server

```bash
pnpm dev
```

## Project Structure

```
src/
├── App.tsx              # Root component
├── index.tsx            # Entry point
├── routes.tsx           # Application routes
├── assets/              # Static assets
├── components/          # Reusable components
│   └── ui/              # Radix-based UI components
├── data/
│   └── mud/             # MUD integration and blockchain logic
├── utils/               # Utility functions
└── views/               # Page components
```

## Dependencies

### Core
- `react` (^18.3.1)
- `react-dom` (^18.3.1)
- `typescript` (^5.5.3)
- `vite` (^6.3.4)

### State Management
- `@latticexyz/store` (^2.2.21)
- `@latticexyz/store-sync` (^2.2.21)
- `zustand` (^4.5.6)
- `valtio` (^1.11.2)

### Blockchain
- `viem` (^2.23.2)
- `wagmi` (^2.14.0)
- `@wagmi/core` (^2.16.0)

### UI
- `@radix-ui/react-*` (various)
- `lucide-react` (^0.503.0)
- `tailwindcss` (^4.1.4)

### Utilities
- `rxjs` (7.5.5)
- `zod` (^3.24.3)
- `clsx` (^2.1.1)

## Configuration

### Environment Variables

Create `.env` file from `.envsample`:

```bash
cp .envsample .env
```

Required variables:
```env
VITE_CHAIN_ID=695569
VITE_WORLD_ADDRESS=0x90373cf89e73168cdf90e99d0a7fa9c4b5625c6a
VITE_PROJECT_ID=cfcf46895c8366db4758d0ef469bd7ec
VITE_EXPLORER_URL=https://explorer.pyropechain.com
```

## Scripts

- `dev`: Start development server
- `build`: Create production build
- `preview`: Preview production build locally
- `test`: Run type checking

## Styling

Configured via `tailwind.config.js` with:
- Custom color palette
- Responsive breakpoints
- Plugin support

PostCSS configured in `postcss.config.js` with Tailwind plugin.

## State Management

Uses MUD framework for:
- Blockchain state synchronization
- System calls
- Transaction management

## Routing

Implemented via `react-router-dom` with routes defined in `routes.tsx`.

## Deployment

Production build:
```bash
pnpm build
```

Outputs to `dist/` directory optimized for modern browsers.
