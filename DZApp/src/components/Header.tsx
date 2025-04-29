import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { useSmartCharacter } from "src/data/mud/useSmartCharacter";

const Header: React.FC = () => {
  const { smartCharacter } = useSmartCharacter();

  const User = (
    <ConnectButton.Custom>
      {({ openAccountModal }) => {
        return (
          <div onClick={openAccountModal}>
            <span> {smartCharacter.name} </span>
            <img
              className="rounded-full h-[38px] w-[38px] group-hover:drop-shadow-[0px_0px_4px_rgb(255,196,46)]"
              src={smartCharacter.image}
            />
          </div>
        );
      }}
    </ConnectButton.Custom>
  );

  return <header>{User}</header>;
};

export default React.memo(Header);
