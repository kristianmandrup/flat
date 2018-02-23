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
      delimiter,
      async,
      getKeys,
      keys,
      keysFilter,
      skipKey
    } = this.opts || {}

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

    const defaults = this.defaults
    this.target = target

    // custom key iteration and value lookup
    this.valueSrc = valueSrc || target
    this.keys = keys
    this.skipKey = skipKey || this.skipKey.bind(this)
    this.keysFilter = keysFilter || this.keysFilter.bind(this)
    this.getKeys = getKeys || this.getKeys.bind(this)
    this.lookupValueAt = lookupValueAt || this.lookupValueAt.bind(this)

    this.makeLeaf = makeLeaf || defaults.makeLeaf
    this.buildPath = buildPath || defaults.buildPath
    this.delimiter = defaults.delimiters[delimiter] || delimiter || defaults.delimiters.default
    this.async = async || defaults.async
  }

  get defaults() {
    return this._defaults
  }

  createInitialOutputObj() {
    return {}
  }

  reset(output) {
    this.output = output || this.createInitialOutputObj() || {}
  }

  unflat(target, opts = {}) {
    if (opts.async) {
      return this.unflatAsync(target, opts)
    }

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

  unflatAsync(target, opts) {
    return new Promise((resolve, reject) => {
      this.reset(opts.output)
      this.target = target || this.target
      this.opts = opts || this.opts

      this.log('unflat async', {
        target,
        opts: this.opts
      })

      try {
        resolve(this.doStepsAsync())
      } catch (err) {
        reject(err)
      }
    })
  }

  get targetKeys() {
    return Object.keys(this.target)
  }

  /**
   * Filter does not filter any keys by default
   * @param {*} keys
   */
  keysFilter(keys = []) {
    return keys.filter(key => true)
  }

  getKeys() {
    return this.keysFilter(this.keys || this.targetKeys)
  }

  doSteps() {
    const keys = this.getKeys()
    this.log('doSteps', {
      keys
    })
    keys.map(this.doStep.bind(this))
  }

  doStepsAsync() {
    const keys = this.getKeys()
    this.log('doSteps async', {
      keys
    })
    const promises = keys.map(this.doStepAsync)
    return Promise.all(promises)
  }

  doStepAsync(flatKey) {
    return new Promise((resolve, reject) => {
      try {
        resolve(doStep(flatKey))
      } catch (err) {
        reject(err)
      }
    })
  }

  lookupValueAt(flatKey) {
    return this.valueSrc[flatKey]
  }

  skipKey(flatKey) {
    return false
  }

  doStep(flatKey) {
    if (this.skipKey(flatKey)) return

    const value = this.lookupValueAt(flatKey)
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
    this.makeLeaf(this.output, path, value, leafOpts)
  }

  get leafOpts() {
    const expander = this.unflat.bind(this)
    return Object.assign({
      logger: this.logger,
      expander // for use in expand mode
    }, this.opts)
  }

  createPath(flatKey, leafOpts) {
    return this.buildPath(flatKey, leafOpts)
  }
}

function createUnflattener(opts, target) {
  return new Unflattener(opts, target)
}

function unflatten(target, opts) {
  return createUnflattener(opts).unflat(target)
}

function unflattenAsync(target, opts) {
  return createUnflattener(opts).unflatAsync(target)
}


module.exports = {
  unflatten,
  createUnflattener,
  Unflattener
}
