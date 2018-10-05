import ToolkitContract from '../contracts/Toolkit'
import Web3 from 'web3'

const abi = ToolkitContract.abi
const address = '0x4e84819523c12aaf473377a3f7c11bf913704955'

export const Toolkit = {
  contract: null,

  init: () => new Promise((resolve, reject) => {
    try {
      const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
      const contract = web3.eth.contract(abi)
      const instance = contract.at(address)
      Toolkit.contract = instance
      resolve(true)
    }
    catch (e) {
      reject(e)
    }
  }),

  add: hash => new Promise((resolve, reject) => {
    const part1 = hash.substr(0, 32)
    const part2 = hash.substr(32)
    Toolkit.contract.add(part1, part2, {from: '0xe63ea5a99a8273ffee5e4a025afb801e4714fc0e'}, (err, result) => {
      if (err) reject(err)
      resolve(result)
    })
  })
}