// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { System } from "@latticexyz/world/src/System.sol";
import { Tasklist, TasklistData } from "@store/index.sol";
import { TaskStatus } from "@store/common.sol";
import "./Errors.sol";

contract TaskSystem is System {
  event TaskCreated(
    uint256 indexed taskId,
    address indexed creator,
    address indexed assignee,
    string description,
    uint256 deadline,
    uint256 timestamp
  );

  event TaskUpdated(uint256 indexed taskId, address newAssignee, string newDescription, uint256 newDeadline);
  event TaskCompleted(uint256 indexed taskId);

  modifier onlyCreator(uint256 taskId) {
    TasklistData memory task = Tasklist.get(taskId);
    if (task.creator != _msgSender()) revert Unauthorized();
    _;
  }

  modifier onlyExistentTask(uint256 taskId) {
    TasklistData memory task = Tasklist.get(taskId);
    if (task.creator == address(0)) revert TaskNotFound();
    if (task.assignee == address(0)) revert InvalidAssignee();
    if (task.deadline <= task.timestamp) revert InvalidDeadline();

    _;
  }

  function createTask(address assignee, string memory description, uint256 deadline) public returns (uint256 taskId) {
    if (assignee == address(0)) revert InvalidAssignee();
    if (deadline <= block.timestamp) revert InvalidDeadline();

    taskId = uint256(keccak256(abi.encode(description, deadline, _msgSender(), block.timestamp)));
    Tasklist.set(
      taskId,
      TasklistData({
        creator: _msgSender(),
        assignee: assignee,
        description: description,
        timestamp: block.timestamp,
        deadline: deadline,
        status: TaskStatus.OPEN
      })
    );
    emit TaskCreated(taskId, _msgSender(), assignee, description, deadline, block.timestamp);
  }

  function updateTaskAssignee(uint256 taskId, address newAssignee) public onlyExistentTask(taskId) onlyCreator(taskId) {
    TasklistData memory task = Tasklist.get(taskId);
    if (newAssignee == address(0)) revert InvalidAssignee();

    Tasklist.setAssignee(taskId, newAssignee);

    emit TaskUpdated(taskId, newAssignee, task.description, task.deadline);
  }

  function updateTaskDeadline(uint256 taskId, uint256 newDeadline) public onlyExistentTask(taskId) onlyCreator(taskId) {
    TasklistData memory task = Tasklist.get(taskId);
    if (newDeadline <= task.timestamp) revert InvalidDeadline();

    Tasklist.setDeadline(taskId, newDeadline);

    emit TaskUpdated(taskId, task.assignee, task.description, newDeadline);
  }

  function updateTaskDescription(
    uint256 taskId,
    string memory newDescription
  ) public onlyExistentTask(taskId) onlyCreator(taskId) {
    TasklistData memory task = Tasklist.get(taskId);

    Tasklist.setDescription(taskId, newDescription);
    emit TaskUpdated(taskId, task.assignee, newDescription, task.deadline);
  }

  function completeTask(uint256 taskId) public onlyExistentTask(taskId) onlyCreator(taskId) {
    Tasklist.setStatus(taskId, TaskStatus.CLOSED);

    emit TaskCompleted(taskId);
  }
}
