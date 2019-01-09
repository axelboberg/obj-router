/**
 * Axel Boberg © 2019
 */

module.exports = (key, obj, req) => {
  if (!req.params) req.params = {}

  const param = Object.keys(obj)
    .find(_key => {
      return /^:/.test(_key)
    })

  if (!param) return null

  req.params[param] = key
  return obj[param]
}