const leafValue = {
  select({
    log,
    shallow,
    mode
  }) {
    log('leafValue: select', {
      shallow,
      mode
    })
    return shallow ? this.shallow : this.expand
  },
  shallow(value) {
    return value
  },
  expand(value, opts) {
    let {
      expander,
      isTraversable,
      defaults
    } = opts
    const traversable = isTraversable && isTraversable(value) || defaults.traversable
    if (!traversable || !isFunction(expander)) return value
    return expander(value, opts)
  }
}

module.exports = {
  leafValue
}
