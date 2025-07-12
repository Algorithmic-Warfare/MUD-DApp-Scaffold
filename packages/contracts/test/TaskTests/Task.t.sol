/**
 * Task.t.sol
 *
 * Comprehensive test suite for the Task System in the Tribe MUD DApp.
 * This file contains unit tests for the `TaskSystem` smart contract, covering various functionalities
 * such as task creation, updates (assignee, deadline, description), completion, and error handling
 * for unauthorized actions or invalid inputs. It extends `SetupTest` to leverage a pre-configured MUD environment.
 *
 * All tests interact with the `TaskSystem` through the `taskWorld` interface.
 * `vm.prank` is used extensively to simulate calls from different addresses (creator, assignee, nonAuthorized).
 * `vm.expectRevert` is used to verify that unauthorized or invalid operations correctly revert with specific error messages.
 * The `setUp` function ensures a task is created before most tests, providing a consistent state.
 */
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import "forge-std/Test.sol";
import { MudTest } from "@latticexyz/world/test/MudTest.t.sol";
import { IWorld } from "@world/IWorld.sol";
import { Tasklist, TasklistData } from "@store/index.sol";
import { TaskStatus } from "@store/common.sol";
import { TaskSystem } from "@systems/Tasklist/TaskSystem.sol";
import { SetupTest } from "../SetupTest.t.sol";
import "@systems/Tasklist/Errors.sol";

contract TaskTest is SetupTest {
  address private creator = address(1);
  address private assignee = address(2);
  address private nonAuthorized = address(3);
  string private initialDescription = "Initial task description";
  uint256 private initialDeadline = block.timestamp + 1 days;
  uint256 private taskId;

  TasklistData task;
  TasklistData updatedTask;
  TasklistData completedTask;

  /**
   * Sets up the testing environment and creates an initial task.
   *
   * This function overrides the `setUp` from `SetupTest` to first call the parent setup,
   * then creates a new task using the `creator` address, `assignee`, `initialDescription`, and `initialDeadline`.
   * The `taskId` of this newly created task is stored for use in subsequent tests.
   *
   * @dev `super.setUp()` ensures the MUD environment is properly configured.
   * @dev `vm.prank(creator)` simulates the task creation being initiated by the `creator` address.
   * @dev The `taskId` is crucial for most update and completion tests.
   */
  function setUp() public override {
    super.setUp();
    vm.prank(creator);
    taskId = taskWorld.TASK__createTask(assignee, initialDescription, initialDeadline);
  }

  /**
   * Tests the successful creation of a task.
   *
   * Verifies that a newly created task's properties (creator, assignee, description, status, deadline, timestamp)
   * match the expected initial values after calling `TASK__createTask`.
   *
   * @dev Asserts that the task status is `TaskStatus.OPEN` upon creation.
   * @dev `block.timestamp` is used to verify the task's creation timestamp.
   */
  function testCreateTask() public {
    task = Tasklist.get(taskId);
    assertEq(task.creator, creator, "Creator address mismatch");
    assertEq(task.assignee, assignee, "Assignee address mismatch");
    assertEq(task.description, initialDescription, "Description mismatch");
    assertEq(uint256(task.status), uint256(TaskStatus.OPEN), "Initial status should be Open");
    assertEq(task.deadline, initialDeadline, "Deadline mismatch");
    assertEq(task.timestamp, block.timestamp, "Timestamp mismatch");
  }

  /**
   * Tests the successful update of a task's assignee.
   *
   * Verifies that the `TASK__updateTaskAssignee` function correctly changes the assignee of an existing task.
   *
   * @dev Calls `testCreateTask()` to ensure a task exists before attempting to update it.
   * @dev `vm.prank(creator)` ensures the update is performed by the authorized creator.
   */
  function testUpdateTaskAssignee() public {
    testCreateTask();

    address newAssignee = address(4);

    vm.prank(creator);
    taskWorld.TASK__updateTaskAssignee(taskId, newAssignee);

    updatedTask = Tasklist.get(taskId);
    assertEq(updatedTask.assignee, newAssignee, "Assignee not updated");
  }

  /**
   * Tests the successful update of a task's deadline.
   *
   * Verifies that the `TASK__updateTaskDeadline` function correctly changes the deadline of an existing task.
   *
   * @dev `vm.prank(creator)` ensures the update is performed by the authorized creator.
   */
  function testUpdateTaskDeadline() public {
    uint256 newDeadline = block.timestamp + 2 days;

    vm.prank(creator);
    taskWorld.TASK__updateTaskDeadline(taskId, newDeadline);

    updatedTask = Tasklist.get(taskId);
    assertEq(updatedTask.deadline, newDeadline, "Deadline not updated");
  }

  /**
   * Tests the successful update of a task's description.
   *
   * Verifies that the `TASK__updateTaskDescription` function correctly changes the description of an existing task.
   *
   * @dev `vm.prank(creator)` ensures the update is performed by the authorized creator.
   */
  function testUpdateTaskDescription() public {
    string memory newDescription = "Updated description";

    vm.prank(creator);
    taskWorld.TASK__updateTaskDescription(taskId, newDescription);

    updatedTask = Tasklist.get(taskId);
    assertEq(updatedTask.description, newDescription, "Description not updated");
  }

  /**
   * Tests the successful completion of a task by its creator.
   *
   * Verifies that the `TASK__completeTask` function correctly changes the status of a task to `CLOSED` when called by the creator.
   *
   * @dev `vm.prank(creator)` ensures the completion is performed by the authorized creator.
   */
  function testCompleteTaskAsCreator() public {
    vm.prank(creator);
    taskWorld.TASK__completeTask(taskId);

    completedTask = Tasklist.get(taskId);
    assertEq(uint256(completedTask.status), uint256(TaskStatus.CLOSED), "Task not completed");
  }

  /**
   * Tests that a non-creator cannot update a task.
   *
   * Verifies that calling `TASK__updateTaskAssignee` from an unauthorized address reverts with an `Unauthorized` error.
   *
   * @dev `vm.prank(nonAuthorized)` simulates an unauthorized call.
   * @dev `vm.expectRevert(Unauthorized.selector)` asserts that the transaction reverts with the expected error.
   */
  function testNonCreatorCannotUpdateTask() public {
    vm.prank(nonAuthorized);
    vm.expectRevert(Unauthorized.selector);
    taskWorld.TASK__updateTaskAssignee(taskId, address(4));
  }

  /**
   * Tests that a non-authorized address cannot complete a task.
   *
   * Verifies that calling `TASK__completeTask` from an unauthorized address reverts with an `Unauthorized` error.
   *
   * @dev `vm.prank(nonAuthorized)` simulates an unauthorized call.
   * @dev `vm.expectRevert(Unauthorized.selector)` asserts that the transaction reverts with the expected error.
   */
  function testNonAuthorizedCannotCompleteTask() public {
    vm.prank(nonAuthorized);
    vm.expectRevert(Unauthorized.selector);
    taskWorld.TASK__completeTask(taskId);
  }

  /**
   * Tests updating a non-existent task.
   *
   * Verifies that attempting to update a task with an invalid `taskId` reverts with a `TaskNotFound` error.
   *
   * @dev An `invalidTaskId` is generated using `keccak256("invalid")`.
   * @dev `vm.prank(creator)` ensures the call is from an authorized user, but the task itself is invalid.
   */
  function testUpdateNonExistentTask() public {
    uint256 invalidTaskId = uint256(keccak256("invalid"));
    vm.prank(creator);
    vm.expectRevert(TaskNotFound.selector);
    taskWorld.TASK__updateTaskAssignee(invalidTaskId, address(4));
  }

  /**
   * Tests completing a non-existent task.
   *
   * Verifies that attempting to complete a task with an invalid `taskId` reverts with a `TaskNotFound` error.
   *
   * @dev An `invalidTaskId` is generated using `keccak256("invalid")`.
   * @dev `vm.prank(creator)` ensures the call is from an authorized user, but the task itself is invalid.
   */
  function testCompleteNonExistentTask() public {
    uint256 invalidTaskId = uint256(keccak256("invalid"));
    vm.prank(creator);
    vm.expectRevert(TaskNotFound.selector);
    taskWorld.TASK__completeTask(invalidTaskId);
  }

  /**
   * Tests task creation with an invalid assignee address.
   *
   * Verifies that calling `TASK__createTask` with `address(0)` as the assignee reverts with an `InvalidAssignee` error.
   *
   * @dev `address(0)` is considered an invalid assignee.
   */
  function testCreateTaskWithInvalidAssignee() public {
    vm.prank(creator);
    vm.expectRevert(InvalidAssignee.selector);
    taskWorld.TASK__createTask(address(0), "Invalid task", block.timestamp + 1 days);
  }

  /**
   * Tests task creation with an invalid deadline.
   *
   * Verifies that calling `TASK__createTask` with a deadline in the past reverts with an `InvalidDeadline` error.
   *
   * @dev `block.timestamp - 1` represents a deadline in the past.
   */
  function testCreateTaskWithInvalidDeadline() public {
    vm.prank(creator);
    vm.expectRevert(InvalidDeadline.selector);
    taskWorld.TASK__createTask(assignee, "Invalid task", block.timestamp - 1);
  }

  /**
   * Tests updating a task with an invalid assignee address.
   *
   * Verifies that calling `TASK__updateTaskAssignee` with `address(0)` as the new assignee reverts with an `InvalidAssignee` error.
   *
   * @dev `address(0)` is considered an invalid assignee for updates as well.
   */
  function testUpdateTaskWithInvalidAssignee() public {
    vm.prank(creator);
    vm.expectRevert(InvalidAssignee.selector);
    taskWorld.TASK__updateTaskAssignee(taskId, address(0));
  }

  /**
   * Tests updating a task with an invalid deadline.
   *
   * Verifies that calling `TASK__updateTaskDeadline` with a deadline in the past reverts with an `InvalidDeadline` error.
   *
   * @dev `block.timestamp - 1` represents a deadline in the past.
   */
  function testUpdateTaskWithInvalidDeadline() public {
    vm.prank(creator);
    vm.expectRevert(InvalidDeadline.selector);
    taskWorld.TASK__updateTaskDeadline(taskId, block.timestamp - 1);
  }
}
