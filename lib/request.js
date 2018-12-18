/**
 * Axel Boberg © 2018
 */

const {validate, ensure} = require('./validation')

const REQUEST_VALIDATION_RULES = {
  'method': { required: true, default: 'get', allowed: ['get', 'post', 'put', 'delete'] }
}

exports.ensure = function (req) {
  if (req.method) {
    req.method = String(req.method).toLowerCase()
  }
  return ensure(req, REQUEST_VALIDATION_RULES)
}

exports.validate = function (req) {
  return validate(req, REQUEST_VALIDATION_RULES)
}
