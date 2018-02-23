const {
  unflatten
} = require('..')

const log = console.log

describe('Unflatten: buildPath', () => {
  const obj = {
    'x.y': {
      a: 32
    }
  }

  it('not a function', () => {
    const buildPath = 'oops'

    const result = () => unflatten(obj, {
      buildPath
    })

    expect(result).toThrow()
  })
  it('returns invalid path', () => {
    const buildPath = () => 42

    const result = () => unflatten(obj, {
      buildPath
    })

    expect(result).toThrow()
  })
  it('valid function', () => {
    const buildPath = (key) => key.split('.')

    const result = () => unflatten(obj, {
      buildPath
    })

    expect(typeof result()).toBe('object')
  })
})
