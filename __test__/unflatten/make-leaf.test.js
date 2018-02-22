const {
  unflatten
} = require('../flat')

const log = console.log

describe('Unflatten: makeLeaf', () => {
  it('not a function', () => {
    const makeLeaf = 'oops'

    const result = () => unflatten(obj, {
      makeLeaf
    })

    expect(result).toThrow()

  })
  it('valid function', () => {
    const obj = {
      'x.y': {
        a: 32
      }
    }

    const makeLeaf = (obj, path, value) => {
      const key = path[0]
      obj[key] = value
      return obj
    }

    const result = () => unflatten(obj, {
      makeLeaf
    })

    expect(result).not.toThrow()
    expect(typeof result).toBe('object')
    expect(result).toEqual({
      x: {
        a: 32
      }
    })
  })
})
