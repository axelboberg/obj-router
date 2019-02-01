const Router = require('../index')
const routes = require('./test.routes')

const router = new Router(routes)

test('execute a route', async () => {
  await expect(router.execute('/api/foo')).resolves.toBe('First get')
})

test('execute a route with trailing slash', async () => {
  await expect(router.execute('/api/foo/')).resolves.toBe('First get')
})

