# Commenting and Documentation Guidelines

This document outlines the best practices and heuristics for writing clear, concise, and comprehensive comments and documentation within our codebase. Following these guidelines ensures consistency, improves code readability, and facilitates easier maintenance and understanding for both human developers and AI tools.

## 1. General Principles

*   **Clarity and Conciseness**: Comments should be easy to understand and to the point. Avoid jargon where simpler terms suffice.
*   **Comprehensiveness**: Document all public APIs, complex logic, and non-obvious decisions. If a piece of code isn't immediately clear, it needs a comment.
*   **Consistency**: Adhere to the established style and structure throughout the project.
*   **Maintainability**: Keep comments up-to-date with code changes. Outdated comments are worse than no comments.

## 2. JSDoc Style Comments

We utilize JSDoc for documenting JavaScript/TypeScript code. This allows for rich, structured documentation that can be parsed by various tools (e.g., VS Code, documentation generators).

### 2.1. File-Level Comments

For files that export components, contexts, or utility functions, include a file-level comment at the top. This comment should provide a brief summary of the file's purpose, a description of what it exports, and any relevant AI usage guidance.

**Example from `packages/client/src/providers/wallet/WalletProvider.tsx`:**

```typescript
/**
 * @file
 * @summary Provides the WalletProvider component for managing wallet connections and interactions.
 * @description This file exports the `WalletProvider` component, which encapsulates the logic
 * for connecting to various wallet providers (e.g., MetaMask, WalletConnect), managing
 * wallet state (connected account, chain ID), and handling wallet-related events.
 * It uses `ethers` for blockchain interactions and provides a context for child components
 * to access wallet information and functions.
 *
 * @exports WalletProvider - A React Context Provider for wallet management.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Core Wallet Logic**: This file contains the central logic for wallet integration.
 * - **Context Provider**: AI tools should recognize `WalletProvider` as a context provider
 *   that makes wallet state and functions available to its children.
 * - **Event Handling**: Pay attention to how wallet events (e.g., account changes, chain changes)
 *   are handled and propagated.
 */
```

**Example from `packages/client/src/providers/mud/MudContext.ts`:**

```typescript
/**
 * @summary React Context for MUD setup and synchronization state.
 * @description This context provides access to the combined MUD setup result and its synchronization status.
 * It's intended to be consumed by components that need to interact with or display information about the MUD network.
 *
 * @property {SetupResultT} setup - The comprehensive result object from the MUD setup process,
 *                                  including network configuration, components, and system calls.
 * @property {object} sync - An object containing various synchronization status indicators.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Consumption**: It is highly recommended to use the `useMud` hook for accessing this context,
 *   as it provides a convenient and type-safe way to consume the context value and handles null checks.
 * - **Null States**: The context value will be `null` if the `MudProvider` component, which is responsible
 *   for providing this context, has not been properly initialized or is not an ancestor in the component tree.
 *   Ensure `MudProvider` wraps any components that use `useMud`.
 */
const MudContext = createContext<MudContextValueType | null>(null);
```

### 2.2. Component/Function/Hook Comments

Every exported component, function, or custom hook should have a JSDoc block.

*   **`@summary`**: A brief, one-line summary of what the entity does.
*   **`@description`**: A more detailed explanation, including its purpose, how it works, and any side effects.
*   **`@param {Type} name - Description`**: Document each parameter, its type, name, and a clear description.
*   **`@returns {Type} - Description`**: Document the return value and its type.
*   **`@example`**: Provide a clear code example demonstrating how to use the entity.
*   **`@notes`**: Any additional important information, caveats, or usage guidance.

**Example from `packages/client/src/providers/mud/MudProvider.tsx`:**

```typescript
/**
 * @summary Provides MUD setup and synchronization context to its children.
 * @description Manages MUD network setup, synchronization status, and makes them available to child components.
 *
 * @param {Object} props - Provider props
 * @param {ReactNode} props.children - Components needing MUD access
 * @param {boolean} [props.enableDevTools=false] - Whether to enable MUD dev tools.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Initialization**: Handles MUD network setup internally.
 * - **Error States**: Check the `MudContext` for error states.
 * - **Dependencies**: Requires `WalletProvider` and `WorldProvider` in the component tree.
 */
export const MudProvider = ({ children }: MudProviderProps) => { /* ... */ };
```

**Example from `packages/client/src/providers/mud/MudContext.ts` (for `useMud` hook):**

```typescript
/**
 * @summary Custom React Hook to access MUD setup and synchronization state.
 * @description This hook provides a convenient way to consume the `MudContext`.
 * It returns the current MUD configuration, loading status, and synchronization status.
 * If the hook is used outside of a `MudProvider`, it will throw an error.
 *
 * @returns {MudContextValueType} The current value of the `MudContext`,
 *                                 containing MUD setup results and synchronization status.
 *
 * @example
 * ```typescript
 * import { useMud } from 'src/providers/mud';
 *
 * function MyComponent() {
 *   const { config, sync } = useMud();
 *
 *   if (sync.isSyncing) {
 *     return <Loader />; // Display a loader while MUD is syncing
 *   }
 *
 *   return (
 *     <div>
 *       <p>MUD is live: {sync.live ? 'Yes' : 'No'}</p>
 *       <p>Current Block: {sync.currentBlock.toString()}</p>
 *       // ... further usage of config and sync
 *     </div>
 *   );
 * }
 * ```
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Performance**: This hook is designed to be lightweight and can be safely called frequently
 *   within components without significant performance overhead.
 * - **Dependencies**: This hook requires a `MudProvider` component to be an ancestor in the React component tree.
 *   Without it, the hook will throw a runtime error.
 * - **Alternatives**: For simple checks or derived states based on the MUD context, consider creating
 *   more specific derived hooks (e.g., `useIsMudSynced`) to encapsulate logic and improve reusability.
 */
export const useMud = (): MudContextValueType => { /* ... */ };
```

### 2.3. Type Definitions (Interfaces/Types)

Document interfaces and type aliases to clarify their structure and purpose. Document individual properties within interfaces.

**Example from `packages/client/src/providers/mud/types.ts`:**

```typescript
/**
 * @summary Props for the MudProvider component.
 */
export type MudProviderProps = {
  /**
   * @description The child components that will have access to the MUD context.
   */
  children: ReactNode;
};

/**
 * @summary Defines the structure of the value provided by the MudContext.
 * @description Extends `SetupResultT` with additional synchronization and network setup state.
 */
export interface MudContextValueType extends SetupResultT {
  /**
   * @summary Synchronization status of the MUD network.
   */
  sync: {
    /**
     * @description True if the MUD network is currently syncing.
     */
    isSyncing: boolean;
    /**
     * @description True if the MUD network is live and fully synced.
     */
    live: boolean;
    // ... other sync properties
  };
  /**
   * @summary State related to the MUD network setup process.
   */
  networkSetupState: {
    /**
     * @description True if the network setup is currently in progress.
     */
    isSettingUp: boolean;
    /**
     * @description Any error encountered during the network setup, or null if no error.
     */
    error: Error | null;
  };
}
```

### 2.4. Internal Logic Comments

Use single-line (`//`) or multi-line (`/* ... */`) comments for internal logic that might be complex or non-obvious.

**Example from `packages/client/src/providers/mud/MudProvider.tsx`:**

```typescript
  // State to store the MUD network configuration and setup result
  const [networkConfig, setNetworkConfig] =
    useState<SetupFunctionReturnT | null>(null);
  // State to track if the MUD setup is currently in progress
  const [isSettingUp, setIsSettingUp] = useState(false);
  // State to store any error that occurs during MUD setup
  const [error, setError] = useState<Error | null>(null);

  // Only proceed if all necessary connection details are available and networkConfig is not yet set
  if (
    !connected ||
    !publicClient ||
    !walletClient ||
    !defaultChain ||
    networkConfig
  )
    return;
```

## 3. AI Usage Guidance

For components, hooks, or utilities that might be consumed or analyzed by AI tools, include a dedicated `## AI Usage Guidance:` section within the `@notes` JSDoc tag. This section should provide specific advice relevant to AI, such as:

*   **Initialization**: How the component/hook handles its initial setup.
*   **Error States**: How to identify and handle potential error conditions.
*   **Dependencies**: Any external dependencies or required parent components.
*   **Performance**: Notes on performance characteristics (e.g., "lightweight," "safe for frequent calls").
*   **Alternatives**: Suggestions for alternative approaches or derived utilities.

This guidance helps AI understand the context and proper usage, leading to more accurate code generation and analysis.

## 4. Re-exports (`index.ts`/`index.tsx`)

For `index` files that primarily re-export modules, provide a brief comment for each re-export to explain its purpose.

**Example from `packages/client/src/providers/mud/index.tsx`:**

```typescript
// Re-export the useMud hook from MudContext for easier access
export { useMud } from "./MudContext";
// Re-export the MudProvider component from MudProvider for easier access
export { MudProvider } from "./MudProvider";
```

## 5. Best Practices

*   **What vs. Why**: Comments should explain *why* the code does something, not just *what* it does (unless the "what" is complex). The code itself should ideally explain the "what."
*   **Avoid Redundancy**: Don't comment on obvious code.
*   **Keep it Up-to-Date**: Outdated comments are misleading. Make updating comments part of your code review process.
*   **Review**: Have another developer review your comments for clarity and accuracy.

By adhering to these guidelines, we can ensure our codebase remains well-documented, understandable, and maintainable for everyone involved.