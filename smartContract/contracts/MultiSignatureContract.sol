// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract MultiSignatureContract {
    address public owner;
    address[] public participants;
    uint256 public required;
    uint256 public amount;

    receive() external payable {}

    constructor() payable {
        owner = msg.sender;
        amount = msg.value;
        required = 1;
        participants.push(owner);
    }

    function addParticipant() external payable {
        for (uint256 i = 0; i < participants.length; i++) {
            require(msg.sender != participants[i]);
        }
        require(msg.value == amount);
        (bool success, ) = address(this).call{value: amount}("");
        require(success);
    }
}
