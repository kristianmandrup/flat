const flattenKeyname = require('./flat-key')
const stepper = require('./stepper')
const OptionHolder = require('../option-holder')

class Flattener extends OptionHolder {
  constructor(target, opts = {}) {
    super(opts)

    this.target = target
    this.currentDepth = 1
    this.changed = false

    // use function (created via factory method) or use static keyname
    this.keyname = opts.keyname || flattenKeyname(opts);

    // output object starts as empty object
    this.output = {}
  }

  flatten() {
    stepper(this.target, {flattener: this}).doSteps();
    this.log('return: changed?', this.changed, 'output', this.output)
    return this.changed ? this.output : this.target
  }    
}

module.exports = function flatten(target, opts) {
  return new Flattener(target, opts).flatten()
}