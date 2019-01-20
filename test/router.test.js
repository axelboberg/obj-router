const Router = require('../index')
const HTTPError = require('../lib/error/http')
const routes = require('./test.routes')

const router = new Router(routes)

test('execute a route', async () => {
  await expect(router.execute('/api/foo')).resolves.toBe('First get')
})

test('execute a route with trailing slash', async () => {
  await expect(router.execute('/api/foo/')).resolves.toBe('First get')
})

test('execute a route with a path parameter', async () => {
  await expect(router.execute('/api/parameter')).resolves.toBe('parameter')
})

test('execute a path with query parameters', async () => {
  await expect(router.execute('/api/query/?query=parameter')).resolves.toBe('parameter')
})

test('prioritize methods', async () => {
  await expect(router.execute('/api')).resolves.toBe('Prioritized')
})

/* Errors */

test('execute a failing route (404)', async () => {
  await expect(router.execute('/error/404')).rejects.toEqual(new HTTPError(404))
})

test('execute a failing route (500)', async () => {
  /**
   * TODO: Test succeeds regardless of error code
   */
  await expect(router.execute('/error/500')).rejects.toEqual(new HTTPError(500))
})

test('prepend resolver', async () => {
  router.addResolverBefore((key, obj, req) => {
    req.before = true
  })
  await expect(router.execute('/req')).resolves.toHaveProperty('before', true)
})

test('append resolver', async () => {
  router.addResolverAfter((key, obj, req) => {

    /**
     * Resolve to a hijacked object
     * resolver a get handler
     */
    return {
      'get': req => { return Promise.resolve('hijack') }
    }
  })

  /**
   * Use a non matching route since the appended
   * resolver wouldn't otherwise be called
   */
  await expect(router.execute('/404')).resolves.toBe('hijack')
})
