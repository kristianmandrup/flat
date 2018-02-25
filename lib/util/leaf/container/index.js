const {
  logger,
  args,
  check,
  createError,
  defaults,
  isLeafObject
} = require('./helpers')

const {
  leafContainerFor
} = require('./leaf-container-for')

function recurse(opts) {
  opts.log({
    msg: 'recurse',
    data: opts.target
  })
  return leafContainer(opts)
}

function leafContainer(opts) {
  let {
    target,
    createValue,
    getKeys,
    error
  } = opts
  const {
    log
  } = opts

  const {
    msg,
    err
  } = logger({
    name: 'leafContainer'
  })
  error = createError({
    error,
    err
  })

  if (!check.object(target)) {
    error({
      msg: `Invalid target: ${target}`
    })
  }

  getKeys = getKeys || defaults.getKeys
  const keys = getKeys(target)

  log({
    msg: 'leafContainer: keys',
    data: keys
  })

  return keys.reduce((acc, key, index) => {
    const value = target[key]
    acc[key] = isLeafObject(args(opts, {
      value
    })) ? leafContainerFor(args(opts, {
      target: acc,
      key,
      recurse
    })) : value
    return acc
  }, {})
}

module.exports = {
  leafContainer,
  recurse,
  leafContainerFor
}
