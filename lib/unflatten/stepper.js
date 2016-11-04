const { getkey } = require('../utils')

class Stepper {
  constructor(key, {ctx}) {
    this.split = keynames(key)
    this.key1 = getkey(this.split.shift())
    this.key2 = getkey(this.split[0])
    this.recipient = ctx.result
    this.unflatten = ctx.unflatten
  }

  step() {
    while (key2 !== undefined) {
      changed = true

      let value = this.recipient[key1]
      var isObject = isObject(value)
      var notDefined = typeof value !== 'undefined'

      // do not write over falsey, non-undefined values if overwrite is false
      if (!overwrite && !isObject && notDefined) {
        return
      }

      let key2_isNumber = typeof key2 === 'number'

      if ((overwrite && !isObject) || (!overwrite && value == null)) {
        value = (key2_isNumber && !opts.object) ? [] : {}
      }

      this.recipient = this.recipient[key1]
      if (this.split.length > 0) {
        key1 = getkey(split.shift())
        key2 = getkey(split[0])
      }
    }

    if (!this.shallow) {
      // unflatten again for 'messy objects'
      const value = this.target[key]
      this.recipient[key1] = unflatten(this.target[key], opts)
      this.changed = this.changed || value !== this.recipient[key1]
    } else {
      this.recipient[key1] = this.target[key]
    }
  }
}

function stepper(key, ctx) {
  return new Stepper(key, ctx).step()
}

module.exports = stepper     