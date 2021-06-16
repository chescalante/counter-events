const Web3 = require('web3')
const counter = require('./counter-abi.json')

let contractAddress = "0xfB602d3E9F3941cCd6792447d12221d54F6C51A0"
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

    console.log("Ready")
  }

init()


