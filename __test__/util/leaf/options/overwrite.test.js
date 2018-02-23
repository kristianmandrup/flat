const {
  leaf
} = require('..')

describe('option: overwrite', () => {
  const obj = {
    x: 18
  }
  const path = ['x', 'y']
  const value = 'hello'

  const overwritten = {
    x: {
      y: 'hello'
    }
  }

  it('string - truthy', () => {
    const overwrite = 'oops'
    const result = () => leaf(obj, path, value, {
      overwrite,
    })

    expect(result).not.toThrow()
    expect(result()).toEqual(overwritten)
  })

  it('false - no overwrite', () => {
    const overwrite = false
    const result = () => leaf(obj, path, value, {
      overwrite,
    })

    expect(result).not.toThrow()
    expect(result()).toEqual(obj)

    // identity
    expect(result()).toBe(obj)
  })
})
