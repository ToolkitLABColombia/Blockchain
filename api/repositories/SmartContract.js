import {config} from 'dotenv'
import HDWallet from 'truffle-hdwallet-provider'
import ToolkitContract from '../contracts/Toolkit'
import Web3 from 'web3'

config()

const abi = ToolkitContract.abi
const address = process.env.contractAddress
const mnemonic = process.env.mnemonic
const host = process.env.host || 'http://localhost:8545'
const hdWallet = new HDWallet(mnemonic, host)
let account

export const Toolkit = {
  contract: null,

  init: async() => new Promise((resolve, reject) => {
    try {
      const web3 = new Web3(new Web3.providers.HttpProvider(host))
      const contract = web3.eth.contract(abi)
      Toolkit.contract = contract.at(address)
      account = hdWallet.getAddress(0)
      resolve(true)
    }
    catch (e) {
      reject(e)
    }
  }),

  add: data => new Promise((resolve, reject) => {
    const {hash, name} = data
    const part1 = hash.substr(0, 32)
    const part2 = hash.substr(32)
    Toolkit.contract.add(part1, part2, name, {from: account}, (err, result) => {
      if (err) reject(err)
      const response = {hash, tx: result}
      resolve(response)
    })
  })
}