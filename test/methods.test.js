const Router = require('../index')
const routes = require('./test.routes')

const router = new Router(routes)

test('prioritize methods', async () => {
  await expect(router.execute('/api')).resolves.toBe('Prioritized')
})

test('execute patch', async () => {
  await expect(router.execute('/api/methods', { method: 'patch' })).resolves.toBe('patch')
})