# Client Application

A React-based client for interacting with MUD systems, built with Vite and TypeScript, featuring MUD integration for state management and blockchain operations.

## Features

- **React 18** with TypeScript
- **Vite** build tool
- **Tailwind CSS** for styling
- **MUD** (Mutable Universe Design) for state management
- **viem** for blockchain interactions

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
├── App.css              # Central file for all styling
├── index.tsx            # Entry point
├── routes.tsx           # Application routes
├── assets/              # Static assets
├── components/          # Reusable components
│   └── ui/              # shadcn UI components
├── providers/           # Various context providers
│   └── mud/             # ...
│   └── wallet/          # ...
├── data/
│   └── mud/             # MUD integration and blockchain logic
├── utils/               # Utility functions
└── views/               # Page components
```

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
```

## Scripts

- `dev`: Start development server
- `build`: Create production build
- `preview`: Preview production build locally
- `test`: Run type checking

## Styling

We are using tailwind v4, all styling is centralized around `./App.css`. Might consider breaking it down into smaller files under `./src/style` folder.


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
