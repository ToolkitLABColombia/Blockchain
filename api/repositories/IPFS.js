import axios from 'axios'
import FormData from 'form-data'
import fs from 'fs'

const add = file => new Promise((resolve, reject) => {
  try {
    fs.writeFile(`/tmp/${file.originalname}`, file, err => {
      if (err) throw err
      fs.readFile(`/tmp/${file.originalname}`, (err, data) => {
        if (err) throw err
        const formData = new FormData()
        formData.append('file', data)
        // TODO: turn pin to true on production
        axios.post('https://ipfs.infura.io:5001/api/v0/add?pin=false', formData, {headers: {'Content-Type': 'multipart/form-data'}})
          .then(response => {
            resolve(response.data.Hash)
          })
          .catch(reject)
      })
    })
  } catch (e) {
    reject(e)
  }

})

export default {
  add
}