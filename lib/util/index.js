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

function leaf(obj, path, value, opts = {}) {
  let {
    delimiter
  } = opts
  delimiter = delimiter || '.'

  const pList = typeof path === 'string' ? path.split(delimiter) : path
  const key = pList.pop();
  const pointer = pList.reduce((accumulator, currentValue) => {
    if (accumulator[currentValue] === undefined) accumulator[currentValue] = {};
    return accumulator[currentValue];
  }, obj);
  pointer[key] = value;
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
