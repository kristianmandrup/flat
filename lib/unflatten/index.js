var { isBuffer, isObject } = require('../util')

class Unflattener {
  constructor(target, opts = {}) {
    this.opts = opts

    this.delimiter = opts.delimiter || '.'
    this.shallow = opts.shallow || false
    this.overwrite = opts.overwrite || false
    this.result = {}

    this.isBuffer = isBuffer(target)
    this.isObject = isObject(target) 
  }

  unflattenKeyname(key) {
    return key.split(this.delimiter)
  }

  unflatten() {
    if (this.isBuffer || this.isObject) return this.target

    this.keynames = this.opts.keynames || this.unflattenKeyname;
    this.changed = false    
    
    let keys = Object.keys(target)
    for (let key of keys) {
      new Stepper(key, {ctx: this})
    }

    if (this.changed) {
      return this.result
    } else {
      return this.target
    }
  }
}

function unflatten(target, opts) {
  return new Unflattener(target, opts).unflatten()
}

module.exports = unflatten