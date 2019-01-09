/**
 * Axel Boberg © 2019
 */

module.exports = (path, obj, req) => {
  /**
   * Prioritize looking for methods
   * if the current key is the HTTP-method
   */
  if (path.length === 1) return null

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

  req.params[paramName] = path[0]
  return obj[param]
}