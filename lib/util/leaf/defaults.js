const regExpKeyMatcher = (acc, key, keyMatcher) => {
  if (key instanceof RegExp) {
    const keyQuery = (k) => key.test(k)
    const keys = Object.keys(acc)
    return keyMatcher(keys, keyQuery)
  }
  return null
}

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
  makePointer(obj, path, opts = {}) {
    let {
      stopCondition,
      whenStopped,
      maxDepth,
      nextDepth,
      accValue,
      selectAt,
      fetchValue,
      keyName,
      keynames, // alias for pathKeyTransform for compatibility
      matchOn,
      keyQueryMatcher,
      keyMatchers,
      startDepth,
      isExistingObject,
      createPointer,
      defaults,
      validate,
      validateOn,
      log,
      error
    } = opts

    defaults = defaults || $defaults
    validateOn = !!(validateOn || defaults.validateOn)
    maxDepth = maxDepth || 10
    stopCondition = stopCondition || defaults.reachedMaxDepth
    whenStopped = whenStopped || defaults.identity
    accValue = accValue || defaults.accValue
    keyName = keyName || keynames || defaults.identity
    nextDepth = nextDepth || defaults.nextDepth
    fetchValue = fetchValue || defaults.fetchValue
    isExistingObject = isExistingObject || defaults.isExistingObject
    matchOn = !!(matchOn || defaults.matchOn)

    const existingObj = !!isExistingObject(obj, opts)

    // when digging into existing object
    selectAt = selectAt || defaults.selectAt
    keyMatchers = keyMatchers || defaults.keyMatchers
    keyQueryMatcher = keyQueryMatcher || defaults.keyQueryMatcher
    createPointer = createPointer || defaults.createPointer

    // TODO: validate using validate object passed down, containing validate functions
    if (validateOn && validate.functions) {
      validate.functions([
        stopCondition,
        onValue,
        keyName,
        nextDepth,
        createPointer
      ], opts)

      if (existingObj) {
        validate.functions([
          selectKey,
          keyQueryMatcher
        ], opts)
      }
    }

    let depth = startDepth || 0

    log('before reduce', {
      acc: obj,
      path,
      depth
    })

    let lastKey, lastAcc
    const result = path.reduce((acc, pathKey, index) => {
      log('iterate path', {
        acc,
        pathKey,
        index
      })

      const conditionOpts = Object.assign(opts, {
        acc,
        pathKey,
        index,
        depth
      })

      if (isFunction(stopCondition) && stopCondition(conditionOpts)) {
        return whenStopped(acc, opts)
      }

      // TODO: add $key as an option
      let selected = {}
      if (existingObj) {
        const selectOpts = Object.assign(opts, {
          keyMatchers,
          keyQueryMatcher
        })
        const selectKey = pathKey.toString()
        const defaultValue = acc[selectKey]
        selected = selectAt ? selectAt(acc, pathKey, selectOpts) : {
          key: selectKey,
          value: defaultValue
        }

        log('selected', {
          selected
        })
      }

      const key = selected.key || keyName ? keyName(pathKey, opts) : pathKey
      validate.keyName(key, opts)

      const fetchOpts = Object.assign(opts, {
        value: selected.value
      })
      let value = fetchValue(acc, key, opts)
      log('value', {
        value
      })
      const valueOpts = Object.assign(opts, {
        value
      })

      nextAcc = accValue(acc, key, opts)

      log('after: accValue', {
        nextAcc
      })

      depth = nextDepth ? nextDepth(depth, {
        index,
        key,
        acc,
        nextAcc
      }, opts) : (depth++)

      log('nextDepth', {
        depth
      })
      lastKey = key
      lastAcc = acc
      return nextAcc
    }, obj)

    const pointerOpts = Object.assign(opts, {
      result
    })
    const pointer = createPointer(lastAcc, lastKey, pointerOpts)

    // can be used for notification
    if (opts.onPointer) {
      opts.onPointer(pointer, opts)
    }
    return pointer
  }
})

module.exports = {
  regExpKeyMatcher,
  $defaults
}
