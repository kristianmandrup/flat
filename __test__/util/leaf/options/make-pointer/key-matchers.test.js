const {
  makePointer
} = require('../leaf')

const {
  log
} = console

describe('leaf: option - keyMatchers', () => {
  const obj = {
    '.x': {
      '.y': 42
    }
  }
  const path = ['x', 'y']

  it('not an Array', () => {
    const keyMatchers = 'oops'

    const result = () => makePointer(obj, path, {
      keyMatchers
    })

    expect(result).toThrow()
  })

  it('empty Array', () => {
    const keyMatchers = []

    const result = () => makePointer(obj, path, {
      keyMatchers
    })

    expect(result).not.toThrow()
  })

  it('Array w invalid values (not functions)', () => {
    const keyMatchers = [
      'a',
      42
    ]

    const result = () => makePointer(obj, path, {
      keyMatchers
    })

    expect(result).toThrow()
  })

  it('Array w valid AND invalid values (not functions)', () => {
    const keyMatchers = [
      () => 42,
      'a'
    ]

    const result = () => makePointer(obj, path, {
      keyMatchers
    })

    expect(result).toThrow()
  })

  it('Array w function that returns nothing', () => {
    const keyMatchers = [
      () => undefined
    ]

    const result = () => makePointer(obj, path, {
      keyMatchers
    })

    expect(result).toBe(obj)
  })

  it('Array w function that matches keys', () => {
    const keyMatchers = [
      (key) => `.${key}`
    ]

    const result = () => makePointer(obj, path, {
      keyMatchers
    })

    const expectedObj = {
      '.x': {
        '.y': value
      }
    }

    expect(result).toBe(expectedObj)
  })
})
