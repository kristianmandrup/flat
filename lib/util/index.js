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

// safely ensure that the key is
// an integer.
function getkey(key) {
  var parsedKey = Number(key)

  return (
    isNaN(parsedKey) ||
    key.indexOf('.') !== -1
  ) ? key
    : parsedKey
}

module.exports = {
  isObject,
  isBuffer,
  isArray,
  isFunction,
  getkey,
  Logger
}