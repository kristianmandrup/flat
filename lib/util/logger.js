const {
  log
} = console

function displayName(name) {
  return `[${name}] `
}

function logObj(name, title, obj, ...args) {
  log(displayName(name), title, JSON.stringify(obj, null, 2), args)
}

function logInfo(name, ...args) {
  typeof args[1] === 'object' ? logObj(name, ...args) : log(displayName(name), ...args)
}

const always = () => true

module.exports = class Logger {
  constructor(opts = {}) {
    this.opts = opts
    this.logging = !!(opts.logging || opts.logOn)
    this.logOnly = Array.isArray(opts.logOnly) ? opts.logOnly : [opts.logOnly]
    this.logWhen = (opts.logWhen || always)

    const logger = opts.logger || this.logger

    if (logger) {
      this.log = (logger.log || this.log)
      this.objLog = (logger.objLog || this.objLog)
    }

    // alias
    this.logObj = this.objLog
    this.error = this.logError

    // binding
    this.autobind([
      'logWhen',
      'shouldLogName',
      'shouldLog',
      'name',
      'logError',
      'log',
      'objLog'
    ])
  }

  autobind(names) {
    names.map(name => {
      if (typeof this[name] === 'function') {
        this[name] = this[name].bind(this)
      }
    })
  }

  get shouldLogName() {
    return !!(this.logOnly.indexOf(this.name) >= 0 || this.logOnly.length === 0)
  }

  get shouldLog() {
    return this.shouldLogName && this.logging && this.logWhen(this)
  }

  get name() {
    return this.constructor.name
  }

  logError(...args) {
    this.log('ERROR:', ...args)
  }

  log(...args) {
    // console.log('Trying to log', ...args, this.shouldLog)
    this.shouldLog && logInfo(this.name, ...args)
  }

  objLog(...args) {
    this.shouldLog && logObj(this.name, ...args)
  }
}
