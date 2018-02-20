const {
  Logger
} = require('../../util')

const {
  builtIn
} = require('./built-in')

class FlatKey extends Logger {
  constructor(opts = {}) {
    super(opts)
    const {
      delimiter,
      keyType,
      keyFunction
    } = opts

    this.builtIn = opts.builtIn || builtIn
    this.delimiter = delimiter || '.'
    this.keyType = keyType
    this.keyFunction = keyType ? this.builtIn[keyType] : keyFunction
  }

  config(key, prev) {
    this.key = key
    this.prev = prev
    return this
  }

  // TODO: extract as class
  get name() {
    return this.prev ? this.flatKey : this.key
  }

  get flatKey() {
    return this.keyFunction ? this.keyFunction(this.prev, this.key) : this.basicFlatKey
  }

  get basicFlatKey() {
    return [this.prev, this.key].join(this.delimiter || '.')
  }
}

module.exports = {
  FlatKey,
  builtIn
}
