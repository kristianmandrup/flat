const { isObject, isBuffer, isArray } = require('../util')
const Base = require('./base')

class KeyStepper extends Base {
  constructor(key, {flattener, stepper}) {    
    super(flattener)
    this.restoreFromStepper(stepper)

    this.key = key
    this.value = this.object[key]

    // calculate
    this.configType()
    this.configValid()

    // calc new key value
    this.newKey = this.keyname(key, this.prev) 
  }

  restoreFromStepper(stepper) {
    if (!stepper) return
    this.prev = stepper.prev
    this.object = stepper.object
    this.currentDepth = stepper.currentDepth
  }

  configType() {
    this.isArray = this.opts.safe && isArray(this.value)  
    this.isBuffer = isBuffer(this.value)
    this.isObject = isObject(this.value)

    this.validType = !this.isArray && !this.isBuffer && this.isObject    
  }

  configValid() {
    this.hasContent = Object.keys(this.value).length
    this.validTypeWithContent = this.validType && this.hasContent

    this.withinMaxDepth = !this.opts.maxDepth || this.currentDepth < this.maxDepth
    this.validDeeper = this.validTypeWithContent && this.withinMaxDepth
    this.shouldGoDeeper = this.validDeeper && this.filter(this.value)        
  }

  depthStepper() {
    return stepper(this.value, {prev: this.newKey, currentDepth: this.currentDepth + 1, flattener: this.flattener, stepper: this})
  }

  get changed() {
    return this.flattener.changed 
  }

  set changed(changed) {
    this.flattener.changed = changed 
  }

  setOutput(key, obj) {
    this.flattener.lastKey = this.flattener.lastKey || ''
    // compare this key with last used key
    // if overlap, skip it
    let onSameChain = this.flattener.lastKey.indexOf(key) >= 0
    if (onSameChain) return
    
    this.flattener.lastKey = key
    this.changed = true
    this.flattener.output[key] = obj
  }

  get output() {
    return this.flattener.output
  }

  step() {
    if (this.shouldGoDeeper) {
      this.depthStepper().doSteps()
    }
    this.setOutput(this.newKey, this.value)
    return this.output    
  }  
}


class Stepper extends Base {
  constructor(object, {prev, currentDepth, flattener}) {
    super(flattener)  

    this.prev = prev
    this.currentDepth = currentDepth || this.currentDepth || 1

    this.object = object
    this.keys = Object.keys(object)
  }

  keyStepper(key) {
    return new KeyStepper(key, {stepper: this, flattener: this.flattener })
  }

  calcNewKey(newKey) {
    if (this.lowerCase) return newKey.toLowerCase()
    if (this.upperCase) return newKey.toUpperCase()
    if (this.transformKey && isFunction(this.transformKey)) {
      return this.transformKey(newKey)        
    }
    return newKey
  } 

  doSteps() {
    // calculate new "base" key for use when generating keys for new keys iterated
    this.newKey = this.calcNewKey(this.newKey)    

    for (let key of this.keys) {
      // will transform output
      this.keyStepper(key).step()
    }
  }
}

function stepper(object, {flattener, prev, currentDepth}) {
  return new Stepper(object, {flattener, prev, currentDepth})
}

module.exports = stepper
