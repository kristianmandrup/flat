const log = console.log

function logObj(title, obj, ...args) {
  console.log(title, JSON.stringify(obj), args)
}

module.exports = class Logger {
  constructor(logging) {
    this.logging = logging
  }

  log(...args) {
    this.logging && log(...args)
  }

  objLog(...args) {
    this.logging && objLog(...args)
  }
}