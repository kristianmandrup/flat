const {
  Logger
} = require('../util')

const noFilter = () => {
  return true
}

class OptionHolder extends Logger {
  constructor(opts = {}) {
    super(opts)
    this.opts = opts
    this.configureOpts()
  }

  configureOpts() {
    let opts = this.opts
    this.delimiter = opts.delimiter || '.'
    this.lowerCase = opts.toLowerCase || false
    this.upperCase = opts.toUpperCase || false
    this.maxDepth = opts.maxDepth
    this.filter = opts.filter || noFilter
  }
}

module.exports = {
  OptionHolder
}
