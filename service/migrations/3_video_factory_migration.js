const VideoFactory = artifacts.require("VideoFactory");
const UserFactory = artifacts.require("UserFactory");

module.exports = function (deployer) {
    return deployer.deploy(VideoFactory, UserFactory.address)
};
