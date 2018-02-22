const {
  Base
} = require('../base')

function createStepper(object, {
  flattener,
  prev,
  currentDepth
}) {
  return new Stepper(object, {
    flattener,
    prev,
    currentDepth
  })
}

class Stepper extends Base {
  constructor(object, {
    prev,
    currentDepth,
    flattener,
    opts
  }) {
    super(flattener || opts)
    opts = opts || this.opts
    this.prev = prev

    this.currentDepth = currentDepth || this.currentDepth || 1

    this.object = object
    this.keys = Object.keys(object)
    this.createKeyStepper = opts.createKeyStepper || createKeyStepper
  }

  /**
   * Apply transformation, either built-in or custom
   * @param {} newKey
   */
  calcNewKey(newKey) {
    this.log('calcNewKey', {
      newKey
    })
    if (this.lowerCase) return newKey.toLowerCase()
    if (this.upperCase) return newKey.toUpperCase()
    if (this.transformKeyFn && isFunction(this.transformKeyFn)) {
      return this.transformKeyFn(newKey)
    }
    return newKey
  }

  doStepsAsync() {
    this.newKey = this.calcNewKey(this.newKey)

    this.log('doSteps async', {
      newKey: this.newKey,
      keys: this.keys
    })

    // calculate new "base" key for use when generating keys for new keys iterated

    const promises = this.keys.map(key => {
      const value = this.object[key]
      return this.onKeyAsync(key, value)
    })

    return Promise.all(promises)
  }

  doSteps() {
    this.newKey = this.calcNewKey(this.newKey)

    this.log('doSteps', {
      newKey: this.newKey,
      keys: this.keys
    })

    // calculate new "base" key for use when generating keys for new keys iterated

    this.keys.map(key => {
      const value = this.object[key]
      return this.onKey(key, value)
    })

    this.flattener.onStepsDone(this.currentDepth)
  }

  addKey(key) {
    this.lvKeys = this.lvKeys || []
    this.lvKeys.push(key)
  }

  onKey(key, value) {
    this.flattener.onKey(key, this.currentDepth, value)
    this.addKey(key)
    return this.doStep(key, value)
  }

  onKeyAsync(key, value) {
    this.flattener.onKey(key, this.currentDepth, value)
    this.addKey(key)
    return this.doStepAsync(key, value)
  }


  doStep(key, value) {
    this.log('doStep', {
      key,
      // value
    })

    // used to transform output
    const keyStepper = this.createKeyStepper(key, {
      value,
      stepper: this,
      flattener: this.flattener
    })

    keyStepper.step()
  }

  doStepAsync(key, value) {
    this.log('doStep', {
      key,
      // value
    })

    // used to transform output
    const keyStepper = this.createKeyStepper(key, {
      value,
      stepper: this,
      flattener: this.flattener
    })

    return keyStepper.stepAsync()
  }
}

module.exports = {
  createStepper,
  Stepper
}

const {
  createKeyStepper
} = require('./key-stepper')
