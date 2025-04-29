import React from "react";
import { Outlet } from "react-router-dom";
import { useAccount } from "wagmi";

import { useSyncProgress } from "src/data/mud/useSyncProgress";
import { useSmartCharacter } from "src/data/mud/useSmartCharacter";

import Header from "src/components/Header";

import LandingPage from "src/views/LandingPage";
import CharacterRequired from "src/views/CharacterRequired";

import "@rainbow-me/rainbowkit/styles.css";
import "src/App.css";

const App = () => {
  const { isLive } = useSyncProgress();
  const { address, isConnected } = useAccount();
  const { smartCharacter } = useSmartCharacter();

  if (!isLive || !address || !isConnected) return <LandingPage />;

  if (!smartCharacter.isSmartCharacter) return <CharacterRequired />;

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default React.memo(App);
