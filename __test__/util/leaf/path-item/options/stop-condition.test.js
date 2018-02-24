const {
  makePointer
} = require('..')

describe('option: stopCondition', () => {
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
    const stopCondition = 'oops'

    const result = () => makePointer(obj, path, {
      stopCondition
    })

    expect(result).toThrow()
  })

  it('function returns nothing - false', () => {
    const stopCondition = () => undefined

    const result = () => makePointer(obj, path, {
      stopCondition
    })

    expect(result).not.toThrow()
    expect(result().value).toEqual(obj)
  })

  it('function returns always true', () => {
    const stopCondition = () => true

    const result = () => makePointer(obj, path, {
      stopCondition
    })

    expect(result).not.toThrow()
    expect(result()).toEqual({})
  })

  it('function returns always true', () => {
    const stopCondition = ({
      index
    }) => index > 0

    const result = () => makePointer(obj, path, {
      stopCondition
    })

    expect(result).not.toThrow()
    expect(result()).toEqual({
      x: {}
    })
  })
})
