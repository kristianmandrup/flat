const { isBuffer, isObject } = require('../util')
const stepper = require('./stepper')


class Unflattener {
  constructor(target, opts = {}) {
    this.opts = opts

    this.delimiter = opts.delimiter || '.'
    this.shallow = opts.shallow || false
    this.overwrite = opts.overwrite || false
    this.result = {}

    this.isBuffer = isBuffer(target)
    this.isObject = isObject(target)
    this.keynames = this.opts.keynames || this.unflattenKeyname; 
    this.changed = false  
  }

  unflattenKeyname(key) {
    return key.split(this.delimiter)
  }

  unflatten() {
    if (this.isBuffer || this.isObject) return this.target
        
    let keys = Object.keys(target)

    for (let key of keys) {
      stepper(key, {unflattener: this})
    }

    return this.changed ? this.result : this.target
  }
}

function unflatten(target, opts) {
  return new Unflattener(target, opts).unflatten()
}

module.exports = unflatten