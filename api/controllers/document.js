const controllerHelper = require('../helpers/controller')
const documentService = require('../services/document')

function saveFile (req, res) {
  const file = req.swagger.params.file.value
  documentService.saveFile(file)
    .then(result => {
      res.status(201).send({result})
    })
    .catch(error => {
      controllerHelper.handleError(error, res)
    })
}

module.exports = {
  saveFile
}