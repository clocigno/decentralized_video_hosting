const UserFactory = artifacts.require("UserFactory");

module.exports = function (deployer) {
    return deployer.deploy(UserFactory)
};
