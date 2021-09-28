//SPDX-License-Identifier: MIT
pragma solidity >=0.7.5 <0.9.0;
pragma abicoder v2;

import "./UserFactory.sol";

contract VideoFactory {

  event NewVideo(string _ipfsHash, string _title, uint _createdOn, address _poster);

  UserFactory userFactory;

  struct Video {
        string ipfsHash;
        string title;
        uint createdOn;
        address poster;
  }

  string[] videoKeys;
  mapping (string => Video) public videos;
  mapping (address => string[]) posterKeys;
  mapping (address => uint) posterVideoCount;

  constructor(address _deployedContract) {
    userFactory = UserFactory(_deployedContract);
  }

  function postVideo(string memory _ipfsHash, string memory _title) external {
    uint timestamp = block.timestamp;
    videos[_ipfsHash] = Video(_ipfsHash, _title, timestamp, msg.sender);
    videoKeys.push(_ipfsHash);
    posterKeys[msg.sender].push(_ipfsHash);
    posterVideoCount[msg.sender]++;
    emit NewVideo(_ipfsHash, _title, timestamp, msg.sender);
  }

  function getLatestVideos() external view returns(Video[] memory) {
    Video[] memory latestVideos = new Video[](videoKeys.length);
        for(uint i = 0; i < videoKeys.length; i++) {
            uint index = videoKeys.length - (1 + i);
            latestVideos[i] = videos[videoKeys[index]];
        }
        return latestVideos;
  }

  function getVideosByPoster(address _poster) public view returns(Video[] memory) {
    uint length = posterVideoCount[_poster];
    string[] memory postedHashes = posterKeys[_poster];
    Video[] memory postedVideos = new Video[](length);
    for(uint i = 0; i < length; i++) {
        uint index = length - (1 + i);
        postedVideos[i] = videos[postedHashes[index]];
    }
    return postedVideos;
  }

  function getSubscribedVideos(address[] memory _subscriptions) external view returns(Video[] memory) {
    uint length = 0;
    for (uint i = 0; i < _subscriptions.length; i++) {
      address poster = _subscriptions[i];
      length += posterVideoCount[poster];
    }
    Video[] memory result = new Video[](length);
    uint counter = 0;
    for (uint i = 0; i < _subscriptions.length; i++) {
      address poster = _subscriptions[i];
      Video[] memory videosFromPoster = getVideosByPoster(poster);
      for (uint j; j < videosFromPoster.length; j++) {
        result[counter] = videosFromPoster[j];
        counter++;
      }
    }
    return result;
  }
}