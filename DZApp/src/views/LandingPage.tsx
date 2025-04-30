import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { useSyncProgress } from "src/data/mud/useSyncProgress";
import EveLoadingAnimation from "src/components/EveLoadingAnimation";
import { Button } from "src/components/ui/Button";

const LandingPage: React.FC = () => {
  const { isLive, message, percentage } = useSyncProgress();

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <EveLoadingAnimation position="horizontal">
        <div className="bg-crude/50 w-[400px] m-6 border border-brightquantum flex items-center justify-center">
          <ConnectButton.Custom>
            {({ account, chain, openConnectModal, mounted }) => {
              const connected = mounted && account && chain;

              if (!isLive) {
                return <div className="w-full text-center font-black uppercase bg-brightquantum text-crude m-2 p-2">
                  {`${message} (${percentage.toFixed(1)}%)…`}
                </div>;
              }

              return (
                <div className="bg-crude text-crude m-2 p-1">
                  {!connected && (
                    <Button onClick={openConnectModal}>Connect</Button>
                  )}
                </div>
              );
            }}
          </ConnectButton.Custom>
        </div>
      </EveLoadingAnimation>
    </div>
  );
};

export default React.memo(LandingPage);
