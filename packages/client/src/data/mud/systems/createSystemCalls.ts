/**
 * @file
 * @summary Provides client-side functions to interact with MUD system contracts.
 * @description This module defines a set of asynchronous functions (system calls)
 * that allow the client application to request changes to the MUD world state
 * by interacting with the deployed MUD system contracts. These functions abstract
 * the direct contract interactions, providing a cleaner API for the client.
 *
 * @exports createSystemCalls - Function to create the system call API.
 */
/*
 * Create the system calls that the client can use to ask
 * for changes in the World state (using the System contracts).
 */

import { SetupNetworkResult } from "../network/types";

/**
 * @summary Creates an object containing all MUD system calls.
 * @description This function takes the `SetupNetworkResult` and exposes methods
 * for interacting with the MUD world's system contracts. These system calls
 * are asynchronous and return promises that resolve upon transaction confirmation.
 *
 * @param {SetupNetworkResult} params - The result object from the MUD network setup.
 * @param {SetupNetworkResult['worldContract']} params.worldContract - The MUD world contract instance.
 * @param {SetupNetworkResult['useStore']} params.useStore - The Zustand store hook for MUD tables.
 * @param {SetupNetworkResult['tables']} params.tables - The MUD table objects.
 * @param {SetupNetworkResult['waitForTransaction']} params.waitForTransaction - Function to wait for transaction confirmation.
 * @returns {object} An object containing functions for each system call.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Interaction Layer**: This module is the primary interaction layer between the client and MUD smart contracts.
 * - **Asynchronous Operations**: All system calls are asynchronous and should be handled with `await`.
 * - **Error Handling**: Implement robust error handling for transaction failures.
 */
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
  { worldContract, useStore, tables, waitForTransaction }: SetupNetworkResult
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

  /**
   * @summary Creates a new task on the MUD world.
   * @param {string} assignee - The address of the task assignee.
   * @param {string} description - The description of the task.
   * @param {bigint} deadline - The deadline for the task as a Unix timestamp.
   */
  const createTask = async (
    assignee: string,
    description: string,
    deadline: bigint
  ) => {
    await (worldContract as any).write.TASK__createTask([
      assignee,
      description,
      deadline,
    ]);
  };

  /**
   * @summary Updates the assignee of an existing task.
   * @param {bigint} taskId - The ID of the task to update.
   * @param {string} newAssignee - The new address of the task assignee.
   */
  const updateTaskAssignee = async (taskId: bigint, newAssignee: string) => {
    await (worldContract as any).write.TASK__updateTaskAssignee([
      taskId,
      newAssignee,
    ]);
  };

  /**
   * @summary Updates the deadline of an existing task.
   * @param {bigint} taskId - The ID of the task to update.
   * @param {bigint} newDeadline - The new deadline for the task as a Unix timestamp.
   */
  const updateTaskDeadline = async (taskId: bigint, newDeadline: bigint) => {
    await (worldContract as any).write.TASK__updateTaskDeadline([
      taskId,
      newDeadline,
    ]);
  };

  /**
   * @summary Updates the description of an existing task.
   * @param {bigint} taskId - The ID of the task to update.
   * @param {string} newDescription - The new description of the task.
   */
  const updateTaskDescription = async (
    taskId: bigint,
    newDescription: string
  ) => {
    await (worldContract as any).write.TASK__updateTaskDescription([
      taskId,
      newDescription,
    ]);
  };

  /**
   * @summary Marks an existing task as complete.
   * @param {bigint} taskId - The ID of the task to complete.
   */
  const completeTask = async (taskId: bigint) => {
    // Temporary type assertion to resolve TS error - should update SetupNetworkResult type
    await (worldContract as any).write.TASK__completeTask([taskId]);
  };

  /**
   * @summary Retrieves all tasks from the MUD store.
   * @returns {Array<object>} An array of all task records.
   */
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
