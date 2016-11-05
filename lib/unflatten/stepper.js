const { getkey, isDefined, isObject, isNumber } = require('../util')

class Stepper {
  constructor(key, { unflattener }) {
    this.key = key
    this.splitName = keynames(key)
    this.setKeys()
  }

  setKeys() {
    if (this.splitName.length <= 1) return 

    this.key1 = getkey(this.splitName.shift())
    this.key2 = getkey(this.splitName[0])    
  }

  get shallow() {
    return this.unflattener.shallow
  }

  get recipient() {
    return this.unflattener.result
  }

  get unflatten() {
    return this.unflattener.unflatten
  }

  get rkey1() {
    return this.recipient[this.key1]
  }

  set rkey1(val) {
    this.recipient[key1] = val
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
      this.rkey1 = unflatten(this.target[key], opts)
      this.changed = this.changed || value !== this.recipient[key1]
    } else {
      this.rkey1 = this.target[key]
    }
  }
}

function stepper(key, unflattener) {
  return new Stepper(key, unflattener).step()
}

module.exports = stepper     