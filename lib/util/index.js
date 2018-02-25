const Logger = require('./logger')
const {
  check,
  checkType,
} = require('./type-checks')

const {
  scoped
} = require('./scoped')

const {
  safeNumberKey
} = require('./key')

const {
  makeLeaf,
  makePointer,
  leafDefaults,
  leafContainer,
  leafContainerFor,
  isLeaf,
  isLeafObject,
  hasMoreLevels,
  hasOnlyLeaves,
  pathItem,
  pathItemHelpers
} = require('./leaf')

function capitalize(val) {
  return val.charAt(0).toUpperCase() + val.slice(1);
}

module.exports = {
  makeLeaf,
  leafDefaults,
  leafContainer,
  leafContainerFor,
  isLeaf,
  isLeafObject,
  hasMoreLevels,
  hasOnlyLeaves,
  makePointer,
  pathItem,
  pathItemHelpers,
  capitalize,
  check,
  checkType,
  safeNumberKey,
  Logger
}
