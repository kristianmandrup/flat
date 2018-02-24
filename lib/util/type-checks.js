const isBuffer = require('is-buffer')

const check = {
  object(obj) {
    return obj === Object(obj);
  },
  array(obj) {
    return Array.isArray(obj)
  },
  function: (fun) => {
    return typeof fun === 'function'
  },
  defined(val) {
    return typeof val !== 'undefined'
  },
  number(val) {
    return typeof val === 'number'
  },
  string: (val) => {
    return typeof val === 'string'
  },
  types: [
    'object',
    'array',
    'function',
    'number',
    'string'
  ]
}

function checkType(value, type, error) {
  type = type || typeof value
  const fun = check[name]
  const result = fun && fun(value)
  error && error(`${value} is not a ${type}`, value)
  return result
}

module.exports = {
  check,
  isType
}
