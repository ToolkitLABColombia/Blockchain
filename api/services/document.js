import {error, errors} from '../helpers/error'
import IPFSRepository from '../repositories/IPFS'
import {Toolkit} from '../repositories/SmartContract'

/**
 * Saves a binary file to the specified IPFS network and the
 * specified Ethereum network
 * @param file The binary file
 * @returns {Promise<{hash: 'IPFS_HASH', tx: 'ETHEREUM_TX_HASH'}>} An object with the IPFS hash and
 * Ethereum transaction hash.
 */
const saveFile = file => new Promise((resolve, reject) => {
  IPFSRepository.add(file)
    .then(saveHash)
    .then(resolve)
    .catch(e => {
      reject(error(errors.INTERNAL_SERVER_ERROR, e.message))
    })
})

/**
 * Gets the binary file by its hash
 * @param hash IPFS hash
 * @returns {Promise<{type: 'MIME_TYPE', content: 'BUFFER'}>}
 */
const getFile = hash => new Promise((resolve, reject) => {
  IPFSRepository.get(hash)
    .then(resolve)
    .catch(e => {
      reject(error(errors.INTERNAL_SERVER_ERROR, e.message))
    })
})

/**
 * Invokes the `add` method of the SmartContract
 * @param data An object with the IPFS hash and file name
 * {hash: 'IPFS_HASH', name: 'FILE_NAME'}
 * @returns {Promise<{hash: 'IPFS_HASH', tx: 'ETHERUM_TX_HASH'}>}
 */
const saveHash = data => new Promise((resolve, reject) => {
  Toolkit.init()
    .then(() => {
      const {hash, name} = data
      const part1 = hash.substr(0, 32)
      const part2 = hash.substr(32)
      Toolkit.post('add', [part1, part2, name])
        .then(tx => {
          resolve({hash, tx})
        })
    })
    .catch(e => {
      console.error(e)
      reject(error(errors.INTERNAL_SERVER_ERROR, e.message))
    })
})

export default {
  saveFile,
  getFile
}