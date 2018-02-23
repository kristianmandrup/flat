const regExpKeyMatcher = (acc, key, keyMatcher) => {
  if (key instanceof RegExp) {
    const keyQuery = (k) => key.test(k)
    const keys = Object.keys(acc)
    return keyMatcher(keys, keyQuery)
  }
  return null
}

const {
  makePointer
} = require('./make-pointer')

const {
  isFunction,
  isObject
} = require('../type-checks')

// TODO: Make leaf a proper class
const $$defaults = {
  matchOn: false,
  validateOn: false,
  overwrite: true,
  shallow: true,
  noOp() {},
  delimiter: '.',
  identity(value) {
    return value
  }
}

const leafValue = {
  select(opts) {
    const defaults = opts.defaults || $defaults
    const $leafValue = defaults.leafValue || {}
    opts.log('leafValue: select', {
      shallow: opts.shallow,
      $leafValue,
      leafValue
    })
    return opts.shallow ? ($leafValue.shallow || leafValue.shallow) : ($leafValue.expand || leafValue.expand)
  },
  shallow: $$defaults.identity,
  expand(value, opts) {
    let {
      unflatten,
      isObj
    } = opts
    isObj = isObj || isObject
    if (typeof unflatten !== 'function ' || !isObj(value)) return value
    return unflatten(value, opts)
  }
}

function log(msg, obj) {
  const displayValue = isObject(obj) ? JSON.stringify(obj, null, 2) : obj
  displayValue ? console.log(msg, displayValue) : console.log(msg)
}

function error(msg, obj) {
  obj ? console.error(msg, obj) : console.log(msg)
  throw new Error(msg)
}


const $defaults = Object.assign($$defaults, {
  log,
  error,
  logger(opts) {
    return {
      // controller logging
      log(msg, obj) {
        if (!(opts.logging || opts.logOn)) return
        log(msg, obj)
      },
      error(msg, obj) {
        error(msg, obj)
      }
    }
  },
  createPointer(ref, key, opts) {
    return {
      ref,
      key,
      depth: opts.depth,
      value: ref[key],
      setValue(value) {
        ref[key] = value
      }
    }
  },
  validator(options) {
    return {
      functions(funs, opts = options) {
        const {
          error
        } = opts
        funs.map(fun => isFunction(fun) ? error('Not a function', fun) : undefined)
      },
      keyName(name, opts = options) {
        const {
          error
        } = opts
        if (typeof name !== 'string') {
          error(`Invalid key name for ${name}: ${typeof name}`, {
            key: name
          })
        }
      },
      validDepth(depth, opts) {
        const {
          error
        } = opts

        return depth >= 0 ? true : error('Invalid depth: < 0', {
          depth
        })
      }
    }
  },
  reachedMaxDepth(opts = {}) {
    const {
      maxDepth,
      depth,
      index
    } = opts
    return depth > maxDepth
  },
  fetchValue(acc, key, opts = {}) {
    return opts.value || acc[key]
  },
  leafValue,
  keyQueryMatcher(keys, keyQuery) {
    if (typeof keyQuery !== 'function') return
    return Object.keys(acc).find(key => keyQuery(key))
  },
  keyMatchers: [
    regExpKeyMatcher
  ],
  selectAt(acc, key, opts = {}) {
    const {
      matchOn,
      keyMatchers,
      keyQueryMatcher,
      log
    } = opts
    let matchingKey
    if (matchOn && Array.isArray(keyMatchers)) {
      log('keyMatchers', {
        keyMatchers
      })

      const keys = Object.keys(acc) || []
      const matchedKeys = keyMatchers.reduce((acc, keyMatcher) => {
        const match = keyMatcher(acc, key, keyQueryMatcher)
        if (match) acc.push(match)
        return acc
      }, keys)

      log('matchedKeys', {
        matchedKeys
      })

      matchingKey = matchedKeys[0]
    }
    matchingKey = matchingKey || key
    const $key = matchingKey

    log('selectAt: switch', {
      acc,
      $key,
      type: typeof $key
    })

    function value($key) {
      switch (typeof $key) {
        case 'string':
          return acc[$key]
        case 'number':
          return acc['' + $key]
        default: // undefined, null etc.
          return acc
      }
    }

    return {
      key: $key,
      value: value(key)
    }
  },
  isExistingObject(obj, opts) {
    return Object.keys(obj).length > 0
  },
  nextDepth(depth, opts) {
    return depth++
  },
  accValue(acc, key, opts) {
    opts.log('accValue', acc[key])
    if (acc[key] === undefined) acc[key] = {}
    opts.log('accValue set', acc[key])
    return acc[key]
  },
  makePointer
})

module.exports = {
  regExpKeyMatcher,
  $defaults
}
