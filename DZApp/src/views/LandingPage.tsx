import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { useSyncProgress } from "src/data/mud/useSyncProgress";

const LandingPage: React.FC = () => {
  const { isLive, message, percentage } = useSyncProgress();

  return (
    <div>
      <ConnectButton.Custom>
        {({ account, chain, openConnectModal, mounted }) => {
          const connected = mounted && account && chain;

          if (!isLive) {
            return <div>{`${message} (${percentage.toFixed(1)}%)…`}</div>;
          }

          return (
            <div>
              {!connected && (
                <button onClick={openConnectModal}>Connect</button>
              )}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </div>
  );
};

export default React.memo(LandingPage);
