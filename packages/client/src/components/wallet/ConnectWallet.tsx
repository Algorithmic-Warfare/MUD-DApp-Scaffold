/**
 * @file
 * @summary Provides a component for connecting different supported wallets in Eve dApps.
 * @description This file exports the `ConnectWallet` component, which presents a user interface
 * for connecting to various supported cryptocurrency wallets (e.g., MetaMask, EveVault).
 * It detects available wallets, offers connection options, and provides links for installation
 * or documentation.
 *
 * @exports ConnectWallet - A React component for wallet connection.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Authentication/Connection**: This component is crucial for initiating user interaction with blockchain functionalities.
 * - **Wallet Detection**: It checks for the presence of specific wallets and adapts its UI accordingly.
 * - **External Links**: Contains logic for redirecting users to wallet installation guides or whitepapers.
 */
import React, { useEffect, useState } from "react";

import { PrimaryLogo } from "src/assets";
import { SupportedWallets } from "@eveworld/types";
import LoadingAnimation from "src/components/creative/LoadingAnimation";
import { Button } from "src/components/ui/Button";

/**
 * @summary Props for the ConnectWallet component.
 * @property {(preferredWallet: SupportedWallets) => void} handleConnect - Callback function to initiate wallet connection.
 * @property {SupportedWallets[]} availableWallets - An array of currently detected and supported wallets.
 */
interface ConnectWalletProps {
  handleConnect: (preferredWallet: SupportedWallets) => void;
  availableWallets: SupportedWallets[];
}

/**
 * @summary Component for connecting different supported wallets in Eve dApps.
 * @description This memoized React component provides the user interface for wallet connection.
 * It dynamically displays connection options based on detected wallets, handles the connection
 * process via `handleConnect`, and offers links for further information or installation.
 *
 * @param {ConnectWalletProps} props - The props for the ConnectWallet component.
 * @returns {JSX.Element} A React element representing the UI for connecting wallets.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Conditional Rendering**: The component conditionally renders the MetaMask button based on `availableWallets`.
 * - **Auto-connection**: Attempts to auto-connect to Frontier Wallet if detected.
 * - **User Experience**: Provides visual feedback (LoadingAnimation) and clear calls to action for wallet interaction.
 */
const ConnectWallet = React.memo(
  ({
    handleConnect,
    availableWallets,
  }: ConnectWalletProps): JSX.Element => {
    const [isFrontierWallet, setIsFrontierWallet] = useState<boolean>(false);

    useEffect(() => {
      // Internal comment: Check if Frontier Wallet is among the available wallets.
      if (availableWallets.includes(SupportedWallets.FRONTIER)) {
        setIsFrontierWallet(true);
      }
    }, [availableWallets]);

    // Internal comment: Attempt to connect to Frontier Wallet immediately if it's detected.
    if (isFrontierWallet) handleConnect(SupportedWallets.FRONTIER);

    // Internal comment: Determine if EveVault (or its underlying OneKey provider) is injected.
    const isEveVaultInjected =
      availableWallets.includes(SupportedWallets.EVEVAULT) ||
      availableWallets.includes(SupportedWallets.ONEKEY);

    return (
      <div className="h-screen max-w-[560px] mx-auto relative flex flex-col items-center justify-center">
        <LoadingAnimation position="diagonal">
          <div
            className="border-2 border-primary h-[280px] w-[280px] relative cursor-pointer"
            onClick={() =>
              isEveVaultInjected
                ? handleConnect(SupportedWallets.EVEVAULT)
                : window.open(
                    "https://docs.evefrontier.com/EveVault/installation"
                  )
            }
          >
            <div className="flex items-center justify-center h-full w-full p-4">
              <PrimaryLogo />
            </div>{" "}
            <div className="absolute flex items-center justify-center w-full  -bottom-4">
              <div className="mx-auto uppercase bg-black text-primary border-2 border-primary p-2 flex items-center justify-center text-lg font-bold">
                Algorithmic Warfare
              </div>
            </div>
          </div>{" "}
        </LoadingAnimation>

        <div className="mb-10" />

        <div className="grid gap-2">
          {availableWallets.includes(SupportedWallets.METAMASK) ? (
            <Button
              className="mx-auto"
              id="connect-metamask"
              onClick={() => handleConnect(SupportedWallets.METAMASK)}
            >
              Connect with MetaMask
            </Button>
          ) : null}

          <Button
            variant="primary-link"
            className="mx-auto"
            onClick={() =>
              window.open(
                "https://symplectic.link/Algorithmic+Warfare%2C+Survival+in+Deprotocolized+Space"
              )
            }
          >
            Whitepaper
          </Button>
        </div>
      </div>
    );
  }
);

export default React.memo(ConnectWallet);
