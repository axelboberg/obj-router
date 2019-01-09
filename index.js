/**
 * Axel Boberg © 2019
 */

const HTTPError = require('./lib/error/http')

const objects = require('./lib/objects')
const url = require('./lib/url')
const resolvers = require('./lib/resolvers')

module.exports = function (routes) {
  if (typeof routes !== 'object' || Array.isArray(routes)) {
    throw new TypeError('Routes must be a non-array object')
  }

  let _routes = routes
  let _resolvers = [].concat(resolvers)

  function createPayload (path, payload = {}) {
    payload = objects.payload.ensure(payload)
    const info = url.info(path)
    Object.assign(payload, info)

    payload.searchPath = payload.path.concat([payload.method])

    return payload
  }

  this.resolve = function (pathname, payload) {
    payload = createPayload(pathname, payload)
    return resolve(payload.searchPath, _routes, _resolvers, payload)
  }

  this.execute = function (pathname, payload) {
    payload = createPayload(pathname, payload)

    const endpoint = resolve(payload.searchPath, _routes, _resolvers, payload)
    return execute(endpoint, payload)
  }

  this.addResolverBefore = function (resolver) {
    if (typeof resolver !== 'function') {
      throw new TypeError('Resolver needs to be a function')
    }
    _resolvers.unshift(resolver)
  }

  this.addResolverAfter = function (resolver) {
    if (typeof resolver !== 'function') {
      throw new TypeError('Resolver needs to be a function')
    }
    _resolvers.push(resolver)
  }
}

/**
 * Resolve a path in the object, 
 * will add any path parameters to payload.path
 * @param { Array<String> } path The path to execute
 * @param { Object } obj An object to search for the path in
 * @param { Array<Function> } resolvers
 * @param { Object } payload An object to add parameter data to
 * @returns { Any? }
 */
function resolve (path, obj, resolvers, payload = {}) {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    throw new TypeError('Invalid object')
  }

  /**
   * Loop through each key of the path
   * and apply filters until a match
   * is found
   */
  for (let i = 0, len = path.length; i < len; i++) {
    const key = path[i]
    let next

    for (let resolver of resolvers) {
      const res = resolver(key, obj, payload)
      if (!res) continue

      next = res
      break
    }

    if (next === null) return null // 404
    if (typeof next !== 'object' && i < len - 1) return null // 500

    obj = next
  }

  return obj
}

/**
 * Execute an endpoint
 * @param { Function? } endpoint
 * @param { Object? } payload
 */
function execute (endpoint, payload = {}) {
  return new Promise (resolve => {
    // 404
    if (endpoint === null) {
      throw new HTTPError(404)
    }

    // 500
    if (typeof endpoint !== 'function') {
      throw new HTTPError(500)
    }

    resolve(endpoint(payload))
  })
}