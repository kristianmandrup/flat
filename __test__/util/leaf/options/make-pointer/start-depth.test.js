const {
  makePointer
} = require('..')

describe('option: startDepth', () => {
  const createObj = () => {
    return {
      'x': {
        a: 32
      }
    }
  }

  path = ['x']

  let obj
  beforeEach(() => {
    obj = createObj()
  })

  it('not a number', () => {
    const startDepth = 'oops'

    const result = () => makePointer(obj, path, {
      startDepth
    })

    expect(result).toThrow()
  })

  it('negative number', () => {
    const startDepth = -17

    const result = () => makePointer(obj, path, {
      startDepth
    })

    expect(result).toThrow()
  })

  it('0', () => {
    const startDepth = 0

    const result = () => makePointer(obj, path, {
      startDepth
    })

    expect(result).not.toThrow()
    expect(result().depth).toEqual(2)

  })

  it('1', () => {
    const startDepth = 1

    const result = () => makePointer(obj, path, {
      startDepth
    })

    expect(result).not.toThrow()

    expect(result().depth).toEqual(3)
  })

  it('2', () => {
    const startDepth = 2

    const result = () => makePointer(obj, path, {
      startDepth
    })

    expect(result).not.toThrow()

    expect(result().depth).toEqual(4)
  })
})
