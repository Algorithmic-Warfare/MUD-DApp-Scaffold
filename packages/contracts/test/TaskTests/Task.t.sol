// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import "forge-std/Test.sol";
import { MudTest } from "@latticexyz/world/test/MudTest.t.sol";
import { IWorld } from "@world/IWorld.sol";
import { Tasklist, TasklistData } from "@store/index.sol";
import { TaskStatus } from "@store/common.sol";
import { TaskSystem } from "@systems/Tasklist/TaskSystem.sol";
import { SetupTest } from "@tests/SetupTest.t.sol";
import "@systems/Tasklist/Errors.sol";

contract TaskTest is SetupTest {
  address private creator = address(1);
  address private assignee = address(2);
  address private nonAuthorized = address(3);
  string private initialDescription = "Initial task description";
  uint256 private initialDeadline = block.timestamp + 1 days;
  bytes32 private taskId;

  TasklistData task;
  TasklistData updatedTask;
  TasklistData completedTask;

  function setUp() public override {
    super.setUp();
    vm.prank(creator);
    taskId = taskWorld.TASK__createTask(assignee, initialDescription, initialDeadline);
  }

  function testCreateTask() public {
    task = Tasklist.get(taskId);
    assertEq(task.creator, creator, "Creator address mismatch");
    assertEq(task.assignee, assignee, "Assignee address mismatch");
    assertEq(task.description, initialDescription, "Description mismatch");
    assertEq(uint256(task.status), uint256(TaskStatus.OPEN), "Initial status should be Open");
    assertEq(task.deadline, initialDeadline, "Deadline mismatch");
    assertEq(task.timestamp, block.timestamp, "Timestamp mismatch");
  }

  function testUpdateTaskAssignee() public {
    testCreateTask();

    address newAssignee = address(4);

    vm.prank(creator);
    taskWorld.TASK__updateTaskAssignee(taskId, newAssignee);

    updatedTask = Tasklist.get(taskId);
    assertEq(updatedTask.assignee, newAssignee, "Assignee not updated");
  }

  function testUpdateTaskDeadline() public {
    uint256 newDeadline = block.timestamp + 2 days;

    vm.prank(creator);
    taskWorld.TASK__updateTaskDeadline(taskId, newDeadline);

    updatedTask = Tasklist.get(taskId);
    assertEq(updatedTask.deadline, newDeadline, "Deadline not updated");
  }

  function testUpdateTaskDescription() public {
    string memory newDescription = "Updated description";

    vm.prank(creator);
    taskWorld.TASK__updateTaskDescription(taskId, newDescription);

    updatedTask = Tasklist.get(taskId);
    assertEq(updatedTask.description, newDescription, "Description not updated");
  }

  function testCompleteTaskAsCreator() public {
    vm.prank(creator);
    taskWorld.TASK__completeTask(taskId);

    completedTask = Tasklist.get(taskId);
    assertEq(uint256(completedTask.status), uint256(TaskStatus.CLOSED), "Task not completed");
  }

  function testNonCreatorCannotUpdateTask() public {
    vm.prank(nonAuthorized);
    vm.expectRevert(Unauthorized.selector);
    taskWorld.TASK__updateTaskAssignee(taskId, address(4));
  }

  function testNonAuthorizedCannotCompleteTask() public {
    vm.prank(nonAuthorized);
    vm.expectRevert(Unauthorized.selector);
    taskWorld.TASK__completeTask(taskId);
  }

  function testUpdateNonExistentTask() public {
    bytes32 invalidTaskId = keccak256("invalid");
    vm.prank(creator);
    vm.expectRevert(TaskNotFound.selector);
    taskWorld.TASK__updateTaskAssignee(invalidTaskId, address(4));
  }

  function testCompleteNonExistentTask() public {
    bytes32 invalidTaskId = keccak256("invalid");
    vm.prank(creator);
    vm.expectRevert(TaskNotFound.selector);
    taskWorld.TASK__completeTask(invalidTaskId);
  }

  function testCreateTaskWithInvalidAssignee() public {
    vm.prank(creator);
    vm.expectRevert(InvalidAssignee.selector);
    taskWorld.TASK__createTask(address(0), "Invalid task", block.timestamp + 1 days);
  }

  function testCreateTaskWithInvalidDeadline() public {
    vm.prank(creator);
    vm.expectRevert(InvalidDeadline.selector);
    taskWorld.TASK__createTask(assignee, "Invalid task", block.timestamp - 1);
  }

  function testUpdateTaskWithInvalidAssignee() public {
    vm.prank(creator);
    vm.expectRevert(InvalidAssignee.selector);
    taskWorld.TASK__updateTaskAssignee(taskId, address(0));
  }

  function testUpdateTaskWithInvalidDeadline() public {
    vm.prank(creator);
    vm.expectRevert(InvalidDeadline.selector);
    taskWorld.TASK__updateTaskDeadline(taskId, block.timestamp - 1);
  }
}
