const {
  makePointer
} = require('..')

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

  const $keyQueryMatcher = (keys, keyQuery) => {
    if (typeof keyQuery !== 'function') return
    return Object.keys(acc).find(key => keyQuery(key))
  }

  it('not a function', () => {
    const keyQueryMatcher = 'oops'

    const result = () => makePointer(obj, path, {
      keyQueryMatcher
    })

    expect(result).toThrow()
  })

  it('query function that returns undefined', () => {
    const keyQueryMatcher = () => undefined

    const result = () => makePointer(obj, path, {
      keyQueryMatcher
    })

    expect(result).toThrow()
  })

  it('valid query matcher function', () => {
    const keyQueryMatcher = $keyQueryMatcher

    const result = () => makePointer(obj, path, {
      keyQueryMatcher
    })

    expect(result).not.toThrow()
    expect(result()).not.toBe(obj)
  })
})
