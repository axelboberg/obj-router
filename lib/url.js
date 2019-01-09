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

/**
 * Extract query parameters from a url
 * @param { String } url 
 * @returns { Object }
 */
function info (input, base = 'undefined://undefined') {
  let url
  try {
    url = new URL(input)
  } catch (err) {
    url = new URL(input, base)
  }

  return {
    href: url.href,
    origin: url.origin,
    host: url.host,
    pathname: url.pathname,
    path: url.pathname.slice(1, url.pathname.length).split('/'),
    query: objectFromEntries(url.searchParams.entries())
  }
}

exports.info = info