const {
  selectKV
} = require('./select-kv')

function select(opts = {}) {
  const {
    selectKV,
    keyName,
    pathKey,
    validate
  } = opts
  const selected = selectKV(opts)
  selected.key = selected.key || keyName ? keyName(pathKey) : pathKey
  validate(selected.key, 'keyName')
  return selected
}

module.exports = {
  select
}
