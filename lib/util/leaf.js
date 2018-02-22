const regExpKeyMatcher = (acc, key, keyMatcher) => {
  if (key instanceof RegExp) {
    const keyQuery = (k) => key.test(k)
    const keys = Object.keys(acc)
    return keyMatcher(keys, keyQuery)
  }
  return null
}

// TODO: Make leaf a proper class

const $defaults = {
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
  keyMatcher(keys, keyQuery) {
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
      keyQueryMatcher,
      keyMatchers,
      startDepth,
      defaults
    } = opts
    defaults = defaults || $defaults
    maxDepth = maxDepth || 10
    stopCondition = stopCondition || defaults.reachedMaxDepth
    whenStopped = whenStopped || defaults.identity
    onValueAt = onValueAt || defaults.onValueAt
    selectKey = selectKey || defaults.selectKey
    keyMatchers = keyMatchers || defaults.keyMatchers
    keyQueryMatcher = keyQueryMatcher || defaults.keyQueryMatcher
    pathKeyTransform = pathKeyTransform || defaults.identity
    nextDepth = nextDepth || defaults.nextDepth

    let depth = startDepth || 0

    return path.reduce((acc, $key, index) => {
      const key = pathKeyTransform($key)
      const conditionOpts = Object.assign(opts, {
        acc,
        key,
        $key,
        index,
        depth
      })

      if (stopCondition(opts)) {
        return whenStopped(acc)
      }

      const selectedKey = selectKey(acc, key, keyMatcher)
      onValueAt(acc, selectedKey)
      const nextValue = acc[selectedKey]
      if (nextValue) {
        depth = nextDepth(depth, {
          index,
          selectedKey,
          nextValue
        })
        return nextValue
      }
      return acc // fallback if no nextValue
    }, obj)
  }
}

function leaf(obj, path, value, opts = {}) {
  let {
    delimiter,
    setValue,
    makePointer,
    flatKey,
    defaults
  } = opts
  defaults = defaults || $defaults
  delimiter = delimiter || defaults.delimiter
  setLeafValue = setLeafValue || defaults.identity

  path = typeof path === 'string' ? path.split(delimiter) : path
  path = typeof path === 'function' ? path(flatKey) : path

  makePointer = makePointer || defaults.makePointer

  const pointer = makePointer(obj, path, opts)
  const key = path.pop()
  const valueOpts = Object.assign(opts, {
    path,
    key,
    flatKey
  })

  pointer[key] = setLeafValue(value, valueOpts)
  return obj
}

module.exports = {
  leaf,
  leafDefaults: $defaults
}
