const flattenKeyname = require('./flat-key')
const stepper = require('./stepper')
var isBuffer = require('is-buffer')
const log = console.log

const Base = require('../base')

class Flattener extends Base {
  constructor(target, opts = {}) {
    super(null, opts)

    this.target = target
    this.opts = opts
    this.currentDepth = 1

    // use function (created via factory method) or use static keyname
    this.keyname = opts.keyname || flattenKeyname(opts.delimiter);
    this.log('keyname', this.keyname, opts)
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