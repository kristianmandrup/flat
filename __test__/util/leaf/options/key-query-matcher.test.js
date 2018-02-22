const {
  leaf
} = require('../leaf')

const {
  log
} = console

describe('leaf: option - keyQueryMatcher', () => {
  const obj = {
    '.x': {
      '.y': 42
    }
  }
  const path = ['x', 'y']
  const value = 'hello'

  const $keyQueryMatcher = (keys, keyQuery) => {
    if (typeof keyQuery !== 'function') return
    return Object.keys(acc).find(key => keyQuery(key))
  }

  it('not a function', () => {
    const keyQueryMatcher = 'oops'

    const result = () => leaf(obj, path, value, {
      keyQueryMatcher
    })

    expect(result).toThrow()
  })

  it('query function that returns undefined', () => {
    const keyQueryMatcher = () => undefined

    const result = () => leaf(obj, path, value, {
      keyQueryMatcher
    })

    expect(result).toThrow()
  })

  it('valid query matcher function', () => {
    const keyQueryMatcher = $keyQueryMatcher

    const result = () => leaf(obj, path, value, {
      keyQueryMatcher
    })

    expect(result).not.toThrow()
    expect(result).not.toBe(obj)
  })
})
