const Router = require('../index')
const routes = require('./test.routes')

const router = new Router(routes)

test('add resolver', async () => {
  router.addResolver((obj, path, opts, resolve) => {
    if (!opts.req) opts.req = {}
    opts.req.before = true
  })
  await expect(router.execute('/req')).resolves.toHaveProperty('before', true)
})