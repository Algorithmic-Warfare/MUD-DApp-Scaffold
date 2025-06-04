import {
  Matches,
  QueryUpdates,
  TableUpdate,
  TableUpdates,
  Unsubscribe,
  createStash,
} from "@latticexyz/stash/internal";

import config from "contracts/mud.config";

export const stash = createStash(config);

export const fetchLogsiticsProviders = (ids: string[]) => {
  if (ids.length <= 0) return [];

  const keys = ids.map((key) => ({ id: BigInt(key) }));

  const providers = stash.getRecords({
    table: config.namespaces.AWAR.tables.LogisticProvider,
    keys,
  });

  return Object.keys(providers).map((key) => {
    return providers[key];
  });
};

export const fetchLogisticCoordinators = (ids: string[]) => {
  if (ids.length <= 0) return [];

  const keys = ids.map((key) => ({ id: BigInt(key) }));

  const coordinators = stash.getRecords({
    table: config.namespaces.AWAR.tables.LogisticCoordinator,
    keys,
  });

  return Object.keys(coordinators).map((key) => {
    return coordinators[key];
  });
};

export const fetchLogisticAgent = (ids: string[]) => {
  if (ids.length <= 0) return [];

  const keys = ids.map((key) => ({ id: BigInt(key) }));

  const agents = stash.getRecords({
    table: config.namespaces.AWAR.tables.LogisticAgent,
    keys,
  });

  return Object.keys(agents).map((key) => {
    return agents[key];
  });
};

export const fetchLogisticNetworks = (ids: string[]) => {
  if (ids.length <= 0) return [];

  const keys = ids.map((key) => ({ id: BigInt(key) }));

  const networks = stash.getRecords({
    table: config.namespaces.AWAR.tables.LogisticNetwork,
    keys,
  });

  return Object.keys(networks).map((key) => {
    return networks[key];
  });
};

export const fetchLogisticDepots = (ids: string[]) => {
  if (ids.length <= 0) return [];

  const keys = ids.map((key) => ({ id: BigInt(key) }));

  const depots = stash.getRecords({
    table: config.namespaces.AWAR.tables.LogisticDepot,
    keys,
  });

  return Object.keys(depots).map((key) => {
    return depots[key];
  });
};

export const fetchLogisticFixtures = (ids: string[]) => {
  if (ids.length <= 0) return [];

  const keys = ids.map((key) => ({ id: BigInt(key) }));

  const fixtures = stash.getRecords({
    table: config.namespaces.AWAR.tables.LogisticFixture,
    keys,
  });

  return Object.keys(fixtures).map((key) => {
    return fixtures[key];
  });
};

export const fetchLogisticOperations = (ids: string[]) => {
  if (ids.length <= 0) return [];

  const keys = ids.map((key) => ({ id: BigInt(key) }));

  const operations = stash.getRecords({
    table: config.namespaces.AWAR.tables.LogisticOperation,
    keys,
  });

  return Object.keys(operations).map((key) => {
    return operations[key];
  });
};

export const fetchLogisticActions = (ids: string[]) => {
  if (ids.length <= 0) return [];

  const keys = ids.map((key) => ({ id: BigInt(key) }));

  const actions = stash.getRecords({
    table: config.namespaces.AWAR.tables.LogisticAction,
    keys,
  });

  return Object.keys(actions).map((key) => {
    return actions[key];
  });
};

export const fetchLogisticTransactions = (ids: string[]) => {
  if (ids.length <= 0) return [];

  const keys = ids.map((key) => ({ id: BigInt(key) }));

  const transactions = stash.getRecords({
    table: config.namespaces.AWAR.tables.LogisticTransaction,
    keys,
  });

  return Object.keys(transactions).map((key) => {
    return transactions[key];
  });
};
