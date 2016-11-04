var { isBuffer, isObject } = require('../utils')

class UnFlattener {
  constructor(target, opts) {
    this.opts = opts || {}

    this.delimiter = opts.delimiter || '.'
    this.shallow = opts.shallow || false
    this.overwrite = opts.overwrite || false
    this.result = {}

    this.isBuffer = isBuffer(target)
    this.isObject = isObject(target) 

    if (this.isBuffer || this.isObject) return target

    this.keynames = this.opts.keynames || this.unflattenKeyname;
    this.changed = false    
  }

  unflattenKeyname(key) {
    return key.split(this.delimiter)
  }

  unflatten() {
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