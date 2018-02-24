function selectMatchingKey(acc, key, opts = {}) {
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
  return matchingKey || key
}


function selectAt(acc, key, opts = {}) {
  const {
    log
  } = opts
  const keyMatcher = opts.selectMatchingKey || selectMatchingKey
  const $key = keyMatcher(acc, key, opts)

  log('selectAt', {
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
}

module.exports = {
  selectAt
}
