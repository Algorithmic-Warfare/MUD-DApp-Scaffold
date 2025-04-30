import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { useSmartCharacter } from "src/data/mud/useSmartCharacter";
import { Button } from "./ui/Button";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const { smartCharacter } = useSmartCharacter();

  return <header className="w-full p-2 bg-gray-neutral/20 flex items-center justify-between">
    <div className="flex-grow">
      <div className="flex items-center gap-2">
        <Button variant={location.pathname === "/access-control" ? "default" : "ghost"} asChild>
          <Link className="font-disket" to="/access-control">Access Control</Link>
        </Button>
        <Button variant={location.pathname === "/operations" ? "default" : "ghost"} asChild>
          <Link className="font-disket" to="/operations">Operations</Link>
        </Button>
        <Button variant={location.pathname === "/infrastructure" ? "default" : "ghost"} asChild>
          <Link className="font-disket" to="/infrastructure">Infrastructure</Link>
        </Button>
      </div>
    </div>
    <div className="">
      <ConnectButton.Custom>
        {({ openAccountModal }) => {
          return (
            <button className="flex items-center gap-2 hover:bg-martian-red p-2 rounded-full" onClick={openAccountModal}>
              <img
                className="rounded-full h-[24px] w-[24px] group-hover:drop-shadow-[0px_0px_4px_rgb(255,196,46)]"
                src={smartCharacter.image}
              />
              <span className="text-sm">{smartCharacter.name}</span>
            </button>
          );
        }}
      </ConnectButton.Custom>
    </div>
  </header>;
};

export default React.memo(Header);
