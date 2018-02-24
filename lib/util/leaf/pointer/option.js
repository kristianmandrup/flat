const force = {
  bool(value) {
    return Boolean(value)
  },
  string: (value) => {
    return String(value)
  },
  number(value) {
    return Number(value)
  }
}

function forceType(value, type, validate) {
  const $value = force[type](value)
  validate[type]($value)
  return $value
}

function createOptionMaker(opts, defaults) {
  return {
    option(name) {
      return makeOption(name, opts, defaults)
    },
    options(names = []) {
      return names.reduce((acc, name) => {
        acc[name] = this.option(name)
        return acc
      }, {})
    }
  }
}

function makeOption(name, opts, defaults) {
  const type = typeof defaults[name]
  const value = opts[name] || defaults[name]
  opts[name] = forceType(value, type)
  return opts
}

module.exports = {
  makeOption,
  createOptionMaker
}
