// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

string constant UNREGISTERED_PROVIDER = "Provider does not exist.";
string constant UNREGISTERED_COORDINATOR = "Coordinator does not exist.";
string constant UNREGISTERED_AGENT = "Agent does not exist.";

interface ActorErrors {
  error PROVIDER_InvalidProvider(string message);
  error COORDINATOR_InvalidCoordinator(string message);
  error AGENT_InvalidAgent(string message);
}
