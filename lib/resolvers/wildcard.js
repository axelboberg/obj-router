/**
 * Axel Boberg © 2019
 */

module.exports = (obj, path, opts, resolve) => {
  const wildcard = obj['*']
  const method = path.pop()
  
  if (wildcard) resolve(wildcard, [ method ])
}