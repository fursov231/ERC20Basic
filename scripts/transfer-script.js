const Web3 = require("web3")
const Contract = require("web3-eth-contract")
const ERC20BasicJSON = require("../build/contracts/ERC20Basic.json")

let contractAddress = "0x37328bc9CDE75Cbc8524A663FbAEb89304d57D32"
let recipient = "0xf517b737f918a3140d2af4923b8acaab388b0a2b"


async function test() {
    let web3 = await new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
    await Contract.setProvider("http://localhost:8545")

    let address

    await web3.eth.getAccounts()
        .then((res) => (
            address = res[0]

        ))

    let ERC20Basic = await new Contract(ERC20BasicJSON.abi, contractAddress)

    await console.log("Address: ", address)

    await web3.eth.getBalance(address)
        .then((res) => console.log("Balance: ", res))

    await web3.eth.getTransactionCount(address)
        .then((res) => console.log("TransactionCount: ", res))

    await ERC20Basic.methods.balanceOf(address).call()
        .then((res) => console.log("Token balance for address: ", res))

    await ERC20Basic.methods.balanceOf(recipient).call()
        .then((res) => console.log("Token balance for recipient: ", res))


    await ERC20Basic.methods.approve(recipient, 2).send({from: address})
        .on("transactionHash", function (hash) {
            console.log("hash: ", hash)
        })
        .on("receipt", function (receipt) {
            console.log(receipt)
        })
        .on("error", function (error, receipt) {
            console.log("error", error)
        })


    await ERC20Basic.methods.transferFrom(address, recipient, 1).send({from: recipient})
        .on("transactionHash", function (hash) {
            console.log("hash: ", hash)
        })
        .on("receipt", function (receipt) {
            console.log(receipt)
        })
        .on("error", function (error, receipt) {
            console.log("error", error)
        })

    await ERC20Basic.getPastEvents("Transfer", {
        fromBlock: 8709699,
        toBlock: "latest"
    }, function (error, events) {
        console.log(events)
    })


}

test()