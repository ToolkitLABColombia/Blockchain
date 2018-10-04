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
        formData.append('file', data, file.originalname)
        // TODO: turn pin to true on production
        axios.post('https://ipfs.infura.io:5001/api/v0/add?pin=false', formData, {headers: formData.getHeaders()})
          .then(response => {
            const {Hash, Name} = response.data
            resolve({Hash, Name})
          })
          .catch(error => {
            console.error(error)
            reject(error)
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