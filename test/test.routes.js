module.exports = {
  '/api': {
    '/foo': {
      'get': req => { return Promise.resolve('First get') },
      '/bar': {
        'get': req => { return Promise.resolve('Second get') },
        '/baz': {
          'get': req => { return Promise.resolve('Third get') }
        }
      }
    },
    ':param': {
      'get': req => { return Promise.resolve(req.params.param) }
    },
    'get': req => { return Promise.resolve('Prioritized') }
  },
  '/error': {
    '/500': {
      'get': false
    }
  },
  '/req': {
    'get': req => { return Promise.resolve(req) }
  }
}