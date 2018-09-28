const errors = {
  FORBIDDEN: {error: 'Forbidden', msg: 'You are not allowd to perform this operation', code: 403},
  NOT_FOUND: {error: 'Not found', msg: 'Resource not found', code: 404},
  INTERNAL_SERVER_ERROR: {error: 'Internal server error', msg: 'The server encountered an unexpected condition', code: 500}
}

function error (code) {
  const c = !!errors[code] ? code : 500
  return errors[c]
}

module.exports = {
  errors,
  error
}