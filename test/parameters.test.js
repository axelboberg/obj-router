const Router = require('../index')
const routes = require('./test.routes')

const router = new Router(routes)

test('execute a route with a path parameter', async () => {
  await expect(router.execute('/api/parameter')).resolves.toBe('parameter')
})

test('execute a path with query parameters', async () => {
  await expect(router.execute('/api/query/?query=parameter')).resolves.toBe('parameter')
})