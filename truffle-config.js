require('dotenv').config()
const HDWalletProvider = require('@truffle/hdwallet-provider')

require('ts-node').register({
  files: true,
})

const Web3 = require('web3');

module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  networks: {
    // Useful for testing. The `development` name is special - truffle uses it by default
    // if it's defined here and no other network is specified at the command line.
    // You should run a client (like ganache-cli, geth or parity) in a separate terminal
    // tab if you use this network and you must also set the `host`, `port` and `network_id`
    // options below to some value.
    //
    ganache: {
      host: "localhost", // Localhost (default: none)
      port: 7545,
      network_id: 5777
    },
    // Another network with more advanced options...
    // advanced: {
    // port: 8777,             // Custom port
    // network_id: 1342,       // Custom network
    // gas: 8500000,           // Gas sent with each transaction (default: ~6700000)
    // gasPrice: 20000000000,  // 20 gwei (in wei) (default: 100 gwei)
    // from: <address>,        // Account to send txs from (default: accounts[0])
    // websocket: true        // Enable EventEmitter interface for web3 (default: false)
    // },
    // Useful for deploying to a public network.
    // NB: It's important to wrap the provider as a function.
    // ropsten: {
    //   provider: () =>
    //     new HDWalletProvider({
    //       mnemonic: process.env.KEY_MNEMONIC,
    //       providerOrUrl: `https://ropsten.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
    //       addressIndex: 0,
    //     }),
    //   network_id: 3, // Ropsten's id
    //   gas: 5500000, // Ropsten has a lower block limit than mainnet
    //   confirmations: 2, // # of confs to wait between deployments. (default: 0)
    //   timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
    //   skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
    // },

    // testnet: {
    //   provider: function () {
    //     return new HDWalletProvider({
    //       mnemonic: process.env.KEY_MNEMONIC,
    //       // providerOrUrl: `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
    //       providerOrUrl: `wss://rinkeby.infura.io/ws/v3/${process.env.INFURA_PROJECT_ID}`,          
    //       addressIndex: 0,
    //     })
    //   },
    //   network_id: 4,
    //   gas: 25000000,
    //   gasPrice: 1000000000,
    //   skipDryRun: true
    // },

    // mainnet: {
    //   provider: function () {
    //     return new HDWalletProvider({
    //       mnemonic: process.env.KEY_MNEMONIC,
    //       // providerOrUrl: `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
    //       providerOrUrl: `wss://mainnet.infura.io/ws/v3/${process.env.INFURA_PROJECT_ID}`,          
    //       addressIndex: 0,
    //     })
    //   },
    //   network_id: 1,
    //   gas: 2300000,
    //   gasPrice: 150000000000,      
    //   skipDryRun: true
    // },

    testnet: {
      provider: () => new HDWalletProvider(process.env.KEY_MNEMONIC, 
        new Web3.providers.WebsocketProvider("wss://bsc.getblock.io/testnet/?api_key=4c90233e-8174-493b-9790-2d34ec2b35c8")),        
      network_id: 97,
      confirmations: 10,
      // timeoutBlocks: 200,
      skipDryRun: true
    },
    mainnet: {
      provider: () => new HDWalletProvider(process.env.KEY_MNEMONIC, 
        new Web3.providers.WebsocketProvider("wss://bsc.getblock.io/mainnet/?api_key=4c90233e-8174-493b-9790-2d34ec2b35c8")),        
      network_id: 56,
      confirmations: 10,
      // timeoutBlocks: 200,
      skipDryRun: true
    }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: '^0.8.0', // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: { // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
            enabled: true,
            runs: 0
        }
      }
    },
  },

  // Truffle DB is currently disabled by default; to enable it, change enabled: false to enabled: true
  //
  // Note: if you migrated your contracts prior to enabling this field in your Truffle project and want
  // those previously migrated contracts available in the .db directory, you will need to run the following:
  // $ truffle migrate --reset --compile-all

  // db: {
  //   enabled: false,
  // },

  plugins: ['solidity-coverage'],

  etherscan: {
    apiKey: process.env.APIETHERSCAN,
  },
}
