/*
 * Create the system calls that the client can use to ask
 * for changes in the World state (using the System contracts).
 */

import { Hex } from "viem";
import { SetupNetworkResult } from "../network/setupNetwork.ts";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
  /*
   * The parameter list informs TypeScript that:
   *
   * - The first parameter is expected to be a
   *   SetupNetworkResult, as defined in setupNetwork.ts
   *
   *   Out of this parameter, we care about the following fields:
   *   - worldContract (which comes from getContract, see
   *     https://github.com/latticexyz/mud/blob/main/templates/react/packages/client/src/mud/setupNetwork.ts#L63-L69).
   *
   *   - useStore
   *   - tables
   */
  { worldContract, useStore, tables }: SetupNetworkResult
) {
  /*
   * The system calls are functions that will be used to
   * call the System contracts.
   *
   * They are not called directly, but rather through the
   * useSystemCalls hook (see useSystemCalls.ts).
   *
   * The system calls are defined as async functions that
   * return a promise.
   *
   * The promise resolves when the transaction is confirmed.
   */

  const createTask = async (
    assignee: string,
    description: string,
    deadline: bigint
  ) => {
    await (worldContract as any).write.TASKLIST__createTask([
      assignee,
      description,
      deadline,
    ]);
  };

  const updateTaskAssignee = async (taskId: bigint, newAssignee: string) => {
    await (worldContract as any).write.TASKLIST__updateTaskAssignee([
      taskId,
      newAssignee,
    ]);
  };

  const updateTaskDeadline = async (taskId: bigint, newDeadline: bigint) => {
    await (worldContract as any).write.TASKLIST__updateTaskDeadline([
      taskId,
      newDeadline,
    ]);
  };

  const updateTaskDescription = async (
    taskId: bigint,
    newDescription: string
  ) => {
    await (worldContract as any).write.TASKLIST__updateTaskDescription([
      taskId,
      newDescription,
    ]);
  };

  const completeTask = async (taskId: bigint) => {
    // Temporary type assertion to resolve TS error - should update SetupNetworkResult type
    await (worldContract as any).write.TASKLIST__completeTask([taskId]);
  };

  const getAllTasks = () => {
    const allTasks = Object.values(
      useStore.getState().getRecords(tables.Tasklist)
    );
    return allTasks;
  };

  return {
    createTask,
    updateTaskAssignee,
    updateTaskDeadline,
    updateTaskDescription,
    completeTask,
    getAllTasks,
  };
}
