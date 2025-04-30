import { Abi } from "abitype";

import { encodeFunctionData, decodeFunctionData } from "viem";

// Add system ABI's once minehaul is merged and compiled.

import * as systems from "src/data/mud/systems";

const findFunctionAbi = (abi: Abi, name: string): Abi => {
  return abi.filter((entry) => {
    if (entry.type !== "function") return false;
    if (entry.name !== name) return false;
    return true;
  });
};

// Implement system calls that send transactions to MUD systems.
