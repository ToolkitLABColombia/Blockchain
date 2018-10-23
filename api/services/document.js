import { error, errors } from '../helpers/error'
import IPFSRepository from '../repositories/IPFS'
import {Toolkit} from '../repositories/SmartContract'

const saveFile = file => new Promise((resolve, reject) => {
  IPFSRepository.add(file)
    .then(resolve)
    .catch(e => {
      reject(error(errors.INTERNAL_SERVER_ERROR, e.message))
    })
})

const saveHash = hash => new Promise((resolve, reject) => {
  Toolkit.init()
    .then(() => {
      Toolkit.add(hash).then(resolve)
    })
    .catch(e => {
      reject(error(errors.INTERNAL_SERVER_ERROR, e.message))
    })})

export default {
  saveFile,
  saveHash
}