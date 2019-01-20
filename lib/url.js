/**
 * Axel Boberg © 2019
 */

const { URL } = require('url')

function objectFromEntries (entries) {
  const obj = {}
  for (let entry of entries) {
    obj[entry[0]] = entry[1]
  }
  return obj
}

function removeTrailingSlash (str) {
  if (str[str.length - 1] === '/') {
    return str.substr(0, str.length - 1)
  }
  return str
}

/**
 * Extract basic information from a url
 * @param { String } input
 * @param { String? } base 
 * @returns { Object }
 */
function info (input, base = 'undefined://undefined') {
  let url
  try {
    url = new URL(input)
  } catch (err) {
    url = new URL(input, base)
  }

  const pathname = removeTrailingSlash(url.pathname)

  return {
    pathname: pathname,
    path: pathname.slice(1, pathname.length).split('/'),
    query: objectFromEntries(url.searchParams.entries())
  }
}

exports.info = info