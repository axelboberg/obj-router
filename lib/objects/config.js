/**
 * Axel Boberg © 2019
 */

const { ensure } = require('./validation')

const VALIDATION_RULES = {
  'verbose': { required: false, default: false }
}

exports.ensure = obj => { return ensure(obj, VALIDATION_RULES) }
