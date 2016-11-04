const isBuffer = require('is-buffer')

function isObject(obj) {
  return obj === Object(obj);
}

function isArray(obj) {
  return Array.isArray(value)
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
  getkey
}