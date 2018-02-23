const {
  isFunction
} = require('../type-checks')

function leaf(obj, path, value, opts = {}) {
  try {
    opts.defaults = Object.assign($defaults, opts.defaults || {})
    const {
      error,
      log
    } = extractLogMethods(opts)
    opts.log = log
    opts.error = error

    return _leaf(obj, path, value, opts)
  } catch (err) {
    console.log(err)
    opts.error(err)
  }
}

function extractLogMethods(opts = {}) {
  let {
    logger,
    defaults
  } = opts
  return logger || (isFunction(defaults.logger) && defaults.logger(opts)) || defaults
}

function _leaf(obj, path, value, opts = {}) {
  let {
    delimiter,
    leafValue,
    makePointer,
    flatKey,
    defaults,
    overwrite,
    shallow,
    logger,
    log,
    error,
    keyName,
    keynames,
    validateOn,
    validate,
    doAsync
  } = opts

  log('leaf', {
    obj,
    path,
    value,
    opts
  })

  delimiter = delimiter || defaults.delimiter
  overwrite = !!(overwrite || defaults.overwrite)
  shallow = !!(shallow || defaults.shallow)
  doAsync = !!(opts.async || defaults.async)

  opts.shallow = shallow
  opts.async = doAsync
  opts.overwrite = overwrite
  opts.delimiter = delimiter

  validate = validate || (isFunction(defaults.validator) && defaults.validator(opts)) || defaults.validate
  leafValue = leafValue || (defaults.leafValue && isFunction(defaults.leafValue.select)) ? defaults.leafValue.select(opts) : error('Missing leafValue.select in defaults', defaults)
  makePointer = makePointer || defaults.makePointer
  keyName = keyName || keynames || defaults.identity

  // pass on for use further down
  opts.validate = validate

  if (validateOn && validate.functions) {
    validate.functions([
      log,
      error,
      leafValue,
      makePointer
    ], opts)
  }

  log('parsed opts', {
    delimiter,
    overwrite,
    shallow,
    async: doAsync,
    validate,
    leafValue,
    makePointer
  })

  path = typeof path === 'string' ? path.split(delimiter) : path
  path = typeof path === 'function' ? path(flatKey) : path

  let pointer = makePointer(obj, path, opts)

  const pathKey = path.pop()
  log('pointer', {
    pointer
  })

  const valueOpts = Object.assign(opts, {
    path,
    flatKey
  })

  if (overwrite || !pointer.value) {
    const newLeafValue = leafValue(value, valueOpts)
    log('write new leaf value', {
      pointer,
      // valueOpts,
      // pathKey,
      newLeafValue
    })
    pointer.setValue(newLeafValue)
  }

  log('return', {
    obj
  })

  return obj
}

const {
  $defaults
} = require('./defaults')

module.exports = {
  leaf
}
