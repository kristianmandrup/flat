const isBuffer = require('is-buffer')

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

module.exports = {
  isObject,
  isBuffer,
  isArray,
  isFunction,
  isDefined,
  isNumber,
}
