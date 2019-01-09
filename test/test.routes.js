module.exports = {
  '/api': {
    '/foo': {
      'get': 'baz'
    },
    '/bar': {
      'get': req => { return Promise.resolve('Hello World') }
    },
    ':baz': {
      'get': req => { return Promise.resolve(req.params[':baz']) }
    }
  },
  '/error': {
    '/500': {
      'get': false
    }
  }
}