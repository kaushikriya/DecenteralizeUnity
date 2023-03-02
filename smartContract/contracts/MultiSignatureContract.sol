// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract MultiSignatureContract {
    address public owner;
    address[] public participants;
    uint256 public required;
    uint256 public amount;
    string public name;
    string public description;
    uint56 public transactionCount = 0;

    mapping(uint256 => uint256) confirmationCount;

    struct Transaction {
        string name;
        string description;
        uint256 amount;
        address reciever;
        uint256 transactionId;
    }

    Transaction[] public transactions;

    mapping(uint256 => mapping(address => bool)) public confirmations;

    receive() external payable {}

    constructor(string memory _name, string memory _description) payable {
        owner = msg.sender;
        amount = msg.value;
        required = 1;
        name = _name;
        description = _description;
        participants.push(owner);
    }

    function addParticipant() public payable {
        for (uint256 i = 0; i < participants.length; i++) {
            require(
                msg.sender != participants[i],
                "The user is already a member of the contract"
            );
        }
        require(msg.value == amount);
        participants.push(msg.sender);
    }

    function getAllParticipants() public view returns (address[] memory) {
        return participants;
    }

    function isParticipant(address _address) public view returns (bool) {
        for (uint256 i = 0; i < participants.length; i++) {
            if (participants[i] == _address) {
                return true;
            }
            return false;
        }
    }

    function createTransaction(
        string calldata _name,
        string calldata _description,
        uint256 _amount
    ) external {
        require(
            isParticipant(msg.sender),
            "You are not a member of this contract"
        );
        Transaction memory newTransaction = Transaction(
            _name,
            _description,
            _amount,
            msg.sender,
            transactionCount
        );
        transactions.push(newTransaction);
        confirmations[transactionCount][msg.sender] = true;
        transactionCount += 1;
    }

    function executeTransaction(uint256 transactionId) public {
        Transaction memory transaction = transactions[transactionId];
        (bool success, ) = transaction.reciever.call{value: transaction.amount}(
            ""
        );
        require(success);
    }

    function confirmTransaction(uint256 transactionId) external {
        require(
            isParticipant(msg.sender),
            "You are not a mamber of this contract"
        );
        confirmationCount[transactionId] += 1;
        if (confirmationCount[transactionId] == required) {
            executeTransaction(transactionId);
        }
    }

    function getTransactions() external view returns (Transaction[] memory) {
        return transactions;
    }
}
