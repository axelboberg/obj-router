/**
 * Axel Boberg © 2019
 */

module.exports = (path, obj, req) => {
  const target = '/' + path[0]
  return obj[target] || null
}