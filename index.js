/**
 * Axel Boberg © 2019
 */

const HTTPError = require('./lib/error/http')

const objects = require('./lib/objects')
const url = require('./lib/url')
const resolvers = require('./lib/resolvers')

function defaults (target, definition) {
  const mirror = Object.assign({}, definition)
  return Object.assign(mirror, target)
}

module.exports = function (routes) {
  if (typeof routes !== 'object' || Array.isArray(routes)) {
    throw new TypeError('Routes must be a non-array object')
  }

  let _routes = routes

  /**
   * Make copy of resolvers in order
   * to be able to add custom ones
   * without modifying the original
   * array
   */
  let _resolvers = [].concat(resolvers)

  /**
   * Helper to populate a payload
   * object for a path
   */
  function createPayload (path, payload = {}) {
    payload = objects.payload.ensure(payload)

    const info = url.info(path)
    Object.assign(payload, info)

    payload.searchPath = payload.path.concat([ payload.method ])
    return payload
  }

  /**
   * Resolve a path with payload
   */
  this.resolve = function (pathname, payload) {
    payload = createPayload(pathname, payload)
    return resolve(_routes, payload.searchPath, { resolvers: _resolvers })
  }

  /**
   * Execute a route with a request object as payload
   */
  this.execute = function (pathname, req) {
    req = createPayload(pathname, req)

    const endpoint = resolve(_routes, req.searchPath, { resolvers: _resolvers, req: req })
    return execute(endpoint, req)
  }

  /**
   * Add a resolver to the stack
   * before the default ones
   */
  this.addResolverBefore = function (resolver) {
    if (typeof resolver !== 'function') {
      throw new TypeError('Resolver needs to be a function')
    }
    _resolvers.unshift(resolver)
  }

  /**
   * Add a resolver to the stack
   * after the default ones
   */
  this.addResolverAfter = function (resolver) {
    if (typeof resolver !== 'function') {
      throw new TypeError('Resolver needs to be a function')
    }
    _resolvers.push(resolver)
  }
}

/**
 * Resolve a path in the object, 
 * will add any path parameters to opts.req.params
 * 
 * @param { Object } obj 
 * @param { String } path The path to execute
 * @param { Object? } opts 
 * @returns { Any? }
 *//**
 * Resolve a path in the object, 
 * will add any path parameters to opts.req.params
 * 
 * @param { Object } obj 
 * @param { String } path The path to execute
 * @param { Object? } opts 
 * @returns { Any? }
 */
function resolve (obj, path, opts = {}) {
  opts = defaults(opts, {
    resolvers: [],
    delimiter: '/'
  })

  if (typeof path === 'string') path = path.split(opts.delimiter)
  if (path.length === 0) return obj

  let resolved
  const _resolve = val => {
    path.shift()
    resolved = resolve(val, path, opts)
  }

  for (let resolver of opts.resolvers) {
    resolver(obj, path, _resolve, opts)
    if (resolved) break
  }

  return resolved || obj
}

/**
 * Execute an endpoint
 * @param { Function? } endpoint
 * @param { Object? } payload
 */
function execute (endpoint, req = {}) {
  return new Promise (resolve => {
    // 404
    if (endpoint === null) {
      throw new HTTPError(404)
    }

    // 500
    if (typeof endpoint !== 'function') {
      throw new HTTPError(500)
    }

    resolve(endpoint(req))
  })
}