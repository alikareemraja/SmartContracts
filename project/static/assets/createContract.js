window.addEventListener('load', function() {

    // 1. Initialize web3 object
    if (typeof web3 !== 'undefined') {
        web3js = new Web3(web3.currentProvider);
        console.log("Metamast, yay!!");
    } else {
        console.log("No web3. Install MetaMask");
    }

    // 2. Request access to MetaMask accounts
    ethereum.enable();
})


function doTransaction() {
    var testTransaction = {
        "from": web3.eth.accounts[0],
        "to": web3.eth.accounts[0],
        "value": "100000000000000000",
        "gas": 20000000,
        "chainId": 3
    };

    web3.eth.sendTransaction(testTransaction, function (e) {console.log(e);})
}


function createContract() {
    // -> just for info, source code is compiled using Remix
    var contract_string = `
        pragma solidity ^0.5.0;

        contract Promise {
            address payable private owner;
            address private validator = 0xdB45d0814a72D611DacCC64AC9d9d1df1aD34045;
            boo

            constructor() public {
                owner = msg.sender;
            }

            function isFulfilled() public {
                require(msg.sender == validator);
                selfdestruct(owner);
            }
        }
    `;

    // Compiled via remix: Click "Compile" -> Click "Details" -> Copy "Web3 deploy":
    // http://remix.ethereum.org/#version=soljson-v0.5.0+commit.1d4f565a.js


    var promiseContract = web3.eth.contract([{"constant":false,"inputs":[],"name":"isFulfilled","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]);
    var promise = promiseContract.new(
       {
         from: web3.eth.accounts[0], 
         data: '0x608060405273db45d0814a72d611daccc64ac9d9d1df1ad34045600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555034801561006557600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610119806100b56000396000f3fe608060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063385a9c37146044575b600080fd5b348015604f57600080fd5b5060566058565b005b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151560b357600080fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16fffea165627a7a72305820f518d79481cc675a48dbe84f8ac4cf3271cc3faf3fad0d7b636ccf91573064200029',
         gas: '4700000'
       }, function (e, contract){
        console.log(e, contract);
        if (typeof contract.address !== 'undefined') {
             console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);


             // now charge the contract with money:
             const chargeContract = {
                    "from": web3.eth.accounts[0],
                    "to": contract.address,
                    "value": 1000000000000000000 * (parseInt($("#amount").text(), 10) * 0.0044),
                    "gas": '40000',
                    "chainId": 3
                };
             web3.eth.sendTransaction(chargeContract, function (e) {console.log(e);})


             $("#waiting").css("display","none");
             $("#success").css("display","inline-block");
             $("#scAddress").text(contract.address);
        }
     })

}