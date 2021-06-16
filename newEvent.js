const Web3 = require('web3')
const counter = require('./counter-abi.json')

let contractAddress = "0xFB602D3e9F3941cCD6792447D12221d54F6c51A0"
const rpcHttpUrl = "http://127.0.0.1:4444"
const account = ""

const init = () => {
    console.log("contractAddress", contractAddress.toLowerCase())

    const web3 = new Web3(rpcHttpUrl)

    const contract = new web3.eth.Contract(counter.abi, contractAddress.toLowerCase())

    const executeGas = await contract.methods
        .inc()
        .estimateGas()

    await contract
        .inc()
        .send({ from: account, gas: executeGas })

    console.log("Ready")
  }

init()


