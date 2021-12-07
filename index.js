const bcrypt = require("bcrypt");

class Block {
  constructor(blockId, previousHash, data) {
    this.blockId = blockId;
    this.timeStamp = Date.now();
    this.previousHash = previousHash;
    this.data = data;
    this.blockHash = this.getHash();
  }

  getHash() {
    return bcrypt.hashSync(
      String(
        this.blockId +
          this.timeStamp +
          this.blockHash +
          this.previousHash +
          JSON.stringify(this.data)
      ),
      10
    );
  }
}

class BlockChain {
  constructor() {
    this.chain = [];
  }
  addBlock(data) {
    let blockId = this.chain.length;
    let previousHash =
      this.chain.length !== 0
        ? this.chain[this.chain.length - 1].blockHash
        : "";
    let block = new Block(blockId, previousHash, data);

    this.chain.push(block);
  }
}

const myFirstBlockChain = new BlockChain();

myFirstBlockChain.addBlock({
  sender: "aditya",
  receiver: "hemanth",
  amount: 20,
}); // first transaction
myFirstBlockChain.addBlock({
  sender: "steve",
  receiver: "bill",
  amount: 100000,
}); // second transaction
myFirstBlockChain.addBlock({
  sender: "ambani",
  receiver: "adani",
  amount: 5085,
}); // third transaction

console.log(JSON.stringify(myFirstBlockChain, null, 6));
