/**
 * Axel Boberg © 2018
 */

const { ensure } = require('./validation')

const methods = [
  'get',
  'head',
  'post',
  'put',
  'delete',
  'patch'
]

const VALIDATION_RULES = {
  'method': { required: true, default: 'get', allowed: methods }
}

exports.ensure = obj => { 
  if (obj.method) {
    obj.method = String(obj.method).toLowerCase()
  }

  return ensure(obj, VALIDATION_RULES)
}