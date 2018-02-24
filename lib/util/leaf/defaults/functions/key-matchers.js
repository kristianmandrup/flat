function regExpKeyMatcher(acc, key, keyMatcher) {
  if (key instanceof RegExp) {
    const keyQuery = (k) => key.test(k)
    const keys = Object.keys(acc)
    return keyMatcher(keys, keyQuery)
  }
  return null
}

const keyMatchers = [
  regExpKeyMatcher
]

module.exports = {
  keyMatchers
}
