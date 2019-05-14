/**
 * Axel Boberg © 2019
 */

module.exports = (obj, path, resolve, opts) => {
  const target = '/' + path[0]
  if (obj[target]) resolve(obj[target])
}