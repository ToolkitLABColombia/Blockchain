import controllerHelper from '../helpers/controller'
import documentService from '../services/document'

const saveFile = (req, res) => {
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