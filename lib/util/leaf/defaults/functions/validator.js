function validator(opts) {
  const {
    error
  } = opts

  const types = check.types.reduce((acc, type) => {
    acc[type] = (value) => checkType(value, type, error)
    return acc
  }, {})

  return {
    types,
    keyName(name, opts = options) {
      if (typeof name !== 'string') {
        error(`Invalid key name for ${name}: ${typeof name}`, {
          key: name
        })
      }
    },
    depth(depth, opts) {
      const {
        error
      } = opts

      return depth >= 0 ? true : error('Invalid depth: < 0', {
        depth
      })
    }
  }
}

module.exports = {
  validator
}
