/**
 * Axel Boberg © 2019
 */

module.exports = (key, obj, req) => {
  const target = '/' + key
  return obj[target] || null
}