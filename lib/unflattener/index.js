const {
  leaf
} = require('../util')

const {
  Logger
} = require('../util')

class Unflattener extends Logger {
  constructor(opts = {}, target) {
    super(opts)
    let {
      pathFinder,
      makeLeaf,
      delimiter
    } = this.opts

    this.target = target
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

  unflat(target, opts) {
    this.reset()
    this.target = target || this.target
    this.opts = opts || this.opts

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

  doStep(flatKey) {
    const value = this.target[key]
    const path = this.findPath(flatKey)
    const leafOpts = Object.assign(this.leafOpts, {
      flatKey
    })
    this.log('doStep', {
      flatKey,
      value,
      path,
      leafOpts
    })
    makeLeaf(this.output, path, value, leafOpts)
  }

  get leafOpts() {
    return this.opts
  }

  findPath(flatKey) {
    return this.pathFinder(flatKey)
  }
}

function createUnflattener(opts, target) {
  return new Unflattener(opts, target)
}

function unflatten(target, opts) {
  return unflattener(opts).unflat(target)
}

module.exports = {
  unflatten,
  createUnflattener,
  Unflattener
}
