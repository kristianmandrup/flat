const flattenKeyname = require('./flat-key')
const stepper = require('./stepper')
var isBuffer = require('is-buffer')
const log = console.log

class Flattener {
  constructor(target, opts = {}) {
    this.target = target
    this.opts = opts
    this.delimiter = opts.delimiter || '.'
    this.lowerCase = opts.toLowerCase || false
    this.upperCase = opts.toUpperCase || false
    this.maxDepth = opts.maxDepth
    this.filter = opts.filter || function() { return true }
    this.currentDepth = 1

    // use function (created via factory method) or use static keyname
    this.keyname = opts.keyname || flattenKeyname(this.delimiter);
    log('keyname', this.keyname)
    // output object starts as empty object
    this.output = {}
  }

  flatten() {
    stepper(this.target, {ctx: this}).doSteps();
    return this.changed ? this.output : this.target
  }    
}

module.exports = function flatten(target, opts) {
  return new Flattener(target, opts).flatten()
}