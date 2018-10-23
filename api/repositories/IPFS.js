import FormData from 'form-data'
import fs from 'fs'
import {ipfs} from '../helpers/IPFS'

const add = file => new Promise((resolve, reject) => {
  try {
    fs.writeFile(`/tmp/${file.originalname}`, file, err => {
      if (err) throw err
      fs.readFile(`/tmp/${file.originalname}`, (err, data) => {
        if (err) throw err
        const formData = new FormData()
        formData.append('file', data, file.originalname)
        ipfs.add(formData, (err, response) => {
          if(err) console.log(err)
          console.log(response)
          resolve(response)
        })
      })
    })
  } catch (e) {
    reject(e)
  }

})

export default {
  add
}