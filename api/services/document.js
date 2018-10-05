import { errors, error } from '../helpers/error'
import IPFSRepository from '../repositories/IPFS'

const saveFile = file => new Promise((resolve, reject) => {
  IPFSRepository.add(file)
    .then(response => response.Hash)
    .then(hash => {})
    .catch(e => {
      reject(error(errors.INTERNAL_SERVER_ERROR, e.message))
    })
})

export default {
  saveFile
}