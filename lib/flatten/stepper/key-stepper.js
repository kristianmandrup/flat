const {
  isObject,
  isBuffer,
  isArray
} = require('../../util')
const {
  Base
} = require('../base')

function createKeyStepper(key, opts) {
  return new KeyStepper(key, opts)
}

class KeyStepper extends Base {
  constructor(key, {
    flattener,
    stepper
  }) {
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
    return createStepper(this.value, {
      prev: this.newKey,
      currentDepth: this.currentDepth + 1,
      flattener: this.flattener
    })
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

module.exports = {
  createKeyStepper,
  KeyStepper
}

const {
  createStepper
} = require('./stepper')
