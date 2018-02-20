const {
  FlatKey
} = require('./flat-key')
const {
  createStepper
} = require('./stepper')
const {
  OptionHolder
} = require('./option-holder')

// factory
const defaults = {
  createKeyNameFn(opts) {
    // allow using custom FlatKey via factory to generate it from opts
    const FlatKeyClass = opts.FlatKeyClass || FlatKey
    const flatKey = opts.createFlatKeyFn ? opts.createFlatKeyFn(opts) : new FlatKeyClass(opts)

    return (key, prev) => {
      return flatKey.config(key, prev).name
    }
  }
}

const createKeyNameFn = (opts) => {
  return (opts.createKeyNameFn || defaults.createKeyNameFn)(opts)
}

class Flattener extends OptionHolder {
  constructor(target, opts = {}) {
    super(opts)

    this.target = target
    this.currentDepth = 1
    this.changed = false

    // use function (created via factory method) or use static keyname
    this.keynameFn = opts.keyNameFn || createKeyNameFn(opts);

    // output object starts as empty object
    this.output = {}

    this.createStepper = opts.createStepper || createStepper
  }

  flatten() {
    this.logObj('flatten', {
      target: this.target,
      opts: this.opts
    })
    const stepper = this.createStepper(this.target, {
      flattener: this
    })

    this.log('created stepper', {
      stepper: this.stepper
    })

    stepper.doSteps()
    // isomorphic, return original object unless some change was made
    return this.changed ? this.output : this.target
  }

  onKey(key, depth) {
    this.log('onKey', {
      key,
      depth
    })
    this.addKey(key, depth)
  }

  addKey(key, depth) {
    const lastDepth = this.lastDepth || 0
    this.ancestorKeys = this.ancestorKeys || []

    if (depth > lastDepth) {
      this.ancestorKeys.push(key)
    }

    this.lastDepth = depth
  }

  onStepsDone(depth) {
    this.log('onStepsDone', {
      depth
    })
    this.ancestorKeys.pop()
  }
}

function flatten(target, opts) {
  return new Flattener(target, opts).flatten()
}

module.exports = {
  flatten,
  createKeyNameFn,
  Flattener
}
