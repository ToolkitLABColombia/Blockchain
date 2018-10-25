const handleError = (e, res) => {
  res.status(e.code).send(e)
}

export default {
  handleError
}