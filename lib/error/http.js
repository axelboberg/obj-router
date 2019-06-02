/**
 * Axel Boberg © 2018
 */

const HTTP_STATUSES = {
  100: 'Continue',
  101: 'Switching Protocols',

  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  203: 'Non-Authoritative Information',
  204: 'No Content',
  205: 'Reset Content',
  206: 'Partial Content',

  300: 'Multiple Choices',
  301: 'Moved Permanently',
  302: 'Found',
  303: 'See Other',
  304: 'Not Modified',
  305: 'Use Proxy',
  307: 'Temporary Redirect',
  308: 'Permanent Redirect',

  400: 'Bad Request',
  402: 'Payment Required',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  407: 'Proxy Authentication Required',
  408: 'Request Timeout',
  409: 'Conflict',
  410: 'Gone',
  411: 'Length Required',
  412: 'Precondition Failed',
  413: 'Payload Too Large',
  414: 'Request-URI Too Long',
  415: 'Unsupported Media Type',
  416: 'Requested Range Not Satisfiable',
  417: 'Expectation Failed',
  418: 'I\'m a teapot',
  421: 'Misdirected Request',
  422: 'Unprocessable Entity',
  423: 'Locked',
  424: 'Failed Dependency',
  426: 'Upgrade Required',
  428: 'Precondition Required',
  429: 'Too Many Requests',
  431: 'Request Header Fields Too Large',
  444: 'Connection Closed Without Response',
  451: 'Unavailble For Legal Reasons',
  499: 'Client Closed Request',

  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailble',
  504: 'Gateway Timeout',
  505: 'HTTP Version Not Supported',
  506: 'Variant Also Negotiates',
  507: 'Insufficient Storage',
  508: 'Loop Detected',
  510: 'Not Extended',
  511: 'Network Authentication Required',
  599: 'Network Connect Timeout Error'
}

module.exports = class HttpError extends Error {
  static get status () {
    return HTTP_STATUSES
  }

  constructor (status, message) {
    super()
    if (!HTTP_STATUSES[status]) throw new TypeError(`Invalid status code '${status}'`)
    
    this.status = status
    this.message = message || HTTP_STATUSES[status]
  }

  set status (status) {
    if (!this.constructor.status[status])
      return false
    this._status = status
  }

  get status () {
    return this._status
  }
}
