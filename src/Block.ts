import Transaction from "./Transaction";
import SHA256 from "crypto-js/sha256";

export default class Block {
    timestamp: number
    transactions: Transaction[]
    previousHash: string
    hash: string
    nonce: number

    constructor(timestamp: number, transactions: Transaction[], previousHash: string = "") {
        this.timestamp = timestamp
        this.transactions = transactions
        this.previousHash = previousHash
        this.hash = this.calculateHash()
        this.nonce = 0
    }

    calculateHash(): string {
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString()
    }

    solveBlock(difficult: number) {
        while (this.hash.substring(0, difficult) !== Array(difficult + 1).join("0")) {
            this.nonce++
            this.hash = this.calculateHash()
        }
        console.log('Block mined: ' + this.hash)
    }

}