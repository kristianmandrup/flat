const {
  logger,
  args,
  check,
  createError,
  defaults,
  isLeaf,
  hasOnlyLeaves
} = require('./helpers')

function leafContainerFor(opts = {}) {
  let {
    target,
    getKeys,
    createValue,
    recurse,
    log,
    error
  } = opts
  const {
    key,
  } = opts

  const {
    msg,
    err
  } = logger({
    name: 'leafContainerFor'
  })

  error = createError({
    error,
    err
  })

  log({
    msg: msg(),
    data: {
      target,
      key
    }
  })

  if (!check.object(target)) {
    error({
      msg: `Invalid target: ${target} ${key}`
    })
  }

  if (!check.string(key)) {
    error({
      msg: `Invalid key: ${key}`
    })
  }

  getKeys = getKeys || defaults.getKeys
  const obj = target[key]

  log({
    msg: msg('obj'),
    data: obj
  })

  if (!check.object(obj)) {
    target[key] = obj
    return target
  }

  const keys = getKeys(obj)

  const container = keys.reduce((acc, key, index) => {
    const value = obj[key]
    const leaf = isLeaf(args(opts, {
      value
    }))

    log({
      msg: msg('reduce'),
      data: {
        acc,
        key,
        value,
        leaf
      }
    })
    // recursive
    const newValue = leaf ? value : recurse(args(opts, {
      target: value,
    }))
    log({
      msg: msg('newValue'),
      data: newValue
    })
    acc[key] = newValue

    log({
      msg: msg('acc'),
      data: acc
    })
    return acc
  }, {})

  log({
    msg: msg('container'),
    data: container
  })

  if (hasOnlyLeaves(container)) {
    target[key] = createValue(container)
  }

  return target
}

module.exports = {
  leafContainerFor
}
