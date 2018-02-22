const {
  isFunction
} = require('../type-checks')

function leaf(obj, path, value, opts = {}) {
  let {
    delimiter,
    setLeafValue,
    makePointer,
    flatKey,
    defaults,
    overwrite,
    shallow,
    logger,
    validateOn,
    validate,
    async
  } = opts
  defaults = Object.assign({}, $defaults, defaults)
  delimiter = delimiter || defaults.delimiter

  // console.log($defaults)

  overwrite = !!(overwrite || defaults.overwrite)
  shallow = !!(shallow || defaults.shallow)
  logger = logger || (isFunction(defaults.logger) && defaults.logger(opts))
  async = !!(async || defaults.async)

  const {
    log
  } = logger || defaults
  const {
    error
  } = logger || defaults

  validate = validate || (isFunction(defaults.validator) && defaults.validator(opts)) || defaults.validate
  setLeafValue = setLeafValue || (defaults.leafValue && defaults.leafValue.select) ? defaults.leafValue.select(opts) : error('Missing leafValue.select in defaults', defaults)
  makePointer = makePointer || defaults.makePointer

  // pass on for use further down
  opts.log = log
  opts.error = error
  opts.validate = validate

  if (validateOn && validate.functions) {
    validate.functions([
      log,
      error,
      setLeafValue,
      makePointer
    ], opts)
  }

  path = typeof path === 'string' ? path.split(delimiter) : path
  path = typeof path === 'function' ? path(flatKey) : path

  const pointer = makePointer(obj, path, opts)
  const key = path.pop()
  const valueOpts = Object.assign(opts, {
    path,
    key,
    flatKey
  })

  if (overwrite) {
    pointer[key] = setLeafValue(value, valueOpts)
  }

  return obj
}

const {
  $defaults
} = require('./defaults')

module.exports = {
  leaf
}
