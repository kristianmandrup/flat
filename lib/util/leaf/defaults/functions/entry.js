function fetchValue(acc, key, opts = {}) {
  return opts.value || acc[key]
}

function isNextEntryEmpty(acc, key, opts) {
  return acc[key] === undefined
}

function createDefaultEntry(acc, key, opts) {
  acc[key] = {}
  return acc
}

function getEntry(acc, key, opts) {
  return acc[key]
}

function displayEntry(acc, key, opts) {
  return opts.getAccKeyValue(acc, key, opts)
}

function accValue(acc, key, opts) {
  const {
    isNextEntryEmpty,
    createDefaultEntry,
    displayAccKeyValue,
    getAccKeyValue
  } = opts
  if (isNextEntryEmpty(acc, key, opts)) {
    createDefaultEntry(acc, key, opts)
  }
  opts.log('accValue set', displayAccKeyValue(acc, key, opts))
  return getAccKeyValue(acc, key, opts)
}

module.exports = {
  isNextEntryEmpty,
  createDefaultEntry,
  getEntry,
  displayEntry,
  accValue,
  fetchValue
}
