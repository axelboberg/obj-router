const Router = require('../index')
const routes = require('./test.routes')

const router = new Router(routes)

test('prepend resolver', async () => {
  router.addResolverBefore((obj, path, resolve, opts) => {
    if (!opts.req) opts.req = {}
    opts.req.before = true
  })
  await expect(router.execute('/req')).resolves.toHaveProperty('before', true)
})

test('append resolver', async () => {
  router.addResolverAfter((obj, path, resolve, opts) => {

    /**
     * Resolve to a hijacked object
     * resolver a get handler
     */
    resolve ({
      'get': req => { return Promise.resolve('hijack') }
    })
  })

  /**
   * Use a non matching route since the appended
   * resolver wouldn't otherwise be called
   */
  await expect(router.execute('/404')).resolves.toBe('hijack')
})