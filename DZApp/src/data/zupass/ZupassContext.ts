import { createContext, useContext } from "react";
import { usePodVault } from "./usePodVault";

interface ZupassContextProps {
  podVault: ReturnType<typeof usePodVault>;
}

export const ZupassContext = createContext<ZupassContextProps | undefined>(
  undefined
);

export function useZupassContext() {
  const context = useContext(ZupassContext);
  if (!context) {
    throw new Error("useZupassContext must be used within an ZupassContext");
  }
  return context;
}
