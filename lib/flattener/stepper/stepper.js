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

  doSteps() {
    this.newKey = this.calcNewKey(this.newKey)

    this.log('doSteps', {
      newKey: this.newKey,
      keys: this.keys
    })

    // calculate new "base" key for use when generating keys for new keys iterated

    for (let key of this.keys) {
      this.onKey(key)
    }

    this.flattener.onStepsDone(this.currentDepth)
  }

  addKey(key) {
    this.lvKeys = this.lvKeys || []
    this.lvKeys.push(key)
  }

  onKey(key) {
    this.flattener.onKey(key, this.currentDepth)
    this.addKey(key)
    this.doStep(key)
  }

  doStep(key) {
    this.log('doStep', {
      key
    })

    // used to transform output
    const keyStepper = this.createKeyStepper(key, {
      stepper: this,
      flattener: this.flattener
    })

    keyStepper.step()
  }
}

module.exports = {
  createStepper,
  Stepper
}

const {
  createKeyStepper
} = require('./key-stepper')
