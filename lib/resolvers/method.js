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

  /**
   * No need to check if key is the last,
   * will throw an error if the returned value
   * isn't an object
   */

  if (methods.includes(method) && obj[method]) {
    resolve(obj[method])
  }
}