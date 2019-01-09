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

  /**
   * Remove the initial ':' from the parameter
   */
  const paramName = param.slice(1, param.length)

  req.params[paramName] = key
  return obj[param]
}