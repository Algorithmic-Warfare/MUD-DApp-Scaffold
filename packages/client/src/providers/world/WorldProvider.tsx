import { ReactNode } from "react";
import WorldContext from "./WorldContext";

type Props = {
  children: ReactNode;
};

export const WorldProvider = ({ children }: Props) => {
  const worldAddress = import.meta.env.VITE_WORLD_ADDRESS;

  if (!worldAddress) {
    console.error(
      "VITE_WORLD_ADDRESS is not defined in environment variables."
    );
    // You might want to throw an error, render a fallback UI, or handle this differently
    // depending on your application's requirements.
    return null;
  }

  return (
    <WorldContext.Provider value={{ worldAddress }}>
      {children}
    </WorldContext.Provider>
  );
};
