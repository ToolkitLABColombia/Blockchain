import {error, errors} from '../helpers/error'
import IPFSRepository from '../repositories/IPFS'
import {Toolkit} from '../repositories/SmartContract'

const saveFile = file => new Promise((resolve, reject) => {
  IPFSRepository.add(file)
    .then(response => saveHash(response))
    .then(resolve)
    .catch(e => {
      reject(error(errors.INTERNAL_SERVER_ERROR, e.message))
    })
})

const getFile = hash => new Promise((resolve, reject) => {
  IPFSRepository.get(hash)
    .then(resolve)
    .catch(e => {
      reject(error(errors.INTERNAL_SERVER_ERROR, e.message))
    })
})

const saveHash = data => new Promise((resolve, reject) => {
  Toolkit.init()
    .then(() => {
      Toolkit.add(data).then(resolve)
    })
    .catch(e => {
      reject(error(errors.INTERNAL_SERVER_ERROR, e.message))
    })
})

export default {
  saveFile,
  getFile,
  saveHash
}