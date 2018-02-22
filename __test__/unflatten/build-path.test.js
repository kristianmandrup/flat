const {
  unflatten
} = require('../flat')

const log = console.log

describe('Unflatten: buildPath', () => {
  const obj = {
    'x.y': {
      a: 32
    }
  }

  it('buildPath not a function', () => {
    const buildPath = 'oops'

    const result = () => unflatten(obj, {
      buildPath
    })

    expect(result).toThrow()
  })
  it('buildPath returns invalid path', () => {
    const buildPath = () => 42

    const result = () => unflatten(obj, {
      buildPath
    })

    expect(result).toThrow()
  })
  it('custom valid buildPath function', () => {
    const buildPath = (key) => key.split('.')

    const result = () => unflatten(obj, {
      buildPath
    })

    expect(typeof result).toBe('object')
  })
})
