const Logger = require('./logger')
const {
  check,
  checkType,
} = require('./type-checks')

const {
  scoped
} = require('./scoped')

const {
  makePointer
} = require('./pointer')

const {
  pathItem,
  pathItemHelpers
} = require('./path-item')

const {
  makeLeaf,
  leafDefaults,
} = require('./leaf')

function capitalize(val) {
  return val.charAt(0).toUpperCase() + val.slice(1);
}

module.exports = {
  makeLeaf,
  leafDefaults,
  makePointer,
  pathItem,
  pathItemHelpers,
  capitalize,
  check,
  checkType,
  safeNumberKey,
  Logger
}
