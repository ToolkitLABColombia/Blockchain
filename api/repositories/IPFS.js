import fileType from 'file-type'
import {ipfs} from '../helpers/IPFS'

const add = file => new Promise((resolve, reject) => {
  ipfs.files.add(file.buffer, (err, response) => {
    if (err) reject(err)
    const {hash} = response[0]
    const name = file.originalname
    resolve({hash, name})
  })
})

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