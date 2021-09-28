//SPDX-License-Identifier: MIT
pragma solidity >=0.7.5 <0.9.0;
pragma abicoder v2;

contract CommentFactory {

  event NewComment(uint id, string _ipfsHash, address _poster, string _post, uint _createdOn);

  uint counter = 0;

  struct Comment {
    uint id;
    address poster;
    string post;
    uint createdOn;
  }

  mapping (string => Comment[]) comments;

  function createComment(string memory _ipfsHash, string memory _post) external {
    uint timestamp = block.timestamp;
    comments[_ipfsHash].push(Comment(counter, msg.sender, _post, timestamp));
    emit NewComment(counter, _ipfsHash, msg.sender, _post, timestamp);
    counter++;
  }

  function getLatestComments(string memory _ipfsHash) external view returns(Comment[] memory) {
    Comment[] memory videoComments = comments[_ipfsHash];
    Comment[] memory latestComments = new Comment[](videoComments.length);
    for(uint i = 0; i < videoComments.length; i++) {
        uint index = videoComments.length - (1 + i);
        latestComments[i] = videoComments[index];
    }
    return latestComments;
  }
}