const {
  FlatKey
} = require('./flat-key')
const {
  createStepper
} = require('./stepper')
const {
  OptionHolder
} = require('./option-holder')

const {
  isObject
} = require('../util')

// factory
const defaults = {
  createKeyNameFn(opts, flattener) {
    // allow using custom FlatKey via factory to generate it from opts
    const FlatKeyClass = opts.FlatKeyClass || FlatKey
    const flatKey = opts.createFlatKeyFn ? opts.createFlatKeyFn(opts) : new FlatKeyClass(opts)

    // make sure flatKey has a reference to flattener for use when logging etc
    flatKey.flattener = flattener

    return (key, prev) => {
      return flatKey.config(key, prev).name
    }
  }
}

const createKeyNameFn = (opts) => {
  return (opts.createKeyNameFn || defaults.createKeyNameFn)(opts)
}

class Flattener extends OptionHolder {
  constructor(opts = {}, target) {
    super(opts)
    this.target = target
    this.flattener = this

    // use function (created via factory method) or use static keyname
    this.reset()
  }

  get logger() {
    return this._logger
  }

  set logger(logger) {
    this._logger = logger
    this.opts.logger = logger
  }

  reset() {
    // output object starts as empty object
    this.output = {}
    this.currentDepth = 1
    this.changed = false

    const opts = this.opts

    this.keynameFn = opts.keyNameFn || createKeyNameFn(opts);
    this.createStepper = opts.createStepper || createStepper
  }

  validate(target) {
    if (!isObject(target)) {
      const errMsg = `Invalid flatten target: must be an Object, was: ${this.target}`
      this.logError(errMsg)
      throw new Error(errMsg)
    }
  }

  /**
   * Create flat object
   * @param {*} target
   * @param {*} opts
   */
  flat(target, opts = {}) {
    if (opts.async) {
      return this.flatAsync(target, opts)
    }

    this.reset()

    this.opts = opts || this.opts
    this.target = target || this.target

    this.logObj('flatten', {
      target: this.target,
      opts: this.opts
    })

    this.validate(this.target)

    const stepper = this.createStepper(this.target, {
      flattener: this
    })
    this.stepper = stepper

    this.log('created stepper', {
      stepper
    })

    stepper.doSteps()
    // isomorphic, return original object unless some change was made
    return this.changed ? this.output : this.target
  }

  /**
   * Create flat object
   * @param {*} target
   * @param {*} opts
   */
  flatAsync(target, opts) {
    this.reset()

    this.opts = opts || this.opts
    this.target = target || this.target

    this.logObj('flatten', {
      target: this.target,
      opts: this.opts
    })

    this.validate(this.target)

    const stepper = this.createStepper(this.target, {
      flattener: this
    })
    this.stepper = stepper

    this.log('created stepper', {
      stepper
    })

    return stepper.doStepsAsync().then(result => {
      this.onStepsDone(this.currentDepth)
      // isomorphic, return original object unless some change was made
      return this.changed ? this.output : this.target
    }).catch(err => err)
  }

  onKey(key, depth) {
    this.log('onKey', {
      key,
      depth
    })
    this.currentDepth = depth
    this.addKey(key, depth)
  }

  addKey(key, depth) {
    const lastDepth = this.lastDepth || 0
    this.ancestorKeys = this.ancestorKeys || []

    if (depth > lastDepth) {
      this.ancestorKeys.push(key)

      this.lastAncestorKey = key
    }
    this.lastDepth = depth
  }

  get lvKeys() {
    return this.stepper ? this.stepper.lvKeys : []
  }

  onStepsDone(depth) {
    this.log('onStepsDone', {
      depth
    })
    this.ancestorKeys.pop()
  }

  publishObj(obj, target) {
    Object.keys(obj).map(key => {
      const value = obj[key]
      this.publish(key, value, target)
    })
  }

  publish(key, value, target) {
    this.subscribers.map(subscriber => {
      subscriber(key, value, target)
    })
    return target
  }

  subscribeTo(newKey, config = {}) {
    const subscriber = this.createSubscriber(newKey, config)
    this.addSubscriber(subscriber)
  }

  createSubscriber(newKey, config) {
    const {
      callback
    } = config

    return (key, value, target) => {
      if (newKey !== key) return
      if (typeof subscribeValue !== 'function') return
      config.target = target || config.target
      callback(key, value, config)
    }
  }

  addSubscriber(subscriber) {
    this.subscribers = this.subscribers || []
    this.subscribers.push(subscriber)
  }
}

function createFlattener(opts, target) {
  return new Flattener(opts, target)
}


function flatten(target, opts) {
  return createFlattener(opts).flat(target)
}

function flattenAsync(target, opts) {
  return createFlattener(opts).flatAsync(target)
}


module.exports = {
  createFlattener,
  flatten,
  createKeyNameFn,
  Flattener
}
