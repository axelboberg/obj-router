# obj-router
A lightweight router based on objects for NodeJS Promises. For small web services.

## Note  
**This update contains breaking changes**

## Example

```javascript
const routes = require('hello.routes')
const router = new Router(routes)

const req = {
	surname: 'Appleseed'
}
const message = await router.execute('/hello/mr?name=John', req)

// `message` = 'Hello mr. John Appleseed!'

```

hello.routes.js
```javascript
module.exports = {
    '/hello': {
        ':title': {
            get: req => {
              return Promise.resolve(`Hello ${req.params.title}. ${req.query.name} ${req.surname}!`)
            }
        }
    }
}
```


## API

### Routing

#### `/path`

Regular paths are marked with `/`.

#### `:param`

Parameters starts with `:` and can be accessed in `req.params`

#### `*` (Wildcard)  

Catches all requests.  
Can be a subpath but can only have direct children that are methods.

#### `method`

Each endpoint should be a key-value pair of a method name and a function returning the desired value wrapped in a promise. The resolver comes pre-loaded with standard HTTP-methods but can be expanded with the use of custom resolvers.

The following methods will be resolved:

```
  get
  head
  post
  put
  delete
  patch
```

---

### `new Router(routes)`

### `.execute(path, req?, ...args?)`
Execute a path, returns a promise

### `.resolve(path, req?)`
Resolve a path, returns null or a value

---

### `req`
The `req` object is used throughout the router and acts as a payload for the endpoint being executed. It can be accessed and modified by any resolvers along the way.

```javascript
{
  method: String // any of ['get', 'head', 'post', 'put', 'delete', 'patch'], defaults to 'get'

  // The following keys are read-only
  path: [String] // an array of keys representing the path being resolved
  pathname: String // the path being resolved as a string
  query: {} // a key-value object containing any query parameters
  params: {} // a key-value object containing any path parameters
}
```

---

### Resolvers

Resolvers are always executed synchronously in order until an object is returned, representing the next routing level. Returning an object will prevent the following resolvers to be executed on that level.

A resolver should have the following signature:

```javascript
  function resolver (obj, path, opts, resolve)  {
    // `obj` is the object to be resolved
    // `path` represents the path to resolve as an array of strings, path[0] is the key currently being resolved
    // `resolve` is a callback function that takes the resolved object as its first argument, a path as its second and options as its third. If this function isn't called the next resolver will be called with the same arguments.
    // `opts` contains payload data for the operation. opts.req represents the request object.

    // Must call resolve with at least its first argument
    // if route is to be resolved by this resolver
    // resolve(obj, path, opts)
  }
```

#### `.addResolverBefore(resolver)`
Prepends a resolver to the stack of resolvers

#### `.addResolverAfter(resolver)`
Appends a resolver to the stack of resolvers

## [License](LICENSE)