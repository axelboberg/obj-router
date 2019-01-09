/**
 * Axel Boberg © 2019
 */

const methods = ['get', 'post', 'put', 'delete']

module.exports = (key, obj, req) => {
  const method = key.toLowerCase()

  if (methods.includes(method) && obj[method]) {
    return obj[method]
  }
  return null
}