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

const noop = () => {}

class KeyStepper extends Base {
  constructor(key, {
    flattener,
    stepper
  }) {
    super(flattener)
    const opts = this.opts || {}
    this.stepper = stepper || flattener.stepper

    this.subscribeValue = opts.subscribeValue || noop

    this.restoreFromStepper(stepper)

    this.key = key
    this.value = this.object[key]

    // calculate
    this.configType()
    this.configValid()

    // calc new key value
    this.newKey = this.keynameFn(key, this.prev)
    this.transformValue = (opts.transformValue || this.transformValue).bind(this)
  }

  restoreFromStepper(stepper) {
    if (!stepper) return
    this.lvKeys = stepper.lvKeys
    this.ancestorKeys = this.flattener.ancestorKeys

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
      flattener: this.flattener,
      opts: this.opts
    })
  }

  get changed() {
    return this.flattener.changed
  }

  set changed(changed) {
    this.flattener.changed = changed
  }

  /**
   * Set the final output of the key/value
   * @param {*} key - final key
   * @param {*} value - value
   */
  setOutput(newKey, value, {
    target,
    key,
    prevKey,
    ancestorKeys,
    lvKeys
  }) {
    const opts = {
      newKey,
      value,
      target,
      key,
      prevKey,
      ancestorKeys,
      lvKeys
    }

    this.log('setOutput', opts)

    this.flattener.lastKey = this.flattener.lastKey || ''
    // compare this key with last used key
    // if overlap, skip it
    let onSameChain = this.flattener.lastKey.indexOf(newKey) >= 0
    if (onSameChain) return

    this.flattener.lastKey = newKey
    this.changed = true
    let pointer = this.flattener.output[newKey]
    opts.pointer = pointer
    this.flattener.output[newKey] = this.transformValue(value, opts)

    this.subscribeOutput(newKey, opts)
  }

  subscribeOutput(newKey, opts) {
    if (typeof this.subscribeValue !== 'function') return

    // clone arrays to make sure not post-modified by flattener
    opts.ancestorKeys = opts.ancestorKeys.slice()
    opts.lvKeys = opts.lvKeys.slice()

    this.subscribeTo(newKey, {
      callback: this.subscribeValue,
      output: this.flattener.output,
      opts
    })
  }

  subscribeTo(newKey, config = {}) {
    this.flattener.subscribeTo(newKey, config)
  }

  transformValue(value, opts = {}) {
    return value
  }

  get output() {
    return this.flattener.output
  }

  step() {
    this.log('step')

    if (this.shouldGoDeeper) {
      this.depthStepper().doSteps()
    }
    this.setOutput(this.newKey, this.value, {
      target: this.flattener.target,
      key: this.key,
      prevKey: this.prev,
      lvKeys: this.lvKeys,
      ancestorKeys: this.ancestorKeys
    })
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
