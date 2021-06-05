//truffle run verify ERC20Basic@0x37328bc9CDE75Cbc8524A663FbAEb89304d57D32 --network rinkeby

const SafeMathLib = artifacts.require("SafeMath");
const ERC20Basic = artifacts.require("ERC20Basic");

module.exports = function (deployer, network, accounts) {
  deployer.deploy(SafeMathLib);
  deployer.link(SafeMathLib, ERC20Basic);
  deployer.deploy(ERC20Basic, 9000000000); // token`s amount
};
