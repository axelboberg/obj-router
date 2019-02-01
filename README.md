# obj-router
A lightweight router based on objects for NodeJS Promises. For small web services.

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

### `.execute(path, req?)`
Execute a path, such as `/api/hello/world`, will return a promise

### `.resolve(path, req?)`
Resolve a path, returns the endpoint-function or null

---

### `req`
The `req` object is used throughout the router and acts as a payload for the endpoint being executed. It can be accessed and modified by any resolvers along the way.

```javascript
{
  method: String // any of ['get', 'post', 'put', 'delete'], defaults to 'get'

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
  function resolver (path, routes, req) {
    // `path` represents the path that's left to resolve as an array of strings, path[0] is the current key
    // `routes` is the current level of routes from the route object
    // `req` contains payload data for the endpoint

    // return object || null
  }
```

#### `.addResolverBefore(resolver)`
Prepends a resolver to be executed before the defaults

#### `.addResolverAfter(resolver)`
Appends a resolver to be executed after the defaults

## [License](LICENSE)
