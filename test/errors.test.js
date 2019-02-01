const Router = require('../index')
const HTTPError = require('../lib/error/http')
const routes = require('./test.routes')

const router = new Router(routes)

test('execute a failing route (404)', async () => {
  await expect(router.execute('/error/404')).rejects.toEqual(new HTTPError(404))
})

test('execute a failing route (500)', async () => {
  /**
   * TODO: Test succeeds regardless of error code
   */
  await expect(router.execute('/error/500')).rejects.toEqual(new HTTPError(500))
})