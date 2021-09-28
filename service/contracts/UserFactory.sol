//SPDX-License-Identifier: MIT
pragma solidity >=0.7.5 <0.9.0;
pragma abicoder v2;

contract UserFactory {

  event NewUser(string _name);
  event NewPayment(address _supporter, address _poster, uint _amount);
  event NewWithdrawl(address _user, uint _amount);
  event NewSubscription(address _subscriber, address _poster);
  event RemovedSubscription(address _subscriber, address _poster);

  struct User {
    string name;
    uint balance;
    address[] subscriptions;
  }

  mapping (address => User) public users;

  function createUser(string memory _name) external {
    users[msg.sender] = User(_name, 0, new address[](0));
    emit NewUser(_name);
  }

  function tip(address _poster) external payable {
    users[_poster].balance += msg.value;
    emit NewPayment(msg.sender, _poster, msg.value);
  }

   function withdraw(uint _amount) external {
    require (_amount <= users[msg.sender].balance);
    users[msg.sender].balance -= _amount;
    payable(msg.sender).transfer(_amount);
    emit NewWithdrawl(msg.sender, _amount);
  }
  
  function getSubscriptions(address account) external view returns (address[] memory) {
    return users[account].subscriptions;
  }

  function isSubscribed(address account, address _poster) public view returns (bool) {
    User memory user = users[account];
    for (uint i = 0; i < user.subscriptions.length; i++) {
      if (user.subscriptions[i] == _poster) {
        return true;
      }
    }
    return false;
  }

  function subscribe(address _poster) external {
    users[msg.sender].subscriptions.push(_poster);
    emit NewSubscription(msg.sender, _poster);
  }

  function removeSubscription(uint index) internal {
    if (index >= users[msg.sender].subscriptions.length) return;
    for (uint i = index; i < users[msg.sender].subscriptions.length - 1; i++){
        users[msg.sender].subscriptions[i] = users[msg.sender].subscriptions[i+1];
    }
    users[msg.sender].subscriptions.pop();
  }

  function unsubscribe(address _poster) public  {
        uint index;
        for (uint i = 0; i < users[msg.sender].subscriptions.length; i++) {
            if (users[msg.sender].subscriptions[i] == _poster) {
                index = i;
            }
        }
        removeSubscription(index);
        emit RemovedSubscription(msg.sender, _poster);
  }
}
