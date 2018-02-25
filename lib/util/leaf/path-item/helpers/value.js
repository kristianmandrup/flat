function value(opts) {
  const {
    value,
    nextValue,
    validate,
    log
  } = opts
  const val = nextValue(opts)
  validate(val, 'value')
  log('value', val)
  return val
}

module.exports = {
  value
}
