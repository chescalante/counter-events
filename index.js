const Web3 = require('web3')
const counter = require('./counter-abi.json')

let contractAddress = "0xFB602D3e9F3941cCD6792447D12221d54F6c51A0"
const rpcWsUrl = "ws://127.0.0.1:4445"

const init = () => {
    console.log("contractAddress", contractAddress)
    const webSocketProvider = new Web3.providers.WebsocketProvider(rpcWsUrl)

    const web3 = new Web3(webSocketProvider)

    const contract = new web3.eth.Contract(counter.abi, contractAddress)

    contract.events.Counted(
        { fromBlock: 1932693 },
        async (error, event) => {
            console.log(error, event)
        }
    )

    contract.events.Counted(
      { fromBlock: 1932693 }, function(error, event){ console.log(event); })
    .on('data', function(event){
        console.log(event); // same results as the optional callback above
    })
    .on('changed', function(event){
      console.log('changed')
        // remove event from local database
    })
    .on('error', console.error);

    contract.events.allEvents({ fromBlock: 1932693 }, function(error, event){ console.log("x",event)})

    console.log("Ready")
  }

init()


