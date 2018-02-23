const {
  makePointer
} = require('..')

describe('option: keyName', () => {
  const createObj = () => {
    return {
      'x': {
        a: 32
      }
    }
  }

  path = ['x']
  value = 'hello'

  let obj
  beforeEach(() => {
    obj = createObj()
  })

  it('not a function', () => {
    const keyName = 'oops'

    const result = () => makePointer(obj, path, {
      keyName
    })

    expect(result).toThrow()
  })

  it('function does NOT transform key to string', () => {
    const keyName = () => 42

    const result = () => makePointer(obj, path, {
      keyName
    })

    expect(result).toThrow()
  })

  it('function does transform key to string', () => {
    const keyName = () => 'myKey'

    const result = () => makePointer(obj, path, {
      keyName
    })

    expect(result).toThrow()
  })
})
