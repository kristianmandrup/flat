const { isBuffer, isObject, Logger } = require('../util')
// isObject, isNumber, Logger
const { getkey, isDefined,  } = require('../util')

//const stepper = require('./stepper')
class Stepper extends Logger {
  constructor(key, { unflattener }) {
    super(unflattener.opts)
    this.key = key
    this.unflattener = unflattener
    this.splitName = unflattener.keynames(key)
    this.recipient = unflattener.result
    this.setKeys()
  }

  get log() {
    return this.unflattener.log
  }

  setKeys() {
    if (this.splitName.length <= 1) return 

    this.key1 = getkey(this.splitName.shift())
    this.key2 = getkey(this.splitName[0])    
  }

  set changed(changed) {
    this.unflattener.changed = changed
  }

  get changed() {
    return this.unflattener.changed
  }

  get opts() {
    return this.unflattener.opts
  }

  get shallow() {
    return this.unflattener.shallow
  }

  get target() {
    return this.unflattener.target
  }

  get recipient() {
    return this.unflattener.result
  }

  set recipient(val) {
    return this.unflattener.result = val
  }

  get unflatten() {
    return this.unflattener.unflatten
  }

  get rkey1() {
    return this.recipient[this.key1]
  }

  set rkey1(val) {
    this.recipient[this.key1] = val
  }

  novalidOverWrite() {
    !overwrite && !isObject && notDefined
  }

  step() {
    while (isDefined(this.key2)) {
      changed = true
      var isObject = isObject(value)
      var notDefined = !isDefined(value)

      // do not write over falsey, non-undefined values if overwrite is false
      if (this.novalidOverWrite()) return

      if ((overwrite && !isObject) || (!overwrite && value == null)) {
        this.rkey1 = (isNumber(this.key2) && !opts.object) ? [] : {}
      }

      this.recipient = this.rkey1
      
      this.setKeys()
    }

    let key = this.key

    if (!this.shallow) {
      // unflatten again for 'messy objects'
      const value = this.target[key]

      this.log('unflatten again', unflatten)
      this.rkey1 = unflatten(this.target[key], this.opts)
      this.changed = this.changed || value !== this.recipient[this.key1]
    } else {
      this.rkey1 = this.target[key]
    }
  }
}

function stepper(key, unflattener) {
  return new Stepper(key, unflattener).step()
}

class Unflattener extends Logger {
  constructor(target, opts = {}) {
    super(opts)
    this.opts = opts

    this.target = target
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
    if (this.isBuffer || !this.isObject) return this.target
        
    let keys = Object.keys(this.target)

    for (let key of keys) {
      stepper(key, {unflattener: this})
    }

    this.log('changed?', this.changed, this.result)
    return this.changed ? this.result : this.target
  }
}

function unflatten(target, opts) {
  return new Unflattener(target, opts).unflatten()
}

module.exports = unflatten