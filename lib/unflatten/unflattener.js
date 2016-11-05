const { isBuffer, isObject, Logger } = require('../util')
// isObject, isNumber, Logger
const { getkey, isDefined,  } = require('../util')

//const stepper = require('./stepper')
class Stepper extends Logger {
  constructor(key, unflattener) {
    super(unflattener.opts)
    this.key = key
    this.unflattener = unflattener
    this.log('unflattener', unflattener)

    this.splitName = unflattener.keynames(key)
    this.target = unflattener.target
    this.changed = unflattener.changed
    this.opts = unflattener.opts
    this.shallow = unflattener.shallow
    this.result = {}

    this.setKeys()
  }

  setKeys() {
    this.log('splitName', this.splitName)
    if (this.splitName.length <= 1) return 

    this.key1 = getkey(this.splitName.shift())
    this.key2 = getkey(this.splitName[0])    
  }

  get rkey1() {
    return this.result[this.key1]
  }

  set rkey1(val) {
    this.result[this.key1] = val
  }

  novalidOverWrite() {
    return !overwrite && !isObject && notDefined
  }

  step() {
    this.log('key1', this.key1)
    this.log('key2', this.key2)

    while (isDefined(this.key2)) {
      this.log('changing for', this.key2)
      this.changed = true
      var isObject = isObject(this.rkey1)
      var notDefined = !isDefined(this.rkey1)

      // do not write over falsey, non-undefined values if overwrite is false
      if (this.novalidOverWrite()) {
        this.log('novalidOverWrite')
        return
      }

      if ((overwrite && !isObject) || (!overwrite && this.rkey1 == null)) {
        this.rkey1 = (isNumber(this.key2) && !opts.object) ? [] : {}
      }

      this.result = this.rkey1      
      this.setKeys()
    }

    let key = this.key

    if (!this.shallow) {
      // unflatten again for 'messy objects'
      let value = this.target[key]

      this.log('unflatten again', unflatten)
      this.rkey1 = unflatten(this.target[key], this.opts)
      let isSame = value !== this.result[this.key1]

      this.changed = this.changed || isSame 
    } else {
      this.rkey1 = this.target[key]
    }
    this.log('result', this.rkey1)
    return this.result
  }
}

function stepper(key, unflattener) {
  new Stepper(key, unflattener).step()
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
    this.isObject = target && typeof target === 'object'
    this.keynames = this.opts.keynames || this.unflattenKeyname; 
    this.changed = false  

    this.log('target', this.target)
  }

  unflattenKeyname(key) {
    return key.split(this.delimiter)
  }

  unflatten() {
    if (this.isBuffer || !this.isObject) {
      this.log('going home now!', this.target)
      return this.target
    }
        
    let keys = Object.keys(this.target)

    for (let key of keys) {
      stepper(key, this)
    }

    this.log('changed?', this.changed, this.result)
    return this.changed ? this.result : this.target
  }
}

function unflatten(target, opts) {
  return new Unflattener(target, opts).unflatten()
}

module.exports = unflatten