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
      valueSrc,
      lookupValueAt,
      getKeys,
      keys,
      keysFilter,
      skipKey,
      addLogger
    } = opts || {}

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
    this._target = target

    // custom key iteration and value lookup
    this.valueSrc = valueSrc
    this.keys = keys
    this.skipKey = skipKey || this.skipKey.bind(this)
    this.keysFilter = keysFilter || this.keysFilter.bind(this)
    this.getKeys = getKeys || this.getKeys.bind(this)
    this.lookupValueAt = lookupValueAt || this.lookupValueAt.bind(this)

    this.makeLeaf = makeLeaf || defaults.makeLeaf
    this.buildPath = buildPath || defaults.buildPath
    this.delimiter = defaults.delimiters[delimiter] || delimiter || defaults.delimiters.default
    this.async = async || defaults.async

    buildLogger = buildLogger || this.buildLogger.bind(this)
    this.logger = buildLogger(opts)
  }

  buildLogger(opts) {
    return new Logger(opts)
  }

  get logger() {
    return this._logger
  }

  set logger(logger) {
    this._logger = logger
    this.opts.logger = logger
  }

  get valueSrc() {
    return this._valueSrc || this.target
  }

  set valueSrc(value) {
    this._valueSrc = value
  }

  get target() {
    return this._target
  }

  set target(value) {
    this._target = value
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
    const promises = keys.map(this.doStepAsync.bind(this))
    return Promise.all(promises)
  }

  lookupValueAt(flatKey) {
    return this.valueSrc[flatKey]
  }

  skipKey(flatKey) {
    return false
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
