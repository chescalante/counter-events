const Web3 = require('web3')
const counter = require('./counter-abi.json')

let contractAddress = "0xfB602d3E9F3941cCd6792447d12221d54F6C51A0"
const rpcWsUrl = "ws://127.0.0.1:4445"
const rpcHttpUrl = "http://127.0.0.1:4444"


const deployContract = async (
    web3,
    abi,
    bytecode,
    args
  ) => {
    const contract = new web3.eth.Contract(abi)
    const deployer = contract.deploy({ data: bytecode, arguments: args })

    const from = web3.eth.defaultAccount

    const gas = await deployer.estimateGas({ from })

    return new Promise((resolve, reject) =>
      deployer
        .send({ from, gas })
        .on('error', (error) => reject(error))
        .then((newContractInstance) => resolve(newContractInstance))
    )
  }

const init = async () => {
    const httpWeb3 = new Web3(rpcHttpUrl)
    const accounts = await httpWeb3.eth.getAccounts()

    httpWeb3.eth.defaultAccount = accounts[0]

    //const deployedContract = await deployContract(httpWeb3, counter.abi, counter.bytecode)
    //contractAddress = deployedContract.options.address

    console.log("contractAddress", contractAddress)

    const webSocketProvider = new Web3.providers.WebsocketProvider(rpcWsUrl)

    const web3 = new Web3(webSocketProvider)
    web3.eth.defaultAccount = accounts[0]

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
        // remove event from local database
    })
    .on('error', console.error);

    console.log("Ready")
  }

init()


