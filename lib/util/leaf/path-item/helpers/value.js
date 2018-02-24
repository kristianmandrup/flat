function value(opts) {
  const {
    value,
    nextValue,
    validate,
    log
  }
  const val = nextValue(opts)
  validate(val, 'value')
  log('value', val)
  return val
}

module.exports = {
  value
}
