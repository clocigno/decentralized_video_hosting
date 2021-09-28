const CommentFactory = artifacts.require("CommentFactory");

module.exports = function (deployer) {
    return deployer.deploy(CommentFactory)
};
