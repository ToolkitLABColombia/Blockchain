const {errors} = require('../helpers/error')

function saveFile (file) {
  return new Promise((resolve, reject) => {
    if (file.mimetype.split('/')[1] === 'pdf')
      resolve(file.originalname)
    reject(errors.FORBIDDEN)
  })
}

module.exports = {
  saveFile
}