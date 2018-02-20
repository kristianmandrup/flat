const log = console.log

function logObj(title, obj, ...args) {
  console.log(title, JSON.stringify(obj), args)
}

module.exports = class Logger {
  constructor(opts = {}) {
    // console.log('Logger', opts)
    this.logging = opts.logging || opts
  }

  log(...args) {
    this.logging && log(...args)
  }

  objLog(...args) {
    this.logging && objLog(...args)
  }
}
