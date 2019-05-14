/**
 * Axel Boberg © 2019
 */

module.exports = (obj, path, resolve, opts) => {
  if (!opts.req) opts.req = {}

  /**
   * Prioritize looking for methods
   * if the current key is the HTTP-method
   */
  if (path.length === 1) return

  if (!opts.req.params) opts.req.params = {}
  
  const param = Object.keys(obj)
    .find(_key => {
      return /^:/.test(_key)
    })

  if (!param) return

  /**
   * Remove the initial ':' from the parameter
   */
  const paramName = param.slice(1, param.length)
  opts.req.params[paramName] = path[0]

  resolve(obj[param])
}