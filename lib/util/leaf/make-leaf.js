const {
  isFunction
} = require('../type-checks')

function makeLeaf(obj, path, value, opts = {}) {
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

const pathResolver = {
  string: (path, {
    delimiter
  }) => {
    return path.split(delimiter)
  },
  function: (path, {
    flatKey
  }) => {
    return path(flatKey)
  }
}

function resolvePath(path, opts) {
  return pathResolver[typeof path](path, opts) || path
}

function leaf(target, path, value, opts = {}) {
  log('leaf', {
    target,
    path,
    value,
    opts
  })

  options([
    'validate',
    'leafValue',
    'makePointer'
  ])

  const {
    validator,
    leafValue
  } = opts
  opts.validate = validator && validator(opts) || opts.validate
  opts.leafValue = leafValue && leafValue.select && leafValue.select(opts) || opts.leafValue

  log('parsed opts', opts)

  opts.target = target
  opts.path = path

  const pointer = makePointer(opts)
  log('pointer', pointer)

  if (overwrite || !pointer.value) {
    const newLeafValue = leafValue(value, valueOpts)
    log('write new leaf value', {
      pointer,
      newLeafValue
    })
    pointer.setValue(newLeafValue)
  }

  log('target', target)
  return target
}

const {
  $defaults
} = require('./defaults')

module.exports = {
  makeLeaf
}
