const {
  leaf
} = require('..')

describe('option: makePointer', () => {
  const obj = {}
  const path = ['x', 'y']
  const value = 'hello'


  it('not a function', () => {
    const makePointer = 'oops'
    const result = () => leaf(obj, path, value, {
      makePointer,
      logging: true
    })

    expect(result).toThrow()
  })

  it('function does NOT return a pointer object', () => {
    const makePointer = () => 'oops'
    const result = () => leaf(obj, path, value, {
      makePointer,
      logging: true
    })

    expect(result).toThrow()
  })

  it('function does return an empty object', () => {
    const makePointer = () => {
      return {}
    }
    const result = () => leaf(obj, path, value, {
      makePointer,
      logging: true
    })

    expect(result).toThrow()
  })

  it('function returns an object with value', () => {
    const makePointer = () => {
      return {
        value: {}
      }
    }
    const result = () => leaf(obj, path, value, {
      makePointer,
      logging: true
    })

    expect(result).toThrow()
  })

  it('function returns an object with value AND setValue', () => {
    const makePointer = () => {
      return {
        value: {},
        setValue(key, value) {
          return {
            [key]: value
          }
        }
      }
    }
    const result = () => leaf(obj, path, value, {
      makePointer,
      logging: true
    })

    expect(result).not.toThrow()
    expect(result()).toEqual({
      x: {
        y: 'hello'
      }
    })
  })
})
