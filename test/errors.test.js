const Router = require('../index')
const routes = require('./test.routes')

const router = new Router(routes)

test('execute a failing route (404)', async () => {
  await expect(router.execute('/error/404')).rejects
})

test('execute a route that is not a function', async () => {
  await expect(router.execute('/error/500')).rejects
})