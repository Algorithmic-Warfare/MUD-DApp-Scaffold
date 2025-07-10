/**
 * @file Defines interfaces and types for Ethereum providers, following EIP-6963 and EIP-1193 standards.
 */

/**
 * Interface for provider information following EIP-6963.
 */
export interface EIP6963ProviderInfo {
  /** Unique identifier for the wallet, e.g., io.metamask, io.metamask.flask. */
  walletId: string;
  /** Globally unique ID to differentiate between provider sessions for the lifetime of the page. */
  uuid: string;
  /** Human-readable name of the wallet. */
  name: string;
  /** URL to the wallet's icon. */
  icon: string;
}

/**
 * Interface for Ethereum providers based on the EIP-1193 standard.
 */
export interface EIP1193Provider {
  /** Optional: Indicates the status of the provider. */
  isStatus?: boolean;
  /** Optional: Host URL of the Ethereum node. */
  host?: string;
  /** Optional: Path to a specific endpoint or service on the host. */
  path?: string;
  /** Optional: Chain ID of the Ethereum network. */
  chainId?: string;
  /**
   * Subscribes to events from the provider.
   * @param event The name of the event to subscribe to.
   * @param callback The callback function to be called when the event occurs.
   */
  on: (
    event: string,
    callback: (error: Error | null, response: unknown) => void
  ) => void;
  /**
   * Optional: Sends an asynchronous request to the provider.
   * @param request The request object containing method and optional parameters.
   * @param callback The callback function to be called with the response or error.
   */
  sendAsync?: (
    request: { method: string; params?: Array<unknown> },
    callback: (error: Error | null, response: unknown) => void
  ) => void;
  /**
   * Optional: Sends a synchronous request to the provider.
   * @param request The request object containing method and optional parameters.
   * @param callback The callback function to be called with the response or error.
   */
  send?: (
    request: { method: string; params?: Array<unknown> },
    callback: (error: Error | null, response: unknown) => void
  ) => void;
  /**
   * Standard method for sending requests per EIP-1193.
   * @param request The request object containing method and optional parameters.
   * @returns A Promise that resolves with the response from the provider.
   */
  request: (request: {
    method: string;
    params?: Array<unknown>;
  }) => Promise<unknown>;
}

/**
 * Interface detailing the structure of provider information and its Ethereum provider.
 */
export interface EIP6963ProviderDetail {
  /** The provider's information. */
  info: EIP6963ProviderInfo;
  /** The EIP-1193 compatible provider. */
  provider: EIP1193Provider;
}

/**
 * Type representing the event structure for announcing a provider based on EIP-6963.
 */
export type EIP6963AnnounceProviderEvent = {
  detail: {
    /** The provider's information. */
    info: EIP6963ProviderInfo;
    /** The EIP-1193 compatible provider. */
    provider: EIP1193Provider;
  };
};
