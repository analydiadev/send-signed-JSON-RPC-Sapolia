const { Alchemy, Network, Wallet, Utils } = require("alchemy-sdk");
require('dotenv').config()

const { TEST_API_KEY, TEST_PRIVATE_KEY } = process.env;
const settings = {
    apiKey: TEST_API_KEY,
    network: Network.ETH_SEPOLIA
};
const alchemy = new Alchemy(settings);
let wallet = new Wallet(TEST_PRIVATE_KEY)

async function main() {
    const nonce = await alchemy.core.getTransactionCount(
        wallet.address,
        'latest'
    );

    let transaction = {
        to: '0xc879981523bB5D6691A817E34Aef14d64D1833B6',
        value: Utils.parseEther('0.001'),
        gasLimit: '21000',
        maxPriorityFeePerGas: Utils.parseUnits('20', 'gwei'),
        nonce: nonce,
        type: 2,
        chainId: 11155111
    };

    let rawTransaction = await
        wallet.signTransaction(transaction);
    console.log('RAW TX: ', rawTransaction);
    let tx = await
        alchemy.core.sendTransaction(rawTransaction);
    console.log(`https://eth-sepolia.g.alchemy.com/v2/[TEST_API_KEY]`);
}

main();
