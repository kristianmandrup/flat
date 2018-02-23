function makePointer(obj, path, opts = {}) {
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

    validate.validDepth(depth)

    log('nextDepth', {
      depth
    })
    lastKey = key
    lastAcc = acc
    return nextAcc
  }, obj)

  const pointerOpts = Object.assign(opts, {
    result,
    depth
  })
  const pointer = createPointer(lastAcc, lastKey, pointerOpts)

  // can be used for notification
  if (opts.onPointer) {
    opts.onPointer(pointer, opts)
  }
  return pointer
}

module.exports = {
  makePointer
}
