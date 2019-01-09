/**
 * Axel Boberg © 2018
 */

const { ensure } = require('./validation')

const VALIDATION_RULES = {
  'method': { required: true, default: 'get', allowed: ['get', 'post', 'put', 'delete'] }
}

exports.ensure = obj => { 
  if (obj.method) {
    obj.method = String(obj.method).toLowerCase()
  }

  return ensure(obj, VALIDATION_RULES)
}