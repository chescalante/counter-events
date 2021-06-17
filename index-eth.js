const ethers = require('ethers')
const counter = require('./counter-abi.json')

let contractAddress = "0xFB602D3e9F3941cCD6792447D12221d54F6c51A0"
const rpcWsUrl = "ws://localhost:4445/websocket/"

const init = () => {
    console.log("contractAddress", contractAddress.toLowerCase())
    const webSocketProvider = new ethers.providers.WebSocketProvider(  rpcWsUrl ) 
    const contract = new ethers.Contract(contractAddress.toLowerCase(), counter.abi, webSocketProvider);

    contract.on("Counted", function(event){ console.log(event)})

    console.log("Ready")
  }

init()


