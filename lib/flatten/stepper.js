const { isObject, isBuffer, isArray } = require('../util')
const Base = require('../base')

class KeyStepper extends Base {
  constructor(key, {ctx}) {    
    super(ctx)
    this.prev = ctx.prev
    this.object = ctx.object

    this.key = key
    this.log('KeyStepper', this.object, key, this.opts)
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
    this.shouldGoDeeper = this.validDeeper && ctx.filter(this.value)
  }

  calcNewKey(newKey) {
    if (this.lowerCase) return newKey.toLowerCase()
    if (this.upperCase) return newKey.toUpperCase()
  } 

  depthStepper() {
    return stepper(this.value, {prev: this.newKey, currentDepth: this.currentDepth + 1, ctx: this.ctx})
  }

  step() {
    if (this.shouldGoDeeper) {
      this.log('going deeper')
      this.depthStepper().doSteps()
    }

    this.newKey = this.calcNewKey(this.newKey)
    this.changed = this.newKey !== this.key

    this.log('newKey', this.newKey)
    this.log('changed', this.changed)
    // set flattened key to value
    this.output[this.newKey] = this.value
    return this.output    
  }  
}


class Stepper extends Base {
  constructor(object, {prev, currentDepth, ctx}) {
    super(ctx)
    this.log('Stepper', object, ctx)  
    this.filter = ctx.filter
    this.keyname = ctx.keyname
    this.currentDepth = this.currentDepth || 1
    this.changed = false
    this.object = object
    this.keys = Object.keys(object)
  }

  keyStepper(key) {
    return new KeyStepper(key, {ctx: this})
  }

  doSteps() {
    this.log('keys', this.keys)
    for (let key of this.keys) {
      // will transform object passed via self
      let output = this.keyStepper(key).step()
      this.log('output', output)
    }
    return this.object
  }
}

function stepper(object, {prev, currentDepth, ctx}) {
  return new Stepper(object, {prev, currentDepth, ctx})
}

module.exports = stepper
