const {
  selectKV
} = require('./select-kv')

function select(opts = {}) {
  const {
    selectKV,
    createKey,
    pathKey,
    validate
  } = opts
  const selected = selectKV(opts)
  selected.key = selected.key || createKey(pathKey) || pathKey
  validate(selected.key, 'keyName')
  return selected
}

module.exports = {
  select
}
