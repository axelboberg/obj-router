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
    '/query': {
      'get': req => { return Promise.resolve(req.query.query) }
    },
    'get': req => { return Promise.resolve('Prioritized') },
    '/methods': {
      'patch': req => { return Promise.resolve('patch') }
    }
  },

  /**
   * Error routes
   */
  '/error': {
    '/500': {
      'get': false
    }
  },

  /**
   * Dumb route, returns with the request-object
   */
  '/req': {
    'get': req => { return Promise.resolve(req) },
    '/req': {
      'get': req => { return Promise.resolve(req) }
    }
  },

  /**
   * Wildcards
   */
  '*': {
    'get': req => { return Promise.resolve('This is a wildcard') }
  },
  '/nested': {
    '*': {
      'get': req => { return Promise.resolve('This is a nested wildcard') }
    }
  },

  /**
   * Additional arguments
   */
  '/args': {
    'get': (req, myVal) => { return Promise.resolve(myVal) }
  }
}