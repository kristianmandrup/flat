const {
  makePointer
} = require('../..')

describe('option: accValue', () => {
  const createObj = () => {
    return {
      'x': {
        a: 32
      }
    }
  }

  let obj
  beforeEach(() => {
    obj = createObj()
  })

  path = ['x', 'b']

  it('not a function', () => {
    const accValue = 'oops'

    const result = () => makePointer(obj, path, {
      accValue
    })

    expect(result).toThrow()
  })

  it('function sets undefined to an string', () => {
    const accValue = (acc, key) => {
      acc[key] = 'oops'
      return acc
    }

    const result = () => makePointer(obj, path, {
      accValue
    })

    expect(result).toThrow()
  })

  it('function sets undefined to an object', () => {
    const accValue = (acc, key) => {
      acc[key] = {
        ok: true
      }
      return acc
    }

    const result = () => makePointer(obj, path, {
      accValue
    })

    expect(result).not.toThrow()
  })
})
