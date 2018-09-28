const _ = require('lodash')
const error = require('./error')

function handleError (e, res) {
  res.status(e.code).send(e)
}

module.exports = {
  handleError
}