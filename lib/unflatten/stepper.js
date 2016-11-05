const { getkey, isDefined, isObject, isNumber } = require('../util')

class Stepper {
  constructor(key, { unflattener }) {
    this.key = key
    this.split = keynames(key)
    this.key1 = getkey(this.split.shift())
    this.key2 = getkey(this.split[0])
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

  step() {
    while (isDefined(this.key2)) {
      changed = true

      let value = this.rkey1
      var isObject = isObject(value)
      var notDefined = !isDefined(value)

      // do not write over falsey, non-undefined values if overwrite is false
      if (!overwrite && !isObject && notDefined) {
        return
      }

      let key2_isNumber = isNumber(this.key2)

      if ((overwrite && !isObject) || (!overwrite && value == null)) {
        value = (key2_isNumber && !opts.object) ? [] : {}
      }

      this.recipient = this.rkey1

      if (this.split.length > 0) {
        this.key1 = getkey(split.shift())
        this.key2 = getkey(split[0])
      }
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