const Web3 = require('web3')
const counter = require('./counter-abi.json')
const HDWalletProvider = require('@truffle/hdwallet-provider')

let contractAddress = "0xFB602D3e9F3941cCD6792447D12221d54F6c51A0"
const rpcHttpUrl = "http://127.0.0.1:4444"
const privateKeys = ["01ccf471b564abe3f9c77f8b1745d57885212a2e5d2d3478e50665e913abd8d5"]

const init = async () => {
    console.log("Sending...")

    const hdWalletProvider = new HDWalletProvider(privateKeys, rpcHttpUrl, 0, 1);

    const web3 = new Web3(hdWalletProvider)

    const contract = new web3.eth.Contract(counter.abi, contractAddress.toLowerCase())

    const accounts = await web3.eth.getAccounts()
    console.log("Wallet: ", accounts[0])
    const executeGas = await contract.methods
        .inc()
        .estimateGas()

    const tx = await contract.methods
        .inc()
        .send({ from: accounts[0], gas: executeGas*2 })

    console.log("Sent", tx)
  }

init()


