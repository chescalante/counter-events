const Web3 = require('web3')
const counter = require('./counter-abi.json')

let contractAddress = "0xFB602D3e9F3941cCD6792447D12221d54F6c51A0"
const rpcWsUrl = "ws://localhost:4445/websocket/"
const rpcHttpUrl = "http://127.0.0.1:4444"

const init = () => {
    console.log("contractAddress", contractAddress.toLowerCase())
    const webSocketProvider = new Web3.providers.WebsocketProvider(rpcWsUrl)

    const web3 = new Web3(webSocketProvider)

    const contract = new web3.eth.Contract(counter.abi, contractAddress.toLowerCase())

    contract.events.Counted(
        { fromBlock: 0 },
        async (error, event) => {
            console.log(error, event)
        }
    )

    contract.events.Counted(
      { fromBlock: 0 }, function(error, event){ console.log(event); })
    .on('data', function(event){
        console.log(event); // same results as the optional callback above
    })
    .on('changed', function(event){
      console.log('changed')
        // remove event from local database
    })
    .on('error', console.error);

    contract.events.allEvents({ fromBlock: 0 }, function(error, event){ console.log("x",event)})

    // with getPastEvents

    const web3Http = new Web3(rpcHttpUrl)
    const contractHttp = new web3Http.eth.Contract(counter.abi, contractAddress.toLowerCase())
    let fromBlockNumber = await web3Http.eth.getBlockNumber() - 100

    setInterval(()=>{
      const toBlockNumber = await web3Http.eth.getBlockNumber()

      console.log(`getting events from ${fromBlockNumber} to ${toBlockNumber}`)

      contractHttp.getPastEvents("Counted",{ fromBlock: fromBlockNumber, toBlock: toBlockNumber }).then((r)=>{ 
        console.log("getPastEvents", r)
      })

      fromBlockNumber = toBlockNumber
    }, 60000)

    console.log("Ready")
  }

init()


