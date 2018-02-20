const {
  OptionHolder
} = require('./option-holder')

class Base extends OptionHolder {
  constructor(flattener) {
    super(flattener.opts)
    this.flattener = flattener
    // default, unless overriden by value from previous stepper iteration
    this.currentDepth = flattener.currentDepth

    this.keynameFn = flattener.keynameFn
  }
}

module.exports = {
  Base
}
