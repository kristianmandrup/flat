const $defaults = Object.assign($$defaults, {
  log,
  error,
  logger,
  traverse,
  createPointer,
  validator,
  makePointer,
  leafValue,
  selectAt,
  createResult,
  reachedMaxDepth({
    maxDepth,
    depth
  }) {
    return depth > maxDepth
  },
  keyQueryMatcher(keys, keyQuery) {
    checkType(keyQuery, 'function') && Object.keys(acc).find(key => keyQuery(key))
  },
  isEmptyTarget(target, opts) {
    return Object.keys(target).length == 0
  },
  nextDepth(depth, opts) {
    return depth++
  }
})

const $$defaults = {
  matchOn: false,
  validateOn: false,
  overwrite: true,
  shallow: true,
  noOp() {},
  delimiter: '.',
  identity(value) {
    return value
  }
}

const {
  isNextEntryEmpty,
  createDefaultEntry,
  getAccKeyValue,
  displayAccKeyValue,
  accValue,
  logger,
  keyMatchers,
  selectAt,
  makePointer,
  traverse,
  createPointer,
  validator,
  createResult
} = require('./functions')

const {
  checkType
} = require('../../type-checks')

module.exports = {
  $defaults
}
