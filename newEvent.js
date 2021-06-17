const Web3 = require('web3')
const counter = require('./counter-abi.json')
const HDWalletProvider = require('@truffle/hdwallet-provider')

let contractAddress = "0xFB602D3e9F3941cCD6792447D12221d54F6c51A0"
const rpcHttpUrl = "http://127.0.0.1:4444"
const mnemonic = "skill upon stick change tissue immense oyster wide crush dinner slight theory"

const init = async () => {
    console.log("Sending...")

    const hdWalletProvider = new HDWalletProvider({
      mnemonic: mnemonic,
      providerOrUrl: rpcHttpUrl,
      numberOfAddresses: 1,
      shareNonce: true,
      derivationPath: "m/44'/137'/0'/0/"
    })

    const web3 = new Web3(hdWalletProvider)

    const contract = new web3.eth.Contract(counter.abi, contractAddress.toLowerCase())

    const accounts = await web3.eth.getAccounts()

    const executeGas = await contract.methods
        .inc()
        .estimateGas()

    const tx = await contract.methods
        .inc()
        .send({ from: accounts[0], gas: executeGas*2 })

    console.log("Sent", tx)
  }

init()


