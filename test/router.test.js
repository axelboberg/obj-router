const Router = require('../lib/router')
const ResponseError = require('../lib/error/response')
const routes = {
  '/foo': {
    ':bar': {
      '/baz': {
        'faz': 'Hello World'
      }
    }
  }
}
const router = new Router(routes)

test('resolve a route successfully', () => {
  expect.assertions(1)
  expect(router.resolve('/foo/bar/baz')).resolves.toEqual({'faz': 'Hello World'})
})

test('resolve a route with error 404', () => {
  expect.assertions(1)
  expect(router.resolve('/404')).rejects.toEqual(new ResponseError(404))
})