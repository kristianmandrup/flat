const { isObject, isBuffer, isArray } = require('../util')

class KeyStepper {
  constructor(key, {ctx}) {    
    this.ctx = ctx
    this.prev = ctx.prev
    this.object = ctx.object
    this.opts = this.ctx.opts

    this.key = key
    this.value = this.object[key]
    this.isArray = this.opts.safe && isArray(this.value)  
    this.isBuffer = isBuffer(this.value)
    this.isObject = isObject(this.value)

    this.filter = ctx.filter

    this.validType = !this.isArray && !this.isBuffer && this.isObject
    this.hasContent = Object.keys(this.value).length
    this.validTypeWithContent = this.validType && this.hasContent

    this.withinMaxDepth = !this.opts.maxDepth || this.currentDepth < this.maxDepth
    this.validDeeper = this.validTypeWithContent && this.withinMaxDepth

    this.newKey = ctx.keyname(this.prev, key)
  }

  calcNewKey(newKey) {
    if (this.lowerCase) return newKey.toLowerCase()
    if (this.upperCase) return newKey.toUpperCase()
  } 


  shouldGoDeeper() {
    return this.validDeeper && this.filter(this.value)
  }  

  step() {
    if (this.shouldGoDeeper()) {
      return stepper(this.value, this.newKey, this.currentDepth + 1, this.ctx)
    }

    this.newKey = this.calcNewKey(this.newKey)
    this.changed = this.newKey !== this.key

    // set flattened key to value
    this.output[this.newKey] = this.value    
  }  
}


class Stepper {
  constructor(object, {prev, currentDepth, ctx}) {
    this.ctx = ctx
    this.currentDepth = this.currentDepth || 1
    this.changed = false
    this.object = object
    this.keys = Object.keys(object)
  }

  doSteps() {
    for (let key in this.keys) {
      // will transform object passed via self
      new KeyStepper(key, this)
    }
    return this.object
  }
}

function stepper(object, {prev, currentDepth, ctx}) {
  return new Stepper(object, {prev, currentDepth, ctx})
}

module.exports = stepper
