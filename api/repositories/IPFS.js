import fileType from 'file-type'
import {config} from 'dotenv'
import {ipfs} from '../helpers/IPFS'

config()

/**
 * Saves a binary file into the specified IPFS network
 * @param file The binary file
 * @param validate boolean, determines if the add function uploads the file (default), or only gets the document IPFS hash
 * @returns {Promise<{hash: 'IPFS_HASH', name: 'FILE_NAME'}>} An object with the IPFS hash and
 * the uploaded file name.
 */
const add = (file, validate = false)=> new Promise((resolve, reject) => {
  const options = {
    pin: process.env.pin || false
  }
  if (validate) options['onlyHash'] = true
  ipfs.files.add(file.buffer, options, (err, response) => {
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
