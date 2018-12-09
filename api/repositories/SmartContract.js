import {config} from 'dotenv'
import Tx from 'ethereumjs-tx'
import ToolkitContract from '../contracts/Toolkit'
import Web3 from 'web3'

config()

const abi = ToolkitContract.abi
const address = process.env.contractAddress
const mnemonic = process.env.mnemonic
const privateKey = Buffer.from(mnemonic, 'hex')
const host = process.env.host || 'http://localhost:8545'
const account = process.env.account
const from = {from: account}

export const Toolkit = {
  contract: null,
  web3: null,

  /**
   * Initializes a contract instance to be queried.
   * @returns {Promise<Boolean>} true on success
   */
  init: () => new Promise((resolve, reject) => {
    try {
      Toolkit.web3 = new Web3(new Web3.providers.HttpProvider(host))
      Toolkit.contract = new Toolkit.web3.eth.Contract(abi, address, Object.assign({gasLimit: 3000000}, from))
      resolve(true)
    }
    catch (e) {
      reject(e)
    }
  }),

  /**
   * Post makes calls to the writing contract functions
   * @param functionName The expected contract function to be executed
   * @param params An array of the expected parameters the contract function receives.
   * @returns {Promise<String>} A transaction hash on successful operations.
   */
  post: (functionName, params) => new Promise((resolve, reject) => {
    console.log(`${functionName}(${params.join()})`)
    const contractFunction = Toolkit.contract.methods[functionName](...params)
    const functionAbi = Toolkit.contract.methods[functionName](...params).encodeABI()
    contractFunction.estimateGas(from)
      .then(gas => sign(functionAbi, gas))
      .then(serializedTx => Toolkit.web3.eth.sendSignedTransaction(`0x${serializedTx}`))
      .then(tx => {
        console.log(tx.transactionHash)
        resolve(tx.transactionHash)
      })
      .catch(reject)
  }),

  /**
   * Get makes calls to the only read contract functions
   * @param functionName The expected contract function to be consulted
   * @param params An array of the expected parameters the contract function receives
   * @returns {Promise<any>} A tuple of n-th elements the function returns
   */
  get: (functionName, params) => new Promise((resolve, reject) => {
    Toolkit.contract.methods[functionName](...params).call({from: account})
      .then(resolve)
      .catch(reject)
  })
}

const sign = (functionAbi, gasLimit) => new Promise((resolve, reject) => {
  try {
    Toolkit.web3.eth.getGasPrice()
      .then(gasPrice => {
        console.log(`Gas Price: ${gasPrice}`)
        Toolkit.web3.eth.getTransactionCount(account)
          .then(nonce => {
            console.log(`Nonce: ${nonce}`)
            const txParams = {
              gasPrice: Toolkit.web3.utils.toHex(gasPrice),
              gasLimit,
              to: address,
              data: functionAbi,
              from: account,
              nonce
            }
            const tx = new Tx(txParams)
            console.log(gasPrice, gasLimit)
            tx.sign(privateKey)
            resolve(tx.serialize().toString('hex'))
          })
          .catch(reject)
      })
      .catch(reject)
  }
  catch (e) {
    reject(e)
  }
})
