/**
 * Axel Boberg © 2019
 */

module.exports = (obj, path, opts, resolve) => {
  const target = '/' + path[0]
  if (obj[target]) resolve(obj[target])
}