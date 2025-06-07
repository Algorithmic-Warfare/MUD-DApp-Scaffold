import { createContext, ReactNode, useContext } from "react";

import { SetupResult } from "../setup";

const MUDContext = createContext<SetupResult | null>(null);

type MUDProviderProps = {
  children: ReactNode;
  value: SetupResult;
};

const MUDProvider = ({ children, value }: MUDProviderProps) => {
  const currentValue = useContext(MUDContext);
  if (currentValue) throw new Error("MUDProvider can only be used once");
  return <MUDContext.Provider value={value}>{children}</MUDContext.Provider>;
};

export default MUDProvider;

export const useMUD: () => SetupResult = () => {
  const value = useContext(MUDContext);
  if (!value) throw new Error("Must be used within a MUDProvider");
  return value;
};
