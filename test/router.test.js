const Router = require('../index')
const HTTPError = require('../lib/error/http')
const routes = require('./test.routes')

const router = new Router(routes)

test('resolve a route successfully', () => {
  expect(router.resolve('/api/foo')).toBe('baz')
})

test('execute a route successfully', async () => {
  await expect(router.execute('/api/bar')).resolves.toBe('Hello World')
})

test('execute a route with a path parameter successfully', async () => {
  await expect(router.execute('/api/parameter')).resolves.toBe('parameter')
})

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
