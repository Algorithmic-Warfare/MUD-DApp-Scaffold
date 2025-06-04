import { Abi } from "abitype";

import { encodeFunctionData, decodeFunctionResult } from "viem";

// Add system ABI's once minehaul is merged and compiled.
import provierAbi from "contracts/out/LogisticProviderSystem.sol/LogisticProviderSystem.abi.json";
import coordinatorAbi from "contracts/out/LogisticCoordinatorSystem.sol/LogisticCoordinatorSystem.abi.json";
import agentAbi from "contracts/out/LogisticAgentSystem.sol/LogisticAgentSystem.abi.json";
import networkAbi from "contracts/out/LogisticNetworkSystem.sol/LogisticNetworkSystem.abi.json";
import depotAbi from "contracts/out/LogisticDepotSystem.sol/LogisticDepotSystem.abi.json";
import fixtureAbi from "contracts/out/LogisticFixtureSystem.sol/LogisticFixtureSystem.abi.json";
import operationAbi from "contracts/out/LogisticOperationSystem.sol/LogisticOperationSystem.abi.json";
import actionAbi from "contracts/out/LogisticActionSystem.sol/LogisticActionSystem.abi.json";
import transactAbi from "contracts/out/LogisticTransactionSystem.sol/LogisticTransactionSystem.abi.json";

import {
  LogisticActionType,
  LogisticFixtureType,
  LogisticTransactionType,
} from "src/data/mud/types";

import * as systems from "src/data/mud/systems";

const findFunctionAbi = (abi: Abi, name: string): Abi => {
  return abi.filter((entry) => {
    if (entry.type !== "function") return false;
    if (entry.name !== name) return false;
    return true;
  });
};

export const createLogisticAgent = async (
  worldContract: any,
  smartCharacterAddress: `0x${string}`,
  operationId: BigInt
): Promise<bigint> => {
  const agentData = encodeFunctionData({
    abi: findFunctionAbi(agentAbi, "createLogisticAgent"),
    args: [smartCharacterAddress, operationId],
  });

  const data = await worldContract.write.call([systems.agentSystem, agentData]);

  return decodeFunctionResult({
    abi: agentAbi,
    functionName: "createLogisticAgent",
    data,
  });
};

export const deleteLogisticAgent = async (
  worldContract: any,
  agentId: BigInt
): Promise<void> => {
  const agentData = encodeFunctionData({
    abi: findFunctionAbi(agentAbi, "deleteLogisticAgent"),
    args: [agentId],
  });

  return await worldContract.write.call([systems.agentSystem, agentData]);
};

export const createLogisticCoordinator = async (
  worldContract: any,
  smartCharacterAddress: `0x${string}`,
  networkId: BigInt
): Promise<bigint> => {
  const coordinatorData = encodeFunctionData({
    abi: findFunctionAbi(coordinatorAbi, "createLogisticCoordinator"),
    args: [smartCharacterAddress, networkId],
  });

  const data = await worldContract.write.call([
    systems.coordinatorSystem,
    coordinatorData,
  ]);

  return decodeFunctionResult({
    abi: coordinatorAbi,
    functionName: "createLogisticCoordinator",
    data,
  });
};

export const deleteLogisticCoordinator = async (
  worldContract: any,
  coordinatorId: BigInt
): Promise<void> => {
  const coordinatorData = encodeFunctionData({
    abi: findFunctionAbi(coordinatorAbi, "deleteLogisticCoordinator"),
    args: [coordinatorId],
  });

  return await worldContract.write.call([
    systems.coordinatorSystem,
    coordinatorData,
  ]);
};

export const createLogisticProvider = async (
  worldContract: any,
  smartCharacterAddress: `0x${string}`
): Promise<bigint> => {
  const providerData = encodeFunctionData({
    abi: findFunctionAbi(provierAbi, "createLogisticProvider"),
    args: [smartCharacterAddress],
  });

  const data = await worldContract.write.call([
    systems.providerSystem,
    providerData,
  ]);

  return decodeFunctionResult({
    abi: provierAbi,
    functionName: "createLogisticProvider",
    data,
  });
};

export const deleteLogisticProvider = async (
  worldContract: any,
  providerId: BigInt
): Promise<void> => {
  const providerData = encodeFunctionData({
    abi: findFunctionAbi(provierAbi, "deleteLogisticProvider"),
    args: [providerId],
  });

  return await worldContract.write.call([systems.providerSystem, providerData]);
};

export const createLogisticAction = async (
  worldContract: any,
  actionItemId: BigInt,
  actionItemAmount: BigInt,
  sourceId: BigInt,
  destinationId: BigInt,
  operationId: BigInt
): Promise<bigint> => {
  const actionData = encodeFunctionData({
    abi: findFunctionAbi(actionAbi, "createLogisticAction"),
    args: [
      actionItemId,
      actionItemAmount,
      sourceId,
      destinationId,
      operationId,
    ],
  });

  const data = await worldContract.write.call([
    systems.actionSystem,
    actionData,
  ]);

  return decodeFunctionResult({
    abi: actionAbi,
    functionName: "createLogisticAction",
    data,
  });
};

export const deleteLogisticAction = async (
  worldContract: any,
  actionId: BigInt
): Promise<void> => {
  const actionData = encodeFunctionData({
    abi: findFunctionAbi(actionAbi, "deleteLogisticAction"),
    args: [actionId],
  });

  return await worldContract.write.call([systems.actionSystem, actionData]);
};

export const editActionType = async (
  worldContract: any,
  actionId: BigInt,
  newActionType: LogisticActionType
): Promise<void> => {
  const actionData = encodeFunctionData({
    abi: findFunctionAbi(actionAbi, "editActionType"),
    args: [actionId, newActionType],
  });

  return await worldContract.write.call([systems.actionSystem, actionData]);
};

export const editActionSource = async (
  worldContract: any,
  actionId: BigInt,
  newSourceId: BigInt
): Promise<void> => {
  const actionData = encodeFunctionData({
    abi: findFunctionAbi(actionAbi, "editActionSource"),
    args: [actionId, newSourceId],
  });

  return await worldContract.write.call([systems.actionSystem, actionData]);
};

export const editActionDestination = async (
  worldContract: any,
  actionId: BigInt,
  newDestinationId: BigInt
): Promise<void> => {
  const actionData = encodeFunctionData({
    abi: findFunctionAbi(actionAbi, "editActionDestination"),
    args: [actionId, newDestinationId],
  });

  return await worldContract.write.call([systems.actionSystem, actionData]);
};

export const editActionItemId = async (
  worldContract: any,
  actionId: BigInt,
  newActionId: BigInt
): Promise<void> => {
  const actionData = encodeFunctionData({
    abi: findFunctionAbi(actionAbi, "editActionItemId"),
    args: [actionId, newActionId],
  });

  return await worldContract.write.call([systems.actionSystem, actionData]);
};

export const editActionItemAmount = async (
  worldContract: any,
  actionId: BigInt,
  newActionItemAmount: BigInt
): Promise<void> => {
  const actionData = encodeFunctionData({
    abi: findFunctionAbi(actionAbi, "editActionItemAmount"),
    args: [actionId, newActionItemAmount],
  });

  return await worldContract.write.call([systems.actionSystem, actionData]);
};

export const createLogisticOperation = async (
  worldContract: any,
  codename: string,
  coordinatorId: BigInt,
  agentIds: BigInt[]
): Promise<bigint> => {
  const operatonData = encodeFunctionData({
    abi: findFunctionAbi(operationAbi, "createLogisticOperation"),
    args: [codename, coordinatorId, agentIds],
  });

  const data = worldContract.write.call([
    systems.operationSystem,
    operatonData,
  ]);

  return await decodeFunctionResult({
    abi: operationAbi,
    functionName: "createLogisticOperation",
    data,
  });
};

export const deleteLogisticOperation = async (
  worldContract: any,
  operationId: BigInt
): Promise<void> => {
  const operationData = encodeFunctionData({
    abi: findFunctionAbi(operationAbi, "deleteLogisticOperation"),
    args: [operationId],
  });

  return await worldContract.write.call([
    systems.operationSystem,
    operationData,
  ]);
};

export const transferOperationControl = async (
  worldContract: any,
  operationId: BigInt,
  newCoordinatorId: BigInt
): Promise<void> => {
  const operationData = encodeFunctionData({
    abi: findFunctionAbi(operationAbi, "transferOperationalControl"),
    args: [operationId, newCoordinatorId],
  });

  return await worldContract.write.call([
    systems.operationSystem,
    operationData,
  ]);
};

export const addOperationAgent = async (
  worldContract: any,
  operationId: BigInt,
  agentId: BigInt
): Promise<void> => {
  const operationData = encodeFunctionData({
    abi: findFunctionAbi(operationAbi, "addOperationAgent"),
    args: [operationId, agentId],
  });

  return await worldContract.write.call([
    systems.operationSystem,
    operationData,
  ]);
};

export const removeOperationAgent = async (
  worldContract: any,
  operationId: BigInt,
  agentId: BigInt
): Promise<void> => {
  const operationData = encodeFunctionData({
    abi: findFunctionAbi(operationAbi, "removeOperationAgent"),
    args: [operationId, agentId],
  });

  return await worldContract.write.call([
    systems.operationSystem,
    operationData,
  ]);
};

export const createLogisticsTransaction = async (
  worldContract: any,
  transactionType: LogisticTransactionType,
  transactionItemId: BigInt,
  transactionItemAmount: BigInt,
  agentId: BigInt,
  depotId: BigInt,
  actionId: BigInt
): Promise<bigint> => {
  const transactData = encodeFunctionData({
    abi: findFunctionAbi(transactAbi, "createLogisticTransaction"),
    args: [
      transactionType,
      transactionItemId,
      transactionItemAmount,
      agentId,
      depotId,
      actionId,
    ],
  });

  const data = await worldContract.write.call([
    systems.transactSystem,
    transactData,
  ]);

  return decodeFunctionResult({
    abi: transactAbi,
    functionName: "createLogisticTransaction",
    data,
  });
};

export const createLogisticDepot = async (
  worldContract: any,
  providerId: BigInt,
  codename: string,
  smartStorageUnitId: BigInt
): Promise<bigint> => {
  const depotData = encodeFunctionData({
    abi: findFunctionAbi(depotAbi, "createLogisticDepot"),
    args: [providerId, codename, smartStorageUnitId],
  });

  const data = await worldContract.write.call([systems.depotSystem, depotData]);

  return decodeFunctionResult({
    abi: depotAbi,
    functionName: "createLogisticDepot",
    data,
  });
};

export const editDepotCodename = async (
  worldContract: any,
  depotId: BigInt,
  newCodename: string
): Promise<void> => {
  const depotData = encodeFunctionData({
    abi: findFunctionAbi(depotAbi, "editDepotCodename"),
    args: [depotId, newCodename],
  });

  return await worldContract.write.call([systems.depotSystem, depotData]);
};

export const deleteLogisticDepot = async (
  worldContract: any,
  depotId: BigInt
): Promise<void> => {
  const depotData = encodeFunctionData({
    abi: findFunctionAbi(depotAbi, "deleteLogisticDepot"),
    args: [depotId],
  });

  return await worldContract.write.call([systems.depotSystem, depotData]);
};

export const createLogisticFixture = async (
  worldContract: any,
  providerId: BigInt,
  codename: string,
  fixtureType: LogisticFixtureType
): Promise<bigint> => {
  const fixtureData = encodeFunctionData({
    abi: findFunctionAbi(fixtureAbi, "createLogisticFixture"),
    args: [providerId, codename, fixtureType],
  });

  const data = await worldContract.write.call([
    systems.fixtureSystem,
    fixtureData,
  ]);

  return decodeFunctionResult({
    abi: fixtureAbi,
    functionName: "createLogisticFixture",
    data,
  });
};

export const editFixtureName = async (
  worldContract: any,
  providerId: BigInt,
  codename: string
): Promise<void> => {
  const fixtureData = encodeFunctionData({
    abi: findFunctionAbi(fixtureAbi, "editFixtureCodename"),
    args: [providerId, codename],
  });

  return await worldContract.write.call([systems.fixtureSystem, fixtureData]);
};

export const deleteLogisticFixture = async (
  worldContract: any,
  fixtureId: BigInt
): Promise<void> => {
  const fixtureData = encodeFunctionData({
    abi: findFunctionAbi(fixtureAbi, "deleteLogisticFixture"),
    args: [fixtureId],
  });

  return await worldContract.write.call([systems.fixtureSystem, fixtureData]);
};

export const createLogisticsNetwork = async (
  worldContract: any,
  providerId: BigInt,
  codename: string,
  depotIds: BigInt[],
  fixtureIds: BigInt[],
  coordinatorIds: BigInt[]
): Promise<bigint> => {
  const networkData = encodeFunctionData({
    abi: findFunctionAbi(networkAbi, "createLogisticNetwork"),
    args: [providerId, codename, depotIds, fixtureIds, coordinatorIds],
  });

  const data = await worldContract.write.call([
    systems.networkSystem,
    networkData,
  ]);

  return decodeFunctionResult({
    abi: networkAbi,
    functionName: "createLogisticNetwork",
    data,
  });
};

export const deleteLogisticNetwork = async (
  worldContract: any,
  networkId: BigInt
): Promise<void> => {
  const networkData = encodeFunctionData({
    abi: findFunctionAbi(networkAbi, "deleteLogisticNetwork"),
    args: [networkId],
  });

  return await worldContract.write.call([systems.networkSystem, networkData]);
};

export const editNetworkCodename = async (
  worldContract: any,
  networkId: BigInt,
  newCodename: string
): Promise<void> => {
  const networkData = encodeFunctionData({
    abi: findFunctionAbi(networkAbi, "editNetworkCodename"),
    args: [networkId, newCodename],
  });

  return await worldContract.write.call([systems.networkSystem, networkData]);
};

export const transferNetworkOwnership = async (
  worldContract: any,
  networkId: BigInt,
  newNetworkProviderId: BigInt
): Promise<void> => {
  const networkData = encodeFunctionData({
    abi: findFunctionAbi(networkAbi, "transferNetworkOwnership"),
    args: [networkId, newNetworkProviderId],
  });

  return await worldContract.write.call([systems.networkSystem, networkData]);
};

export const addNetworkCoordinator = async (
  worldContract: any,
  networkId: BigInt,
  coordinatorId: BigInt
): Promise<void> => {
  const networkData = encodeFunctionData({
    abi: findFunctionAbi(networkAbi, "addNetworkCoordinator"),
    args: [networkId, coordinatorId],
  });

  return await worldContract.write.call([systems.networkSystem, networkData]);
};

export const removeNetworkCoordinator = async (
  worldContract: any,
  networkId: BigInt,
  coordinatorId: BigInt
): Promise<void> => {
  const networkData = encodeFunctionData({
    abi: findFunctionAbi(networkAbi, "removeNetworkCoordinator"),
    args: [networkId, coordinatorId],
  });

  return await worldContract.write.call([systems.networkSystem, networkData]);
};

export const addNetworkDepot = async (
  worldContract: any,
  networkId: BigInt,
  depotId: BigInt
): Promise<void> => {
  const networkData = encodeFunctionData({
    abi: findFunctionAbi(networkAbi, "addNetworkDepot"),
    args: [networkId, depotId],
  });

  return await worldContract.write.call([systems.networkSystem, networkData]);
};

export const removeNetworkDepot = async (
  worldContract: any,
  networkId: BigInt,
  depotId: BigInt
): Promise<void> => {
  const networkData = encodeFunctionData({
    abi: findFunctionAbi(networkAbi, "removeNetworkDepot"),
    args: [networkId, depotId],
  });

  return await worldContract.write.call([systems.networkSystem, networkData]);
};

export const addNetworkFixture = async (
  worldContract: any,
  networkId: BigInt,
  fixtureId: BigInt
): Promise<void> => {
  const networkData = encodeFunctionData({
    abi: findFunctionAbi(networkAbi, "addNetworkFixture"),
    args: [networkId, fixtureId],
  });

  return await worldContract.write.call([systems.networkSystem, networkData]);
};

export const removeNetworkFixture = async (
  worldContract: any,
  networkId: BigInt,
  fixtureId: BigInt
) => {
  const networkData = encodeFunctionData({
    abi: findFunctionAbi(networkAbi, "removeNetworkFixture"),
    args: [networkId, fixtureId],
  });

  return await worldContract.write.call([systems.networkSystem, networkData]);
};
