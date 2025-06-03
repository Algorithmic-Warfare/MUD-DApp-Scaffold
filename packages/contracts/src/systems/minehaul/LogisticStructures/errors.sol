// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

string constant NOT_AN_SSU_OWNER = "Caller doesn't own the Smart Storage Unit (SSU).";

string constant NOT_A_PROVIDER_FOR_ALL_NETOWRKS = "Caller attempts to add depot into networks they don't own.";

string constant NOT_A_REGISTERED_PROVIDER = "Caller is not a registered provider";

interface StructureErrors {
  error DEPOT_DoesNotOwnSmartStorageUnit(string message);
  error DEPOT_DoesNotProvideForAllNetworks(string message);
  error NETWORK_InvalidProvider(string message);
}
