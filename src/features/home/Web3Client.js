import Web3 from 'web3';

class Web3Client {
  ACCOUNT_AMOUNT = 1;
  WALLET_AMOUNT = 1;

  TESTNET_RPC_ENDPOINT = process.env.TESTNET_RPC_ENDPOINT;
  MAINNET_RPC_ENDPOINT = process.env.MAINNET_RPC_ENDPOINT;

  web3 = new Web3(this.MAINNET_RPC_ENDPOINT);

  createAccounts = (amount) => {
    const accounts = [];
    for (let i = 0; i < amount; i++) {
      accounts.push(this.web3.eth.accounts.create());
    }
    return accounts;
  };

  createWallets = (amount = this.WALLET_AMOUNT) => {
    const wallets = [];
    const ws = this.web3.eth.accounts.wallet.create(amount);
    for (let i = 0; i < amount; i++) {
      wallets.push(ws[i]);
    }
    return wallets;
  };
}

let selectedAccount;

export const initWeb3 = () => {
  let provider = window.ethereum;
  if (typeof provider !== 'undefined') {
    // Metamask is installed
    provider.request({ method: 'eth_requestAccounts' })
    .then(accounts => {
      selectedAccount = accounts[0]
      console.log(accounts);
    }).catch(err => {
      console.error(err);
    });

    window.ethereum.on('accountsChanged', function(accounts) {
      selectedAccount = accounts[0];
      console.log({ selectedAccount });
    })
  }
  
}

const web3Client = new Web3Client()

export default web3Client