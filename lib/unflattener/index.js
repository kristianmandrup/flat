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
      buildPath,
      makeLeaf,
      delimiter
    } = this.opts

    this.target = target
    this.makeLeaf = makeLeaf || defaults.makeLeaf
    this.buildPath = buildPath || defaults.buildPath
    this.delimiter = defaults.delimiters[delimiter] || delimiter || defaults.delimiters.default

    this._defaults = {
      makeLeaf: leaf,
      buildPath(key, opts) {
        const delimiter = opts.delimiter || this.delimiter || '.'
        return key.split(delimiter)
      },
      delimiters: {
        default: '.',
        camelCase: /([A-Z]+|[A-Z]?[a-z]+)(?=[A-Z]|\b)/
      }
    }
  }

  get defaults() {
    return _defaults
  }

  createInitialOutputObj() {
    return {}
  }

  reset(output) {
    this.output = output || this.createInitialOutputObj() || {}
  }

  unflat(target, opts) {
    this.reset(opts.output)
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
    const leafOpts = Object.assign(this.leafOpts, {
      flatKey
    })
    const path = this.createPath(flatKey, leafOpts)

    this.log('doStep', {
      flatKey,
      value,
      path,
      leafOpts
    })
    makeLeaf(this.output, path, value, leafOpts)
  }

  get leafOpts() {
    const expander = this.unflat.bind(this)
    return Object.assign(this.opts, {
      logger: this.logger,
      expander // for use in expand mode
    })
  }

  createPath(flatKey, leafOpts) {
    return this.buildPath(flatKey, leafOpts)
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
