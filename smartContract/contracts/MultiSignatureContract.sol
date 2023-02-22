// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract MultiSignatureContract {
    address public owner;
    address[] public participants;
    uint256 public required;
    uint256 public amount;
    string public name;
    bytes public description;

    receive() external payable {}

    constructor(string memory _name, bytes memory _description) payable {
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
}
