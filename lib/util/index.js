const isBuffer = require('is-buffer')
const Logger = require('./logger')

function isObject(obj) {
  return obj === Object(obj);
}

function isArray(obj) {
  return Array.isArray(obj)
}

function isFunction(fun) {
  return typeof fun === 'function'
}

function isDefined(val) {
  return typeof val !== 'undefined'
}

function isNumber(val) {
  return typeof val === 'number'
}

// safely ensure that the key is
// an integer.
function getkey(key) {
  var parsedKey = Number(key)

  return (
      isNaN(parsedKey) ||
      key.indexOf('.') !== -1
    ) ? key :
    parsedKey
}

// TODO: Make leaf a proper class

const $defaults = {
  delimiter: '.',
  setValue(value) {
    return value
  },
  pointer(obj, path) {
    return path.reduce((acc, key) => {
      if (acc[key] === undefined) acc[key] = {};
      return acc[key];
    }, obj)
  }
}

function leaf(obj, path, value, opts = {}) {
  let {
    delimiter,
    setValue,
    makePointer,
    key,
    defaults
  } = opts
  defaults = defaults || $defaults
  delimiter = delimiter || defaults.delimiter
  setValue = setValue || defaults.setValue

  path = typeof path === 'string' ? path.split(delimiter) : path
  path = typeof path === 'function' ? path(key) : path

  makePointer = makePointer || defaults.makePointer

  const pointer = makePointer(obj, path)
  const key = path.pop()

  pointer[key] = setValue(value, {
    path,
    key
  })
  return obj
}


module.exports = {
  isObject,
  isBuffer,
  isArray,
  isFunction,
  isDefined,
  isNumber,
  getkey,
  Logger,
  leaf
}
