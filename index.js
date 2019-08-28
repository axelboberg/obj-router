/**
 * Axel Boberg © 2019
 */

const HttpError = require('./lib/error/http')

const objects = require('./lib/objects')
const url = require('./lib/url')
const resolvers = require('./lib/resolvers')

function defaults (target, definition) {
  const mirror = Object.assign({}, definition)
  return Object.assign(mirror, target)
}

function Router (routes) {
  if (typeof routes !== 'object' || Array.isArray(routes)) {
    throw new TypeError('Routes must be a non-array object')
  }

  let _routes = routes || {}

  /**
   * Allow the routes to be modified
   * after the creation of the router
   */
  this.routes = _routes

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

    // Assign the url info to the payload object
    payload.path = info.path
    payload.pathname = info.pathname
    payload.query = Object.assign(payload.query || {}, info.query)

    payload.searchPath = payload.path.concat([ payload.method ])
    return payload
  }

  /**
   * Resolve a path with payload
   */
  this.resolve = function (path, req = {}) {
   req = createPayload(path, req)
    return resolve(_routes, req.searchPath, { resolvers: _resolvers, req: req })
  }

  /**
   * Execute a route with a request object as payload
   */
  this.execute = function (path, req = { method: 'GET' }, ...args) {
    const endpoint = this.resolve(path, req)
    return execute(endpoint, req, ...args)
  }

  /**
   * Add a resolver to the front of the stack
   */
  this.addResolverBefore = function (resolver) {
    if (typeof resolver !== 'function') {
      throw new TypeError('Resolver needs to be a function')
    }
    _resolvers.unshift(resolver)
  }

  /**
   * Add a resolver to the back of the stack
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
  const _resolve = (...args) => {
    path.shift()

    const [ _obj, _path, _opts ] = args
    resolved = resolve(_obj, _path || path, _opts || opts)
  }

  for (let resolver of opts.resolvers) {
    resolver(obj, path, opts, _resolve)
    if (resolved) break
  }

  return resolved || obj
}

/**
 * Execute an endpoint
 * @param { Function? } endpoint
 * @param { Object? } req
 * @param { Array<Any?>? } args Additional arguments to pass to the endpoint
 */
function execute (endpoint, req = {}, ...args) {
  return new Promise (resolve => {
    // 404
    if (endpoint === null) {
      throw new HttpError(404)
    }

    if (typeof endpoint !== 'function') {
      throw new TypeError(`Endpoint is not a function`)
    }

    resolve(endpoint(req, ...args))
  })
}

module.exports = Router
module.exports.HttpError = HttpError