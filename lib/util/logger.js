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
  log(displayName(name), ...args)
}

const always = () => true

module.exports = class Logger {
  constructor(opts = {}) {
    this.logging = !!opts.logging
    this.logOnly = Array.isArray(opts.logOnly) ? opts.logOnly : [opts.logOnly]
    this.logWhen = (opts.logWhen || always).bind(this)

    const logger = opts.logger || this.logger

    if (logger) {
      this.log = (logger.log || this.log).bind(this)
      this.objLog = (logger.objLog || this.objLog).bind(this)
    }

    // alias
    this.logObj = this.objLog.bind(this)
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
    this.shouldLog && logInfo(this.name, ...args)
  }

  objLog(...args) {
    this.shouldLog && logObj(this.name, ...args)
  }
}
