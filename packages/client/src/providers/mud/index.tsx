/**
 * @file
 * @summary Re-exports MUD-related hooks and components for easier access.
 * @description This index file serves as a central point for exporting core MUD
 * (Multi-chain Decentralized) related functionalities, making them easily
 * importable from a single path.
 *
 * @exports useMud - Custom React Hook to access MUD setup and synchronization state.
 * @exports MudProvider - Provides MUD setup and synchronization context to its children.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Module Aggregation**: This file simplifies imports for MUD-related features.
 * - **Component Discovery**: AI tools can scan this file to identify available MUD hooks and providers.
 */
// Re-export the useMud hook from MudContext for easier access
export { useMud } from "./MudContext";
// Re-export the MudProvider component from MudProvider for easier access
export { MudProvider } from "./MudProvider";
