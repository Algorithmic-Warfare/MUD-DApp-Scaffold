// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

string constant WITHDRAW_FROM_WRONG_DEPOT = "Attempting to withdraw from the wrong depot.";
string constant DEPOSIT_TO_WRONG_DEPOT = "Attempting to deposit into the wrong depot.";
string constant INVALID_TRANSACTION_ITEM = "Transacted item not compatible with the action.";
string constant INVALID_WITHDRAWAL_AMOUNT = "Transacted item amount exceeds inventory content or action target.";
string constant INVALID_DEPOSIT_AMOUNT = "Transacted item amount exceeds action target.";
string constant INVALID_TRANSACTION = "This transaction should not happen.";

string constant NOT_IN_THE_SAME_NETWORK = "Source and destination depots are not within the same network.";

string constant INSUFFICIENT_ITEM_AMOUNT = "Not enough items in the source depot to fulfill the action.";

string constant INSUFFICIENT_INVENTORY_CAPACITY = "Not enough space in the destination depot to fulfill the action.";

string constant ILLOGICAL_ACTION = "Action type is not compatible with the source and destination.";

string constant AGENT_NOT_ALLOWED = "Agent is not allowed in the current operation.";

interface ProcessErrors {
  error ACTION_InvalidDepot(string message);
  error ACTION_InvalidAmount(string message);
  error ACTION_InvalidAction(string message);

  error TRANSACTION_InvalidTransaction(string message);
  error TRANSACTION_InvalidAgent(string message);

  error TRANSACTION_InvalidDepot(string message, uint256 invalidDepotId, uint256 validDepotId);

  error TRANSACTION_InvalidItem(string message, uint256 itemId, uint256 actionItemId);

  error TRANSACTION_InvalidWithdrawalAmount(
    string message,
    uint256 transactionAmount,
    uint256 sourceItemAmount,
    uint256 destinationItemAmount,
    uint256 targetItemAmount
  );

  error TRANSACTION_InvalidDepositAmount(
    string message,
    uint256 transactionAmount,
    uint256 destinationItemAmount,
    uint256 targetItemAmount
  );
}
