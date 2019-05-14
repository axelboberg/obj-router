const Router = require('../index')
const routes = require('./test.routes')

const router = new Router(routes)

test('execute wildcard', async () => {
  await expect(router.execute('/wildcard')).resolves.toBe('This is a wildcard')
})

test('execute a nested wildcard', async () => {
  await expect(router.execute('/nested/wildcard')).resolves.toBe('This is a nested wildcard')
})
