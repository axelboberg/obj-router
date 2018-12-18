/**
 * Axel Boberg © 2018
 */

const ResponseError = require('../lib/error/response')
const request = require('../lib/request')

/**
 * {
 *   "/path": {
 *     "/path": {
 *       "/:param": {
 *         "before": [function],
 *         "get": function,
 *         "after": [function],
 *         "/path": {
 *           "post": function
 *         }
 *       }
 *     }
 *   }
 * }
 */

const PATH_TYPES = {
  'param': /^((\/)?:)\w+/g // path starting with /: or : is a parameter
}

module.exports = Router
function Router (routes) {
  const root = routes
  this.getRoot = function () {
    return root
  }
}

/**
 * Execute a path
 * @param { String } path
 * @param { Object? } req
 * @returns { Promise<any> }
 */
Router.prototype.execute = function (path, req) {
  req = request.assure(req)

  // TODO: Extract query parameters
  
  return Router.resolve(path, this.getRoot())
    .then((endpoint, params) => {
      console.log(endpoint)
    })
}

Router.resolve = function (path, obj) {
  return new Promise((resolve, reject) => {
    let keys = splitPathToKeys(path)
    let params = {}
  
    while (keys.length > 0) {
      obj = deepFindByKeys(keys, obj)
  
      if (keys.length > 0) {
        let param = Object.keys(obj).find(val => {
          return pathIsType('param', val)
        })
  
        if (!param) throw new ResponseError(404)
  
        params[removeNChars(1, param)] = removeNChars(1, keys.shift())
        keys.unshift(param)
      }
    }

    return resolve(obj, params)
  })
}

Router.prototype.resolve = function (path) {
  return Router.resolve(path, this.getRoot())
}

function deepFindByKeys (keys, obj) {
  let i = 0
  for (; i < keys.length; i++) {
    if (!obj[keys[i]]) break
    obj = obj[keys[i]]
  }

  keys.splice(0, i)
  return obj
}

function splitPathToKeys (path) {
  const keys = path.replace(/\//gi, '\\/').split('\\')
  if (keys[0] === '') keys.shift()

  return keys
}

function pathIsType (type, path) {
  if (!PATH_TYPES[type]) return false
  return PATH_TYPES[type].test(path)
}

function removeNChars(n, str) {
  return str.substr(n, str.length - 1)
}