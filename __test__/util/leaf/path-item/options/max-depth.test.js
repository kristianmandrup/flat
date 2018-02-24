const {
  makePointer
} = require('..')

describe('option: maxDepth', () => {
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
    const maxDepth = 'oops'

    const result = () => makePointer(obj, path, {
      maxDepth
    })

    expect(result).toThrow()
  })

  it('negative number', () => {
    const maxDepth = -17

    const result = () => makePointer(obj, path, {
      maxDepth
    })

    expect(result).not.toThrow()
  })

  it('0', () => {
    const maxDepth = 0

    const result = () => makePointer(obj, path, {
      maxDepth
    })

    expect(result).not.toThrow()
    expect(result()).toEqual({})

  })

  it('1', () => {
    const maxDepth = 1

    const result = () => makePointer(obj, path, {
      maxDepth
    })

    expect(result).not.toThrow()

    expect(result().value).toEqual({
      x: {}
    })
  })

  it('3', () => {
    const maxDepth = 3

    const result = () => makePointer(obj, path, {
      maxDepth
    })

    expect(result).not.toThrow()

    expect(result().value).toEqual({
      'x': {
        a: 32
      }
    })
  })
})
