// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

struct ProofArgs {
  uint256[2] _pA;
  uint256[2][2] _pB;
  uint256[2] _pC;
  uint256[45] _pubSignals;
}
