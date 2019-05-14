/**
 * Axel Boberg © 2019
 */

const methods = [
  'get',
  'head',
  'post',
  'put',
  'delete',
  'patch'
]

module.exports = (obj, path, opts, resolve) => {
  const key = path[0]
  const method = key.toLowerCase()

  if (methods.includes(method) && obj[method]) {
    resolve(obj[method])
  }
}