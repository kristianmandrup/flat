const Logger = require('./logger')
const {
  isObject,
  isBuffer,
  isArray,
  isFunction,
  isDefined,
  isNumber,
} = require('./type-checks')

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

const {
  leaf,
  leafDefaults
} = require('./leaf')


module.exports = {
  leaf,
  leafDefaults,
  isObject,
  isBuffer,
  isArray,
  isFunction,
  isDefined,
  isNumber,
  getkey,
  Logger
}
