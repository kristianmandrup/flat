const { Logger } = require('./util')

module.exports = class Base extends Logger {
  constructor(ctx, opts = {}) {
    super(opts.logging)
    console.log('Base', opts)
    this.ctx = ctx
    this.opts = opts || ctx.opts || {}
    this.output = ctx && ctx.output || {}

    this.delimiter = opts.delimiter || '.'
    this.lowerCase = opts.toLowerCase || false
    this.upperCase = opts.toUpperCase || false
    this.maxDepth = opts.maxDepth
    this.filter = opts.filter || function() { return true }    
  }
}
