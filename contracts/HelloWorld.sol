// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

contract HelloWorld {
event UpdateMessage(string oldStr, string newMessage);

string public message;
uint256 public number;

constructor (string memory _initMessage){
    message = _initMessage;
}
function update (string memory _newMessage) public {
    string memory oldMessage = message;
    message = _newMessage;
    emit UpdateMessage(oldMessage, _newMessage);

}
function favoriteNumber (uint256 num) public {
    number= num;
}

function retrieve() public view returns (uint256){
        return number;
    }
}