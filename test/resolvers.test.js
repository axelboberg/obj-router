const Router = require('../index')
const routes = require('./test.routes')

const router = new Router(routes)

test('add resolver before stack', async () => {
  router.addResolverBefore((obj, path, opts, resolve) => {
    if (!opts.req) opts.req = {}
    opts.req.before = true
  })
  await expect(router.execute('/req')).resolves.toHaveProperty('before', true)
})

test('add resolver after stack', async () => {
  router.addResolverAfter((obj, path, opts, resolve) => {
    resolve(req => Promise.resolve('Appended resolver'))
  })
  await expect(router.execute('/req')).resolves.toBe
})