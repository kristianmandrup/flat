const {
  check
} = require('../../type-checks')

function hasOnlyLeaves(opts) {
  return !hasMoreLevels(opts)
}

function hasMoreLevels(opts) {
  const {
    value
  } = opts
  if (isLeaf(opts)) return false
  return Object.keys(value).find(key => {
    return !isLeaf(args(opts, {
      value: obj[key]
    }))
  })
}

function isLeafObject(opts) {
  const {
    value,
    log
  } = opts
  const result = !isLeaf(opts) && hasOnlyLeaves(opts)
  log({
    msg: 'isLeafObject',
    data: {
      result,
      value
    }
  })
  return result
}

function isLeaf({
  value
}) {
  return !check.object(value)
}

function args(...objs) {
  return Object.assign(...objs)
}


const defaults = {
  getKeys(obj) {
    return Object.keys(obj)
  },
  createValue(value) {
    return value
  }
}

function logger({
  name
}) {
  const msg = (msg) => `leafContainer: ${msg}`
  const err = (msg) => `leafContainer: ${msg}`
  return {
    msg,
    err
  }
}

function createError({
  error,
  err
}) {
  return ({
    msg
  }) => {
    signalError({
      msg,
      error,
      err
    })
  }
}

function signalError({
  msg,
  error
}) {
  const errMsg = err(msg)
  error && error({
    msg: errMsg
  })
}

module.exports = {
  check,
  logger,
  defaults,
  args,
  isLeaf,
  isLeafObject,
  hasMoreLevels,
  hasOnlyLeaves,
  createError,
  signalError
}
