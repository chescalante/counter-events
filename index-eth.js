const ethers = require('ethers')
const counter = require('./counter-abi.json')

let contractAddress = "0xfB602d3E9F3941cCd6792447d12221d54F6C51A0"
const rpcWsUrl = "ws://127.0.0.1:4445"

const init = () => {
    console.log("contractAddress", contractAddress)
    const webSocketProvider = new ethers.providers.WebSocketProvider(  rpcWsUrl ) 
    const contract = new ethers.Contract(contractAddress, counter.abi, webSocketProvider);

    contract.on("Counted", function(event){ console.log(event)})

    console.log("Ready")
  }

init()


