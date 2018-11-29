import {error, errors} from '../helpers/error'
import IPFSRepository from '../repositories/IPFS'
import {Toolkit} from '../repositories/SmartContract'

/**
 * Validates whether or not a file does exist in our SmartContract
 * @param file The file to validate
 * @returns {Promise<{hash: 'IPFS_HASH', tx: 'ETHEREUM_TX_HASH'}>}.
 */
const validateFile = file => new Promise((resolve, reject) => {
  IPFSRepository.add(file, true)
    .then(result => {
      return Toolkit.init()
        .then(() => {
          const {hash} = result
          const part1 = hash.substr(0, 32)
          const part2 = hash.substr(32)
          return Toolkit.get('validate', [part1, part2])
        })
        .then(fileName => {
          if (!!fileName) {
            const {hash} = result
            resolve({hash, fileName})
          }
          reject(error(errors.NOT_FOUND, `The document was not found in our records`))
        })
    })
})
/**
 * Saves a binary file to the specified IPFS network and the
 * specified Ethereum network
 * @param file The binary file
 * @returns {Promise<{hash: 'IPFS_HASH', tx: 'ETHEREUM_TX_HASH' | fileName: 'EXISTING_FILE_NAME'}>} An object with the IPFS hash and
 * Ethereum transaction hash.
 */
const addFile = file => new Promise((resolve, reject) => {
  const result = validateFile(file)
    .then(result => {
      const {hash, fileName} = result
      reject(error(errors.CONFLICT, {hash, fileName}))
    })
    .catch(() => IPFSRepository.add(file))
  result
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
  Toolkit.init()
    .then(() => {
      const part1 = hash.substr(0, 32)
      const part2 = hash.substr(32)
      return Toolkit.get('validate', [part1, part2])
    })
    .then(fileName => {
      if (fileName)
        return IPFSRepository.get(hash)
      reject(error(errors.NOT_FOUND, `The requested file with hash ${hash} has not been found.`))
    })
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
  addFile,
  getFile,
  validateFile
}
