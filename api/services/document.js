import { errors } from '../helpers/error'
import IPFSRepository from '../repositories/IPFS'

const saveFile = file => new Promise((resolve, reject) => {
  IPFSRepository.add(file)
    .then(resolve)
    .catch(() => {
      reject(errors.INTERNAL_SERVER_ERROR)
    })
})

export default {
  saveFile
}