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
    // console.log('Logger', opts)
    this.logging = opts.logging || opts
    this.logObj = this.objLog.bind(this)
  }

  log(...args) {
    this.logging && logInfo(this.name, ...args)
  }

  get name() {
    return this.constructor.name
  }

  objLog(...args) {
    this.logging && logObj(this.name, ...args)
  }
}
