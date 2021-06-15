const Web3 = require('web3')

const webSocketProvider = new Web3.providers.WebsocketProvider("127.0.0.1:8545")

const web3 = new Web3(webSocketProvider)

const contract = new web3.eth.Contract(OneShotScheduleData.abi, contractAddress)

contract.events.Counted(
    { fromBlock: 'latest' },
    async (error, event) => {
        console.log(error, event)
    }
)