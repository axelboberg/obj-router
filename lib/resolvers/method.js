/**
 * Axel Boberg © 2019
 */

const methods = ['get', 'post', 'put', 'delete']

module.exports = (path, obj, req) => {
  const key = path[0]
  const method = key.toLowerCase()

  /**
   * No need to check if key is the last,
   * will throw an error if the returned value
   * isn't an object
   */

  if (methods.includes(method) && obj[method]) {
    return obj[method]
  }
  
  return null
}