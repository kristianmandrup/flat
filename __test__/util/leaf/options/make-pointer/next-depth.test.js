const {
  makePointer
} = require('..')

describe('option: nextDepth', () => {
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

  it('not a function', () => {
    const nextDepth = 'oops'

    const result = () => makePointer(obj, path, {
      nextDepth
    })

    expect(result).toThrow()
  })

  it('function sets depth to invalid value', () => {
    const nextDepth = (depth) => 'oops'

    const result = () => makePointer(obj, path, {
      nextDepth
    })

    expect(result).toThrow()
  })

  it('function increases depth', () => {
    const nextDepth = (depth) => (depth++)

    const result = () => makePointer(obj, path, {
      nextDepth
    })

    expect(result).not.toThrow()
  })

  it('function decreases depth', () => {
    const nextDepth = (depth) => (depth--)

    const result = () => makePointer(obj, path, {
      nextDepth
    })

    expect(result).toThrow()
  })
})
