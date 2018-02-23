const {
  leaf
} = require('..')

describe('option: delimiter', () => {
  const obj = {
    x: 18
  }
  const path = 'x.y'
  const value = 'hello'

  const expanded = {
    x: {
      y: 'hello'
    }
  }

  it('not a string', () => {
    const delimiter = false
    const result = () => leaf(obj, path, value, {
      overwrite,
    })

    expect(result).toThrow()
  })

  it('delimiter that does NOT exists in path', () => {
    const delimiter = 'UNKNOWN'
    const result = () => leaf(obj, path, value, {
      overwrite,
    })

    expect(result).not.toThrow()
    expect(result()).toBe(obj)
  })

  it('delimiter that exists in path', () => {
    const delimiter = '.'
    const result = () => leaf(obj, path, value, {
      overwrite,
    })

    expect(result).toEqual(expanded)
  })
})
