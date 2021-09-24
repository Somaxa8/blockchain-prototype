import BlockChain from "./BlockChain";
import Transaction from "./Transaction";

let chamoCoin: BlockChain = new BlockChain()

chamoCoin.createTransaction(new Transaction("address1", "address2", 100))
chamoCoin.createTransaction(new Transaction("address2", "address1", 80))

console.log('Mining begins')
chamoCoin.minePendingTransactions("soma-address")

console.log("Balance of soma is: ", chamoCoin.getBalanceOfAddress("soma-address"), " Chamo coins")

console.log('Mining begins')
chamoCoin.minePendingTransactions("soma-address")

console.log("Balance of soma is: ", chamoCoin.getBalanceOfAddress("soma-address"), " Chamo coins")

console.log(JSON.stringify(chamoCoin, null, 4))