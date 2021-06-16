const ethers = require('ethers')
const counter = require('./counter-abi.json')

let contractAddress = "0xFB602D3e9F3941cCD6792447D12221d54F6c51A0"
const rpcWsUrl = "ws://127.0.0.1:4445"

const init = () => {
    console.log("contractAddress", contractAddress)
    const webSocketProvider = new ethers.providers.WebSocketProvider(  rpcWsUrl ) 
    const contract = new ethers.Contract(contractAddress, counter.abi, webSocketProvider);

    contract.on("Counted", function(event){ console.log(event)})

    console.log("Ready")
  }

init()


