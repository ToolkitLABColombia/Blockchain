import fileType from 'file-type'
import {ipfs} from '../helpers/IPFS'

/**
 * Saves a binary file into the specified IPFS network
 * @param file The binary file
 * @returns {Promise<{hash: 'IPFS_HASH', name: 'FILE_NAME'}>} An object with the IPFS hash and
 * the uploaded file name.
 */
const add = file => new Promise((resolve, reject) => {
  ipfs.files.add(file.buffer, (err, response) => {
    if (err) reject(err)
    const {hash} = response[0]
    const name = file.originalname
    resolve({hash, name})
  })
})

/**
 * Gets the binary file by its hash
 * @param hash IPFS hash
 * @returns {Promise<{type: 'MIME_TYPE', content: 'BUFFER'}>}
 */
const get = hash => new Promise((resolve, reject) => {
  ipfs.files.cat(hash, (err, response) => {
    if(err) reject(err)
    const type = fileType(response)
    resolve({type, content: response})
  })
})

export default {
  add,
  get
}