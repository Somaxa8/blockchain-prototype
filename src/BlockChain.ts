import Block from "./Block";
import Transaction from "./Transaction";
import ConstantsTool from "./tool/ConstantsTool";

export default class BlockChain {
    chain: Block[] = []
    pendingTransactions: Transaction[] = []


    constructor() {
        this.chain.push(this.createGenesisBlock())

    }

    createGenesisBlock(): Block {
        return new Block(Date.now(), [], "0")
    }

    getLatestBock(): Block {
        return this.chain[this.chain.length - 1]
    }

    minePendingTransactions(miningRewardAddress: string) {
        let block = new Block(Date.now(), this.pendingTransactions)
        block.previousHash = this.getLatestBock().hash
        block.solveBlock(ConstantsTool.DIFFICULT)
        console.log('Block successfully mined')

        this.chain.push(block)
        this.pendingTransactions = [new Transaction(null, miningRewardAddress, ConstantsTool.REWARD)]
    }

    createTransaction(transaction: Transaction) {
        this.pendingTransactions.push(transaction)
    }

    getBalanceOfAddress(address: string): number {
        let balance = 0
        for (const block of this.chain) {
            for (const transaction of block.transactions) {
                if (transaction.fromAddress === address) {
                    balance -= transaction.amount
                }
                if (transaction.toAddress === address) {
                    balance += transaction.amount
                }
            }
        }
        return balance
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i]
            const previousBlock = this.chain[i - 1]

            // Block hash is invalid
            if (currentBlock.hash != currentBlock.calculateHash()) {
                return false
            }

            // We check if it points to the previous one
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false
            }
        }
        return true
    }
}