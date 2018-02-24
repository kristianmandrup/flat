const {
  makePointer
} = require('../..')

describe('option: fetchValue', () => {
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
    const fetchValue = 'oops'

    const result = () => makePointer(obj, path, {
      fetchValue
    })

    expect(result).toThrow()
  })

  it('fetches a number', () => {
    const fetchValue = () => {
      return 42
    }

    const result = () => makePointer(obj, path, {
      fetchValue
    })

    expect(result).toThrow()
  })

  it('fetches empty object', () => {
    const fetchValue = () => {
      return {}
    }

    const result = () => makePointer(obj, path, {
      fetchValue
    })

    expect(result).not.toThrow()
    expect(result()).toEqual({})
  })
})
