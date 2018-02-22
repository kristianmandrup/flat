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
const $defaults = {
  validateOn: false,
  log(msg, obj) {
    console.log(msg, obj)
  },
  error(msg, obj) {
    console.error(msg, obj)
  },
  logger(opts) {
    return {
      // controller logging
      log(msg, obj) {
        if (!opts.logging) return
        console.log(msg, obj)
      },
      error(msg, obj) {
        console.error(msg, obj)
      }
    }
  },
  validator(options) {
    return {
      functions(funs, opts = options) {
        funs.map(fun => isFunction(fun) ? opts.error('Not a function', fun) : undefined)
      }
    }
  },
  overwrite: true,
  shallow: true,
  noOp() {},
  delimiter: '.',
  reachedMaxDepth(opts = {}) {
    const {
      maxDepth,
      depth
    } = opts
    return index > maxDepth
  },
  identity(value) {
    return value
  },
  leafValue: {
    select(opts) {
      const defaults = opts.defaults || $defaults
      return opts.shallow ? defaults.leafValue.shallow : defaults.leafValue.expand
    },
    shallow: $defaults.identity,
    expand(value, opts) {
      let {
        unflatten,
        isObj
      } = opts
      isObj = isObj || isObject
      if (typeof unflatten !== 'function ' || !isObj(value)) return value
      return unflatten(value, opts)
    }
  },
  keyQueryMatcher(keys, keyQuery) {
    if (typeof keyQuery !== 'function') return
    return Object.keys(acc).find(key => keyQuery(key))
  },
  keyMatchers: [
    regExpKeyMatcher
  ],
  selectKey(acc, key, keyMatchers, keyQueryMatcher) {
    let matchingKey
    if (Array.isArray(keyMatchers)) {
      const matchedKeys = keyMatchers.reduce((keys, keyMatcher) => {
        const match = keyMatcher(acc, key, keyQueryMatcher)
        if (match) keys.push(match)
        return keys
      }, [])
      matchingKey = matchedKeys[0]
    }
    matchingKey = matchingKey || key

    switch (typeof key) {
      case 'string':
        return acc[key]
      case 'number':
        return acc['' + number]
      default: // undefined, null etc.
        return acc
    }
  },
  nextDepth(depth, opts) {
    return depth++
  },
  onValueAt(acc, key) {
    if (acc[key] === undefined) acc[key] = {}
  },
  makePointer(obj, path, opts = {}) {
    let {
      stopCondition,
      whenStopped,
      maxDepth,
      onValueAt,
      selectKey,
      pathKeyTransform,
      keynames, // alias for pathKeyTransform for compatibility
      keyQueryMatcher,
      keyMatchers,
      startDepth,
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
    onValueAt = onValueAt || defaults.onValueAt
    pathKeyTransform = pathKeyTransform || keynames || defaults.identity
    nextDepth = nextDepth || defaults.nextDepth

    const existingObj = Object.keys(obj).length > 0

    // when digging into existing object
    selectKey = selectKey || defaults.selectKey
    keyMatchers = keyMatchers || defaults.keyMatchers
    keyQueryMatcher = keyQueryMatcher || defaults.keyQueryMatcher

    // TODO: validate using validate object passed down, containing validate functions
    if (validateOn && validate.functions) {
      validate.functions([
        stopCondition,
        onValueAt,
        pathKeyTransform,
        nextDepth
      ], opts)

      if (existingObj) {
        validate.functions([
          selectKey,
          keyQueryMatcher
        ], opts)
      }
    }


    let depth = startDepth || 0

    const result = path.reduce((acc, $key, index) => {
      const key = pathKeyTransform ? pathKeyTransform($key) : $key
      const conditionOpts = Object.assign(opts, {
        acc,
        key,
        $key,
        index,
        depth
      })

      if (stopCondition && stopCondition(opts)) {
        return whenStopped(acc)
      }

      const selectedKey = selectKey ? selectKey(acc, key, keyMatcher) : key
      if (onValueAt) {
        onValueAt(acc, selectedKey)
      }
      const nextValue = acc[selectedKey]
      if (nextValue) {
        depth = nextDepth ? nextDepth(depth, {
          index,
          selectedKey,
          nextValue
        }) : (depth++)

        return nextValue
      }
      return acc // fallback if no nextValue
    }, obj)

    // can be used for notification
    if (opts.onPointer) {
      opts.onPointer(result)
    }
    return result
  }
}

module.exports = {
  regExpKeyMatcher,
  $defaults
}
