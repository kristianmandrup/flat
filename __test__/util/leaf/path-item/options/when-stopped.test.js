const {
  makePointer
} = require('..')

describe('option: whenStopped', () => {
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

  const stopCondition = ({
    index
  }) => index > 0

  it('not a function', () => {
    const whenStopped = 'oops'

    const result = () => makePointer(obj, path, {
      stopCondition,
      whenStopped
    })

    expect(result).toThrow()
  })

  it('function returns nothing - false', () => {
    const whenStopped = () => undefined

    const result = () => makePointer(obj, path, {
      stopCondition,
      whenStopped
    })

    expect(result).not.toThrow()

    expect(result().value).toEqual(undefined)
  })

  it('function returns acc', () => {
    const whenStopped = (acc) => acc

    const result = () => makePointer(obj, path, {
      stopCondition,
      whenStopped
    })

    expect(result).not.toThrow()
    expect(result()).toEqual(obj)
  })
})
