const {
  leaf
} = require('../util')

const {
  Logger
} = require('../util')

class Unflattener extends Logger {
  constructor(target, opts) {
    super(opts)
    let {
      pathFinder,
      makeLeaf,
      delimiter
    } = this.opts
    this.makeLeaf = makeLeaf || defaults.makeLeaf
    this.pathFinder = pathFinder || defaults.pathFinder
    this.delimiter = delimiter || defaults.delimiter

    this._defaults = {
      makeLeaf: leaf,
      delimiter: ':',
      pathFinder(key) {
        return key.split(this.delimiter)
      }
    }
  }

  get defaults() {
    return _defaults
  }

  reset() {
    this.output = {}
  }

  unflat(target) {
    this.reset()
    this.target = target
    this.log('unflat', {
      target,
      opts: this.opts
    })
    this.doSteps()
    return this.output
  }

  doSteps() {
    const keys = Object.keys(target)
    this.log('doSteps', {
      keys
    })
    keys.map(this.doStep)
  }

  doStep(key) {
    const value = this.target[key]
    const path = this.findPath(key)
    this.log('doStep', {
      key,
      value,
      path
    })
    makeLeaf(this.output, path, value)
  }

  findPath(key) {
    return this.pathFinder(key)
  }
}

function createUnflattener(target, opts = {}) {
  return new Unflattener(target, opts)
}

function unflatten(target, opts = {}) {
  return unflattener(target, opts).unflat()
}

module.exports = {
  unflatten,
  createUnflattener,
  Unflattener
}
