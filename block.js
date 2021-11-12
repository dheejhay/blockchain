// Import crypto-js/sha256 for Hashing data and assign to a constant 
const SHA256 = require("crypto-js/sha256");

// Create class with name "CryptoBlock"
class CryptoBlock {
	// Call constructor method for initializing object instance with defined object properties.
	constructor(index, current_time, info, nextHash = "") {
		this.index = index;
		this.current_time = current_time;
		this.info = info;
		this.nextHash = nextHash;
		this.hash = this.computeHash();
	}
	
	// Create class function to compute the value or the object property (hash)
	computeHash() {
		return SHA256(
			this.index +
			this.nextHash +
			this.current_time +
			JSON.stringify(this.info)
		).toString();
	}
}
// create a class with name "Blockchain"
class Blockchain {
    constructor(){
        this.chain = [this.initBlock()];
        this.difficulty = 4;
    }

    initBlock() {
        return new CryptoBlock(0, "11/11/2021", "Initial Block in our network", "0");
    }
    
    obtainLastblock() {
        return this.chain[this.chain.length - 1];
    }

    addNewBlock(newBlock) {
		newBlock.nextHash = this.obtainLastblock().hash;
		newBlock.hash = newBlock.computeHash();
		this.chain.push(newBlock);
	}

    // dfhghdj

	checkChainValidity() {
		for (let i = 1; i < this.chain.length; i++) {
			const currentBlock = this.chain[i];
			const nextHash = this.chain[i - 1];

			if (currentBlock.hash !== currentBlock.computeHash()) {
				return false;
			}

			if (currentBlock.nextHash !== nextHash.hash) return false;
		}
		return true;
	}
}

let chainCoin = new Blockchain();
console.log("chainCoin mining progressing....");

chainCoin.addNewBlock(
	new CryptoBlock(1, "11/11/2021", {
		sender: "Ray",
		recipient: "Jay",
		quantity: 200
	})
);

chainCoin.addNewBlock(
	new CryptoBlock(2, "11/11/2021", {
		sender: "Jay",
		recipient: "Kay",
		quantity: 250
	})
);

chainCoin.addNewBlock(
	new CryptoBlock(3, "11/11/2021", {
		sender: "Kay",
		recipient: "Dee",
		quantity: 450
	})
);

chainCoin.addNewBlock(
	new CryptoBlock(4, "11/11/2021", {
		sender: "Kiwi",
		recipient: "Jay",
		quantity: 1000
	})
);

console.log(JSON.stringify(chainCoin, null, 4));