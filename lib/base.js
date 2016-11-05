const OptionHolder = require('./option-holder')

module.exports = class Base extends OptionHolder {
  constructor(flattener) {
    super(flattener.opts)
    this.flattener = flattener
    // default, unless overriden by value from previous stepper iteration
    this.currentDepth = flattener.currentDepth  

    this.keyname = flattener.keyname       
  }
}
