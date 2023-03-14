const { ThirdwebSDK } = require("@thirdweb-dev/sdk/evm");

class SmartContract {
  static _sdk = ThirdwebSDK.fromPrivateKey(
    process.env.WALLET_PRIVATE_KEY, // Your wallet's private key (only required for write operations)
    process.env.BLOCKCHAIN_NETWORK
  );
  static _contract;

  static async init() {
    this._contract = await this._sdk.getContract(process.env.CONTRACT_ADDRESS);
  }

  static get() {
    return this._contract;
  }
}

module.exports = SmartContract;
