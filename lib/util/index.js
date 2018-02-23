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
  const parsedKey = Number(key)

  return (
      isNaN(parsedKey) ||
      key.indexOf('.') !== -1
    ) ? key :
    parsedKey
}

const {
  leaf,
  leafDefaults,
  makePointer
} = require('./leaf')


module.exports = {
  leaf,
  makePointer,
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
