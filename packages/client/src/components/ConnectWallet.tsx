import React, { useEffect, useState } from "react";

import { PrimaryLogo } from "src/assets";
import { SupportedWallets } from "@eveworld/types";
import LoadingAnimation from "src/components/creative/LoadingAnimation";
import { Button } from "src/components/ui/Button";
import { ScrambleTextReveal } from "./creative";

/**
 * Component for connecting different supported wallets in Eve dApps.
 *
 * Checks for available wallets, displays options to connect with MetaMask and EVE Vault,
 * and provides links for installing EVE Vault and dApp docs.
 *
 * @returns JSX.Element representing the UI for connecting wallets
 */
const ConnectWallet = React.memo(
  ({
    handleConnect,
    availableWallets,
  }: {
    handleConnect: (preferredWallet: SupportedWallets) => void;
    availableWallets: SupportedWallets[];
  }): JSX.Element => {
    const [isFrontierWallet, setIsFrontierWallet] = useState<boolean>(false);

    useEffect(() => {
      if (availableWallets.includes(SupportedWallets.FRONTIER)) {
        setIsFrontierWallet(true);
      }
    }, [availableWallets]);

    if (isFrontierWallet) handleConnect(SupportedWallets.FRONTIER);

    const isEveVaultInjected =
      availableWallets.includes(SupportedWallets.EVEVAULT) ||
      availableWallets.includes(SupportedWallets.ONEKEY);

    console.log(availableWallets);

    return (
      <div className="h-screen max-w-[560px] mx-auto relative flex flex-col items-center justify-center">
        <LoadingAnimation position="diagonal">
          <div
            className="border border-primary h-[280px] w-[280px] relative cursor-pointer"
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
              <Button className="mx-auto uppercase" id="connect-evevault">
                {isEveVaultInjected
                  ? "Connect with EVE Vault"
                  : "Please install EVE Vault"}
              </Button>
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
              <ScrambleTextReveal
                text="Connect with MetaMask"
                speedMultiplier={7}
                scrambleInterval={4}
              />
            </Button>
          ) : null}

          <Button
            className="mx-auto"
            onClick={() =>
              window.open("https://symplectic.link/Algorithmic+Warfare/INDEX")
            }
          >
            Documentation
          </Button>
        </div>
      </div>
    );
  }
);

export default React.memo(ConnectWallet);
