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

module.exports = class Logger {
  constructor(opts = {}) {
    this.logging = !!opts.logging
    this.logObj = this.objLog.bind(this)
    this.logOnly = Array.isArray(opts.logOnly) ? opts.logOnly : [opts.logOnly]
  }

  get shouldLogName() {
    return !!(this.logOnly.indexOf(this.name) >= 0)
  }

  get shouldLog() {
    return this.shouldLogName && this.logging
  }

  log(...args) {
    this.shouldLog && logInfo(this.name, ...args)
  }

  get name() {
    return this.constructor.name
  }

  objLog(...args) {
    this.shouldLog && logObj(this.name, ...args)
  }
}
