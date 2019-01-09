/**
 * Axel Boberg © 2019
 */

const color = Object.freeze({
  'reset': '\x1b[0m',

  'red': '\x1b[31m',
  'green': '\x1b[32m',
  'yellow': '\x1b[33m',
  'blue': '\x1b[34m'
})

function log (msg) {
  if (process.env.NODE_ENV === 'development') {
    return
  }
  console.log(msg)
}

function logColor (msg, col) {
  log(col + msg + color.reset)
}

exports.info = msg => {
  log(`🤖 [INFO]: ${msg}`)
}

exports.warn = msg => {
  logColor(`⚠️  [WARNING]: ${msg}`, color.yellow)
}

exports.error = msg => {
  logColor(`🛑  [ERROR]: ${msg}`, color.red)
}

exports.log = log