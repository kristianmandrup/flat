function acc(opts = {}) {
  const {
    acc,
    nextAcc,
    validate,
    log
  } = opts
  const acc = nextAcc(opts)
  validate(acc, 'acc')
  log('nextAcc', acc)
  return {
    acc,
    opts
  }
}

module.exports = {
  acc
}
