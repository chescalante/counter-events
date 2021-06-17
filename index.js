const Web3 = require('web3')
const counter = require('./counter-abi.json')

let contractAddress = "0xFB602D3e9F3941cCD6792447D12221d54F6c51A0"
const rpcWsUrl = "ws://localhost:4445/websocket/"
const rpcHttpUrl = "http://127.0.0.1:4444"

const init = () => {
    console.log("contractAddress", contractAddress.toLowerCase())
    const web3Http = new Web3(rpcHttpUrl)
    const contractHttp = new web3Http.eth.Contract(counter.abi, contractAddress.toLowerCase())
    let fromBlockNumber = await web3Http.eth.getBlockNumber() - 100
    
    const webSocketProvider = new Web3.providers.WebsocketProvider(rpcWsUrl)

    const web3 = new Web3(webSocketProvider)

    const contract = new web3.eth.Contract(counter.abi, contractAddress.toLowerCase())

    contract.events.Counted(
        { fromBlock: fromBlockNumber },
        (error, event) => {
            console.log("websocket:counted", error, event)
        }
    )

    contract.events.Counted(
      { fromBlock: fromBlockNumber }, function(error, event){ console.log("websocket:default", event); })
    .on('data', function(event){
        console.log("websocket:data", event);
    })
    .on('changed', function(event){
      console.log("websocket:changed", event)
    })
    .on('error', function(error){ console.log("websocket:error", error)});

    contract.events.allEvents({ fromBlock: fromBlockNumber }, function(error, event){ console.log("websocket:all:events", event)})

    // with getPastEvents

    

    setInterval(async () => {
      const toBlockNumber = await web3Http.eth.getBlockNumber()

      console.log(`getting events from ${fromBlockNumber} to ${toBlockNumber}`)

      const result = await contractHttp.getPastEvents("Counted",{ fromBlock: fromBlockNumber, toBlock: toBlockNumber }) 
      
      console.log("getPastEvents", result)
      
      fromBlockNumber = toBlockNumber
    }, 60000)

    console.log("Ready")
  }

init()


