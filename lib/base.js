const { log } = require('./util')

module.exports = class Base {
  constructor(ctx, opts) {
    this.ctx = ctx
    this.opts = opts || ctx.opts || {}
    this.logging = this.opts.logging 
  }

  log(...args) {
    this.logging && log(...args)
  }

  objLog(...args) {
    this.logging && objLog(...args)
  }
}
