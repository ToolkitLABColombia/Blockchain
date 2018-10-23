import FormData from 'form-data'
import fs from 'fs'
import {ipfs} from '../helpers/IPFS'

const add = file => new Promise((resolve, reject) => {
  ipfs.files.add(file.buffer, (err, response) => {
    if (err) reject(err)
    const {hash} = response[0]
    const name = file.originalname
    resolve({hash, name})
  })
})

export default {
  add
}